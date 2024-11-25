import Swal, {type SweetAlertOptions} from 'sweetalert2'



export const showAlert = (options: SweetAlertOptions)=>{
  const swalOptions =  Swal.fire({
    title: options.title,
    text: options.text,
    icon: options.icon,
      customClass: {
      popup: 'my-popup-class',
      title: 'my-title-class',
        htmlContainer: 'my-html-container-class',
        cancelButton: 'my-cancel-button-class',
        actions: 'my-actions-class',
        confirmButton: 'my-confirm-button-class',
      },
    buttonsStyling: false,
    allowOutsideClick: options.allowOutsideClick,
    allowEscapeKey: false,
    focusConfirm: true


  } as SweetAlertOptions)

  if(options.timer){
    setTimeout(()=>{
      console.log(options.timer)
      Swal.close()

    }, 2000)



  }

  return swalOptions

}
