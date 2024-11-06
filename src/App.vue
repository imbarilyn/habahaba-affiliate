<script setup lang="ts">
import ToastContainer from '@/components/toasts/ToastContainer.vue'
import ToastAlert from '@/components/toasts/ToastAlert.vue'
import { useNotificationsStore } from '@/stores/notificationStore'

const notificationsStore = useNotificationsStore()
</script>

<template>
  <div>
    <RouterView #default="{Component, route}">
      <template v-if="Component">
        <component :is="Component" :key="route.fullPath"/>
      </template>
    </RouterView>
    <teleport to="body">
      <ToastContainer v-if="notificationsStore.hasNotifications">
        <template v-for="notification in notificationsStore.getNotifications" :key="notification.id">
          <ToastAlert
            v-if="notification.id && notification.isShown"
            :id="notification.id"
            :is-shown="notification.isShown"
            :message="notification.message"
            :type="notification.type"
          />
        </template>
      </ToastContainer>
    </teleport>
  </div>
</template>

<style scoped>





</style>
