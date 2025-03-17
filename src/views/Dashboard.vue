<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  useAffiliateStore,
  useAuthStore,
  useNotificationsStore,
  useTabStore,
} from '@/stores'
import DialogModal from '@/components/DialogModal.vue'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import whatsapp  from '/images/whatsapp.png'
import facebook from  '/images/facebook.png'
import twitter from '/images/twitter.png'
import email from '/images/email3.png'
import linkedin from '/images/linkedin.png'
import {shareToSocials} from '@/modules/share'
import { showAlert } from '@/modules/popup'




const affiliateStore = useAffiliateStore()
const authStore = useAuthStore()
const tabStore = useTabStore()
const router = useRouter()

// slidding the navbar
const showSidebar = ref(false)
watch(showSidebar, val => {
  // alert(val)
  if (val) {
    document.body.classList.add('sidenav-toggled')
  } else {
      document.body.classList.remove('sidenav-toggled')

  }
})


const socialIcons = [
  {
    name: 'facebook',
    image: facebook

  },
  {
    name: 'twitter',
    image: twitter
  },
  {
    name: 'whatsapp',
    image: whatsapp
  },
  {
    name: 'linkedin',
    image: linkedin
  },
  {
    name: 'email',
    image: email
  },
]
const notificationsStore = useNotificationsStore()

const linkProps = {
  modalId: 'affiliateLink',
  title: 'Create your own affiliate link',
}

// Now generating the affiliate link
const showSpinner = ref(false)
const showCopyLink = ref(false)
const affiliateLink = ref('')

// affiliate link generation
const generateLink = () => {
  console.log('generating link')
  showSpinner.value = true
  affiliateStore
    .generateAffiliateLink()
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
    .catch(() => {
      // console.log(err)
      notificationsStore.addNotification(
        'Error generating affiliate link',
        'error',
      )
    })
    .finally(() => {
      showSpinner.value = false
    })
}

const handelCloseModal = (value: boolean) => {
  console.log(value)
  affiliateStore.setOpenAffiliateDialog(value)
}

const isLinkCopied = ref(false)
const copyAffiliateLink = () => {
  if (!navigator.clipboard) {
    alert('Your browser does not support clipboard')
  } else {
    isLinkCopied.value = true
    navigator.clipboard.writeText(affiliateLink.value)
  }
}

// create affiliate link
const createLink= ()=>{
  affiliateStore.setOpenAffiliateDialog(true)
  tabStore.setActiveTab('createLink')
}

const logOut = ()=>{
  // alert('Logging out')
  authStore.logout()
  router.push({name: 'user-login'})
}

const handleStatistic = ()=>{
  if(tabStore.activeTab === 'statistics') return
  tabStore.setActiveTab('statistics')
  affiliateStore.setAppIsFetching(true)
  setTimeout(async () =>{
    affiliateStore.setAppIsFetching(false)
    await router.push({name: 'statistics'})
    // alert('Hello done!!')
  }, 1000)
}

const handleOverview = ()=>{
  if(tabStore.activeTab === 'overview') return
  tabStore.setActiveTab('overview')
  affiliateStore.setAppIsFetching(true)
  setTimeout(async ()=>{
    affiliateStore.setAppIsFetching(false)
    await router.push({name: 'overview'})
  }, 1000)
}

const handleTransaction = ()=>{
  if(tabStore.activeTab === 'transactions') return
  tabStore.setActiveTab('transactions')
  affiliateStore.setAppIsFetching(true)
  setTimeout(async()=>{
    affiliateStore.appIsFetching =false
    await router.push({name: 'transactions'})
  }, 1000)
}


const shareLink = (social: string, link:string) =>{
  shareToSocials(social, link)
}


const deletePhone = ref('')
const deleteContact = () =>{
  console.log(deletePhone.value)
  affiliateStore.deleteContact(deletePhone.value as string)
    .then(resp=>{
      console.log(resp)
      if(resp.result !=='fail'){
        showAlert({
          type: 'success',
          message: 'Contact deleted successfully'
        })
        // notificationsStore.addNotification('Contact deleted successfully', 'success')
      }
      else{
        showAlert({
          type: 'error',
          message: 'Error deleting contact'
        })
        // notificationsStore.addNotification('Error deleting contact', 'error')
      }
    })
    .catch(()=>{
      showAlert({
        type: 'error',
        message: 'Error deleting contact'
      })
      // notificationsStore.addNotification('Error deleting contact', 'error')
    })
    .finally(()=>{
     handelCloseContactModal()
    })

}
const isDeleteContact = ref(false)
const openDeleteContact = ()=>{
  isDeleteContact.value = true
}

