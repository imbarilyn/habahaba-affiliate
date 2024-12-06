<script setup lang="ts">
import { computed, onMounted, reactive, type Ref, ref, watch } from 'vue'
import Payouts from '@/components/PayoutComponent.vue'
import LineChart from '@/components/charts/LineChart.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import {
  useAffiliateStore,
  useAuthStore,
  useNotificationsStore,
} from '@/stores'

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
const notificationStore = useNotificationsStore()
const selectedLineChartTab: Ref<string> = ref('daily')
const doughnutData = reactive({
  labels: ['Click', 'Users', 'Active users'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      borderWidth: 6,
    },
  ],
})

const doughnutOptions = {
  responsive: true,
  cutout: '75%',
  radius: '65%',
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'center',
      paddingInline: 20,
      labels: {
        usePointStyle: true,
        pointStyle: 'rounded',
        boxWidth: 20,
        borderRadius: 10,
      },
    },
  },
}

const labels: Ref<string[] | null> = ref(null)
const lineData: Ref = ref({
  datasets: [
    {
      label: 'Community Savings',
      data: [4, 5, 1, 10, 32, 2, 12],
      fill: true,
      backgroundColor: 'rgba(  250, 190, 119, 0.75)',
      tension: 0.4,
      borderWidth: 1,
      // borderColor: 'rgba(  250, 190, 119, 0.75)'
      // 250, 190, 119
      // 254, 238, 214,
    },
    {
      label: 'Affiliate Earning',
      data: [12, 3, 24, 7, 6, 1],
      fill: true,
      backgroundColor: 'rgba(122, 49, 20, 0.75)',
      tension: 0.4,
      borderWidth: 1,
      // borderColor: 'rgba(122, 49, 20, 0.75)'
    },
  ],
})
//
// const scalesText = computed(() => {
//   if (selectedLineChartTab.value === 'daily') {
//     return 'Days'
//   } else if (selectedLineChartTab.value === 'weekly') {
//     return 'Weeks'
//   } else {
//     return 'Months'
//   }
// })
// const lineOptions = {
//   responsive: true,
//   plugins: {
//     title: {
//       display: true,
//       text: 'Community Savings Vs Affiliate Earning',
//     },
//     scales: {
//       x: {
//         display: true,
//         text: scalesText.value,
//       },
//       y: {
//         display: true,
//         text: 'Amount in Ksh',
//       },
//     },
//   },
// }
const dashboardData = ref({
  activeUsers: 0,
  affiliateReturn: 0,
  affiliateUsers: 0,
  totalCommunitySavings: 0,
  userReturn: 0,
})



onMounted(() => {
  handleChartData()
  affiliateStore
    .getDashboardData(authStore.token)
    .then(res => {
      if (res.result === 'ok') {
        dashboardData.value = {
          activeUsers: res.data.activeUsers,
          affiliateReturn: res.data.affiliateEarnings,
          affiliateUsers: res.data.affiliateUsers,
          totalCommunitySavings: res.data.totalCommunitySavings,
          userReturn: res.data.userEarnings,
        }
      } else {
        notificationStore.addNotification(
          'There is an error fetching data',
          'error',
        )
      }
    })
    .catch(err => {
      console.log(err)
      notificationStore.addNotification(
        'There is an error fetching data',
        'error',
      )
    })
})



const lineGraphData = ref<LineGraphData>()

const handleChartData = () => {
  affiliateStore
    .getStatistics(selectedLineChartTab.value)
    .then(resp => {
      if (resp.result) {
        lineGraphData.value = { ...resp.data }
        // console.log(lineGraphData.value)
        switch (selectedLineChartTab.value) {
          case 'daily':
            labels.value = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            break
          case 'weekly':
            labels.value = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4']
            break
          default:
            labels.value = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]
            break
        }
      } else {
        notificationStore.addNotification(
          'There is an error fetching data',
          'error',
        )
      }
    })
    .catch(error => {
      console.error(error)
      notificationStore.addNotification(
        'There is an error fetching data',
        'error',
      )
    })
}
const lineChartTabs = ['daily', 'weekly', 'monthly'] as string[]

const selectLineChartTab = (tab: string) => {
  if (selectedLineChartTab.value === tab) {
    return
  } else {
    selectedLineChartTab.value = tab
    handleChartData()
  }
}

