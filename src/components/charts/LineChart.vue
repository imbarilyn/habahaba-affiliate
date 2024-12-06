<script setup lang="ts">
import { onMounted, type Ref, ref, watch } from 'vue'
import { Chart } from 'chart.js/auto'


// export interface DataInterface {
//   labels: string[]
//   datasets: {
//     label: string
//     data: number[]
//     borderColor?: string
//     backgroundColor: string
//     tension: number
//     fill: boolean
//   }[]
// }
// const props = defineProps<{
//   lineData: DataInterface
//   lineOptions: Record<string, unknown>
// }>()

interface EachData {
  duration: string
  amount: number
}
interface LineGraphData {
  userEarning: {
    duration: string
    amount: number
  }
  affiliateEarning: {
    duration: string
    amount: number
  }
}

const props = defineProps<{
  lineGraphData: LineGraphData,
  labels: string[]
}>()



console.log(props.lineGraphData)
// const lineData: Ref = ref({
//   labels: props.labels,
//   datasets: [
//     {
//       label: 'Community Savings',
//       data: [4,5,1,10,32,2,12],
//       fill: true,
//       backgroundColor: 'rgba(  250, 190, 119, 0.75)',
//       tension: 0.4,
//       borderWidth: 1
//       // borderColor: 'rgba(  250, 190, 119, 0.75)'
//       // 250, 190, 119
//       // 254, 238, 214,
//     },
//     {
//       label: 'Affiliate Earning',
//       data: [12,3,24,7,6,1],
//       fill: true,
//       backgroundColor: 'rgba(122, 49, 20, 0.75)',
//       tension: 0.4,
//       borderWidth: 1
//       // borderColor: 'rgba(122, 49, 20, 0.75)'
//
//     }
//   ]
// })

const lineOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Community Savings Vs Affiliate Earning'
    },
    scales: {
      x: {
        display: true,
        text: 'Duration'
      },
      y: {
        display: true,
        text: 'Amount in Ksh'
      }
    }
  }
}

// const setGradient = (canvas: HTMLCanvasElement, color: string)=>{
//   // get the rendering context which is a 2D context which acn also be webgl, webgl2, webgpu or bitmaprenderer if it does not exist it returns null
//   const ctx = canvas.getContext('2d')
//   if(ctx){
//     const gradient = ctx.createLinearGradient(0, 0, 0, 400)
//     gradient.addColorStop(0, color)
//     gradient.addColorStop(0.5, color)
//     gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
//     console.log(gradient)
//     return gradient as unknown as string
//   }
//   return color
// }
const refLineGraph = ref<null | HTMLCanvasElement>(null)
const  lineGraphInstance: Ref<Chart<'line', number[], string> | null >= ref(null)

const renderChart = async () => {
  if (refLineGraph.value) {
    const colors = ['rgba(  250, 190, 119, 0.75)', 'rgba(122, 49, 20, 0.75)']
    // const amount = Object.values(props.lineGraphData).map((data) => data.amount)
    // console.log(props.lineGraphData.affiliateEarning)
    let amountUserEarning: number[] = []
    let amountAffiliateEarning: number[] = []
    Object.entries(props.lineGraphData).map(([key, data])=>{
     if(key === 'userEarning') {
       amountUserEarning = data.map((d:  EachData ) => d.amount)
     }
     else{
       amountAffiliateEarning = data.map((d:  EachData ) => d.amount)
     }
    })
    const lineData = {
        labels: props.labels,
        datasets: [
          {
            label: 'Community Savings',
            data: amountUserEarning,
            fill: true,
            backgroundColor: colors[0],
            tension: 0.4,
            borderWidth: 1
          },
          {
            label: 'Affiliate Earning',
            data:  amountAffiliateEarning,
            fill: true,
            backgroundColor: colors[1],
            tension: 0.4,
            borderWidth: 1

          }
        ]
      }
      lineGraphInstance.value = new Chart(refLineGraph.value as HTMLCanvasElement, {
        type: 'line',
        data: lineData,
        options: lineOptions
      })

  }
}

watch(
  () => props.labels && props.lineGraphData,
  value => {
    if(value){
      if (lineGraphInstance.value) {
        lineGraphInstance.value.destroy();
        renderChart()
      }
    }
  },
  {
    deep: true
  }
)

onMounted(()  => {
  console.log(props.lineGraphData)
  renderChart()
})
</script>

<template>
  <div class="">
    <canvas ref="refLineGraph" ></canvas>
  </div>
</template>

<style scoped></style>
