<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { nextTick, onMounted, ref, watch } from 'vue'

const doughnutChart = ref<null | HTMLCanvasElement>(null)
let doughnutChartInstance:  Chart<'doughnut', number[], string>  | null = null

interface DataInterface {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    hoverOffset: number
  }[]
}

const props = defineProps<{
  chartData: DataInterface
  chartOptions: Record<string, unknown>
}>()

// just waiting for the DOM to be fully updated before the chartJs lib accesses the canvas element
const renderChart = async () => {
  await nextTick()
  if (doughnutChart.value) {
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
  <div style="width: 300px" class="">
    <canvas ref="doughnutChart"></canvas>
  </div>
</template>

<style scoped></style>
