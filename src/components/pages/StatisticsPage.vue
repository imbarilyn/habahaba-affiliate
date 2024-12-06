<script setup lang="ts">
import StatsLineGraph from '@/components/charts/StatsLineGraph.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
</script>

<template>
  <div class="container my-4" >
    <!--    top side-->
    <div class="container">
      <div class="row gap-4">
        <div class="col-lg-8 col-12 smooth-rounded bg-white py-2">
          <p class="fs-5">Community Analytics</p>
          <Breadcrumbs />
          <StatsLineGraph />
        </div>
        <div class="col-lg smooth-rounded linear-bg text-white p-3">
          <div>
            <p class="fs-5">Feb Highlights</p>
            <span class="d-block">Most outstanding happenings for the month</span>
            <div class="d-flex gap-2 pt-2">
              <span class="material-icons fs-lg-1 fs-3"> tips_and_updates </span>
              <small class=""
              >You can achieve what ever you set your mind to achieving</small
              >
            </div>
          </div>
          <div class="pt-2">
            <div class="border border-habahaba-900 smooth-rounded p-lg-4 p-2 ">
              <p class="fs-6">Total Earnings</p>
              <p class="fs-4 fw-">Ksh 200,000</p>
            </div>
            <div class="border border-habahaba-900 smooth-rounded p-lg-4 p-2 mt-2">
              <p class="fs-6">Total Earnings</p>
              <p class="fs-4">Ksh 200,000</p>
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
          <p class="fs-5">Community Age </p>
          <div>
            <BarChart  />
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
