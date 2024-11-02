<script setup lang="ts">
import { type AffiliateLoginPayload, useAuthStore } from '@/stores'
import { computed, reactive, watch } from 'vue'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { bannerAlert, bannerAlertContainer } from '@/alertConfig'
import BannerToast from '@/components/BannerToast.vue'

const authStore = useAuthStore()
const router = useRouter()
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
    authStore
      .loginAffiliate(affiliatePayload)
      .then(resp => {
        console.log(resp)
        if (resp.result === 'ok') {
          router.push({
            name: 'dashboard',
          })
        } else {
          bannerAlert('error', 'An error occurred, please try again')
        }
      })
      .catch((error) => {
        console.log(error)
        bannerAlert('error', 'An error occurred, please try again')
      })
  }
}
</script>

<template>
  <div
    id="layoutAuthentication"
    class="d-flex align-items-center justify-content-center"
    style="min-height: 100vh"
  >
    <div id="layoutAuthentication_content">
      <main>
        <div class="container-xl px-4 h-100 col-sm-12 col-md-9">
          <div class="row justify-content-center">
            <div class="">
              <!-- Basic login form-->
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
                          'is-invalid':
                            phoneNoMeta.validated && !phoneNoMeta.valid,
                        }"
                      />
                      <small
                        v-if="phoneNoMeta.validated && !phoneNoMeta.valid"
                        class="invalid-feedback"
                        >{{ phoneNoErrorMessage }}</small
                      >
                    </div>
                    <!-- Form Group (password)-->
                    <div class="mb-3">
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
                          'is-invalid':
                            passwordMeta.validated && !passwordMeta.valid,
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
                          <RouterLink to="/" class="text-decoration-none"
                            >Sign up!
                          </RouterLink>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="btn btn-primary col-12 mt-3 mb-4"
                    >
                      login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
