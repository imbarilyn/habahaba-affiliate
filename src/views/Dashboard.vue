<script setup lang="ts">
import { ref, watch } from 'vue'
import AlertMessage from '@/components/AlertMessage.vue'
import { useAffiliateStore, useNotificationsStore } from '@/stores'
import DialogModal from '@/components/DialogModal.vue'
import { useRoute } from 'vue-router'

const affiliateStore = useAffiliateStore()
const notificationsStore = useNotificationsStore()
// slidding the navbar
const showSidebar = ref(false)
watch(showSidebar, val => {
  if (val) {
    document.body.classList.add('sidenav-toggled')
  } else {
    document.body.classList.remove('sidenav-toggled')
  }
})
const linkProps = {
  modalId: 'affiliateLink',
  title: 'Create your own affiliate link',
}

// show the dialogModal for the affiliate link generation
const showModal = ref(false)
watch(
  () => affiliateStore.openDialog.isOpen,
  val => {
    console.log('watching the val', val)
    if (val) {
      showModal.value = true
    } else {
      showModal.value = false
    }
  },
)

// Now generating the affiliate link
const showSpinner = ref(false)
const showCopyLink = ref(false)
const affiliateLink = ref('')
const generateLink = () => {
  console.log('generating link')
  showSpinner.value = true
  affiliateStore
    .getAffiliateLink()
    .then(resp => {
      console.log(resp.data)
      if (resp.result === 'ok') {
        console.log('Affiliate link!!', resp)
        showSpinner.value = false

        showCopyLink.value = true
        affiliateLink.value = resp.data
        console.log(affiliateLink.value)
      } else {
        notificationsStore.addNotification(
          'Error generating affiliate link',
          'error',
        )
      }
    })
    .catch(err => {
      console.log(err)
      notificationsStore.addNotification(
        'Error generating affiliate link',
        'error',
      )
    })
    .finally(() => {
      showSpinner.value = false
    })
}

const route = useRoute()
</script>

<template>
  <div class="nav-fixed">
    <nav
      class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
      id="sidenavAccordion"
    >
      <!-- Sidenav Toggle Button-->
      <button
        @click="showSidebar = !showSidebar"
        class="btn btn-icon btn-transparent-dark order-1 order-lg-0 mt-3 me-2 ms-lg-2 me-lg-0"
        id="sidebarToggle"
      >
        <span class="material-icons-outlined cursor-pointer"> menu </span>
      </button>
      <img
        src="../../public/images/habahaba-logo.png"
        style="width: 90px"
        class="navbar-brand mb-2 ms-4"
      />
      <!-- * * Note: * * Visible only on and above the lg breakpoint-->
      <form class="form-inline me-auto d-none d-lg-block me-3 ms-lg-10">
        <div class="input-group input-group-joined input-group-solid">
          <input
            class="form-control pe-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div class="input-group-text">
            <span class="material-icons-outlined" style="opacity: 0.5"
              >search</span
            >
          </div>
        </div>
      </form>
      <!-- Navbar Items-->
      <ul class="navbar-nav align-items-center ms-auto">
        <!-- Navbar Search Dropdown-->
        <!-- * * Note: * * Visible only below the lg breakpoint-->
        <li class="nav-item dropdown no-caret me-3 d-lg-none">
          <a
            class="btn btn-icon btn-transparent-dark outline-none rounded-circle dropdown-toggle"
            id="searchDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="material-icons-outlined" style="opacity: 0.5"
              >search</span
            ></a
          >
          <!-- Dropdown - Search-->
          <div
            class="dropdown-menu dropdown-menu-end p-3 shadow animated--fade-in-up"
            aria-labelledby="searchDropdown"
          >
            <form class="form-inline me-auto w-100">
              <div class="input-group input-group-joined input-group-solid">
                <input
                  class="form-control pe-0"
                  type="text"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-text">
                  <span class="material-icons-outlined opacity-75">search</span>
                </div>
              </div>
            </form>
          </div>
        </li>
        <!-- Alerts Dropdown-->
        <li
          class="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications"
        >
          <a
            class="btn btn-icon btn-transparent-dark dropdown-toggle rounded-circle"
            id="navbarDropdownAlerts"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ><span class="material-icons-outlined opacity-75">
              notifications
            </span></a
          >
          <div
            class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownAlerts"
          >
            <h6
              class="dropdown-header dropdown-notifications-header bg-habahaba-700"
            >
              <span class="material-icons-outlined opacity-75 fs-6 pe-2">
                notifications
              </span>
              Alerts Center
            </h6>
            <!-- Example Alert 1-->
            <AlertMessage />
          </div>
        </li>
        <!-- Messages Dropdown-->
        <li class="nav-item d-none d-sm-block me-3 dropdown-notifications">
          <a
            class="btn btn-icon btn-transparent-dark rounded-circle d-flex items-center justify-content-center"
            role="button"
            @click="affiliateStore.setOpenAffiliateDialog(true)"
            ><span class="material-icons-outlined rotate"> link </span></a
          >
        </li>
        <!-- User Dropdown-->
        <li class="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
          <a
            class="btn btn-icon btn-transparent-dark dropdown-toggle"
            id="navbarDropdownUserImage"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ><img
              class="img-fluid"
              src="../../public/illustrations/profiles/profile-1.png"
          /></a>
          <div
            class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownUserImage"
          >
            <h6 class="dropdown-header d-flex align-items-center">
              <img
                class="dropdown-user-img"
                src="../../public/illustrations/profiles/profile-1.png"
              />
              <div class="dropdown-user-details">
                <div class="dropdown-user-details-name">Valerie Luna</div>
              </div>
            </h6>
            <div class="dropdown dropdown-hover"></div>
            <a class="dropdown-item" href="#!">
              <div class="dropdown-item-icon">
                <span class="material-icons-outlined fs-5"> settings </span>
              </div>
              Setting
            </a>
            <a class="dropdown-item" href="#!">
              <div class="dropdown-item-icon">
                <span class="material-icons-outlined fs-5"> logout </span>
              </div>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
    <!--    Sidenav section-->
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav class="sidenav shadow-right sidenav-light bg-habahaba-950">
          <div class="sidenav-menu">
            <div class="pt-4 d-flex flex-column gap-4 ps-3">
              <div type="button" class="btn">
                <div class="d-flex gap-2">
                  <span
                    class="material-icons-round"
                    :class="[
                      route.name === 'overview'
                        ? 'text-habahaba-300'
                        : ' text-white',
                    ]"
                  >
                    grid_view
                  </span>
                  <span class="fw-medium text-white">Overview</span>
                </div>
              </div>
              <div
                type="button"
                class="btn dropdown d-flex justify-content-between"
              >
                <div class="nav-link-icon d-flex align-items-end gap-2">
                  <span class="material-icons-round text-habahaba-300">
                    bar_chart
                  </span>
                  <span class="text-white">Statistics</span>
                </div>
                <div class="sidenav-collapse-arrow">
                  <span class="material-icons-round text-white">
                    navigate_next
                  </span>
                </div>
              </div>
              <div
                type="button"
                class="btn dropdown d-flex justify-content-between"
              >
                <div class="nav-link-icon d-flex align-items-end gap-2">
                  <span class="material-icons-round text-habahaba-300">
                    wallet
                  </span>
                  <span class="text-white">Transactions</span>
                </div>
                <div class="sidenav-collapse-arrow">
                  <span class="material-icons-round text-white">
                    navigate_next
                  </span>
                </div>
              </div>
              <div
                type="button"
                class="btn dropdown d-flex justify-content-between"
              >
                <div class="nav-link-icon d-flex align-items-end gap-2">
                  <span class="material-icons-round rotate text-habahaba-300"> link </span>
                  <span class="text-white">Affiliate Links</span>
                </div>
                <div class="sidenav-collapse-arrow">
