<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { nextTick, onMounted, type Ref, ref } from 'vue'
import { useAffiliateStore, useAuthStore } from '@/stores'

const refPieGraph: Ref<HTMLCanvasElement | null> =
  ref<HTMLCanvasElement | null>(null)
const pieGraphInstance: Ref<Chart<'pie', number[], string> | null> = ref<Chart<
  'pie',
  number[],
  string
> | null>(null)

const labels = ['Female', 'Male', 'Other']

const data = ref({
  labels: labels,
  datasets: [
    {
      label: 'Gender Demography',
      data: [] as number[],
      backgroundColor: [
        'rgba(122, 182, 255, 1)',
        'rgba(  250, 190, 119, 1)',
        'rgba(195, 122, 255, 1)',
      ],
      hoverOffset: 4,
      borderWidth: 0,
    },
  ],
})

interface GenderData {
  gender: string
  number: number
}

const affiliateStore = useAffiliateStore()
const isZeroData = ref(false)
const isChartDisplay = ref(false)
const isErrorFetchingData = ref(false)
const getGenderData = () => {
  affiliateStore
    .getGender()
    .then(response => {
      console.log('Gender---', response)
      if (response.data) {
        response.data.map((item: GenderData) => {
          if (item.gender === 'Female') {
            data.value.datasets[0].data[0] = item.number
          } else if (item.gender === 'Male') {
            data.value.datasets[0].data[1] = item.number
          } else {
            data.value.datasets[0].data[2] = item.number
          }
        })
        if (data.value.datasets[0].data.every(item => item === (0 as number))) {
          isZeroData.value = true
          isChartDisplay.value = false
        } else {
          isZeroData.value = false
          isChartDisplay.value = true
          nextTick(() => {
            renderChart()
          })
        }
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

const renderChart = () => {
  console.log('Pie-chart', data.value)
  if (pieGraphInstance.value) {
    pieGraphInstance.value?.destroy()
  } else {
    if (refPieGraph.value) {
      pieGraphInstance.value = new Chart(refPieGraph.value, {
        type: 'pie',
        data: data.value,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 30,
              },
            },
          },
          layout: {
            padding: {
              top: 0,
              right: 10,
            },
          },
        },
      })
    }
  }
}

onMounted(() => {
  getGenderData()
})
</script>

<template>
  <div v-if="isChartDisplay">
    <canvas ref="refPieGraph"></canvas>
  </div>
  <div
    v-else
    class="d-flex align-items-center justify-content-center"
    style="height: 300px"
  >
    <div class="d-flex flex-column align-items-center">
      <img
        src="/images/people.png"
        alt="community-photo"
        style="width: 150px"
      />
      <span
        v-if="isZeroData"
        class="text-gray-600 w-75 text-sm text-center pt-4"
      >
        You have no community count yet for gender information. Please generate
        affiliate link and share to create your own community.
      </span>
      <span
        v-if="isErrorFetchingData"
        class="text-gray-600 pt-4 w-75 text-sm text-center"
        >Opps! No relevant data. Please try again</span
      >
    </div>
  </div>
</template>

<style scoped></style>
