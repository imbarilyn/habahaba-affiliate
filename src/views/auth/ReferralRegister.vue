<script setup lang="ts">
import {
  type AffiliateLoginPayload,
  useAffiliateStore,
  useNotificationsStore,
} from '@/stores'
import { onMounted, reactive, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { showAlert } from '@/modules/popup'

const props = defineProps<{
  referrer: string
}>()

const notificationStore = useNotificationsStore()
const affiliateStore = useAffiliateStore()

const affiliatePayload: AffiliateLoginPayload = reactive({
  phoneNo: '',
  password: '',
})

const phoneNoValidator = (value: string) => {
  if (!value) {
    return 'Phone Number required'
  }

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneNoRegex = /^[0-9]{10}$/

  if (!phoneNoRegex.test(value)) {
    return 'Phone number must be valid!!'
  }

  if (value.length > 10 && value.length < 10) {
    return 'Phone number must be 10 digits'
  }

  return true
}

const {
  value: phoneNo,
  errorMessage: phoneNoErrorMessage,
  meta: phoneNoMeta,
} = useField('phoneNo', phoneNoValidator)

watch(
  () => affiliatePayload.phoneNo,
  value => {
    phoneNo.value = value
  },
)

// We first validate the link and if the  link is valid we load the page
const isAppLoading = ref(true)
const isAffiliateLinkValid = ref(false)
onMounted(()=>{
  affiliateStore.validateAffiliateLink(props.referrer)
    .then(resp=>{
      if(resp.result === 'ok'){
        isAffiliateLinkValid.value = true
      }
      else{
        // showAlert({
        //   title: 'Registration successful',
        //   text: 'The app download link has been sent to your phone number',
        //   icon: 'success',
        //   allowOutsideClick: false
        // })
        // notificationStore.addNotification('Invalid affiliate link', 'error')
showAlert({
  type: 'error',
  message: 'An error occurred, please try again later'

})
      }
    })
    .catch(err=>{
      console.log(err)
      showAlert({
        // title: 'Registration successful',
        // text: 'A link for app download has been sent to your phone number',
        // icon: 'success',
        // allowOutsideClick: false
        type: 'error',
        message: 'An error occurred, please try again later'

      })
    })
    .finally(()=> {
      isAppLoading.value = false
    })


})

const isLoading = ref(false)
const handleLogin = () => {
  // console.log(affiliatePayload)
  if (phoneNoMeta.validated && phoneNoMeta.valid) {
    isLoading.value = true
    affiliateStore
      .affiliateUserPhone({
        phone_no: affiliatePayload.phoneNo,
        code: props.referrer,
      })
      .then(resp => {
        if (resp.result === 'ok') {
          showAlert({
            type: 'success',
            message:
              'Registration successful please check your phone for the app download link',
          })
          // notificationStore.addNotification('Registration successful', 'success')
        } else {
          showAlert({
            type: 'error',
            message: 'An error occurred, please try again later',
          })
          // notificationStore.addNotification('An error occurred, please try again', 'error')
        }
      })
      .catch(err => {
        console.log(err)
        showAlert({
          type: 'error',
          message: 'An error occurred, please try again later',
        })
        // notificationStore.addNotification('An error occurred, please try again', 'error')
      })
      .finally(() => {
        isLoading.value = false
      })
  } else {
    notificationStore.addNotification(
      'please fill in the required fields',
      'error',
    )
  }
}
</script>

<template>
  <div
    v-if="isAffiliateLinkValid"
    class="bg-habahaba-500 d-flex md-align-items-center "
    style="height: 100vh"
  >
    <div class="row w-100">
      <div class="col-md col-12 d-flex justify-content-center align-items-center">
        <div>
          <img src="/images/referrer.png" alt="savings"
               class="width-size"
          />
        </div>
      </div>
      <div class="col d-flex justify-content-center align-items-start align-items-md-center ms-4">
        <!-- Basic login form-->
        <div class="card shadow-lg col-xl-8 col-11 border-0 rounded-lg pt-4">
          <div class="justify-content-center">
            <div class="d-flex justify-content-center pb-3">
              <img
                src="/images/habahaba-logo.png"
                alt="habahaba-logo"
                class="w-25"
              />
            </div>
            <h4 class="text-center text-habahaba-800">Welcome to Habahaba</h4>
            <p class="fs-6 text-center">
              Where we make it easy to save smarter!
            </p>
          </div>
          <div class="card-body">
            <!-- Login form-->
            <form @submit.prevent="handleLogin">
              <!-- Form Group (email address)-->
              <div class="mb-3">
                <label class="small mb-1" for="inputUsername"
                  >Phone Number</label
                >
                <input
                  v-model="affiliatePayload.phoneNo"
                  class="form-control"
                  id="inputPhoneNumber"
                  type="text"
                  placeholder="0712345678"
                  style="font-size: 15px"
                  required
                  :class="{
                    'is-invalid': phoneNoMeta.validated && !phoneNoMeta.valid,
                  }"
                />
                <small
                  v-if="phoneNoMeta.validated && !phoneNoMeta.valid"
                  class="invalid-feedback"
                  >{{ phoneNoErrorMessage }}</small
                >
              </div>
              <button
                type="submit"
                class="btn btn-habahaba-500 col-12 mt-3 mb-4"
              >
                <span v-if="!isLoading" class="text-white">Register</span>
                <span
                  v-else
                  class="spinner-border text-habahaba-200"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isAppLoading" class="bg-habahaba-500">
    <LoadingSpinner />
  </div>
</template>

<style scoped>
.width-size {
  width: 500px;
}


@media (max-width: 576px) {
  .width-size {
    width: 200px;
  }
}

@media (min-width:576px) {
  .width-size {
    width: 400px;
  }

}

.form-width {
  width: 600px;
}

@media (max-width: 576px) {
  .form-width {
    width: 400px;
  }
}

@media (min-width: 576px) {
  .form-width {
    width: 600px;
  }
}
</style>