<!--                  <span class="material-icons-round text-white">-->
<!--                    navigate_next-->
<!--                  </span>-->
                </div>
              </div>
            </div>
          </div>
          <!-- Sidenav Footer-->
          <div class="bg-habahaba-200 rounded m-2 py-3">
            <div
              type="button"
              class="btn dropdown d-flex justify-content-between"
            >
              <div class="nav-link-icon d-flex align-items-center gap-2">
                <img
                  class="img-fluid w-25 rounded-circle"
                  src="../../public/illustrations/profiles/profile-1.png"
                />
                <span style="font-size: 14px">Valeria Luna</span>
              </div>
            </div>

          </div>
        </nav>
      </div>

      <div id="layoutSidenav_content">
        <RouterView #default="{ Component, route }">
          <Transition mode="out-in">
            <template v-if="Component">
              <component :is="Component" :key="route.fullPath" />
            </template>
          </Transition>
        </RouterView>
      </div>
    </div>
    <DialogModal
      :modal-id="linkProps.modalId"
      :title="linkProps.title"
      :show-modal="showModal"
      v-if="affiliateStore.openDialog.isOpen"
    >
      <template #body>
        <div>
          <p class="fs-6">Copy the link to share it with prospects</p>
          <div
            class="border py-2 px-2 d-flex justify-content-between w-full gap-2 rounded-pill"
          >
            <input
              v-model="affiliateLink"
              type="text"
              class="focus-control w-75 ps-2 border-0 focus-ring-rounded focus-ring-light ms-2"
              placeholder="https://habahaba.com/"
            />
            <div
              v-if="!showSpinner && !showCopyLink"
              @click="generateLink"
              type="button"
              class="btn btn-habahaba-500 d-flex justify-content-center align-items-center rounded-pill"
            >
              <span class="material-icons-outlined rotate"> link </span>
              <span class="text-nowrap">generate link</span>
            </div>
            <div
              v-if="showSpinner"
              class="d-flex align-items-center gap-2 btn btn-habahaba-100 rounded-pill"
              disabled
            >
              <span>generating...</span>
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <div
              v-if="showCopyLink"
              class="btn btn-habahaba-500 d-flex gap-2 rounded-pill"
            >
              <span class="material-icons-outlined fs-6"> content_copy </span>
              <span>copy</span>
            </div>
          </div>
        </div>
      </template>
    </DialogModal>
  </div>
</template>

<style scoped>
.rotate {
  transform: rotate(-45deg);
}
</style>
