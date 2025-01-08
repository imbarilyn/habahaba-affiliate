<script setup lang="ts">
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import CommunityAnalytics from '@/components/CommunityAnalytics.vue'
import { onMounted, ref } from 'vue'
import { useAffiliateStore } from '@/stores'
import moment from 'moment'

interface Highlight {
  bestPerformingDay: {
    createdAt: string
    amount: number
  }
  bestPerformingMonth: {
    createdAt: string
    amount: number
  }
}

const affiliateStore = useAffiliateStore()
const highlight = ref<Highlight>({
  bestPerformingDay: {
    createdAt: '',
    amount: 0,
  },
  bestPerformingMonth: {
    createdAt: '',
    amount: 0,
  },
})

const isError = ref(false)
const isData = ref(false)
onMounted(() => {
  affiliateStore
    .getHighlights()
    .then(resp => {
      console.log(resp.data)
      if (resp.data) {
        if (
          resp.data.bestPerformingDay.createdAt === null ||
          resp.data.bestPerformingMonth.createdAt === null
        ) {
          return (isData.value = false)
        } else {
          highlight.value.bestPerformingDay.createdAt = moment(
            resp.data.bestPerformingDay.createdAt,
            'YYYY-MM-DD',
          ).format('D dddd MMMM YYYY')
          highlight.value.bestPerformingDay.amount =
            resp.data.bestPerformingDay.amount
          highlight.value.bestPerformingMonth.createdAt = moment(
            resp.data.bestPerformingMonth.createdAt,
            'YYYY-MM-DD',
          ).format('MMM YYYY')
          highlight.value.bestPerformingMonth.amount =
            resp.data.bestPerformingMonth.amount
          isData.value = true
        }
      } else {
        isError.value = true
      }
    })
    .catch(err => {
      isError.value = true
    })
})
</script>

<template>
  <div class="container my-4">
    <!--    top side-->
    <div class="container">
      <div class="row gap-4">
        <div class="col-lg-8 col-12 smooth-rounded bg-white py-2">
          <p class="fs-5">Community Analytics</p>
          <CommunityAnalytics />
        </div>
        <div class="col-lg smooth-rounded linear-bg text-white p-3">
          <div>
            <p class="fs-5">Best Performance Highlights</p>
            <span class="d-block">Most outstanding happenings so far</span>
            <div class="d-flex pt-2">
              <span class="material-icons fs-lg-1 fs-3">
                tips_and_updates
              </span>
              <small class=""
                >You can achieve what ever you set your mind to achieving</small
              >
            </div>
          </div>
          <div class=" d-flex flex-column gap-4 pt-2 ">
            <div
              class="d-flex flex-column p-3 border border-habahaba-900 smooth-rounded p-lg-4 p-2"
            >
              <div>
                <p class="text-habahaba-950">Top earning Day</p>
              </div>
              <div class="d-flex gap-3" v-if="isData">
                <div>
                 <span class="material-icons fs-lg-1 fs-3 text-habahaba-950">emoji_events</span>
                </div>
                <div class="d-flex flex-column">
                  <span class="fs-6 text-habahaba-900 fw-400">{{
                    highlight.bestPerformingDay.createdAt
                  }}</span>
                  <span class="fs-4 text-habahaba-900"
                    >Ksh.
                    <span class="fw-500">{{
                      highlight.bestPerformingDay.amount
                    }}</span></span
                  >
                </div>
              </div>
              <div v-else-if="!isData" class="d-flex gap-3">
                <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-950">warning</span>
                <span class="text-habahaba-950">There is no data yet to compare, please generate the link, share and start earning</span>
              </div>
              <div v-else-if="isError" class="d-flex gap-3">
                <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-950">warning</span>
                <span class="text-habahaba-950">An error occurred kindly refresh the page</span>
              </div>
            </div>
            <div
              class="d-flex flex-column p-3 border border-habahaba-900 smooth-rounded p-lg-4 p-2"
            >
              <div>
                <p class="text-habahaba-950">Top earning month</p>
              </div>
              <div class="d-flex gap-3" v-if="isData">
                <div>
                  <span class="material-icons fs-lg-1 fs-3 text-habahaba-950">military_tech</span>
                </div>
                <div class="d-flex flex-column">
                  <span class="fs-6 text-habahaba-900 fw-400">{{
                      highlight.bestPerformingMonth.createdAt
                    }}</span>
                  <span class="fs-4 text-habahaba-900"
                  >Ksh.
                    <span class="fw-500">{{
                        highlight.bestPerformingMonth.amount
                      }}</span></span
                  >
                </div>
              </div>
              <div v-else-if="!isData" class="d-flex gap-3">
                <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-950">warning</span>
                <span class="text-habahaba-950">There is no data yet to compare, please generate the link, share and start earning</span>
              </div>
              <div v-else-if="isError" class="d-flex gap-3">
                <span class="material-icons-round fs-lg-1 fs-2 text-habahaba-950">warning</span>
                <span class="text-habahaba-950">An error occurred kindly refresh the page</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-4 gap-4">
        <div class="col-lg-4 col-12 bg-white smooth-rounded py-2">
          <p class="fs-5">Community Gender</p>
          <PieChart />
        </div>
        <div class="col-lg bg-white smooth-rounded py-2">
          <p class="fs-5">Community Age</p>
          <div>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.linear-bg {
  background-image: linear-gradient(340deg, #fabe77, #fabe77, #e66010);
}
</style>