const handelCloseContactModal = ()=>{
  isDeleteContact.value = false
}
</script>

<template>
  <div class="nav-fixed overflow-x-hidden">
    <nav
      class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
      id="sidenavAccordion"
    >
      <!-- Sidenav Toggle Button-->

      <button
        class="btn btn-icon btn-transparent order-1  d-lg-none border-0  order-lg-0 me-2 ms-lg-2 me-lg-0 pt-3"
        id="sidebarToggle" @click="showSidebar = !showSidebar"
      >
        <span class="material-icons-outlined fs-6 text-gray-600"> menu </span>
      </button>
      <div class="pb-3 ps-4">
        <img
          class="navbar-brand navbar-brand me-10"
          src="/images/habahaba-logo.png"
          style="width: 100px; height: 45px"
        />
      </div>

      <!-- Navbar Search Input-->
      <!-- * * Note: * * Visible only on and above the lg breakpoint-->
      <form class="form-inline me-auto d-none d-lg-block ms-4 me-3">
        <div class="input-group input-group-joined input-group-solid">
          <input
            class="form-control pe-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div class="input-group-text">
            <span class="material-icons-outlined text-gray-600"> search </span>
          </div>
        </div>
      </form>
      <!-- Navbar Items-->
      <ul class="navbar-nav align-items-center ms-auto">
        <li class="nav-item dropdown no-caret me-3 d-lg-none">
          <a
            class="btn btn-icon btn-transparent-dark dropdown-toggle"
            id="searchDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="material-icons-outlined text-gray-600">
              search
            </span></a
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
                  <i data-feather="search"></i>
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
            class="btn btn-icon btn-transparent-dark border-0 dropdown-toggle rounded-circle"
            id="navbarDropdownAlerts"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="material-icons-outlined"> notifications </span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownAlerts"
          >

            <h6
              class="dropdown-header dropdown-notifications-header bg-habahaba-300"
            >
              <span class="material-icons-outlined text-habahaba-950 me-2">
                notifications
              </span>
              <span class="text-habahaba-950">Alerts Center</span>
            </h6>
            <!-- Example Alert 1-->
            <a class="dropdown-item dropdown-notifications-item" href="#!">
              <div class="dropdown-notifications-item-icon bg-warning">
                <i data-feather="activity"></i>
              </div>
              <div class="dropdown-notifications-item-content">
                <div class="dropdown-notifications-item-content-details">
                  December 29, 2021
                </div>
                <div class="dropdown-notifications-item-content-text">
                  This is an alert message. It's nothing serious, but it
                  requires your attention.
                </div>
              </div>
            </a>
            <!-- Example Alert 2-->
            <a class="dropdown-item dropdown-notifications-item" href="#!">
              <div class="dropdown-notifications-item-icon bg-info">
                <i data-feather="bar-chart"></i>
              </div>
              <div class="dropdown-notifications-item-content">
                <div class="dropdown-notifications-item-content-details">
                  December 22, 2021
                </div>
                <div class="dropdown-notifications-item-content-text">
                  A new monthly report is ready. Click here to view!
                </div>
              </div>
            </a>
            <!-- Example Alert 3-->
            <a class="dropdown-item dropdown-notifications-item" href="#!">
              <div class="dropdown-notifications-item-icon bg-danger">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <div class="dropdown-notifications-item-content">
                <div class="dropdown-notifications-item-content-details">
                  December 8, 2021
                </div>
                <div class="dropdown-notifications-item-content-text">
                  Critical system failure, systems shutting down.
                </div>
              </div>
            </a>
            <!-- Example Alert 4-->
            <a class="dropdown-item dropdown-notifications-item" href="#!">
              <div class="dropdown-notifications-item-icon bg-success">
                <i data-feather="user-plus"></i>
              </div>
              <div class="dropdown-notifications-item-content">
                <div class="dropdown-notifications-item-content-details">
                  December 2, 2021
                </div>
                <div class="dropdown-notifications-item-content-text">
                  New user request. Woody has requested access to the
                  organization.
                </div>
              </div>
            </a>
            <a class="dropdown-item dropdown-notifications-footer" href="#!"
              >View All Alerts</a
            >
          </div>
        </li>
        <!--       Create Link-->
        <li class="nav-item d-none d-sm-block me-3">
          <a
            @click="createLink"
            class="btn btn-icon btn-transparent-dark border-0 rounded-circle d-flex justify-content-center align-content-center"
            ><span class="material-icons-outlined rotate"> link </span></a
          >
        </li>
        <!-- User Dropdown-->
        <li class="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
          <a
            class="btn btn-icon btn-transparent-dark dropdown-toggle rounded-circle"
            id="navbarDropdownUserImage"
            href="javascript:void(0);"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ><img
              class="img-fluid rounded-circle"
              src="/illustrations/profiles/profile-1.png"
          /></a>
          <div
            class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownUserImage"
          >
            <h6 class="dropdown-header d-flex align-items-center">
              <img
                class="dropdown-user-img rounded-circle"
                src="/illustrations/profiles/profile-1.png"
              />
              <div class="dropdown-user-details">
                <div class="dropdown-user-details-name dropdown-user-details">
                  {{ authStore.getUserInfo()?.username }}
                </div>
              </div>
            </h6>
            <a class="dropdown-item">
              <div class="dropdown-item-icon">
                <span class="material-icons-outlined fs-5 text-gray-600">
                  settings
                </span>
              </div>
              Account
            </a>
            <a class="dropdown-item curso" @click="logOut">
              <div class="dropdown-item-icon">
                <span class="material-icons-outlined fs-5 text-gray-600">
                  logout
                </span>
              </div>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>

    <!--    Side-nav-->
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav class="sidenav shadow-right sidenav-light bg-habahaba-900">
          <div class="sidenav-menu">
            <div class="nav accordion" id="accordionSidenav">
              <!-- Sidenav Menu Heading (Account)-->
              <!-- * * Note: * * Visible only on and above the sm breakpoint-->
              <div class="sidenav-menu-heading">Menu</div>
              <!-- Sidenav Link (Alerts)-->
              <!-- * * Note: * * Visible only on and above the sm breakpoint-->
              <a class="nav-link d-sm-none" href="#!">
                <div class="nav-link-icon">
                  <span class="material-icons nav-link-icon fs-5">
                    notifications
                  </span>
                </div>
                Alerts
                <span class="badge bg-warning-soft text-habahaba-300 ms-auto"
                  >4 New!</span
                >
              </a>
              <!-- Sidenav Link (Messages)-->
              <!-- * * Note: * * Visible only on and above the sm breakpoint-->
              <div @click="createLink" :class="[[tabStore.activeTab === 'createLink'? 'bg-habahaba-800 rounded-pill mx-1 ': '']]">
              <a class="nav-link d-sm-none  border-0" href="#!">

                  <span class="material-icons rotate nav-link-icon fs-5" :class="[tabStore.activeTab === 'createLink'? 'text-habahaba-300': '']">link</span>

               <span>Create Link</span>
              </a>

              </div>
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseDashboards"
                aria-expanded="false"
                aria-controls="collapseDashboards"
                @click='handleOverview'
                :class="[[tabStore.activeTab === 'overview'? 'bg-habahaba-800 rounded-pill mx-1 ': '']]"
              >
                <div class="nav-link-icon">
                  <span class="material-icons-round nav-link-icon fs-5" :class="[tabStore.activeTab === 'overview'? 'text-habahaba-300': '']">
                    grid_view
                  </span>
                </div>
                Overview
                <!--                <div class="sidenav-collapse-arrow">-->
                <!--                  <i class="fas fa-angle-down"></i>-->
                <!--                </div>-->
              </a>
              <!-- Sidenav Heading (Custom)-->
              <!--              <div class="sidenav-menu-heading"></div>-->
              <!-- Sidenav Accordion (Pages)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"

                @click="handleStatistic"
                :class="[[tabStore.activeTab === 'statistics'? 'bg-habahaba-800 rounded-pill mx-1 ': '']]"
              >
                <div class="nav-link-icon">
                  <span class="material-icons-round nav-link-icon fs-5" :class="[tabStore.activeTab === 'statistics'? 'text-habahaba-300': '']">
                    bar_chart
                  </span>
                </div>
                Statistics
              </a>

              <!-- Sidenav Accordion (Applications)-->
