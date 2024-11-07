<script setup lang="ts"></script>

<template>
  <main class="bg-habahaba-50 h-screen text-responsive">
    <div class="container-md row py-4 px-4">
      <!--      right side-->
      <div class="col-md-10 col-12 min-vh-100">
        <div class="ps-4">
          <div class="d-flex gap-2">
            <div class="relative">
              <img
                class="img-fluid rounded-circle"
                style="width: 50px"
                src="../../../public/illustrations/profiles/profile-1.png"
              />
            </div>
            <div class="d-flex flex-column justify-content-end">
              <span class="fs-6 fw-medium">Valeria Luna</span>
              <span class="fw-light">Hello, welcome back!</span>
            </div>
          </div>
          <div class="row py-4 gap-lg-4 gap-md-2 gap-4">
            <div
              class="col-md col-xs-12 bg-habahaba-950 smooth-rounded pt-4 px-4 max-w-80"
            >
              <div class="d-flex gap-2 pb-md-4">
                <span class="material-icons-round text-habahaba-300">
                  tips_and_updates
                </span>
                <span class="text-white">Updates</span>
              </div>
              <div class="text-white">
                <p>
                  Community portfolio increased by
                  <span class="text-habahaba-300">40%</span>
                </p>
              </div>
<!--              <div class="d-flex">-->
<!--                <p class="text-white">See Statistics</p>-->
<!--                <span class="material-icons-round text-white">-->
<!--                  navigate_next-->
<!--                </span>-->
<!--              </div>-->
            </div>
            <div class="col bg-white shadow-lg smooth-rounded p-4 ">
              <div class="d-flex align-items-end col-">
                <img
                  src="../../../public/images/community.png"
                  style="width: 50px"
                />
                <span class="">Community</span>
              </div>
              <div class="pt-4">
                <p class="fs-1">400</p>
              </div>
              <div>
                <p></p>
              </div>
            </div>
            <div class="col bg-white shadow-lg smooth-rounded p-4 max-w-80">
              <div class="d-flex gap-2 align-items-end">
                <img src="../../../money.png" style="width: 50px">
                <span class="">Revenue</span>
              </div>
              <div class="pt-4">
                <p class="fs-1">$1,245.67</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <p>Left side</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.smooth-rounded {
  border-radius: 20px;
}

/* Default font size for larger screens */
.text-responsive {
  font-size: 18px; /* Adjust as needed */
}

/* Smaller font size for small devices */
@media (max-width: 576px) {
  .text-responsive {
    font-size: 14px; /* Adjust for small devices */
  }
}
</style>
