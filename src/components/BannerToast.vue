<script setup lang="ts">
import { defineProps, nextTick, onMounted, ref } from 'vue'
import * as bootstrap from 'bootstrap'
import { onBeforeRouteLeave } from 'vue-router'

const toastRef = ref<HTMLElement | null>(null)
const isToastVisible = ref(false)
const props = defineProps<{
  type: string
  message: string
}>()

onMounted(() => {
  console.log(bootstrap)
  console.log(props)
  nextTick(() => {
    isToastVisible.value = true
    const toast = new bootstrap.Toast(toastRef.value as HTMLElement, {
      autohide: false,
      animation: true,
    })
    console.log(toast)
    toast.show()
  })
})

// closing the banner
const closeBanner = () =>{
  const toast = bootstrap.Toast.getInstance(toastRef.value as HTMLElement)
  if(toast){
    toast.hide()
  }
  emits('close')
}

const emits = defineEmits<{
  (event: 'close'): void
}>()


addEventListener('beforeunload', ()=>{
  const toast = bootstrap.Toast.getInstance(toastRef.value as HTMLElement)
  toast?.hide()


})
</script>

<template>
  <div
    class="toast-centered shadow-lg   position-fixed top-0  right-0 mt-3 rounded-3 bg-danger-subtle"
    :class="[
      props.type === 'error' ? 'border border-danger' : 'border border-warning',
    ]"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="toastRef"
    v-show="isToastVisible"
  >
    <div class="d-flex md-py-2 md-px-2 py-1 px-1  align-items-center">
      <div class="d-flex gap-4">
        <span
          class="material-icons-outlined"
          :class="[props.type === 'error' ? 'text-danger' : 'text-warning']"
        >
          {{ props.type }}
        </span>
        <span style="font-size: 14px" class="text-nowrap">{{ props.message }}</span>
      </div>
      <button type="button" class="btn me-2 m-auto border-none!" @click="closeBanner">
        <span
          class="material-icons-outlined"
          :class="[props.type === 'error' ? 'text-danger' : 'text-warning']"
        >
          close
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.toast-centered {
  left: 50%;
  transform: translateX(-50%);
  width: '400px';




}
</style>
