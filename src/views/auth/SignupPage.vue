<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, onMounted, reactive, type Ref, ref, watch } from 'vue'
import { type AffiliatePayload, useAuthStore } from '@/stores'
import AlertBanner from '@/components/AlertBanner.vue'
import { useStorage } from '@vueuse/core'
import { merge } from 'lodash'

const authStore = useAuthStore()
interface SignUpData {
  firstName: string
  lastName: string
  email: string
  username: string
  phoneNo: string
}

const affiliatePayload: AffiliatePayload = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phoneNo: '',
  password: '',
  confirmPassword: '',
  tnc: false,
})

type Updates = Partial<SignUpData>

// trying to cache form data in case user switches between pages
const signUpData: Ref<SignUpData> = useStorage<SignUpData>('signUpData', {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phoneNo: '',
})

// updating the localstorage using the deepmerge from loadsh
const updateStorageKey = (updates: Updates) => {
  const existingData = signUpData.value || {}
  signUpData.value = merge({}, existingData, updates)
}

const loadCachedData = () => {
  const cachedData = signUpData.value
  console.log('Cached Data', cachedData)
  if (cachedData) {
    affiliatePayload.firstName = cachedData.firstName
    affiliatePayload.lastName = cachedData.lastName
    affiliatePayload.email = cachedData.email
    affiliatePayload.username = cachedData.username
    affiliatePayload.phoneNo = cachedData.phoneNo
  }
}

watch(()=>affiliatePayload.tnc, (val)=>{
  console.log('tnc', val)
  localStorage.setItem('isTermsAccepted', JSON.stringify({accepted: val}))

})

 onMounted(()=>{
   if(localStorage.getItem('isTermsAccepted')){
      affiliatePayload.tnc = true
   }
    loadCachedData()

 })

const nameValidator = (value: string) => {
  const nameRegExp = /^[a-zA-Z\s]+$/
  if (!value) {
    return 'Name is required'
  }
  if (value.replace(/\s/g, '').length < 3) {
    return 'Name too short'
  }
  if (value.replace(/\s/g, '').length > 20) {
    return 'Name too long'
  }
  if (!nameRegExp.test(value)) {
    return 'Name must contain only aphabetic characters'
  }
  return true
}

const {
  value: firstName,
  meta: firstNameMeta,
  errorMessage: firstNameErrorMessage,
} = useField('firstName', nameValidator)

watch(
  () => affiliatePayload.firstName,
  value => {
    firstName.value = value
    updateStorageKey({ firstName: value })

    console.log(localStorage.getItem('signUpData'))
  },
)
const {
  value: lastName,
  meta: lastNameMeta,
  errorMessage: lastNameErrorMessage,
} = useField('lastName', nameValidator)

watch(
  () => affiliatePayload.lastName,
  value => {
    lastName.value = value
    updateStorageKey({ lastName: value })
  },
)

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
  () => affiliatePayload.email,
  value => {
    if (value) {
      email.value = value
      updateStorageKey({ email: value })
    }
  },
)

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
    updateStorageKey({ phoneNo: value })
  },
)

const usernameValidator = (value: string) => {
  if (!value) {
    return 'Username is required'
  }
  if (value.replace(/\s/g, '').length < 3) {
    return 'Username too short'
  }
  return true
}

const {
  value: username,
  errorMessage: usernameErrorMessage,
  meta: usernameMeta,
} = useField('username', usernameValidator)

