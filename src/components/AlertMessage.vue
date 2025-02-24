<template>
  <transition name="slide-in">
    <div
      v-if="message"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-80 px-4 py-2 rounded shadow-lg flex items-center justify-between transition-opacity duration-300"
      :class="messageClass"
    >
      <span>{{ message }}</span>
      <button @click="$emit('close')" class="ml-4 font-bold text-lg">×</button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'error', // Padrão: erro
    },
  },
  computed: {
    messageClass() {
      return this.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    },
  },
}
</script>

<style scoped>
/* Animação de slide-in do alerta */
.slide-in-enter-active,
.slide-in-leave-active {
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}

.slide-in-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-in-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-in-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-in-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
