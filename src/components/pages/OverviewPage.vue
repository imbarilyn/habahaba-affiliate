<script setup lang="ts">
import { onMounted,  type Ref, ref} from 'vue'
import LineChart from '@/components/charts/LineChart.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import {
  useAffiliateStore,
  useAuthStore,
} from '@/stores'
import AffiliateLinks from '@/components/AffiliateLinks.vue'
import AffiliateTransaction from '@/components/AffiliateTransaction.vue'

export interface LineGraphData {
  affiliateEarning: {
    duration: string
    amount: number
  }
  userEarning: {
    duration: string
    amount: number
  }
}

const affiliateStore = useAffiliateStore()
const authStore = useAuthStore()

const dashboardData = ref({
  clicks: 0,
  affiliateUsers: 0,
  activeUsers: 0,
  totalCommunitySavings: 0,
  userEarnings: 0,
  affiliateEarnings: 0
})

const doughnutData = ref<number []>([])
const isFetchingData = ref(true)
const isError = ref(false)

const getDashboardData = ()=>{
  affiliateStore
    .getDashboardData(authStore.token)
    .then(res => {
      if (res.result && res.data) {
        dashboardData.value = {
          clicks: res.data.clicks,
          affiliateUsers: res.data.affiliateUsers,
          activeUsers: res.data.activeUsers,
          totalCommunitySavings: res.data.totalCommunitySavings,
          userEarnings: res.data.userEarnings,
          affiliateEarnings: res.data.affiliateEarnings
        }
        doughnutData.value = [res.data.clicks, res.data.affiliateUsers, res.data.activeUsers]
        // doughnutData.value = [0, 0, 0]
        console.log(doughnutData.value)

      } else {
        isError.value = true
      }
    })
    .catch(err => {
      console.log(err)
      isError.value = true
    })
    .finally(()=>{
      isFetchingData.value = false

    })
}

