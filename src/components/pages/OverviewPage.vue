<script setup lang="ts">
import { onMounted, reactive, type Ref, ref } from 'vue'
import Payouts from '@/components/PayoutComponent.vue'
import LineChart from '@/components/charts/LineChart.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import {
  useAffiliateStore,
  useAuthStore,
  useNotificationsStore,
} from '@/stores'

const affiliateStore = useAffiliateStore()
const authStore = useAuthStore()
const notificationStore = useNotificationsStore()
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
        pointStyle: 'rect',
        boxWidth: 20,
        borderRadius: 10,
        borderColor: 'rgb(255, 99, 132)',
      },
    },
  },
}

const labels = reactive([
  '10 AM',
  '1 PM',
  '4 PM',
  '7 PM',
  '10 PM',
  '1 AM',
  '4 AM',
  '7 AM',
  '10 AM',
])
const lineData = {
  labels: labels,
  datasets: [
    {
      label: 'Community Savings',
      data: [16224, 16536, 16470, 16762, 16900, 16850, 17000, 17200, 17400],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
    {
      label: 'Affiliate Earning',
      data: [1622.4, 1653.6, 1647, 1676.2, 1690, 1685, 1700, 1720, 1740],
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1,
    },
  ],
}

const lineOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Community Savings Vs Affiliate Earning',
    },
  },
}
const dashboardData = ref({
  activeUsers: 0,
  affiliateEarnings: 0,
  affiliateUsers: 0,
  totalCommunitySavings: 0,
  userEarnings: 0,
})
onMounted(() => {
  affiliateStore
    .getDashboardData(authStore.token)
    .then(res => {
      if (res.result === 'ok') {
        dashboardData.value = res.data
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

console.log(dashboardData.value)
</script>
<template>
  <main class="bg-habahaba-100 text-responsive">
    <!-- Main page content-->
    <div class="container-xl px-4 mt-4">
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
            <span>{{authStore.getUserInfo()?.username as string}}</span>
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
            <div class="pt-4">
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
            <div class="pt-4">
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
            <div class="d-flex pt-4">
              <span class="">Kes.</span>
              <p class="font-bold fs-3 d-flex align-items-end">
                {{ dashboardData.affiliateEarnings }}
              </p>
            </div>
          </div>
          <div class="col smooth-rounded bg-white p-3">
            <div class="d-flex align-items-end">
              <img
                src="../../../public/images/savings.png"
                style="width: 50px"
              />
              <span class="">Deposits</span>
            </div>
            <div class="d-flex pt-4">
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
          <div class="bg-white smooth-rounded mb-4">
            <div class="p-3">
              <div class="d-flex justify-content-between">
                <p>Recent Transaction</p>
                <span class="material-icons-outlined"> more_horiz </span>
              </div>
              <Payouts />
            </div>
          </div>
          <!-- Report summary card example-->
          <div class="bg-white mb-4 smooth-rounded">
            <!--            <div class="card-header">Affiliate Reports</div>-->
            <DoughnutChart
              :chart-data="doughnutData"
              :chart-options="doughnutOptions"
            />

<!--            <div class="card-footer position-relative border-top-0">-->
<!--              <a class="stretched-link" href="#!">-->
<!--                <div-->
<!--                  class="text-xs d-flex align-items-center justify-content-between"-->
<!--                >-->
<!--                  View More Reports-->
<!--                  <i class="fas fa-long-arrow-alt-right"></i>-->
<!--                </div>-->
<!--              </a>-->
<!--            </div>-->
          </div>
        </div>
        <div class="col-lg-8 mb-4">
          <!-- Area chart example-->
          <div class="bg-white smooth-rounded mb-4 p-3">
            <div class="">Revenue Summary</div>
            <div class="">
              <div class="chart-area">
                <LineChart :line-data="lineData" :line-options="lineOptions" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <!-- Pie chart example-->
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
</style>
