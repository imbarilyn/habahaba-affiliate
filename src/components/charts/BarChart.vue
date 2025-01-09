<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { nextTick, onMounted, type Ref, ref } from 'vue'
import { useAffiliateStore } from '@/stores'

const refBarGraph: Ref<HTMLCanvasElement | null> =
  ref<HTMLCanvasElement | null>(null)
const barGraphInstance = ref<Chart | null>(null)

const labels = ['Below 20', '20-29', '30-39', '40-49', '50-59', '60 and above']

const data = ref({
  labels: labels,
  datasets: [
    {
      label: 'Age Demography',
      data: [] as number[],
      backgroundColor: [
        'rgba(  250, 190, 119, 0.75)',
        'rgba(  250, 190, 119, 0.75)',
        'rgba(  250, 190, 119, 0.75)',
        'rgba(  250, 190, 119, 0.75)',
        'rgba(  250, 190, 119, 0.75)',
        'rgba(  250, 190, 119, 0.75)',
      ],
      borderColor: [
        'rgba(  250, 190, 119)',
        'rgba(  250, 190, 119)',
        'rgba(  250, 190, 119)',
        'rgba(  250, 190, 119)',
        'rgba(  250, 190, 119)',
        'rgba(  250, 190, 119)',
      ],
      borderWidth: 1,
      borderRadius: {
        topLeft: 5,
        topRight: 5,
      },
      barThickness: 30,
      hoverBackgroundColor: 'rgba(122, 49, 20, 0.75)',
      hoverBorderColor: 'rgba(122, 49, 20, 0.75)',
    },
  ],
})

const affiliateStore = useAffiliateStore()
const isZeroData = ref(false)
const isChartDisplay = ref(false)
const isErrorFetchingData = ref(false)

interface AgeData {
  ageRange: string
  number: number
}

const getAge = () => {
  affiliateStore
    .getAge()
    .then(response => {
      if (response.data) {
        response.data.map((item: AgeData) => {
          if (item.ageRange === 'Below 20')
            data.value.datasets[0].data[0] = item.number
          else if (item.ageRange === '20-29')
            data.value.datasets[0].data[1] = item.number
          else if (item.ageRange === '30-39')
            data.value.datasets[0].data[2] = item.number
          else if (item.ageRange === '40-49')
            data.value.datasets[0].data[3] = item.number
          else if (item.ageRange === '50-59')
            data.value.datasets[0].data[4] = item.number
          else {
            data.value.datasets[0].data[5] = item.number
          }
        })
        if (data.value.datasets[0].data.every(item => item === (0 as number))) {
          isZeroData.value = true
          isChartDisplay.value = false
          console.log('Zero values')
        } else {
          isZeroData.value = false
          isChartDisplay.value = true
          nextTick(() => {
            renderChart()
          })
        }
      } else{
        isErrorFetchingData.value = true
        isChartDisplay.value = false
      }
    })
    .catch(error => {
      isErrorFetchingData.value = true
      isChartDisplay.value = false
    })
}

const renderChart = () => {
  console.log('bar graph', data.value)
  if (barGraphInstance.value) {
    barGraphInstance.value?.destroy()
  }
  else{
  if (refBarGraph.value) {
    barGraphInstance.value = new Chart(refBarGraph.value, {
      type: 'bar',
      data: data.value,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    })
  }}
}
onMounted(() => {
  getAge()
})
</script>

<template>
  <div v-if="isChartDisplay">
    <canvas ref="refBarGraph"></canvas>
  </div>
  <div v-else class="d-flex align-items-center justify-content-center" style="height: 300px">
    <div class="d-flex flex-column align-items-center">
      <img
        src="/images/age.png"
        alt="community-photo"
        style="width: 300px"
      />
      <span v-if="isZeroData" class="text-gray-600 w-75 text-sm text-center pt-4">
        You have no community count yet for age information. Please generate
        affiliate link and share to create your own community.
      </span>
      <span
        v-if="isErrorFetchingData"
        class="text-gray-600 w-75 text-sm text-center"
      >Opps! No relevant data. Please try again</span
      >
    </div>
  </div>
</template>

<style scoped></style>