watch(labels, newLabels => {
  if (newLabels && newLabels.length > 0) {
    // console.log('Line graph labels--',newLabels)
    lineData.value.labels = newLabels
  }
})
const isLineGraphLabelsAvailable = computed(() => {
  return labels.value && labels.value.length > 0 && lineGraphData.value
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
              src="../../../public/illustrations/profiles/profile-1.png"
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
            <div class="pt-lg-4 pt-2">
              <p class="font-bold text-white fs-3">
                {{ dashboardData.affiliateUsers }}
              </p>
              <span class="text-white">Total app downloads</span>
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
            <div class="pt-lg-4 pt-2">
              <p class="font-bold fs-3">{{ dashboardData.activeUsers }}</p>
              <span class="">Active users</span>
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
            <div class="d-flex pt-lg-4 pt-3">
              <span class="">Kes.</span>
              <p class="font-bold fs-3 d-flex align-items-end">
                {{ dashboardData.affiliateReturn }}
              </p>
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
            <div class="d-flex pt-lg-4 pt-3">
              <span class="">Kes.</span>
              <p class="font-bold fs-3 d-flex align-content-end">
                {{ dashboardData.totalCommunitySavings }}
              </p>
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
                class="py-lg-3 py-1 d-flex flex-lg-column justify-content-between gap-lg-0 gap-4"
              >
                <div class="d-flex justify-content-lg-between gap-2 gap-lg-0 flex-lg-row-reverse">
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
                    <small class="text-success d-lg-none d-block"
                      >+23.75%</small
                    >
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <span class="fw-light fs-3 d-flex align-items-start"
                      >Kes.</span
                    >
                    <p
                      class="fs-3 fs- fw-semibold d-flex pt-lg-3 align-content-end"
                    >
                      23,786
                    </p>
                  </div>
                </div>
                <div class="d-none d-lg-block d-flex fs-6">
                  <span class="">Compared to last month</span>
                  <!--                  <span class="material-icons-outlined ps-2"> trending_up </span>-->
                  <span class="text-success ps-2">+23.4%</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Report summary card example-->
          <div class="bg-white mb-4 smooth-rounded">
            <!--            <div class="card-header">Affiliate Reports</div>-->
            <DoughnutChart
              :chart-data="doughnutData"
              :chart-options="doughnutOptions"
            />
          </div>
          <div></div>
        </div>
        <div class="col-lg-8 mb-4">
          <!-- Area chart example-->
          <div
            class="line-graph-size bg-white smooth-rounded mb-4 px-3 pt-md-5 pt-lg-2"
          >
            <div class="text-center">Revenue Summary</div>

            <div class="d-flex gap-1">
              <div v-for="(tab, index) in lineChartTabs" :key="index" class="">
                <span
                  class="btn rounded-pill"
                  :class="[
                    selectedLineChartTab === tab
                      ? 'btn btn-outline-habahaba-900 btn-transparent text-habahaba-900 btn-no-hover'
                      : ' btn-habahaba-900 text-white',
                  ]"
                  @click="selectLineChartTab(tab)"
                  >{{ tab }}</span
                >
              </div>
            </div>
            <LineChart
              v-if="isLineGraphLabelsAvailable"
              :line-graph-data="lineGraphData as LineGraphData"
              :labels="labels as string[]"
            />

            <!--            <div v-else class="col-12 d-flex flex-column">-->
            <!--              <div class="col-6">-->
            <!--                <span class="material-icons-round text-habahaba-900" style="font-size: 50px"> report_problem </span>-->
            <!--              </div>-->

            <!--              <div>-->
            <!--                <p>Data Unavailable</p>-->
            <!--              </div>-->

            <!--            </div>-->
          </div>
          <div class="row">
            <div class="col-lg-6">
              <!-- Pie chart example-->
              <div class="bg-white smooth-rounded mb-4">
                <div class="p-3">
                  <div class="d-flex justify-content-between">
                    <p class="">Recent Transaction</p>
                    <span class="material-icons-outlined"> more_horiz </span>
                  </div>
                  <Payouts />
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
                  <Payouts />
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

.btn-no-hover:hover {
  background-color: inherit !important;
}

.line-graph-size {
  height: 500px;
}

@media (max-width: 768px) {
  .line-graph-size {
    height: 300px;
  }
}
</style>
