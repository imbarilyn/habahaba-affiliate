import Swal from 'sweetalert2'
import { ref } from 'vue'
interface BannerAlert {
  type:  'error' | 'warning'
  message: string
}
const bannerAlertContainer = ref<BannerAlert[]>([])
const customSwalAlertError = Swal.mixin({
  width: '400px',
  customClass: {
    popup: 'custom-popup-class',
    title: 'custom-title-class',
    confirmButton: 'custom-confirm-button-class',


  }
})

const bannerAlert = (type: string, message: string) => {
  console.log(type, message)
  if(type === 'error'){
    bannerAlertContainer.value.push({type: 'error', message})
  }
  else{
    bannerAlertContainer.value.push({type: 'warning', message})
  }

}

export { customSwalAlertError, bannerAlert, bannerAlertContainer }