watch(
  () => affiliatePayload.username,
  value => {
    username.value = value
    updateStorageKey({ username: value })
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

watch(
  () => affiliatePayload.confirmPassword,
  value => {
    confirmPassword.value = value
  },
)

// const tncValidator = (value: boolean) => {
//   if (!value) {
//     return 'Please accept the terms and conditions'
//   }
//   return true
// }
//
// const {
//   value: tnc,
//   errorMessage: tncErrorMessage,
//   meta: tncMeta,
// } = useField('tnc', tncValidator)
//
// watch(
//   () => affiliatePayload.tnc,
//   value => {
//     console.log('tnc value', value)
//     if (value) {
//       tnc.value = value
//     }
//   },
// )


const everyFieldIsValid = computed(() => {
  return (
    firstNameMeta.validated &&
    firstNameMeta.valid &&
    lastNameMeta.validated &&
    lastNameMeta.valid &&
    emailMeta.validated &&
    emailMeta.valid &&
    phoneNoMeta.validated &&
    phoneNoMeta.valid &&
    usernameMeta.validated &&
    usernameMeta.valid &&
    passwordMeta.validated &&
    passwordMeta.valid &&
    confirmPasswordMeta.validated &&
    confirmPasswordMeta.valid &&
    affiliatePayload.tnc
  )
})
const isAlertBannerVisible = ref({
  visible: false,
  message: '',
  type: '' as 'success' | 'danger' | 'warning' | 'primary',
})

// generic type
// type ApiResponse<Result> = {
//   message: string
//   result: Result
// }
const isLoading = ref(false)
const handleSubmit = () => {
  isLoading.value = true
  if (everyFieldIsValid.value) {
    authStore
      .createAffiliate(affiliatePayload)
      .then(resp => {
        console.log('**isAffiliateError', resp)
        if (resp.result === 'ok') {
          return
        }
        else{
          isAlertBannerVisible.value = {
            visible: true,
            message: resp.message,
            type: 'danger',
          }
        }
      })
      .catch((error) => {
        console.log(error)
        isAlertBannerVisible.value = {
          visible: true,
          message: 'Failed to register affiliate please try again',
          type: 'danger',
        }
      })
      .finally(() => {
        isLoading.value = false
      })
  } else {
    isLoading.value = false
    isAlertBannerVisible.value = {
      visible: true,
      message:
        'Please fill in all fields including accepting the terms and conditions',
      type: 'danger',
    }
  }
}

const closeAlert = () => {
  isAlertBannerVisible.value.visible = false
}


</script>

<template>
  <div class="container py-md-0 py-4" style="min-height: 100vh">
    <div class="row">
      <div
        class="col-md-6 col-12 d-flex align-items-center justify-content-md-start justify-content-center pt-4"
      >
        <div class="">
          <img
            src="../../../public/images/referrer-register.png"
            class="width-size"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-6 d-flex justify-content-center">
        <div class="col col-lg-10">
          <!-- Basic registration form-->
          <div class="card shadow border-0 rounded-lg mt-5 shadow px-4">
            <div class="d-flex flex-column justify-content-center pt-2">
              <div class="d-flex justify-content-center pb-2">
                <img
                  src="../../../public/images/habahaba-logo.png"
                  alt="habahaba-logo"
                  class="w-25"
                />
              </div>
              <div class="d-flex justify-content-center">
                <p class="fw-light text-habahaba-500">
                  Hello! Please sign up to get started
                </p>
              </div>
            </div>
            <div class="card-body">
              <!-- Registration form-->
              <form @submit.prevent="handleSubmit">
                <!-- Form Row-->

                <!-- Form Group (first name)-->
                <div class="d-flex gap-4 mb-md-3">
                  <div class="">
                    <label class="small mb-1" for="inputFirstName"
                      >First Name</label
                    >
                    <input
                      v-model="affiliatePayload.firstName"
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Jane"
                      style="font-size: 15px"
                      :class="{
                        'is-invalid':
                          firstNameMeta.validated && !firstNameMeta.valid,
                      }"
                    />
                    <small
                      v-if="firstNameMeta.validated && !firstNameMeta.valid"
                      class="invalid-feedback"
                      >{{ firstNameErrorMessage }}</small
                    >
                  </div>

                  <!-- Form Group (last name)-->
                  <div class="">
                    <label class="small mb-1" for="inputLastName"
                      >Last Name</label
                    >
                    <input
                      v-model="affiliatePayload.lastName"
                      class="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Middleton"
                      style="font-size: 15px"
                      :class="{
                        'is-invalid':
                          lastNameMeta.validated && !lastNameMeta.valid,
                      }"
                    />
                    <small
                      v-if="lastNameMeta.validated && !lastNameMeta.valid"
                      class="invalid-feedback"
                      >{{ lastNameErrorMessage }}</small
                    >
                  </div>
                </div>

                <!-- Form Group (last name)-->
                <div class="mb-md-3">
                  <label class="small mb-1" for="inputLastName">Username</label>
                  <input
                    v-model="affiliatePayload.username"
                    class="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="janemilton"
                    style="font-size: 15px"
                    :class="{
                      'is-invalid':
                        usernameMeta.validated && !usernameMeta.valid,
                    }"
                  />
                  <small
                    v-if="usernameMeta.validated && !usernameMeta.valid"
                    class="invalid-feedback"
                    >{{ usernameErrorMessage }}</small
                  >
                </div>

                <!-- Form Group (last name)-->
                <div class="mb-md-3">
                  <label class="small mb-1" for="inputLastName"
                    >Phone Number</label
                  >
                  <input
                    v-model="affiliatePayload.phoneNo"
                    class="form-control"
                    id="inputphoneNo"
                    type="text"
                    placeholder="0712345678"
                    style="font-size: 15px"
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

                <!-- Form Group (email address)            -->
                <div class="mb-md-3">
                  <label class="small mb-1" for="inputEmailAddress"
                    >Email</label
                  >
                  <input
                    v-model="affiliatePayload.email"
                    class="form-control"
                    id="inputEmailAddress"
                    type="email"
                    aria-describedby="emailHelp"
                    placeholder="midleton@gmail.com"
                    style="font-size: 15px"
                    :class="{
                      'is-invalid': emailMeta.validated && !emailMeta.valid,
                    }"
                  />
                  <small
                    v-if="emailMeta.validated && !emailMeta.valid"
                    class="invalid-feedback"
                    >{{ emailErrorMessage }}</small
                  >
                </div>

                <!-- Form Row    -->

                <!-- Form Group (password)-->
                <div
                  class="d-flex flex-md-row gap-md-4 gap-2 mb-md-4 mb-2 flex-column"
                >
                  <div class="mb-1.5">
                    <label class="small mb-1" for="inputPassword"
                      >Password</label
                    >
                    <input
                      v-model="affiliatePayload.password"
                      class="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Enter password"
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
                  </div>

                  <!-- Form Group (confirm password)-->
                  <div class="">
                    <label class="small mb-1" for="inputConfirmPassword"
                      >Confirm Password</label
                    >
                    <input
                      v-model="affiliatePayload.confirmPassword"
                      class="form-control"
                      id="inputConfirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      style="font-size: 15px"
                      :class="{
                        'is-invalid':
                          confirmPasswordMeta.validated &&
                          !confirmPasswordMeta.valid,
                      }"
                    />
                    <small
                      v-if="
                        confirmPasswordMeta.validated &&
                        !confirmPasswordMeta.valid
                      "
                      class="invalid-feedback"
                      >{{ confirmPasswordErrorMessage }}</small
                    >
                  </div>
                </div>
                <div style="font-size: 15px">
                  <input type="checkbox" v-model="affiliatePayload.tnc" />
                  <span class="px-1">I've read and accepted the</span>
                  <RouterLink
                    to="/term-and-conditions"
                    class="text-decoration-none"
                    >Terms and Conditions
                  </RouterLink>
