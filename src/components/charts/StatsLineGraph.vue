<script setup lang="ts">
import { nextTick, onMounted, type Ref, ref, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import type { Period, Tab } from '@/components/CommunityAnalytics.vue'
import { useAffiliateStore, useNotificationsStore } from '@/stores'
import { showAlert } from '@/modules/popup'

const affiliateStore = useAffiliateStore()
const notificationStore = useNotificationsStore()
const refLineGraph: Ref<HTMLCanvasElement | null> = ref(null)
const lineGraphInstance: Ref<Chart<'line', number[], string> | null> = ref(null)

const props = defineProps<{
  selectedPeriod: Period
  activeTab: Tab
}>()


const generateLabels = (selectedPeriod: Period) => {
  if (selectedPeriod.label === '7 days') {
    lineData.value.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  } else if (selectedPeriod.label === '30 days') {
    lineData.value.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  } else {
    lineData.value.labels = [
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
  }
}

const data = ref<number[]>()

const lineData: Ref = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  // labels: [] as string[],
  datasets: [
    {
      label: 'Community Savings',
      data: [4, 5, 1, 10, 32, 2, 12],
      // data: [] as number[],
      fill: true,
      backgroundColor: 'rgba(  250, 190, 119, 0.75)',
      // backgroundColor: 'rgba(122, 49, 20, 0.75)',
      tension: 0.4,
      borderWidth: 1,
      // borderColor: 'rgba(  250, 190, 119, 0.75)'
      // 250, 190, 119
      // 254, 238, 214,
    },
    // {
    //   label: 'Affiliate Earning',
    //   data: [12, 3, 24, 7, 6, 1],
    //   fill: true,
    //   backgroundColor: 'rgba(122, 49, 20, 0.75)',
    //   tension: 0.4,
    //   borderWidth: 1,
    //   // borderColor: 'rgba(122, 49, 20, 0.75)'
    // },
  ],
})
const renderChart = () => {
  nextTick(()=>{
    if (refLineGraph.value) {
      lineGraphInstance.value = new Chart(refLineGraph.value, {
        type: 'line',
        data: lineData.value,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
              text: 'Community Savings Vs Affiliate Earning',
            },
            // scales: {
            //   y: {
            //     title: {
            //       display: true,
            //       text: 'Amount in Ksh',
            //     },
            //     beginAtZero: true,
            //   },
            // },
          },
        },
      })
    }

  })

}


const isChartDisplay = ref(false)
const isErrorFetchingData = ref(false)
const isZeroValues = ref(false)
const image = ref<string>('')

const getClicks = (selectedPeriod: Period) => {
  affiliateStore
    .getClicks(selectedPeriod)
    .then(response => {
      if (response.data) {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i].clickCount)
          lineData.value.datasets[0].data?.push(response.data[i].clickCount)
        }
        if (
          lineData.value.datasets[0].data.every(
            (value: number) => value === (0 as number),
          )
        ) {
          console.log('Checking for zeros')
          isZeroValues.value = true
          isChartDisplay.value = false
          image.value = '/images/noClicks.png'
        } else {
          isZeroValues.value = false
          generateLabels(selectedPeriod)
          isChartDisplay.value = true
          nextTick(() => {
            renderChart()
          })

        }
      } else {
        console.log('No data available')
        isErrorFetchingData.value = true
        isChartDisplay.value = false
        image.value = '/images/noClicks.png'
        notificationStore.addNotification('No data available for now', 'error')
      }
    })
    .catch(error => {
      isErrorFetchingData.value = true
      isChartDisplay.value = false
      image.value = '/images/noClicks.png'
      notificationStore.addNotification(
        'Unable to get data, please try again',
        'error',
      )
    })
}


const getCommunity = (selectedPeriod: Period) => {
  console.log('Getting Community data')
  affiliateStore.getCommunity(selectedPeriod)
    .then(response => {
    if (response.data) {
      console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].userCount)
        lineData.value.datasets[0].data?.push(response.data[i].userCount)
      }
      console.log(lineData.value)
      if (
        lineData.value.datasets[0].data.every(
          (value: number) => value === (0 as number),
        )
      ) {
        console.log('Checking for zeros')
        isZeroValues.value = true
        isChartDisplay.value = false
        image.value = '/images/people.jpg'
      } else {
        isZeroValues.value = false
        generateLabels(selectedPeriod)
        isChartDisplay.value = true
        nextTick(() => {
          renderChart()
        })
      }
    }else {
      isErrorFetchingData.value = true
      isChartDisplay.value = false
      image.value = '/images/people.png'
      notificationStore.addNotification('No data available for now', 'error')

    }
  })
    .catch((error)=>{{
      isErrorFetchingData.value = true
      isChartDisplay.value = false
      image.value = '/images/people.jpg'
      notificationStore.addNotification('No data available for now', 'error')

    }})
}