<!--              <a-->
<!--                class="nav-link collapsed"-->
<!--                href="javascript:void(0);"-->
<!--                data-bs-toggle="collapse"-->
<!--                data-bs-target="#collapseApps"-->
<!--                aria-expanded="false"-->
<!--                aria-controls="collapseApps"-->
<!--                @click="tabStore.setActiveTab('reports')"-->
<!--                :class="[[tabStore.activeTab === 'reports'? 'bg-habahaba-800 rounded-pill mx-1 ': '']]"-->
<!--              >-->
<!--                <div class="nav-link-icon">-->
<!--                  <span class="material-icons-round nav-link-icon fs-5" :class="[tabStore.activeTab === 'reports'? 'text-habahaba-300': '']">-->
<!--                    summarize-->
<!--                  </span>-->
<!--                </div>-->
<!--                Reports-->
<!--                <div class="sidenav-collapse-arrow">-->
<!--                  <span class="material-icons-round fs-4"> expand_more </span>-->
<!--                </div>-->
<!--              </a>-->
<!--              <div-->
<!--                class="collapse"-->
<!--                id="collapseApps"-->
<!--                data-bs-parent="#accordionSidenav"-->
<!--              >-->
<!--                <nav-->
<!--                  class="sidenav-menu-nested nav accordion"-->
<!--                  id="accordionSidenavAppsMenu"-->
<!--                >-->
<!--                  &lt;!&ndash; Nested Sidenav Accordion (Apps -> Knowledge Base)&ndash;&gt;-->
<!--                  <a-->
<!--                    class="nav-link collapsed"-->
<!--                    href="javascript:void(0);"-->
<!--                    data-bs-toggle="collapse"-->
<!--                    data-bs-target="#appsCollapseKnowledgeBase"-->
<!--                    aria-expanded="false"-->
<!--                    aria-controls="appsCollapseKnowledgeBase"-->
<!--                  >-->
<!--                    Daily-->
<!--                  </a>-->

