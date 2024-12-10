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
    } catch (error) {
      console.log(error)
    }
  }

  async function validateAffiliateLink(affiliateCode: string) {
    try {
      const response = await fetch(`${BASE_URL}/affiliate/validate-link/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          code: affiliateCode
        })
      })
      return await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  async function affiliateUserPhone(affiliateUserPayload: AffiliateUserPayload) {
    console.log(affiliateUserPayload)
    try {
      const response = await fetch(`${BASE_URL}/affiliate-user/submit-phone/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(affiliateUserPayload)
      })
      const resp = await response.json()
      console.log(resp)
      return resp
    } catch (error) {
      console.log(error)
    }
  }

  async function getDashboardData(token: string) {
    try {
      const response = await fetch(`${BASE_URL}/affiliate/dashboard-data/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        mode: 'cors'
      })

      const resp = await response.json()
      // console.log(resp)
      return resp

    } catch (error) {
      console.log(error)
    }
  }

  async function getStatistics(duration: string) {
    const authStore = useAuthStore()
    try {
      const response = await fetch(`${BASE_URL}/affiliate/dashboard-data/user-vs-affiliate-earnings/?duration=${duration}`, {
        method: 'GET',
        headers: {
          Authorization: `${authStore.token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      if (!response.ok) {
        return {
          result: false,
          data: null
        }
      } else {
        const stats = await response.json()
        console.log(stats)

        return {
          result: true,
          data: {
            ...stats.data
          }
        }
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
