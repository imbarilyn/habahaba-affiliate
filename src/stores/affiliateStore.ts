import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { Period } from '@/components/CommunityAnalytics.vue'

interface AffiliateUserPayload {
  phone_no: string,
  code: string
}


const BASE_URL = import.meta.env.VITE_BASE_URL as string

export const useAffiliateStore = defineStore('useAffiliateStore', () => {
    const openCreateLinkDialog = ref({
      isOpen: false
    })
    const appIsFetching = ref<boolean>(false)
    const isTncAccepted = ref(false)
    const getIsTncAccepted = computed(() => isTncAccepted.value)


    const setAppIsFetching = (value: boolean) => {
      appIsFetching.value = value
    }
    const setOpenAffiliateDialog = (value: boolean) => {
      console.log(value)
      openCreateLinkDialog.value.isOpen = value
    }

    const setTncAccepted = (value: boolean) => {
      isTncAccepted.value = value
    }


    async function generateAffiliateLink() {
      const authStore = useAuthStore()
      console.log(authStore.token)
      try {
        const response = await fetch(`${BASE_URL}/affiliate/generate-code/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          },
          mode: 'cors'
        })
        const resp = await response.json()
        if (resp.result === 'ok') {
          console.log('Affiliate link form store', resp)
          return resp
        } else {
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
      try {
        const response = await fetch(`${BASE_URL}/affiliate-user/submit-phone/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify(affiliateUserPayload)
        })
        const res = await response.json()
        if (!response.ok) {
          return {
            result: 'fail',
            message: res.message
          }
        } else {
          return res
        }

      } catch (error) {
        console.log('Catch error')
        return {
          result: 'fail',
          message: 'An error occurred while trying to submit phone number'
        }
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

        if (!response.ok) {
          return {
            result: false,
            data: null
          }
        } else {
          const resp = await response.json()
          return {
            result: true,
            data: resp.data
            // data: {
            //   clicks: 120,
            //   affiliateUsers: 45,
            //   activeUsers: 30,
            //   totalCommunitySavings: 50000.00,
            //   userEarnings: 15000.00,
            //   affiliateEarnings: 10000.00
            // }
          }
        }
      } catch (error) {
        return {
          result: false,
          data: null
        }
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
          // console.log(stats)

          return {
            result: true,
            data: {
              ...stats.data
            }
            // data: {
            // affiliateEarning: [
            //   {amount: 0, duration: 'Monday'},
            //   {amount: 200, duration: 'Tuesday'},
            //   {amount: 400, duration: 'Wednesday'},
            //   {amount: 0, duration: 'Thursday'},
            //   {amount: 100, duration: 'Friday'},
            //   {amount: 150, duration: 'Saturday'},
            //   {amount: 0, duration: 'Sunday'}
            // ],
            // userEarning: [
            //     {amount: 0, duration: 'Monday'},
            //     {amount: 0, duration: 'Tuesday'},
            //     {amount: 40780, duration: 'Wednesday'},
            //     {amount: 0, duration: 'Thursday'},
            //     {amount: 20000, duration: 'Friday'},
            //     {amount: 1490, duration: 'Saturday'},
            //     {amount: 0, duration: 'Sunday'}
            //   ]
            //   }
            // data: []

          }
        }
      } catch (error) {
        console.log(error)
        return {
          result: false,
          data: null
        }
      }
    }

    async function getClicks(selectedPeriod: Period) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`${BASE_URL}/affiliate/statistics/clicks/?duration=${selectedPeriod.label}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          }
        })
        const resp = await response.json()
        if (resp.result === 'success') {
          return {
            data: resp.data

            // data: [
            // {clickCount: 0, createdAt: 'Monday'},
            // {clickCount: 0, createdAt: 'Tuesday'},
            // {clickCount: 0, createdAt: 'Wednesday'},
            // {clickCount: 0, createdAt: 'Thursday'},
            // {clickCount: 0, createdAt: 'Friday'},
            // {clickCount: 0, createdAt: 'Saturday'},
            // {clickCount: 0, createdAt: 'Sunday'},
            // {clickCount: 0, createdAt: 'Monday'},
            // {clickCount: 4, createdAt: 'Tuesday'},
            // {clickCount: 5, createdAt: 'Wednesday'},
            // {clickCount: 1, createdAt: 'Thursday'},
            // {clickCount: 10, createdAt: 'Friday'},
            // {clickCount: 32, createdAt: 'Saturday'},
            // {clickCount: 12, createdAt: 'Sunday'}
            // ]

            // data: null
          }
        } else {
          return {
            data: null
          }
        }
      } catch (error) {
        console.log(error)
        return {
          data: null
        }
      }
    }

    async function getCommunity(selectionPeriod: Period) {
      const authStore = useAuthStore()
      console.log('At the store, community size', selectionPeriod)
      try {
        const response = await fetch(`${BASE_URL}/affiliate/statistics/users/growth/?duration=${selectionPeriod.label}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          }
        })
        const resp = await response.json()
        console.log(resp)
        if (resp.result === 'success') {
          return {
            data: resp.data
            // data: [
            // {CreatedAt: "Monday", userCount: 0},
            // { createdAt: 'Tuesday', userCount: 4},
            // {userCount: 5, createdAt: 'Wednesday'},
            // {userCount: 1, createdAt: 'Thursday'},
            // {userCount: 10, createdAt: 'Friday'},
            // {userCount: 12, createdAt: 'Saturday'},
            // {userCount: 16, createdAt: 'Sunday'}
            //   {CreatedAt: "Monday", userCount: 0},
            //   { createdAt: 'Tuesday', userCount: 0},
            //   {userCount: 0, createdAt: 'Wednesday'},
            //   {userCount: 0, createdAt: 'Thursday'},
            //   {userCount: 0, createdAt: 'Friday'},
            //   {userCount: 0, createdAt: 'Saturday'},
            //   {userCount: 0, createdAt: 'Sunday'}
            // ]
          }

        } else {
          return {
            data: null
          }
        }
      } catch (error) {
        console.log(error)
        return {
          data: null
        }
      }
    }

    async function getCommunityDeposits(selectedPeriod: Period) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`${BASE_URL}/affiliate/statistics/community-deposits/?duration=${selectedPeriod.label}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          }
        })
        const resp = await response.json()
        if (resp.result === 'success') {
          return {
            data: resp.data
            // data: [
            //   {depositAmount: 12, createdAt: 'Monday'},
            //   {depositAmount: 10, createdAt: 'Tuesday'},
            //   {depositAmount: 18, createdAt: 'Wednesday'},
            //   {depositAmount: 22, createdAt: 'Thursday'},
            //   {depositAmount: 17, createdAt: 'Friday'},
            //   {depositAmount: 10, createdAt: 'Saturday'},
            //   {depositAmount: 4, createdAt: 'Sunday'}
            //   {depositAmount: 0, createdAt: 'Monday'},
            //   {depositAmount: 0, createdAt: 'Tuesday'},
            //   {depositAmount: 0, createdAt: 'Wednesday'},
            //   {depositAmount: 0, createdAt: 'Thursday'},
            //   {depositAmount: 0, createdAt: 'Friday'},
            //   {depositAmount: 0, createdAt: 'Saturday'},
            //   {depositAmount: 0, createdAt: 'Sunday'}
            //
            // ]
          }
        } else {
          return {
            data: null
          }
        }
      } catch (error) {
        console.log(error)
        return {
          data: null
        }
      }
    }

    async function getCommunityEarnings(selectedPeriod: Period) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`${BASE_URL}/affiliate/statistics/community-earnings/?duration=${selectedPeriod.label}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          }
        })
        const resp = await response.json()
        if (resp.result === 'success') {
          return {
            data: resp.data
            // data: [
            // {earningAmount: 12, createdAt: 'Monday'},
            // {earningAmount: 10, createdAt: 'Tuesday'},
            // {earningAmount: 18, createdAt: 'Wednesday'},
            // {earningAmount: 22, createdAt: 'Thursday'},
            // {earningAmount: 17, createdAt: 'Friday'},
            // {earningAmount: 10, createdAt: 'Saturday'},
            // {earningAmount: 4, createdAt: 'Sunday'}
            // {earningAmount: 0, createdAt: 'Monday'},
            // {earningAmount: 0, createdAt: 'Tuesday'},
            // {earningAmount: 0, createdAt: 'Wednesday'},
            // {earningAmount: 0, createdAt: 'Thursday'},
            // {earningAmount: 0, createdAt: 'Friday'},
            // {earningAmount: 0, createdAt: 'Saturday'},
            // {earningAmount: 0, createdAt: 'Sunday'}
            // ]
          }

        } else {
          return {
            data: null
          }
        }
      } catch (error) {
        console.log(error)
        return {
          data: null
        }
      }
    }

    async function getGender() {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`${BASE_URL}/affiliate/statistics/community-gender/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          }
        })
        const resp = await response.json()
        console.log(resp)
        console.log(authStore.token)
        if (resp.result === 'success') {
          return {
            data: resp.data
            // data: [
            // {gender: 'Male', number: 20},
            // {gender: 'Female', number: 10},
            // {gender: 'Other', number: 5},
            //   {gender: 'Male', number: 0},
            //   {gender: 'Female', number: 0},
            //   {gender: 'Other', number: 0}
            // ]
          }
        } else {
          return {
            data: null
          }
        }
      } catch (error) {
        console.log(error)
        return {
          data: null
        }
      }
    }

    async function getAge() {
      const authStore = useAuthStore()
      // console.log(authStore.token)
      try {
        const response = await fetch(`${BASE_URL}/affiliate/statistics/community-age/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          }
        })
        const resp = await response.json()
        if (resp.result === 'success') {
          return {
            data: resp.data
            // data: null
            // data: [
            // {
            //   ageRange: "Below 20",
            //   number: 10
            // },
            // {
            //   ageRange: "20-29",
            //   number: 20
            // },
            // {
            //   ageRange: "30-39",
            //   number: 15
            // },
            // {
            //   ageRange: "40-49",
            //   number: 10
            // },
            // {
            //   ageRange: "50-59",
            //   number: 5
            // },
            // {
            //   ageRange: "60 and above",
            //   number: 2
            // }
            //
            // {
            //   ageRange: "Below 20",
            //   number: 0
            // },
            // {
            //   ageRange: "20-29",
            //   number: 0
            // },
            // {
            //   ageRange: "30-39",
            //   number: 0
            // },
            // {
            //   ageRange: "40-49",
            //   number: 0
            // },
            // {
            //   ageRange: "50-59",
            //   number: 0
            // },
            // {
            //   ageRange: "60 and above",
            //   number: 0
            // }
            // ]
          }
        } else {
          return {
            data: null
          }
        }
      } catch (error) {
        console.log(error)
        return {
          data: null
        }
      }

    }


    async function getHighlights() {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`${BASE_URL}/affiliate/statistics/highlights`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          }
        })
        // return await response.json()
        if (response.ok) {
          const resp = await response.json()
          return {
            data: {
              bestPerformingDay: {
                createdAt: resp.data.bestPerformingDay.createdAt,
                amount: resp.data.bestPerformingDay.amount
              },
              bestPerformingMonth: {
                createdAt: resp.data.bestPerformingMonth.createdAt,
                amount: resp.data.bestPerformingMonth.amount
              }
              // "bestPerformingDay": {
              //   "createdAt": "2024-06-15",
              //   "amount": 100.0
              // },
              // "bestPerformingMonth": {
              //   "createdAt": "2024-06-01",
              //   "amount": 500.0
              // }
            }
          }
        } else {
          return {
            data: null
          }
        }
      } catch (e) {
        return {
          data: null
        }
      }
    }

    // async function getAffiliateLinks() {
    //   const authStore = useAuthStore()
    //   try {
    //     const response = await fetch(`${BASE_URL}/affiliate/generate-code/`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `${authStore.token}`
    //       },
    //       mode: 'cors'
    //     })
    //     if (response.ok) {
    //       const resp = await response.json()
    //       return {
    //         result: true,
    //         data: resp.data
    //       }
    //     } else {
    //       return {
    //         result: false,
    //         data: null
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    async function deleteContact(phone: string) {
      try {
        const response = await fetch(`${BASE_URL}/affiliate-onboarding-tests/delete-phone-no/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify({
            phoneNo: phone
          })
        })
        // 0783649792
        if (!response.ok) {
          console.log('I am here')
          return {
            result: 'fail',
            message: 'An error occurred while trying to delete phone number'
          }
        } else {
          return await response.json()
        }
      } catch (error) {
        return {
          result: 'fail',
          message: 'An error occurred while trying to delete phone number'
        }
      }
    }

    async function getAffiliateLinks() {
      const authStore = useAuthStore()

      try {
        const response = await fetch(`${BASE_URL}/affiliate/get-links`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authStore.token}`
          },
          mode: 'cors'
        })
        if (!response.ok) {
          return {
            result: 'fail',
            message: 'An error occurred while trying to get affiliate links',
            data: null
          }
        } else {
          const res = await response.json()
          return {
            result: res.result,
            message: 'Affiliate links fetched successfully',
            data: res.data
          }
        }
      }
      catch(e) {
        return {
          result: 'fail',
          message: 'An error occurred while trying to get affiliate links',
          data: null
        }
      }
    }


    return {
      openCreateLinkDialog,
      setOpenAffiliateDialog,
      generateAffiliateLink,
      validateAffiliateLink,
      affiliateUserPhone,
      getDashboardData,
      setTncAccepted,
      getIsTncAccepted,
      getStatistics,
      appIsFetching,
      setAppIsFetching,
      getClicks,
      getCommunity,
      getCommunityDeposits,
      getCommunityEarnings,
      getGender,
      getAge,
      getHighlights,
      getAffiliateLinks,
      deleteContact
    }
  }
)
