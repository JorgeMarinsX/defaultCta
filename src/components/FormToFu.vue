<template>
  <div class="flex flex-col m-2 p-8 bg-white rounded-lg shadow-md h-auto">
    <h2 class="text-xl font-semibold mb-4">Configuração do CTA - Topo de Funil</h2>

    <AlertStack ref="alertStack" />

    <form @submit.prevent="generateCTA">
      <div class="mb-4">
        <label for="ctaText" class="block text-sm font-medium text-gray-700">Texto do CTA</label>
        <input
          type="text"
          id="ctaText"
          v-model="ctaText"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="ctaUrl" class="block text-sm font-medium text-gray-700">URL do CTA</label>
        <input
          type="url"
          id="ctaUrl"
          v-model="ctaUrl"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="mt-4">
        <button
          type="submit"
          class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Gerar Código HTML
        </button>
      </div>
    </form>

    <div v-if="generatedHtml" class="mt-6 p-4 border border-gray-300 rounded-md bg-gray-100">
      <p class="text-sm font-medium text-gray-700 mb-2">Prévia do CTA:</p>
      <div v-html="generatedHtml" class="mb-4"></div>
      <button
        @click="copyToClipboard"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
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
      ctaText: '',
      ctaUrl: '',
      generatedHtml: '',
    }
  },
  methods: {
    generateCTA() {
      if (!this.ctaText || !this.ctaUrl) {
        this.$refs.alertStack.addAlert(
          'Preencha todos os campos antes de gerar o código HTML!',
          'error',
        )
        return
      }

      this.generatedHtml = `<a href='${this.ctaUrl}' style='display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;'>${this.ctaText}</a>`
      this.$refs.alertStack.addAlert('CTA gerado com sucesso!', 'success')
    },
    copyToClipboard() {
      navigator.clipboard
        .writeText(this.generatedHtml)
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
