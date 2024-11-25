<script lang="ts" setup></script>

<template>
  <div class="bg-habahaba-500">
    <RouterView #default="{ Component, route }">
      <Transition name="route" mode="out-in" appear>
          <component v-if="Component" :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
<!--    <keep-alive>-->
<!--      <router-view v-slot="{ Component }">-->
<!--        <component :is="Component" />-->
<!--      </router-view>-->
<!--    </keep-alive>-->
  </div>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(50%);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.route-leave-active,
.route-enter-active {
  transition: all 0.35s ease-out;
}
</style>