<!--                  <a-->
<!--                    class="nav-link collapsed"-->
<!--                    href="javascript:void(0);"-->
<!--                    data-bs-toggle="collapse"-->
<!--                    data-bs-target="#appsCollapseUserManagement"-->
<!--                    aria-expanded="false"-->
<!--                    aria-controls="appsCollapseUserManagement"-->
<!--                  >-->
<!--                    Weekly-->
<!--                  </a>-->
<!--                  <a-->
<!--                    class="nav-link collapsed"-->
<!--                    href="javascript:void(0);"-->
<!--                    data-bs-toggle="collapse"-->
<!--                    data-bs-target="#appsCollapsePostsManagement"-->
<!--                    aria-expanded="false"-->
<!--                    aria-controls="appsCollapsePostsManagement"-->
<!--                  >-->
<!--                    Monthly-->
<!--                    <div class="sidenav-collapse-arrow">-->
<!--                      <i class="fas fa-angle-down"></i>-->
<!--                    </div>-->
<!--                  </a>-->
<!--                </nav>-->
<!--              </div>-->
              <!-- Sidenav Accordion (Flows)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFlows"
                aria-expanded="false"
                aria-controls="collapseFlows"

                @click="handleTransaction"
                :class="[[tabStore.activeTab === 'transactions'? 'bg-habahaba-800 rounded-pill mx-1 ': '']]"
              >
                <div class="nav-link-icon">
                  <span class="material-icons-round nav-link-icon fs-5" :class="[tabStore.activeTab === 'transactions'? 'text-habahaba-300': '']">
                    wallet
                  </span>
                </div>
                Transactions
<!--                <div class="sidenav-collapse-arrow">-->
<!--                  <span class="material-icons-round fs-4"> expand_more </span>-->
<!--                </div>-->
              </a>
