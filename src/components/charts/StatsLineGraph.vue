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
