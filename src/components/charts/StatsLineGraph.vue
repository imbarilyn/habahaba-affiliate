<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import { Chart } from 'chart.js/auto'

const refLineGraph: Ref<HTMLCanvasElement | null> = ref(null)
const lineGraphInstance: Ref<Chart<'line', number[], string> | null> = ref(null)
const lineOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Community Savings Vs Affiliate Earning',
    },
    scales: {
      x: {
        display: true,
        text: 'Duration',
      },
      y: {
        display: true,
        text: 'Amount in Ksh',
      },
    },
  },
}

const renderChart = () => {
  if (refLineGraph.value) {
    lineGraphInstance.value = new Chart(refLineGraph.value, {
      type: 'line',
      data: lineData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
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

interface Earning {
  EarningAmount: number
  duration: string
}
const getEarnings = (selectedPeriod: Period) => {
  data.value = []
  affiliateStore.getCommunityEarnings(selectedPeriod)
    .then(response => {
      if (response.data) {
        // console.log('Community!!', response.data)
        // response.data.map((earning: Partial<Earning>) => {
        //   lineData.value.datasets[0].data?.push(earning.EarningAmount as number)
        //   if (data.value?.every(value => value === 0)) {
        //     isChartDisplay.value = false
        //     isZeroValues.value = true
        //     image.value = '/images/statistics-earning.png'
        //   } else {
        //     isChartDisplay.value = true
        //     generateLabels(selectedPeriod)
        //   }
        // })
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
  renderChart()
})

const lineData: Ref = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
</script>

<template>
  <div>
    <canvas ref="refLineGraph" width="300px" height="300px"></canvas>
  </div>
</template>

<style scoped></style>
