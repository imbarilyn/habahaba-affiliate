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

export interface ResetPasswordPayload {
  token: string
  userId: number,
  newPassword: string,
  confirmPassword: string

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
  email: string
}
export const useAuthStore = defineStore('useAuthStore', ()=>{
  const token = useStorage('affiliate-token', '')
  const isLoggedIn = ref(false)
  const tokenExpiry = useStorage('af-token-expiry', '')
  const user = useStorage('af-user', '')
  const getIsLoggedIn = computed(()=>isLoggedIn.value)
  const getToken = computed(()=>token.value)
  const everLoggedIn = useStorage('af-ever-logged-in', false)
  const userIsLoggedIn = computed(()=>{
    const expiry = moment.unix(Number(tokenExpiry.value)).utc()
    const now = moment().utc()
    const isValid = token.value && expiry.isAfter(now)
    if(!isValid){
      logout()
    }
    return isValid
  })



  // create affiliate account
  async function createAffiliate (affiliatePayload: AffiliatePayload){
    try{
      const response = await fetch(`${BASE_URL}/affiliate/register-affiliate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(affiliatePayload)
      })
      // if (!response.ok){
      //   console.log('failed to create affiliate', response)
      //   return {
      //     result: 'error',
      //     message: ''
      //   }
      // }

      const data = await response.json()
      return {
        result: data.result,
        message: data.message
      }
    }
    catch (error){
      return {
        result: 'error',
        message: 'An error occurred while trying to create affiliate account'
      }
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
      if(data.result === 'ok'){
        await setUserData(data)
        return data
      }
      else{
        return data
      }
    }
    catch(error){
      // console.log(error)
      return
    }
  }

  async function forgotPassword(email: string){
    try {
      const response = await fetch(`${BASE_URL}/auth/affiliate/forgot-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      })
      const data = await response.json()
      if(!response.ok){
        return {
          result: 'fail',
          message: data.message
        }
      }
      else{
        return {
          result: data.result,
          message: data.message
        }
      }
    }
    catch(error){
      return
    }
  }

  async function resetPassword(resetPayload: ResetPasswordPayload ){
    try {
      const response  = await fetch(`${BASE_URL}/auth/affiliate/reset-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetPayload)
      })
      const data = await response.json()
      console.log(data)
      if(!response.ok){
        return {
          result: 'fail',
          message: data.message
        }
      }
      else{
        return {
          result: data.result,
          message: data.message
        }
      }
    }
    catch(error){
      return
    }
  }

  async function setUserData (data: {token: string}){
    setToken(data.token)
    isLoggedIn.value = true
    const decode: UserInfo = jwtDecode(data.token)
    tokenExpiry.value = decode.exp?.toString()
    setUserInfo({
      firstName: decode.firstName,
      lastName: decode.lastName,
      phoneNo: decode.phoneNo,
      username: decode.username,
      email: decode.email
    })
    return {
      result: 'ok',
      message: 'User logged in successfully'
    }
  }

  const setEverLoggedIn = ()=>{
    everLoggedIn.value = true
  }

  function setToken (value: string){
   try{
     token.value = value
     setEverLoggedIn()
   }catch(error){
     return
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
    getIsLoggedIn,
    token,
    everLoggedIn,
    forgotPassword,
    resetPassword
  }
})
