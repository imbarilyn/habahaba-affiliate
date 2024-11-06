<script lang="ts" setup>
import BannerToast from '@/components/BannerToast.vue'
import { bannerAlertContainer } from '@/alertConfig'
const closeBanner = ()=>{
  console.log('closing the banner')
  window.location.reload()
}
</script>

<template>
  <div class="container">
    <RouterView #default="{ Component, route }">
      <Transition name="route" mode="out-in" appear>
        <template v-if="Component">
          <component :is="Component" :key="route.fullPath" />
        </template>
      </Transition>
    </RouterView>

    <div v-for="(alert, index) in bannerAlertContainer" :key="index" id="banner">
      <BannerToast :type="alert.type" :message="alert.message" @close="closeBanner" />
    </div>

  </div>

</template>

<style scoped>
.route-leave-active,
.route-enter-active {
  transition: all 0.35s ease-out;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(50%);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>
