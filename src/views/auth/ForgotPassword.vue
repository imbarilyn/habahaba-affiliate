<script setup lang="ts">

import AlertBanner from '@/components/AlertBanner.vue'
import { useField } from 'vee-validate'
import { watch, reactive, ref } from 'vue'
import { showAlert } from '@/modules/popup'
import { useAuthStore } from '@/stores'


const authStore = useAuthStore()
const forgotPasswordPayload = reactive({
  email: '',
})


const emailValidator = (value: string) => {
  if (!value) {
    return 'Email is required'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(value)) {
    return 'Email must be valid'
  }

  if (value.length > 50) {
    return 'Email must be less than 50 characters'
  }

  return true
}

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta,
} = useField('email', emailValidator)

watch(
  () => forgotPasswordPayload.email,
  value => {
    if (value) {
      email.value = value
    }
  },
)
const isLoading = ref(false)
// const isAlertBannerVisible = ref({
//   visible: false,
//   message: '',
//   type: '' as 'success' |'danger' | 'warning' | 'primary'
// })
interface Response {
  result: string
  message: string
}


const handleForgotPassword = () => {
  if(emailMeta.validated && emailMeta.valid){
    isLoading.value = true
    authStore.forgotPassword(forgotPasswordPayload.email)
      .then((response?: Response) =>{
        console.log(response)

        if(response?.result === 'fail'){
          showAlert({
            message: response.message,
            type: 'error'
          })
        }
        else{
          showAlert({
            message: response?.message as string,
            type: 'success'
          })
        }
      })
      .catch((error) => {
        // console.log(error)
        showAlert({
          message: 'An error occurred',
          type: 'error'
        })
      })
      .finally(() => {
        isLoading.value = false
      })
  } else{
    showAlert({
      message: 'Please enter a valid email',
      type: 'error'
    })
  }

}
</script>

<template>
  <div class="d-flex md-align-items-center " style="height: 100vh">
    <div class="row w-100">
      <div class="col-md col-12 d-flex justify-content-center align-items-center">
        <div>
          <img
            src="/images/referrer-register.png"
            class="width-size"
          />
        </div>
      </div>
      <div class="col d-flex justify-content-center align-items-start align-items-md-center ms-4">
        <div class="card shadow-lg border-0 rounded-lg p-4">
          <div class="justify-content-center pt-4">
            <div class="d-flex justify-content-center pb-3">
              <img
                src="/images/habahaba-logo.png"
                alt="habahaba-logo"
                class="w-25"
              />
            </div>
            <h3 class="fw-light text-center">Forgot Password?</h3>
            <p class="fw-light fs-6 text-center align-items-center justify-content-center">
              We got you! Please enter your email to reset password
            </p>
          </div>
          <div class="card-body">
            <!-- Login form-->
            <form @submit.prevent="handleForgotPassword">
              <!-- Form Group (email address)-->
              <div class="mb-md-3 mb-4">
                <div class="d-flex justify-content-between">
                  <label class="small mb-1 text-" for="inputPassword"
                  >Password</label
                  >
                  <RouterLink
                    to="/auth/login"
                    class="text-decoration-none text-sm text-habahaba-500"
                  >Login?
                  </RouterLink>
                </div>
<!--                <label class="small mb-1" for="inputUsername"-->
<!--                >Email address</label-->

                <input
                  v-model="forgotPasswordPayload.email"
                  class="form-control"
                  id="inputEmail"
                  type="text"
                  placeholder="johndoe@gmail.com"
                  style="font-size: 15px"
                  required
                  :class="{
                    'is-invalid': emailMeta.validated && !emailMeta.valid,
                  }"
                />
                <small
                  v-if="emailMeta.validated && !emailMeta.valid"
                  class="invalid-feedback"
                >{{ emailErrorMessage}}</small
                >
              </div>
              <button
                type="submit"
                :disabled="!emailMeta.validated || !emailMeta.valid"
                class="btn btn-habahaba-500 col-12 mt-3 mb-4"
              >
                <span v-if="!isLoading" class="text-white">Submit</span>
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
<!--    <div v-if="isAlertBannerVisible.visible">-->
<!--      <AlertBanner  :alert-type="isAlertBannerVisible.type" :alert-message="isAlertBannerVisible.message" @close-alert="closeAlert"/>-->
<!--    </div>-->
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
