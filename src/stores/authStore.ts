import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { jwtDecode } from 'jwt-decode'
import moment from 'moment'
import { computed, ref } from 'vue'


const BASE_URL = import.meta.env.VITE_BASE_URL as string

export interface AffiliatePayload {
  "firstName": string,
  "lastName": string,
  "email": string
  "username": string
  "phoneNo": string
  "password": string
  confirmPassword: string
  tnc: boolean
}

export interface AffiliateLoginPayload {
phoneNo: string
password: string
}

export interface UserInfo {
  firstName: string
  lastName: string
  phoneNo: string
  username: string
  exp?: number
}
export const useAuthStore = defineStore('useAuthStore', ()=>{
  const token = useStorage('af-token', '')
  const isLoggedIn = ref(false)
  const tokenExpiry = useStorage('af-token-expiry', '')
  const user = useStorage('af-user', '')
  const isEverLoggedIn = useStorage('_h_eve_lgg_in_', false)


  const getIsLoggedIn = computed(()=>isLoggedIn.value)
  const getToken = computed(()=>token.value)
  const userIsLoggedIn = computed(()=>{
    const expiry = moment.unix(Number(tokenExpiry.value)).utc()
    const now = moment().utc()
    return token.value && expiry.isAfter(now)
  })



  // create affiliate account
  async function createAffiliate (affiliatePayload: AffiliatePayload){
    console.log("!!", BASE_URL)
    try{
      const response = await fetch(`${BASE_URL}/affiliate/register-affiliate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(affiliatePayload)
      })
      const data = await response.json()
      console.log(data)
      return data
    }
    catch (error){
      console.error(error)
    }
  }

  async function  loginAffiliate(affiliatePayload: AffiliateLoginPayload){
    try {
      const response = await fetch(`${BASE_URL}/auth/affiliate/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(affiliatePayload)
      })
      const data = await response.json()
      console.log('Login message',data)
      if(data.result === 'ok'){
        await setUserData(data)
        return data
      }
      else{
        return data
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async function setUserData (data: {token: string}){
    token.value = data.token
    isEverLoggedIn.value = true
    isLoggedIn.value = true
    const decode: UserInfo = jwtDecode(data.token)
    tokenExpiry.value = decode.exp?.toString()
    setUserInfo({
      firstName: decode.firstName,
      lastName: decode.lastName,
      phoneNo: decode.phoneNo,
      username: decode.username,
    })
    return {
      result: 'ok',
      message: 'User logged in successfully'
    }
  }

  function setUserInfo(usr: UserInfo){
    user.value = JSON.stringify({
      ...usr
    })
    isLoggedIn.value = true
  }

  function getUserInfo(){
    try{
      return JSON.parse(user.value) as UserInfo
    }
    catch{
      return null
    }
  }

  function logout (){
    isLoggedIn.value = false
    token.value = null
  }

  return {
    createAffiliate,
    loginAffiliate,
    logout,
    getUserInfo,
    userIsLoggedIn,
    getToken,
    getIsLoggedIn
  }
})
