<script setup lang="ts">
import { nextTick, onMounted, type Ref, ref, reactive } from 'vue'
import { Chart } from 'chart.js/auto'
import { useAffiliateStore } from '@/stores'

interface Earning {
  duration: string
  amount: number
}

interface LineData {
  labels: string[]
  datasets: [
    {
      label: string
      data: number[]
      fill: true
      backgroundColor: string
      tension: number
      borderWidth: number
    },
  ]
}

const lineData = reactive({
  labels: [] as string[],
  datasets: [
    {
      label: 'Community Savings',
      data: [] as number[],
      fill: true,
      backgroundColor: 'rgba(  250, 190, 119, 0.75)',
      tension: 0.4,
      borderWidth: 1,
    },
    {
      label: 'Affiliate Earning',
      data: [] as number[],
      fill: true,
      backgroundColor: 'rgba(122, 49, 20, 0.75)',
      tension: 0.4,
      borderWidth: 1,
    },
  ],
})

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
const refLineGraph = ref<null | HTMLCanvasElement>(null)
const lineGraphInstance: Ref<Chart<'line', number[], string> | null> = ref(null)

const renderChart = async () => {
  if (lineGraphInstance.value) {
    lineGraphInstance.value.destroy()
  }

  if (refLineGraph.value) {
    lineGraphInstance.value = new Chart(
      refLineGraph.value as HTMLCanvasElement,
      {
        type: 'line',
        data: lineData as LineData,
        options: lineOptions,
      },
    )
  }
}

const affiliateStore = useAffiliateStore()

const selectLineChartTab = (tab: string) => {
  if (selectedLineChartTab.value === tab) {
    return
  } else {
    selectedLineChartTab.value = tab
    handleChartData()
  }
}

const isChartDisplay = ref(false)
const isErrorFetchingData = ref(false)
const isZeroValues = ref(false)

const checkZeroValues = () => {
  // console.log('lineData', lineData)
  const allZeros = lineData.datasets.every(dataset => {
    return dataset.data.every((item: number) => item === 0)
  })

  // console.log('allZeros', allZeros)
  if (allZeros) {
    isZeroValues.value = true
    isChartDisplay.value = false
  } else {
    isZeroValues.value = false
    isChartDisplay.value = true
    nextTick(() => {
      renderChart()
    })
  }
  // console.log('isZeros', isZeroValues.value)
  // console.log('isChartDisplay', isChartDisplay.value)
  // console.log('isErrorFetchingData', isErrorFetchingData.value)
}

const createChartLabel = (selectedTab: string) => {
  switch (selectedTab) {
    case 'daily':
      lineData.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      break
    case 'weekly':
      lineData.labels = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4']
      break
    default:
      lineData.labels = [
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
}
const handleChartData = () => {
  affiliateStore
    .getStatistics(selectedLineChartTab.value)
    .then(resp => {
      if (resp.data && lineData) {
        lineData.datasets[0].data = []
        lineData.datasets[1].data = []

        resp.data.affiliateEarning.map((item: Partial<Earning>) => {
          lineData?.datasets[0].data.push(item.amount as number)
        })

        resp.data.userEarning.forEach((item: Partial<Earning>) => {
          lineData?.datasets[1].data.push(item.amount as number)
        })
        createChartLabel(selectedLineChartTab.value)
        checkZeroValues()
      } else {
        isErrorFetchingData.value = true
        isChartDisplay.value = false
      }
    })
    .catch(error => {
      isErrorFetchingData.value = true
      isChartDisplay.value = false
    })
}

const lineChartTabs = ['daily', 'weekly', 'monthly'] as string[]
const selectedLineChartTab: Ref<string> = ref('daily')

onMounted(() => {
  handleChartData()
})
</script>

<template>
  <div class="d-flex gap-1 pb-3">
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
  <div v-if="isChartDisplay">
    <canvas ref="refLineGraph" height="130px"></canvas>
  </div>

  <div
    v-else
    class="d-flex justify-content-center pb-5 align-items-center"
    style="height: 300px"
  >
    <div class="d-flex flex-column align-items-center pt-md-10 pb-5 pb-md-0">
      <img
        src="/images/statistics-earning.png"
        alt="community-photo"
        class="img"
        :class="[isErrorFetchingData ? 'pt-md-5 pb-md-3 ' : '']"
      />
      <span
        v-if="isZeroValues"
        class="text-gray-600 pt-md-4 pb-5 pb-md-0 w-75 text-sm text-center"
      >
        You have no earnings yet to compare. Please generate the affiliate link
        and share with your community to start earning
      </span>
      <span v-if="isErrorFetchingData" class="text-gray-600 text-sm"
        >Opps! No relevant data. Please try to refresh the page</span
      >
    </div>
  </div>
</template>

<style scoped>
.btn-no-hover:hover {
  background-color: inherit !important;
}

.img {
  width: 250px;
}
</style>