const getDeposits = (selectedPeriod: Period) => {
  data.value = []
  affiliateStore.getCommunityDeposits(selectedPeriod)
    .then(response => {
      if (response.data) {
        // console.log('Community!!', response.data)
        // response.data.map((deposit: Partial<Deposits>) => {
        //   lineData.value.datasets[0].data?.push(deposit.depositAmount as number)
        //   if (data.value?.every(value => value === 0)) {
        //     isChartDisplay.value = false
        //     isZeroValues.value = true
        //     image.value = '/images/statistics-savings.png'
        //   } else {
        //     isChartDisplay.value = true
        //     generateLabels(selectedPeriod)
        //   }
        // })
        for (let i = 0; i < response.data.length; i++) {
          lineData.value.datasets[0].data?.push(response.data[i].depositAmount)
        }
        console.log(lineData.value)
        if (
          lineData.value.datasets[0].data.every(
            (value: number)=> value === (0 as number),
          )
        ) {
          console.log('Checking for zeros')
          isZeroValues.value = true
          isChartDisplay.value = false
          image.value = '/images/statistics-savings.png'
        } else {
          isZeroValues.value = false
          generateLabels(selectedPeriod)
          isChartDisplay.value = true
          nextTick(() => {
            renderChart()
          })
        }
      }else {
        isErrorFetchingData.value = true
        isChartDisplay.value = false
        image.value = '/images/statistics-savings.png'
        notificationStore.addNotification('No data available for now', 'error')

      }
    })
    .catch((error)=>{{
      isErrorFetchingData.value = true
      isChartDisplay.value = false
      image.value = '/images/statistics-savings.png'
      notificationStore.addNotification('No data available for now', 'error')

    }})
}

const getEarnings = (selectedPeriod: Period) => {
  data.value = []
  affiliateStore.getCommunityEarnings(selectedPeriod)
    .then(response => {
      if (response.data) {
        for (let i = 0; i < response.data.length; i++) {
          lineData.value.datasets[0].data?.push(response.data[i].earningAmount)
        }
        console.log(lineData.value)
        if (
          lineData.value.datasets[0].data.every(
            (value: number)=> value === (0 as number),
          )
        ) {
          console.log('Checking for zeros')
          isZeroValues.value = true
          isChartDisplay.value = false
          image.value = '/images/statistics-earning.png'
        } else {
          isZeroValues.value = false
          generateLabels(selectedPeriod)
          isChartDisplay.value = true
          nextTick(() => {
            renderChart()
          })
        }
      }else {
        isErrorFetchingData.value = true
        isChartDisplay.value = false
        image.value = '/images/statistics-earning.png'
        notificationStore.addNotification('No data available for now', 'error')

      }
    })
    .catch((error)=>{{
      isErrorFetchingData.value = true
      isChartDisplay.value = false
      image.value = '/images/statistics-earning.png'
      notificationStore.addNotification('No data available for now', 'error')

    }})
}

const fetchCommunityAnalytics = (selectedPeriod: Period, activeTab: Tab) => {
  // lineGraphInstance.value?.destroy()
  lineData.value.datasets[0].data = []
  lineData.value.labels = []
  isErrorFetchingData.value = false
  isChartDisplay.value = false
  image.value = ''
  isZeroValues.value = false
  if (selectedPeriod && activeTab) {
    if (activeTab.label === 'Clicks') {
      getClicks(selectedPeriod)
    } else if (activeTab.label === 'Community') {
      getCommunity(selectedPeriod)
    } else if (activeTab.label === 'Deposits') {
      getDeposits(selectedPeriod)
    } else {
      getEarnings(selectedPeriod)
    }
  }
  return
}
watch(
  () => props,
  val => {
    if (val) {
      fetchCommunityAnalytics(val.selectedPeriod, val.activeTab)
      lineGraphInstance.value?.destroy()
      // renderChart()
    }
  },
  {
    deep: true,
  },
)
onMounted(() => {
  lineGraphInstance.value?.destroy()
  fetchCommunityAnalytics(props.selectedPeriod, props.activeTab)

})



</script>

<template>
  <div>
    <div v-if="isChartDisplay">
      <canvas ref="refLineGraph" width="300px" height="300px"></canvas>
    </div>
    <div v-else>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 300px"
      >
        <div class="d-flex flex-column align-items-center">
          <img
            :src="image"
            :alt="`${props.activeTab.label} image`"
            style="width: 250px"
          />
          <span v-if="isZeroValues && props.activeTab.label === 'Clicks'" class="text-gray-600 w-75 text-sm text-center"
          >You have no click count yet. Please generate affiliate link and share
          with your community to increase click count</span
          >
          <span v-if="isZeroValues && props.activeTab.label === 'Community'" class="text-gray-600 w-75 text-sm text-center"
          >You have no community count yet. Please generate affiliate link, share
          and ask your community to create Habahaba account</span
          >
          <span v-if="isZeroValues && props.activeTab.label === 'Deposits'" class="text-gray-600 w-75 text-sm text-center"
          >You have no deposits yet for your community. Please ask your community to activate their Habahaba account.       </span
          >
          <span v-if="isZeroValues && props.activeTab.label === 'Earning'" class="text-gray-600 w-75 text-sm text-center"
          >You have no click count yet. Please generate affiliate link and share
          with your community to increase click count</span
          >
          <span
            v-if="isErrorFetchingData"
            class="text-gray-600 w-75 text-sm text-center"
          >Opps! No relevant data. Please try again</span
          >
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
