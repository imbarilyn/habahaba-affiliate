<script setup lang="ts">
import { ref, watch } from 'vue'
import AlertMessage from '@/components/AlertMessage.vue'
import { useAffiliateStore, useNotificationsStore } from '@/stores'
import DialogModal from '@/components/DialogModal.vue'

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
const generateLink = ()=>{
  console.log('generating link')
  showSpinner.value = true
  affiliateStore.getAffiliateLink()
    .then((resp)=>{
      console.log(resp.data)
      if(resp.result === 'ok'){
        console.log('Affiliate link!!', resp)
        showSpinner.value = false

        showCopyLink.value = true
        affiliateLink.value = resp.data
        console.log(affiliateLink.value)
      }
      else{
        notificationsStore.addNotification('error', 'Error generating affiliate link')
      }
    })
    .catch((err)=>{
      console.log(err)
      notificationsStore.addNotification('error', 'Error generating affiliate link')
    })
    .finally(()=>{
      showSpinner.value = false
    })
}
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
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav class="sidenav shadow-right sidenav-light bg-habahaba-900">
          <div class="sidenav-menu">
            <div class="nav accordion" id="accordionSidenav">
              <!-- Sidenav Menu Heading (Account)-->
              <!-- * * Note: * * Visible only on and above the sm breakpoint-->
              <div class="sidenav-menu-heading d-sm-none">Account</div>
              <!-- Sidenav Link (Alerts)-->
              <!-- * * Note: * * Visible only on and above the sm breakpoint-->
              <a class="nav-link d-sm-none" href="#!">
                <div class="nav-link-icon">
                  <span class="material-icons-outlined"> notifications </span>
                </div>
                Alerts<i data-feather="bell"></i>
                <span class="badge bg-warning-soft text-warning ms-auto"
                  >4 New!</span
                >
              </a>
              <!-- Sidenav Link (Messages)-->
              <!-- * * Note: * * Visible only on and above the sm breakpoint-->
              <a class="nav-link d-sm-none" href="#!">
                <div class="nav-link-icon"><i data-feather="mail"></i></div>
                Messages
                <span class="badge bg-success-soft text-success ms-auto"
                  >2 New!</span
                >
              </a>
              <!-- Sidenav Menu Heading (Core)-->
              <div class="sidenav-menu-heading">Core</div>
              <!-- Sidenav Accordion (Dashboard)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseDashboards"
                aria-expanded="false"
                aria-controls="collapseDashboards"
              >
                <div class="nav-link-icon"><i data-feather="activity"></i></div>
                Dashboards
                <div class="sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseDashboards"
                data-bs-parent="#accordionSidenav"
              >
                <nav
                  class="sidenav-menu-nested nav accordion"
                  id="accordionSidenavPages"
                >
                  <a class="nav-link" href="#">
                    Default
                    <span class="badge bg-primary-soft text-primary ms-auto"
                      >Updated</span
                    >
                  </a>
                  <a class="nav-link" href="#">Multipurpose</a>
                  <a class="nav-link" href="#">Affiliate</a>
                </nav>
              </div>
              <!-- Sidenav Heading (Custom)-->
              <div class="sidenav-menu-heading">Custom</div>
              <!-- Sidenav Accordion (Pages)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div class="nav-link-icon"><i data-feather="grid"></i></div>
                Pages
                <div class="sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapsePages"
                data-bs-parent="#accordionSidenav"
              >
                <nav
                  class="sidenav-menu-nested nav accordion"
                  id="accordionSidenavPagesMenu"
                >
                  <!-- Nested Sidenav Accordion (Pages -> Account)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseAccount"
                    aria-expanded="false"
                    aria-controls="pagesCollapseAccount"
                  >
                    Account
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="pagesCollapseAccount"
                    data-bs-parent="#accordionSidenavPagesMenu"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Profile</a>
                      <a class="nav-link" href="#">Billing</a>
                      <a class="nav-link" href="#">Security</a>
                      <a class="nav-link" href="#">Notifications</a>
                    </nav>
                  </div>
                  <!-- Nested Sidenav Accordion (Pages -> Authentication)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseAuth"
                    aria-expanded="false"
                    aria-controls="pagesCollapseAuth"
                  >
                    Authentication
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="pagesCollapseAuth"
                    data-bs-parent="#accordionSidenavPagesMenu"
                  >
                    <nav
                      class="sidenav-menu-nested nav accordion"
                      id="accordionSidenavPagesAuth"
                    >
                      <!-- Nested Sidenav Accordion (Pages -> Authentication -> Basic)-->
                      <a
                        class="nav-link collapsed"
                        href="javascript:void(0);"
                        data-bs-toggle="collapse"
                        data-bs-target="#pagesCollapseAuthBasic"
                        aria-expanded="false"
                        aria-controls="pagesCollapseAuthBasic"
                      >
                        Basic
                        <div class="sidenav-collapse-arrow">
                          <i class="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        class="collapse"
                        id="pagesCollapseAuthBasic"
                        data-bs-parent="#accordionSidenavPagesAuth"
                      >
                        <nav class="sidenav-menu-nested nav">
                          <a class="nav-link" href="#">Login</a>
                          <a class="nav-link" href="#">Register</a>
                          <a class="nav-link" href="#">Forgot Password</a>
                        </nav>
                      </div>
                      <!-- Nested Sidenav Accordion (Pages -> Authentication -> Social)-->
                      <a
                        class="nav-link collapsed"
                        href="javascript:void(0);"
                        data-bs-toggle="collapse"
                        data-bs-target="#pagesCollapseAuthSocial"
                        aria-expanded="false"
                        aria-controls="pagesCollapseAuthSocial"
                      >
                        Social
                        <div class="sidenav-collapse-arrow">
                          <i class="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        class="collapse"
                        id="pagesCollapseAuthSocial"
                        data-bs-parent="#accordionSidenavPagesAuth"
                      >
                        <nav class="sidenav-menu-nested nav">
                          <a class="nav-link" href="#">Login</a>
                          <a class="nav-link" href="#">Register</a>
                          <a class="nav-link" href="#">Forgot Password</a>
                        </nav>
                      </div>
                    </nav>
                  </div>
                  <!-- Nested Sidenav Accordion (Pages -> Error)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseError"
                    aria-expanded="false"
                    aria-controls="pagesCollapseError"
                  >
                    Error
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="pagesCollapseError"
                    data-bs-parent="#accordionSidenavPagesMenu"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">400 Error</a>
                      <a class="nav-link" href="#">401 Error</a>
                      <a class="nav-link" href="#">403 Error</a>
                      <a class="nav-link" href="#">404 Error 1</a>
                      <a class="nav-link" href="#">404 Error 2</a>
                      <a class="nav-link" href="#">500 Error</a>
                      <a class="nav-link" href="#">503 Error</a>
                      <a class="nav-link" href="#">504 Error</a>
                    </nav>
                  </div>
                  <a class="nav-link" href="#">Pricing</a>
                  <a class="nav-link" href="#">Invoice</a>
                </nav>
              </div>
              <!-- Sidenav Accordion (Applications)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseApps"
                aria-expanded="false"
                aria-controls="collapseApps"
              >
                <div class="nav-link-icon"><i data-feather="globe"></i></div>
                Applications
                <div class="sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseApps"
                data-bs-parent="#accordionSidenav"
              >
                <nav
                  class="sidenav-menu-nested nav accordion"
                  id="accordionSidenavAppsMenu"
                >
                  <!-- Nested Sidenav Accordion (Apps -> Knowledge Base)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#appsCollapseKnowledgeBase"
                    aria-expanded="false"
                    aria-controls="appsCollapseKnowledgeBase"
                  >
                    Knowledge Base
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="appsCollapseKnowledgeBase"
                    data-bs-parent="#accordionSidenavAppsMenu"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Home 1</a>
                      <a class="nav-link" href="#">Home 2</a>
                      <a class="nav-link" href="#">Category</a>
                      <a class="nav-link" href="#">Article</a>
                    </nav>
                  </div>
                  <!-- Nested Sidenav Accordion (Apps -> User Management)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#appsCollapseUserManagement"
                    aria-expanded="false"
                    aria-controls="appsCollapseUserManagement"
                  >
                    User Management
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="appsCollapseUserManagement"
                    data-bs-parent="#accordionSidenavAppsMenu"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Users List</a>
                      <a class="nav-link" href="#">Edit User</a>
                      <a class="nav-link" href="#">Add User</a>
                      <a class="nav-link" href="#">Groups List</a>
                      <a class="nav-link" href="#">Organization Details</a>
                    </nav>
                  </div>
                  <!-- Nested Sidenav Accordion (Apps -> Posts Management)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#appsCollapsePostsManagement"
                    aria-expanded="false"
                    aria-controls="appsCollapsePostsManagement"
                  >
                    Posts Management
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="appsCollapsePostsManagement"
                    data-bs-parent="#accordionSidenavAppsMenu"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Posts List</a>
                      <a class="nav-link" href="#">Create Post</a>
                      <a class="nav-link" href="#">Edit Post</a>
                      <a class="nav-link" href="#">Posts Admin</a>
                    </nav>
                  </div>
                </nav>
              </div>
              <!-- Sidenav Accordion (Flows)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFlows"
                aria-expanded="false"
                aria-controls="collapseFlows"
              >
                <div class="nav-link-icon"><i data-feather="repeat"></i></div>
                Flows
                <div class="sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseFlows"
                data-bs-parent="#accordionSidenav"
              >
                <nav class="sidenav-menu-nested nav">
                  <a class="nav-link" href="#">Multi-Tenant Registration</a>
                  <a class="nav-link" href="#">Wizard</a>
                </nav>
              </div>
              <!-- Sidenav Heading (UI Toolkit)-->
              <div class="sidenav-menu-heading">UI Toolkit</div>
              <!-- Sidenav Accordion (Layout)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div class="nav-link-icon"><i data-feather="layout"></i></div>
                Layout
                <div class="sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseLayouts"
                data-bs-parent="#accordionSidenav"
              >
                <nav
                  class="sidenav-menu-nested nav accordion"
                  id="accordionSidenavLayout"
                >
                  <!-- Nested Sidenav Accordion (Layout -> Navigation)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayoutSidenavVariations"
                    aria-expanded="false"
                    aria-controls="collapseLayoutSidenavVariations"
                  >
                    Navigation
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapseLayoutSidenavVariations"
                    data-bs-parent="#accordionSidenavLayout"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Static Sidenav</a>
                      <a class="nav-link" href="#">Dark Sidenav</a>
                      <a class="nav-link" href="#">RTL Layout</a>
                    </nav>
                  </div>
                  <!-- Nested Sidenav Accordion (Layout -> Container Options)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayoutContainers"
                    aria-expanded="false"
                    aria-controls="collapseLayoutContainers"
                  >
                    Container Options
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapseLayoutContainers"
                    data-bs-parent="#accordionSidenavLayout"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Boxed Layout</a>
                      <a class="nav-link" href="#">Fluid Layout</a>
                    </nav>
                  </div>
                  <!-- Nested Sidenav Accordion (Layout -> Page Headers)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayoutsPageHeaders"
                    aria-expanded="false"
                    aria-controls="collapseLayoutsPageHeaders"
                  >
                    Page Headers
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapseLayoutsPageHeaders"
                    data-bs-parent="#accordionSidenavLayout"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Simplified</a>
                      <a class="nav-link" href="#">Compact</a>
                      <a class="nav-link" href="#">Content Overlap</a>
                      <a class="nav-link" href="#">Breadcrumbs</a>
                      <a class="nav-link" href="#">Light</a>
                    </nav>
                  </div>
                  <!-- Nested Sidenav Accordion (Layout -> Starter Layouts)-->
                  <a
                    class="nav-link collapsed"
                    href="javascript:void(0);"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayoutsStarterTemplates"
                    aria-expanded="false"
                    aria-controls="collapseLayoutsStarterTemplates"
                  >
                    Starter Layouts
                    <div class="sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapseLayoutsStarterTemplates"
                    data-bs-parent="#accordionSidenavLayout"
                  >
                    <nav class="sidenav-menu-nested nav">
                      <a class="nav-link" href="#">Default</a>
                      <a class="nav-link" href="#">Minimal</a>
                    </nav>
                  </div>
                </nav>
              </div>
              <!-- Sidenav Accordion (Components)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseComponents"
                aria-expanded="false"
                aria-controls="collapseComponents"
              >
                <div class="nav-link-icon"><i data-feather="package"></i></div>
                Components
                <div class="sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseComponents"
                data-bs-parent="#accordionSidenav"
              >
                <nav class="sidenav-menu-nested nav">
                  <a class="nav-link" href="#">Alerts</a>
                  <a class="nav-link" href="#">Avatars</a>
                  <a class="nav-link" href="#">Badges</a>
                  <a class="nav-link" href="#">Buttons</a>
                  <a class="nav-link" href="#">
                    Cards
                    <span class="badge bg-primary-soft text-primary ms-auto"
                      >Updated</span
                    >
                  </a>
                  <a class="nav-link" href="#">Dropdowns</a>
                  <a class="nav-link" href="#">
                    Forms
                    <span class="badge bg-primary-soft text-primary ms-auto"
                      >Updated</span
                    >
                  </a>
                  <a class="nav-link" href="#">Modals</a>
                  <a class="nav-link" href="#">Navigation</a>
                  <a class="nav-link" href="#">Progress</a>
                  <a class="nav-link" href="#">Step</a>
                  <a class="nav-link" href="#">Timeline</a>
                  <a class="nav-link" href="#">Toasts</a>
                  <a class="nav-link" href="#">Tooltips</a>
                </nav>
              </div>
              <!-- Sidenav Accordion (Utilities)-->
              <a
                class="nav-link collapsed"
                href="javascript:void(0);"
                data-bs-toggle="collapse"
                data-bs-target="#collapseUtilities"
                aria-expanded="false"
                aria-controls="collapseUtilities"
              >
                <div class="nav-link-icon"><i data-feather="tool"></i></div>
                Utilities
                <div class="sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="collapseUtilities"
                data-bs-parent="#accordionSidenav"
              >
                <nav class="sidenav-menu-nested nav">
                  <a class="nav-link" href="#">Animations</a>
                  <a class="nav-link" href="#">Background</a>
                  <a class="nav-link" href="#">Borders</a>
                  <a class="nav-link" href="#">Lift</a>
                  <a class="nav-link" href="#">Shadows</a>
                  <a class="nav-link" href="#">Typography</a>
                </nav>
              </div>
              <!-- Sidenav Heading (Addons)-->
              <div class="sidenav-menu-heading">Plugins</div>
              <!-- Sidenav Link (Charts)-->
              <a class="nav-link" href="#">
                <div class="nav-link-icon">
                  <i data-feather="bar-chart"></i>
                </div>
                Charts
              </a>
              <!-- Sidenav Link (Tables)-->
              <a class="nav-link" href="#">
                <div class="nav-link-icon"><i data-feather="filter"></i></div>
                Tables
              </a>
            </div>
          </div>
          <!-- Sidenav Footer-->
          <div class="sidenav-footer">
            <div class="sidenav-footer-content">
              <div class="sidenav-footer-subtitle">Logged in as:</div>
              <div class="sidenav-footer-title">Valerie Luna</div>
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
              class="btn btn-habahaba-500 d-flex gap-2 rounded-pill">
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
