<script setup lang="ts">
import { Modal } from 'bootstrap'
import { onMounted,  ref, type Ref } from 'vue'

const props = defineProps({
  modalId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: "Modal Title"
  },
  body: {
    type: String,
    default: 'Modal body goes in here'
  },
});

const modal: Ref<Modal | null> = ref(null)


const displayModal = () => {
  modal.value = new Modal(document.getElementById(props.modalId) as HTMLElement)
  modal.value.show()
}

onMounted(()=>{
  displayModal()
})

const emits = defineEmits<{
  (event: 'showDialog', value: boolean): void
}>()
const closeModal = () => {
  emits('showDialog', false)
  modal.value?.hide()
}




</script>

<template>
  <div class="modal fade" :id="modalId" tabindex="-1"
       @click.self="closeModal"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="title">
            <h5 class="modal-title fs-5">{{ title }}</h5>
            <button type="button" class="btn-close hover:dark:bg-gray-600 " @click="closeModal" aria-label="Close"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            {{ body }}
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