onMounted(() => {
  getDashboardData()

})
</script>
<template>
  <main class="text-responsive">
    <!-- Main page content-->
    <div class="container mt-3">
      <!-- Custom page header alternative example-->
      <div
        class="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row mb-4"
      >
        <div class="me-4 mb-3 mb-sm-0 d-flex gap-2">
          <div class="">
            <img
              src="/illustrations/profiles/profile-1.png"
              class="rounded-circle"
              style="width: 50px"
            />
            <div class="bg-habahaba-300"></div>
          </div>
          <div class="d-flex flex-column">
            <span>{{ authStore.getUserInfo()?.firstName as string }}</span>
            <span class="fs-6 fw-light">Hello, feels good to be back!</span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row gap-4 py-4">
          <!-- Dashboard info widget 4-->

          <div class="col smooth-rounded bg-habahaba-900 p-3">
            <div class="d-flex gap-2">
              <span class="material-icons-round text-habahaba-300">
                cloud_download
              </span>
              <span
                class="text-white justify-content-md-start d-flex justify-content-center"
                >Downloads</span
              >
            </div>
            <div class="pt-lg-4 pt-2" v-if="!isError">
              <p class="font-bold text-white fs-3">
                {{ dashboardData.affiliateUsers }}
              </p>
              <span class="text-white">Total app downloads</span>
            </div>
            <div class="pt-lg-4 pt-4 d-flex gap-2" style="opacity: 0.8;" v-else>
              <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-300">warning</span>
              <span class="text-habahaba-300 pt-2">No data, please refresh</span>
            </div>
          </div>
          <div class="col smooth-rounded bg-white p-3">
            <div class="d-flex align-items-end">
              <img
                src="../../../public/images/community-removebg-preview.png"
                style="width: 50px"
              />
              <span class="">Community</span>
            </div>
            <div class="pt-lg-4 pt-2" v-if="!isError">
              <p class="font-bold fs-3">{{ dashboardData.activeUsers }}</p>
              <span class="">Active users</span>
            </div>
            <div class="pt-lg-4 pt-4 d-flex gap-2" v-else style="opacity: 0.6" >
              <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-900">warning</span>
              <span class="text-habahaba-900 fw-400 pt-2" >No data, please refresh</span>
            </div>
          </div>
          <div class="col smooth-rounded bg-white p-3">
            <div class="d-flex align-items-end gap-2">
              <img
                src="../../../public/images/credit.png"
                style="width: 40px"
              />
              <span class="">Revenue</span>
            </div>
            <div class="d-flex pt-lg-4 pt-3" v-if="!isError">
              <span class="pe-1">Kes.</span>
              <p class="font-bold fs-3 d-flex align-items-end">
                {{ dashboardData.userEarnings }}
              </p>
            </div>
            <div class="pt-lg-4 pt-4 d-flex gap-2" style="opacity: 0.6" v-else>
              <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-900">warning</span>
              <span class="text-habahaba-900 fw-400 pt-2" >No data, please refresh</span>
            </div>

          </div>
          <div class="col smooth-rounded bg-white p-3">
            <div class="d-flex align-items-end">
              <img
                src="../../../public/images/savings.png"
                style="width: 40px"
              />
              <span class="">Deposits</span>
            </div>
            <div class="d-flex pt-lg-4 pt-3" v-if="!isError">
              <span class="pe-1">Kes.</span>
              <p class="font-bold fs-3 d-flex align-content-end">
                {{ dashboardData.totalCommunitySavings }}
              </p>
            </div>
            <div class="pt-lg-4 pt-4 d-flex gap-2" style="opacity: 0.6" v-else>
              <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-900">warning</span>
              <span class="text-habahaba-900 fw-400 pt-2" >No data, please refresh</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 mb-4">
          <!-- Illustration card example-->
          <div class="bg-white smooth-rounded px-4 py-2 mb-4">
            <div class="pt-2">
              <div class="d-flex justify-content-between border-lg-bottom">
                <p class="d-lg-block d-none">Your Balance</p>
              </div>
              <div
                class="py-lg-3 py-1 d-flex  gap-lg-0 " :class="[!isError? 'justify-content-between gap-4 flex-lg-column': 'flex-column ']"
              >
                <div class="d-flex justify-content-lg-between gap-2 gap-lg-0 flex-lg-row-reverse" >
                  <div
                    class="rounded-circle bg-habahaba-800 d-flex justify-content-center align-items-center"
                    style="width: 40px; height: 40px"
                  >
                    <span class="material-icons text-habahaba-300">
                      account_balance_wallet
                    </span>
                  </div>
                  <div class="pt-2 pt-lg-0">
                    <span class="fs-6">Balance</span>
                    <!--                    <small class="fs-6">Compared to last month</small>-->
                    <small class="text-success d-lg-none d-block" v-if="!isError"
                      >+23.75%</small
                    >
                  </div>
                </div>

                <div class="d-flex">
                  <div class="d-flex" v-if="!isError">
                    <span class="fw-light fs-3 d-flex align-items-start"
                      >Kes.</span
                    >
                    <p
                      class="fs-3  d-flex pt-3 align-content-end"
                    >
                      {{ dashboardData.affiliateEarnings }}
                    </p>
                  </div>
                  <div class="pt-lg-4 pt-4 d-flex gap-2" style="opacity: 0.6" v-else>
                    <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-900">warning</span>
                    <span class="text-habahaba-900 fw-400 pt-2" >No data, please refresh</span>
                  </div>
                </div>
                <div class="d-none d-lg-block d-flex fs-6" v-if="!isError">
                  <span class="">Compared to last month</span>
                  <!--                  <span class="material-icons-outlined ps-2"> trending_up </span>-->
                  <span class="text-success ps-2">+23.4%</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Report summary card example-->
          <div class="mb-4 bg-white smooth-rounded" v-if="!isFetchingData">
            <DoughnutChart
              v-if="doughnutData"
              :data="doughnutData"
              :is-error="isError"
            />
          </div>
          <div></div>
        </div>
        <div class="col-lg-8 mb-4">
          <!-- Area chart example-->
          <div class="line-graph-size bg-white smooth-rounded mb-4 px-3 pt-md-5 pt-lg-2">
            <p class="p-2">Revenue Summary</p>
            <LineChart/>
          </div>
          <div class="row  ">
            <div class="col-lg-6">
              <!-- Pie chart example-->
              <div class="bg-white smooth-rounded mb-4">
                <div class="p-3">
                  <div class="d-flex justify-content-between">
                    <p class="">My Links</p>
                    <span class="material-icons-outlined"> more_horiz </span>
                  </div>
                  <AffiliateLinks />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <!-- Bar chart example-->
              <div class="bg-white smooth-rounded mb-4">
                <div class="p-3">
                  <div class="d-flex justify-content-between">
                    <p>Recent Transaction</p>
                    <span class="material-icons-outlined"> more_horiz </span>
                  </div>
                  <AffiliateTransaction />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-overview {
  height: 100vh;
}

.full-height {
  min-height: 100vh;
}


.line-graph-size {
  height: 500px;
}

@media (max-width: 768px) {
  .line-graph-size {
    height: 330px;
  }
}
</style>
