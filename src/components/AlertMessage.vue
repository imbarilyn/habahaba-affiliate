<script setup lang="ts">

</script>

<template>
  <div>
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

</template>
