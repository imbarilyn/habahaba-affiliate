<script setup lang="ts">
import { Modal } from 'bootstrap'
import { onMounted, onBeforeUnmount } from 'vue'
import { useAffiliateStore} from '@/stores'

const affiliateStore = useAffiliateStore()
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
  showModal: {
    type: Boolean,
    default: false
  }
});
// console.log(props)
const displayModal = () => {
  console.log(props)
  const modal = new Modal(document.getElementById(props.modalId) as HTMLElement)
  modal.show()
}

const hideModal = () => {
  affiliateStore.setOpenAffiliateDialog(false)
  const modal = Modal.getInstance(document.getElementById(props.modalId) as HTMLElement)
  modal?.hide()

}
// const hanldeModalHidden = () => {
//   affiliateStore.setOpenAffiliateDialog(false)
// }
onMounted(()=>{
    if (props.showModal) {
      displayModal()
    } else {
      return
    }
  // const modal = Modal.getInstance(document.getElementById(props.modalId) as HTMLElement)
  // modal.addEventListener('hidden.bs.modal', hanldeModalHidden)
})

// onBeforeUnmount(()=>{
//   const modal = Modal.getInstance(document.getElementById(props.modalId) as HTMLElement)
//   modal.removeEventListener('hidden.bs.modal', hanldeModalHidden)
// })




</script>

<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-hidden="true" @show-modal="showModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="title">
            <h5 class="modal-title fs-5">{{ title }}</h5>
            <button type="button" class="btn-close hover:dark:bg-gray-600" @click="hideModal" aria-label="Close"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            {{ body }}
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
<!--            <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>-->
<!--            <button type="button" class="btn btn-primary">Save changes</button>-->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
