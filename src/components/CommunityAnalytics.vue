<script setup lang="ts">
import { ref } from 'vue'
import StatsLineGraph from '@/components/charts/StatsLineGraph.vue'

export interface Tab {
  label: string
  position: number
  type: string
}

export interface Period {
  label: string
  id: number
  type: string
  name: string

}

const recordTab = [
  {
    label: 'Clicks',
    position: 1,
    type: 'tab'
  },
  {
    label: 'Community',
    position: 2,
    type: 'tab'
  },
  {
    label: 'Deposits',
    position: 3,
    type: 'tab'
  },
  {
    label: 'Earning',
    position: 4,
    type: 'tab'
  },
] as Tab[]

const activeTab = ref<Tab>(recordTab[0])
const periods = [
  {
    label: '7 days',
    id: 1,
    type: 'period',
    name: 'This week'

  },
  {
    label: '30 days',
    id: 2,
    type: 'period',
    name: 'This month'

  },
  {
    label: '12 months',
    id: 3,
    type: 'period',
    name: 'This year'
  }
] as  Period []

const selectedPeriod = ref<Period>(periods[0])

const handlePeriod = (id: number) =>{
  selectedPeriod.value = periods.find(period =>period.id === id) as Period
  console.log(selectedPeriod.value)
}

const setActiveTab = (position: number) => {
  activeTab.value = recordTab.find(tab => tab.position === position) as Tab


}
</script>

<template>
  <div>

  <div class="d-flex gap-lg-10 gap-2 flex-column-reverse flex-lg-row ">

    <nav
      class="position-relative d-flex row me-auto w-100 w-md-75 ms-1"
    >
      <div
        class="col-3 d-flex justify-content-center"
        v-for="tab in recordTab"
        :id="`tab-${tab.position}`"
        :key="tab.position"
      >
        <button
          @click="setActiveTab(tab.position)"
          class="btn btn-transparent bg-transparent border-0"
          :class="[
            activeTab.label === tab.label ? 'text-gray-900' : ' text-gray-600',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
      <div
        style="transition: all 0.35s ease"
        class="position-absolute bottom-0 transition-duration-300 border-top border-habahaba-500 border-2 px-2"
        :style="{
          left: ((activeTab.position - 1) / recordTab.length) * 100 + '%',
          width: (1 / recordTab.length) * 100 + '%',
        }"
      ></div>
    </nav>
    <div class="dropdown pe-3">
      <button class="btn btn-habahaba-900  text-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {{selectedPeriod.name}}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li  v-for="(period, index) in periods" :key="index" @click="handlePeriod(period.id)">
          <a class="dropdown-item">{{period.name}}</a>
        </li>
      </ul>
    </div>
  </div>
<!--    <StatsLineGraph />-->
  <StatsLineGraph :selected-period="selectedPeriod" :active-tab="activeTab" />
  </div>
</template>

<style scoped></style>