<!--                  <small-->
<!--                    v-if="tncMeta.validated && !tncMeta.valid"-->
<!--                    class="d-block invalid-feedback"-->
<!--                    >{{ tncErrorMessage }}</small-->
<!--                  >-->
                </div>
                <div class="d-flex justify-content-end mb-3">
                  <div class="small">
                    <span>Have an account?</span>
                    <RouterLink
                      to="/login"
                      class="text-decoration-none text-habahaba-500"
                    >
                      Go to login
                    </RouterLink>
                  </div>
                </div>

                <!-- Form Group (create account submit)-->
                <button
                  class="btn btn-habahaba-500 btn-block col-12 pe-1"
                  type="submit"
                >
                  <span v-if="!isLoading" class="text-white"
                    >Create Account</span
                  >
                  <span
                    v-else
                    class="spinner-border text-habahaba-200"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </span>
                </button>
                <!--                      <div class="d-flex justify-content-center">-->
                <!--                        <hr class="col-5" />-->
                <!--                        <span class="align-content-center px-2">Or</span>-->
                <!--                        <hr class="col-6" />-->
                <!--                      </div>-->
                <!--                      <div-->
                <!--                        class="d-flex flex-row bg-primary rounded border border-primary border-2"-->
                <!--                      >-->
                <!--                        <div class="bg-white rounded-start">-->
                <!--                          <img-->
                <!--                            src="../../../public/images/googleicon.png"-->
                <!--                            style="width: 40px"-->
                <!--                            class=""-->
                <!--                          />-->
                <!--                        </div>-->
                <!--                        <div class="align-content-center mx-auto">-->
                <!--                          <span class="text-white">Sign up with google</span>-->
                <!--                        </div>-->
                <!--                      </div>-->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="isAlertBannerVisible.visible">
        <AlertBanner
          :alert-type="isAlertBannerVisible.type"
          :alert-message="isAlertBannerVisible.message"
          @close-alert="closeAlert"
        />
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

@media (min-width: 576px) {
  .width-size {
    width: 400px;
  }
}
</style>
