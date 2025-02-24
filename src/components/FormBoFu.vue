<template>
  <div class="flex flex-col m-2 p-8 bg-white rounded-lg shadow-md h-auto">
    <h2 class="text-xl font-semibold mb-4">Configuração do CTA - Fundo de Funil</h2>

    <AlertStack ref="alertStack" />

    <form @submit.prevent="fetchProductData">
      <div class="mb-4">
        <label for="productUrl" class="block text-sm font-medium text-gray-700"
          >URL do Produto</label
        >
        <input
          type="url"
          id="productUrl"
          v-model="productUrl"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="mt-4">
        <button
          type="submit"
          class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Buscar Dados do Produto
        </button>
      </div>
    </form>

    <div v-if="product" class="mt-6 p-4 border border-gray-300 rounded-md bg-gray-100">
      <p class="text-sm font-medium text-gray-700 mb-2">Prévia do Card:</p>
      <div class="p-4 bg-white rounded-lg shadow-md">
        <img
          :src="product.imageUrl"
          alt="Imagem do Produto"
          class="w-full h-auto rounded-md mb-2"
        />
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p class="text-md text-gray-700">{{ product.price }}</p>
        <a
          :href="product.url"
          target="_blank"
          class="mt-2 block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-center"
        >
          Comprar Agora
        </a>
      </div>
      <button
        @click="copyToClipboard"
        class="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Copiar Código HTML
      </button>
    </div>
  </div>
</template>

<script>
import AlertStack from '@/components/AlertStack.vue'

export default {
  components: {
    AlertStack,
  },
  data() {
    return {
      productUrl: '',
      product: null,
    }
  },
  methods: {
    methods: {
      async fetchProductData() {
        if (!this.productUrl) {
          this.$refs.alertStack.addAlert(
            'Preencha a URL do produto antes de buscar os dados!',
            'error',
          )
          return
        }

        try {
          const urlParts = this.productUrl.split('/')
          const slug = urlParts[urlParts.length - 1]

          const apiUrl = `https://${import.meta.env.VITE_VTEX_ACCOUNT_NAME}.vtexcommercestable.com.br/api/catalog_system/pub/products/search/${slug}`

          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'X-VTEX-API-AppKey': import.meta.env.VITE_VTEX_APP_KEY,
              'X-VTEX-API-AppToken': import.meta.env.VITE_VTEX_APP_TOKEN,
              'Content-Type': 'application/json',
            },
          })

          const data = await response.json()

          if (!data || data.length === 0) {
            throw new Error('Produto não encontrado')
          }

          this.product = {
            name: data[0].productName,
            price: `R$ ${data[0].items[0].sellers[0].commertialOffer.Price.toFixed(2)}`,
            imageUrl: data[0].items[0].images[0].imageUrl,
            url: this.productUrl,
          }

          this.$refs.alertStack.addAlert('Dados do produto carregados com sucesso!', 'success')
        } catch (error) {
          console.error('Erro ao buscar dados do produto:', error)
          this.$refs.alertStack.addAlert('Erro ao buscar os dados do produto!', 'error')
        }
      },
    },
    copyToClipboard() {
      if (!this.product) return

      const htmlCode = `<div class='product-card'>
        <img src='${this.product.imageUrl}' alt='${this.product.name}' class='product-image'>
        <h3>${this.product.name}</h3>
        <p>${this.product.price}</p>
        <a href='${this.product.url}' target='_blank' class='buy-button'>Comprar Agora</a>
      </div>`

      navigator.clipboard
        .writeText(htmlCode)
        .then(() => {
          this.$refs.alertStack.addAlert(
            'Código HTML copiado para a área de transferência!',
            'success',
          )
        })
        .catch((err) => {
          console.error('Erro ao copiar o código HTML:', err)
          this.$refs.alertStack.addAlert('Erro ao copiar o código HTML!', 'error')
        })
    },
  },
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
.product-image {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}
.buy-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
