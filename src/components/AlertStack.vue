<template>
  <div class="fixed bottom-4 left-8/10 transform -translate-x-1/2 w-96 flex flex-col space-y-2">
    <transition-group name="fade">
      <div
        v-for="(alert, index) in alerts"
        :key="alert.id"
        class="px-4 py-2 rounded shadow-lg flex items-center justify-between"
        :class="getAlertClass(alert.type)"
      >
        <span>{{ alert.message }}</span>
        <button @click="removeAlert(index)" class="ml-4 font-bold text-lg">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alerts: [],
    }
  },
  methods: {
    addAlert(message, type = 'error') {
      const id = Date.now()
      this.alerts.push({ id, message, type })

      setTimeout(() => {
        this.removeAlertById(id)
      }, 4000)
    },
    removeAlert(index) {
      this.alerts.splice(index, 1)
    },
    removeAlertById(id) {
      this.alerts = this.alerts.filter((alert) => alert.id !== id)
    },
    getAlertClass(type) {
      return type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    },
  },
}
</script>

<style scoped>
/* Fade-in suave */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
