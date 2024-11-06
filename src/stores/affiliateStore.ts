import { defineStore }  from 'pinia'
import { ref } from 'vue'
import { useAuthStore} from '@/stores/authStore'



const BASE_URL = import.meta.env.VITE_BASE_URL as string

export const useAffiliateStore =  defineStore('useAffiliateStore', ()=>{
  const openDialog = ref({
    isOpen: false,
  })





  const setOpenAffiliateDialog = (value: boolean)=>{
    console.log(value)
    openDialog.value.isOpen = value
  }




  async function getAffiliateLink (){
    const authStore = useAuthStore()
    console.log(authStore.token)
    try{
      const response = await fetch(`${BASE_URL}/affiliate/generate-code/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authStore.token}`
        },
        mode: 'cors',
      })
      const resp = await response.json()
      if(resp.result === 'ok'){
        console.log('Affiliate link form store',resp)
        return resp
      }
      else{
        console.log('error occurred')
        return
      }
    }
    catch(error){
      console.log(error)
    }
  }


  return {
    openDialog,
    setOpenAffiliateDialog,
    getAffiliateLink
  }
})
