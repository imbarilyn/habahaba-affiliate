<script setup lang="ts">
import TransactionHistory from '@/components/TransactionHistory.vue'
import PayoutComponent from '@/components/AffiliateLinks.vue'
import PageUnderConstruction from '@/components/PageUnderConstruction.vue'
</script>

<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="container text-center">
<!--      <div class="py-2 sticky-top">-->
<!--        <p class="text-lg">My Account</p>-->
<!--      </div>-->
      <PageUnderConstruction />




      <!--      left side--'
      <div class="row d-flex">-->
      <!--        <div class="col-lg-4 col-12">-->
      <!--          &lt;!&ndash;        top&ndash;&gt;-->
      <!--          <div class="row gap-2">-->
      <!--            <div class="col bg-white smooth-rounded px-4 py-4">-->
      <!--              <div class="d-flex justify-content-between">-->
      <!--                <div class="d-flex align-items-end">-->
      <!--                  <span class="text-sm">Withdrawals</span>-->
      <!--                </div>-->
      <!--                <div-->
      <!--                  style="background-color: #d6feee; width: 40px; height: 40px"-->
      <!--                  class="rounded-circle d-flex justify-content-center align-items-center"-->
      <!--                >-->
      <!--                  <img-->
      <!--                    src="../../../public/images/balance.png"-->
      <!--                    style="width: 23px"-->
      <!--                  />-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="pt-4 d-flex">-->
      <!--                <span class="">Kes.</span>-->
      <!--                <p class="font-bold fs-4 d-flex align-content-end">7,924</p>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="col bg-white smooth-rounded px-4 py-4">-->
      <!--              <div class="d-flex justify-content-between">-->
      <!--                <div class="d-flex align-items-end">-->
      <!--                  <span class="text-sm">Total Revenue</span>-->
      <!--                </div>-->
      <!--                <div-->
      <!--                  style="background-color: #eed6fe; width: 40px; height: 40px"-->
      <!--                  class="rounded-circle d-flex justify-content-center align-items-center"-->
      <!--                >-->
      <!--                  <img-->
      <!--                    src="../../../public/images/money-in.png"-->
      <!--                    style="width: 25px"-->
      <!--                  />-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="pt-4 d-flex">-->
      <!--                <span class="">Kes.</span>-->
      <!--                <p class="font-bold fs-4 d-flex align-content-end">100,924</p>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          &lt;!&ndash;        bottom&ndash;&gt;-->
      <!--          <div class="mt-4 mb-4 mb-lg-0 smooth-rounded">-->
      <!--            <div class="px-2 pt-1">-->
      <!--              <p class="text-lg">Your overview history</p>-->
      <!--            </div>-->
      <!--            <div class="row linear-bg smooth-rounded py-lg-5 py-3 text-white">-->
      <!--              <div class="d-flex flex-column align-items-center">-->
      <!--                <div-->
      <!--                  class="bg-habahaba-100 rounded-circle d-flex justify-content-center align-items-center"-->
      <!--                  style="width: 60px; height: 60px"-->
      <!--                >-->
      <!--                  <span class="material-icons-round text-habahaba-900 fs-2">-->
      <!--                    wallet-->
      <!--                  </span>-->
      <!--                </div>-->
      <!--                <div class="pt-lg-4 pt-2">-->
      <!--                  <p class="text-md">Your Balance</p>-->
      <!--                </div>-->
      <!--                <div class="">-->
      <!--                  <span class="text-center d-lg-block text-lg">Kes. </span>-->
      <!--                  <span class="text-xl">69,000</span>-->
      <!--                </div>-->
      <!--                <div-->
      <!--                  class="btn bg-habahaba-100 w-75 mt-lg-3 mt-2 shadow-lg d-flex gap-2"-->
      <!--                >-->
      <!--                  <span class="material-icons text-habahaba-950 fw-500">-->
      <!--                    vertical_align_bottom</span-->
      <!--                  >-->
      <!--                  <span class="text-habahaba-950 fw-500">Withdraw</span>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        &lt;!&ndash;      right&ndash;&gt;-->

      <!--        <div class="col-lg-8 col-12">-->
      <!--&lt;!&ndash;          <p class="text-lg">My Receipt History </p>&ndash;&gt;-->
      <!--          <div class="bg-white smooth-rounded px-4 py-4 mt-4 mt-lg-0">-->
      <!--            <TransactionHistory />-->
      <!--&lt;!&ndash;            <PayoutComponent />&ndash;&gt;-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
.linear-bg {
  background-image: linear-gradient(20deg, #973915, #421708);
}

.centered-div {
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
