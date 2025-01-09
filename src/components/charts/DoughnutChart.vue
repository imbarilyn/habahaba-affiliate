<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import {nextTick, onMounted, ref, watch, type Ref } from 'vue'

const doughnutChart = ref<null | HTMLCanvasElement>(null)
const doughnutChartInstance:  Ref<Chart<'doughnut', number[], string>  | null> = ref(null)

const props = defineProps<{
  data: number[],
  isError: boolean
}>()

const isChartDisplay = ref(false)
const isAllZeros = ref(false)

// const doughnutOptions = {
//   responsive: true,
//   cutout: '75%',
//   radius: '53%',
//   plugins: {
//     legend: {
//       display: true,
//       position: 'bottom',
//       align: 'center',
//       padding: 20,
//
//       labels: {
//         usePointStyle: true,
//         pointStyle: 'rounded',
//         boxWidth: 20,
//         borderRadius: 10,
//         pointSize: 20,
//       },
//     },
//   },
// }

const doughnutData = ref({
  labels: ['Click', 'Users', 'Active users'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [] as number[],
      backgroundColor: [
        'rgba(122, 182, 255, 1)',
        'rgba(  250, 190, 119, 1)',
        'rgba(195, 122, 255, 1)',

      ],
      borderWidth: 6,
    },
  ],
})
const checkZeros = ()=>{
 isAllZeros.value =  props.data.every(item => item === 0)
  if(isAllZeros.value || props.isError){
    isChartDisplay.value = false
  } else{
    isChartDisplay.value = true
    doughnutData.value.datasets[0].data = props.data
    nextTick(()=>{
      renderChart()
    })

  }
}

// just waiting for the DOM to be fully updated before the chartJs lib accesses the canvas element
const renderChart = async () => {
  if(isZeros.value  || props.isError){
    isChartDisplay.value = false
  } else{
  await nextTick()
  if (doughnutChart.value ) {
    isChartDisplay.value = true
    doughnutChartInstance = new  Chart<'doughnut', number[], string>(
      doughnutChart.value as HTMLCanvasElement,
      {
        type: 'doughnut',
        data: props.chartData,
        options: props.chartOptions
      },
    )
  }
  }
}

// create the chart when the component is mounted
onMounted(() => {
  renderChart()
})

// If the props get to change then update the chart
watch(
  () => props.chartData,
  value => {
    if (doughnutChartInstance) {
      doughnutChartInstance.data = value
      doughnutChartInstance.update()
    }
  },
)
</script>

<template>
  <div>
    <span class="text-responsive d-flex justify-content-center border-bottom p-3">Total View Performance</span>
    <div v-if="!isChartDisplay">
      <div
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
            v-if="isZeros"
            class="text-gray-600 w-75 text-sm text-center pt-4"
          >
        You have no community count yet for performance analysis. Please generate
        affiliate link and share to create your own community.
      </span>
          <span
            v-if="isError"
            class="text-gray-600 pt-4 w-75 text-sm text-center"
          >Opps! No relevant data. Please try again</span
          >
        </div>
      </div>

    </div>
    <div v-else>
      <canvas ref="doughnutChart"  width="100%" height="30"></canvas>
    </div>
  </div>
</template>

<style scoped>

</style>
