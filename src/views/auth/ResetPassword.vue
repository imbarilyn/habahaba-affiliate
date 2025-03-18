<script setup lang="ts">
import { useField } from 'vee-validate'
import { watch, reactive, ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores'
import { jwtDecode } from 'jwt-decode'
import { showAlert } from '@/modules/popup'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

interface DecodeToken {
  exp: number
  userId: number
}
const props = defineProps<{
  accessToken: string,
}>()
const resetPasswordPayload = reactive({
  password: '',
  confirmPassword: '',
})

const passwordValidator = (value: string) => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!value) {
    return 'Password is required'
  }
  if (!passwordRegExp.test(value)) {
    return 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number'
  }
  if (value.length > 10) {
    return 'Password must be less than 10 characters'
  }
  return true
}

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta,
} = useField('password', passwordValidator)

watch(
  () => resetPasswordPayload.password,
  value => {
    password.value = value
  },)

const confirmPasswordValidator = (value: string) => {
  if (!value) {
    return 'Confirm Password is required'
  }
  if (value !== password.value) {
    return 'Passwords do not match'
  }
  return true
}

const {
  value: confirmPassword,
  errorMessage: confirmPasswordErrorMessage,
  meta: confirmPasswordMeta,
} = useField('confirmPassword', confirmPasswordValidator)

watch(()=> resetPasswordPayload.confirmPassword, value =>{
  confirmPassword.value = value
})


const decodeToken = (token: string)=>{
  const decode: DecodeToken  = jwtDecode(token)
  console.log(decode)
  return decode
}

onMounted(()=>{
  decodeToken(props.accessToken)
})
 const router = useRouter()
const everyFieldValid = computed(()=>passwordMeta.valid &&  passwordMeta.validated && confirmPasswordMeta.valid && confirmPasswordMeta.validated)
const isLoading = ref(false)
const handleResetPassword = ()=>{
  if(everyFieldValid.value){
    isLoading.value = true
    authStore.resetPassword({
      token: props.accessToken,
      newPassword: resetPasswordPayload.password,
      confirmPassword: resetPasswordPayload.confirmPassword,
      userId: decodeToken(props.accessToken).userId,
    })
      .then((response)=>{
        if(response?.result === 'ok'){
          setTimeout(()=>{
            isLoading.value = false
            showAlert(
              {
                message: response.message,
                type: 'success'
              }
            )
            router.push({
              name: 'user-login'
            })
          }, 1500)
        } else{
          setTimeout(()=>{
            isLoading.value = false
            showAlert(
              {
                message: response?.message,
                type: 'error'
              }
            )
          }, 1500)
        }
      })
      .catch((error)=>{
        setTimeout(()=>{
          isLoading.value = false
          showAlert(
            {
              message: 'An error occurred, please try again',
              type: 'error'
            }
          )
        }, 1500)
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
            <h3 class="fw-light text-center">Reset Password</h3>
            <p class="fw-light fs-6 text-center align-items-center justify-content-center">
              We got you! Please enter your email to reset password
            </p>
          </div>
          <div class="card-body">
            <!-- Login form-->
            <form @submit.prevent="handleResetPassword">
              <!-- Form Group (email address)-->
              <div class="mb-md-3 mb-4">
                  <label class="small mb-1 text-" for="inputPassword"
                  >New Password</label
                  >
                <input
                  v-model=" resetPasswordPayload.password"
                  class="form-control"
                  id="inputPhoneNumber"
                  type="password"
                  style="font-size: 15px"
                  required
                  :class="{
                    'is-invalid': passwordMeta.validated && !passwordMeta.valid,
                  }"
                />
                <small
                  v-if="passwordMeta.validated && !passwordMeta.valid"
                  class="invalid-feedback"
                >{{ passwordErrorMessage}}</small
                >
              </div>
              <div class="mb-md-3">
                <label class="small mb-1 text-" for="inputPassword"
                >Confirm Password</label
                >
                <input
                  v-model=" resetPasswordPayload.confirmPassword"
                  class="form-control"
                  id="inputConfirmPassword"
                  type="password"
                  style="font-size: 15px"
                  required
                  :class="{
                    'is-invalid': confirmPasswordMeta.validated && !confirmPasswordMeta.valid,
                  }"
                />
                <small
                  v-if="confirmPasswordMeta.validated && !confirmPasswordMeta.valid"
                  class="invalid-feedback"
                >{{ confirmPasswordErrorMessage}}</small
                >
              </div>
              <div class="d-flex justify-content-end">
                <RouterLink to="/auth/login" class="text-decoration-none text-sm text-habahaba-500">Login</RouterLink>
              </div>
              <button
                type="submit"
                class="btn btn-habahaba-500 col-12 mt-3 mb-4"
                :disabled="!confirmPasswordMeta.valid || !confirmPasswordMeta.validated || !passwordMeta.valid || !passwordMeta.validated"
              >
                <span v-if="!isLoading" class="text-white">Reset</span>
                <span
                  v-else
                  class="spinner-border text-habahaba-200"
                  role="status"

                >
                  <span class="visually-hidden">Loading...</span>
                </span>
              </button>
              <div class="d-flex justify-content-end">
                <RouterLink to="/auth/forgot-password" class="text-decoration-none text-sm text-habahaba-500">Retry forgot password</RouterLink>
              </div>
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
