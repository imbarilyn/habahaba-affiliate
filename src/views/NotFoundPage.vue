<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
 router.push({
   name: 'overview'
 })

}
</script>

<template>
  <div class="bg-habahaba-200 d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="container text-center">
      <div>
        <img alt="404 error" class="w-25" src="/images/page-not-found.png" />
        <div class="mt-4">
          <h1 class="fw-bold">Page not found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" @click="goBack">Go back home</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
