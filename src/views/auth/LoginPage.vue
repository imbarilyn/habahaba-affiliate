<script setup lang="ts">
import { type AffiliateLoginPayload, useAuthStore } from '@/stores'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import AlertBanner from '@/components/AlertBanner.vue'
import { useStorage } from '@vueuse/core'

const authStore = useAuthStore()
const router = useRouter()
const loginData = useStorage('formData', {
  phoneNo: '',
})
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
  localStorage.setItem('formData', JSON.stringify({phoneNo: value}))
  },
)

const passwordValidator = (value: string) => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!value) {
    return 'Password is required'
  }
  if (passwordRegExp.test(value)) {
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
  () => affiliatePayload.password,
  value => {
    password.value = value
  },
)

const isLoading = ref(false)
const isAlertBannerVisible = ref({
  visible: false,
  message: '',
  type: '' as 'success' |'danger' | 'warning' | 'primary'
})
const everyThingIaValid = computed(() => {
  return (
    phoneNoMeta.validated &&
    phoneNoMeta.valid &&
    passwordMeta.validated &&
    passwordMeta.valid
  )
})
const handleLogin = () => {
  if (everyThingIaValid.value) {
    isLoading.value = true
    authStore
      .loginAffiliate(affiliatePayload)
      .then(resp => {
        console.log(resp)
        isAlertBannerVisible.value =  {
          visible: true,
          message: 'An error occurred',
          type: 'danger'
        }
        if (resp.result === 'ok') {
          router.push({
            name: 'dashboard',
          })
        } else {
          isAlertBannerVisible.value =  {
            visible: true,
            message: resp.message,
            type: 'danger'
          }
        }
      })
      .catch(error => {
        console.log(error)
        isAlertBannerVisible.value =  {
          visible: true,
          message: 'An error occurred',
          type: 'danger'
        }
      })
      .finally(()=>{
        isLoading.value = false
      })
  }
}

const closeAlert = () =>{
  console.log('close alert')
  isAlertBannerVisible.value.visible = false
}



//loading cached data for login form
const loadCachedData = ()=>{
  const cachedData =  loginData.value
  console.log(cachedData)
  if(cachedData){
    affiliatePayload.phoneNo = cachedData.phoneNo
  }
}


onMounted(()=>{
  // On mounted load form data
  loadCachedData()




})
</script>

<template>
  <div class="d-flex md-align-items-center " style="height: 100vh">
    <div class="row w-100">
      <div class="col-md col-12 d-flex justify-content-center align-items-center">
        <div class="">
          <img
            src="../../../public/images/referrer-register.png"
            class="width-size"
          />
        </div>
      </div>
<!--      <div>-->
<!--        <img src="../../../public/images/habahaba-logo.png" class="w-25">-->
<!--      </div>-->
      <div class="col d-flex justify-content-center align-items-start align-items-md-center ms-4">
        <div class="card shadow-lg border-0 rounded-lg">
          <div class="justify-content-center pt-4">
            <div class="d-flex justify-content-center pb-3">
              <img
                src="../../../public/images/habahaba-logo.png"
                alt="habahaba-logo"
                class="w-25"
              />
            </div>
            <h3 class="fw-light text-center">Welcome Back!</h3>
            <p class="fw-light fs-6 text-center">
              Hey! enter your details to login in to your account
            </p>
          </div>
          <div class="card-body">
            <!-- Login form-->
            <form @submit.prevent="handleLogin">
              <!-- Form Group (email address)-->
              <div class="mb-md-3">
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
              <!-- Form Group (password)-->
              <div class="mb-md-3">
                <label class="small mb-1 text-" for="inputPassword"
                  >Password</label
                >
                <input
                  v-model="affiliatePayload.password"
                  class="form-control"
                  id="inputPassword"
                  type="password"
                  placeholder="Enter password"
                  required
                  style="font-size: 15px"
                  :class="{
                    'is-invalid': passwordMeta.validated && !passwordMeta.valid,
                  }"
                />
                <small
                  v-if="passwordMeta.validated && !passwordMeta.valid"
                  class="invalid-feedback"
                  >{{ passwordErrorMessage }}</small
                >
                <div class="d-flex justify-content-end pt-2">
                  <div class="small">
                    <span>Not a user? </span>
                    <RouterLink
                      to="/"
                      class="text-decoration-none text-habahaba-500"
                      >Sign up!
                    </RouterLink>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-habahaba-500 col-12 mt-3 mb-4"
              >
                <span v-if="!isLoading" class="text-white">login</span>
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
    <Teleport to="body">
      <div v-if="isAlertBannerVisible.visible">
        <AlertBanner  :alert-type="isAlertBannerVisible.type" :alert-message="isAlertBannerVisible.message" @close-alert="closeAlert"/>
      </div>
    </Teleport>
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
