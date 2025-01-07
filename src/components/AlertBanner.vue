<script setup lang="ts">
import { Alert } from 'bootstrap'

import { onMounted, type Ref, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    alertMessage: string
    alertType: 'success' | 'danger' | 'warning' | 'primary'
  }>(),
  {
    alertMessage: 'An example danger alert with an icon',
    alertType: 'danger',
  },
)

const alert: Ref<Alert | null> = ref(null)
const alertElement: Ref<HTMLElement | null> =  ref(null)

const displayAlert = () => {
  alertElement.value = document.getElementById('alert') as HTMLElement
  alert.value = new Alert(alertElement.value)
  alertElement.value.classList.add('show')
}

onMounted(() => {
  console.log('Alert Props!!', props)
  displayAlert()
})

const emits = defineEmits<{
  (event: 'closeAlert'): void
}>()

const closeAlert = () => {
  if (alert.value) {
    alertElement.value?.classList.remove('show')
    emits('closeAlert')

  }
}
</script>

<template>
  <div
    id="alert"
    :class="`alert alert-${props.alertType} alert-dismissible fade show d-flex align-items-center`"
    role="alert"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 1050;
    "
  >
    <span class="material-icons-outlined" v-if="props.alertType === 'danger'">
      error
    </span>
    <span class="material-icons" v-if="props.alertType === 'primary'">
      info
    </span>
    <span class="material-icons" v-if="props.alertType === 'success'">
      check_circle
    </span>
    <span class="material-icons" v-if="props.alertType === 'warning'" > report_problem </span>
    <div class="ps-2">
      {{ props.alertMessage }}
    </div>
    <button
      @click="closeAlert"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<style scoped></style>