<!--              <div-->
<!--                class="collapse"-->
<!--                id="collapseFlows"-->
<!--                data-bs-parent="#accordionSidenav"-->
<!--              >-->
<!--                <nav class="sidenav-menu-nested nav">-->
<!--                  <a class="nav-link" href="#">Payment Options</a>-->
<!--                  <a class="nav-link" href="#">Statements</a>-->
<!--                </nav>-->
<!--              </div>-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
                @click="createLink"
                :class="[[tabStore.activeTab === 'viewLink'? 'bg-habahaba-800 rounded-pill mx-1 ': '']]"
              >
                <div class="nav-link-icon">
                  <span class="material-icons rotate nav-link-icon fs-5" :class="[tabStore.activeTab === 'viewLink'? 'text-habahaba-300': '']">
                    link
                  </span>
                </div>
                Affiliate Links
              </a>
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
                @click="openDeleteContact"
                :class="[[tabStore.activeTab === 'viewLink'? 'bg-habahaba-800 rounded-pill mx-1 ': '']]"
              >
                <div class="nav-link-icon">
                  <span class="material-icons rotate nav-link-icon fs-5" :class="[tabStore.activeTab === 'viewLink'? 'text-habahaba-300': '']">
                    link
                  </span>
                </div>
                Delete contact
              </a>
            </div>
          </div>
          <!-- Sidenav Footer-->
          <div class="sidenav-footer mx-2 mb-2">
            <div class="sidenav-footer-content">
              <div class="sidenav-footer-subtitle">Logged in as:</div>
              <div class="d-flex gap-1">
                <img
                  src="/illustrations/profiles/profile-1.png"
                  class="rounded-circle"
                  style="width: 40px"
                />
                <div>
                  <div class="sidenav-footer-title">
                    {{ authStore.getUserInfo()?.username }}
                  </div>
                  <span style="font-size: 11px" class="text-gray-700">{{
                    authStore.getUserInfo()?.email
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div id="layoutSidenav_content" class="bg-habahaba-100" style="">
        <div v-if="!affiliateStore.appIsFetching">
          <RouterView #default="{ Component, route }">
            <Transition mode="out-in" appear>
              <template v-if="Component">
                <component :is="Component" :key="route.fullPath" />
              </template>
            </Transition>
          </RouterView>
        </div>
        <div v-else>
          <LoadingSpinner />
        </div>
      </div>
    </div>
    <div  v-if="affiliateStore.openCreateLinkDialog.isOpen"    >
      <DialogModal  :modal-id="linkProps.modalId"  :title="linkProps.title" @show-dialog="handelCloseModal">
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
                class="btn btn-habahaba-500 rounded-pill"
                @click="copyAffiliateLink"
              >
                <div
                  v-if="isLinkCopied"
                  class="d-flex gap-1 align-items-center"
                >
                  <span class="material-icons-outlined"> done </span>
                  <span>Copied</span>
                </div>
                <div v-else class="d-flex gap-2 align-items-center">
                  <span class="material-icons-outlined fs-6">
                    content_copy
                  </span>
                  <span>copy</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div v-if="showCopyLink" class="px-3 py-4">
            <p>Share to grow your community </p>
            <div class="d-flex justify-content-center gap-3">
              <div v-for="social in socialIcons" :key="social.name">
                <div class="btn btn-sm" @click="shareLink(social.name, affiliateLink )">
                  <img :src="social.image" :alt="`${social.name} icon`" style="width: 35px">
                </div>
              </div>
            </div>

          </div>
        </template>
      </DialogModal>
    </div>
    <div v-if="isDeleteContact">
      <DialogModal  :modal-id="linkProps.modalId"  :title="linkProps.title" @show-dialog="handelCloseContactModal">
        <template #body>
          <form>
            <div class="mb-3">
              <label for="telephone" class="form-label">Phone number</label>
              <input v-model="deletePhone" type="text" class="form-control" id="telephone" aria-describedby="emailHelp">
            </div>
          </form>
        </template>
        <template #footer>
          <div class="pb-4 px-3">
            <button type="submit" class="btn btn-primary w-100" @click="deleteContact">Submit</button>
          </div>

        </template>

      </DialogModal>
    </div>


  </div>
</template>

<style scoped>
.dropdown-menu {
  z-index: 1050;
}
</style>
