<script setup lang="ts">
interface PayoutData {
  id: number
  date: string
  amount: number
  payId: string
  status: 'pending' | 'success'
}
const payoutData = [
  {
    id: 1,
    date: '2021-09-01',
    amount: 100,
    payId: 'SKE8PZRG5A',
    status: 'success',
  },
  {
    id: 2,
    date: '2021-09-01',
    amount: 100,
    payId: 'SKE8PZRG5A',
    status: 'success',
  },
  {
    id: 3,
    date: '2021-09-01',
    amount: 100,
    payId: 'SKE8PZRG5A',
    status: 'success',
  },
  {
    id: 4,
    date: '2021-09-01',
    amount: 100,
    payId: 'SKE8PZRG5A',
    status: 'pending',
  },
  {
    id: 5,
    date: '2021-09-01',
    amount: 100,
    payId: 'SKE8PZRG5A',
    status: 'pending',
  },
] as PayoutData[]
</script>

<template>
  <div class="payout-text">
    <div v-if="payoutData.length > 0">
      <div v-for="payout in payoutData" :key="payout.id">
        <div class="d-flex justify-content-between py-2 border-bottom">
          <div class="d-flex gap-2">
            <div
              class="bg-habahaba-100 rounded-circle d-flex justify-content-center align-items-center"
              style="width: 40px; height: 40px"
            >
              <span class="material-icons text-habahaba-800">
                mobile_screen_share
              </span>
            </div>
            <div class="d-flex flex-column">
              <span>Mpesa</span>
              <span class="text-small">{{ payout.date }}</span>
            </div>
          </div>
          <div class="d-flex flex-column">
            <span
              class="text-end"
              :class="[
                payout.status === 'success'
                  ? 'text-success'
                  : 'text-habahaba-900',
              ]"
              >{{ payout.status }}</span
            >
            <span class="text-small">{{ payout.payId }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex flex-column align-items-center justify-content-center">

        <img src="../../public/images/transaction.png" style="width: 30px" class="">


      <span class="text-gray-500">No available transactions</span>

    </div>
  </div>
</template>

<style scoped>
.payout-text {
  font-size: 15px;
}

.text-small {
  font-size: 12px;
  color: #6c757d;
}
</style>
