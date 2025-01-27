<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAffiliateStore } from '@/stores'
import moment from 'moment'
import DialogModal from '@/components/DialogModal.vue'
import whatsapp from '/images/whatsapp.png'
import facebook from '/images/facebook.png'
import twitter from '/images/twitter.png'
import linkedin from '/images/linkedin.png'
import email from '/images/email3.png'
import { shareToSocials } from '@/modules/share'

interface AffiliateLinks {
  id: number
  fullUrl: string
  createdAt: string
}

const affiliateStore = useAffiliateStore()
const affiliateLinks = ref<AffiliateLinks[]>([])
const isLoadingLinks = ref(true)

const socialIcons = [
  {
    name: 'facebook',
    image: facebook,
  },
  {
    name: 'twitter',
    image: twitter,
  },
  {
    name: 'whatsapp',
    image: whatsapp,
  },
  {
    name: 'linkedin',
    image: linkedin,
  },
  {
    name: 'email',
    image: email,
  },
]

const getAffiliateLink = () => {
  affiliateStore
    .getAffiliateLinks()
    .then(response => {
      console.log(response)
      if (response.result === 'ok') {
        affiliateLinks.value = response.data
        console.log(response.data)
      } else {
        return
      }
    })
    .catch(error => {
      return
    })
    .finally(() => {
      isLoadingLinks.value = false
    })
}
const isShareAffiliateLink = ref({
  isShare: false,
  link: '',
  id: '',
  title: '',
})

const shareAffiliateLink = (link: AffiliateLinks) => {
  isShareAffiliateLink.value = {
    isShare: true,
    link: link.fullUrl,
    id: link.id.toString(),
    title: 'Share Affiliate Link',
  }
}

const handelCloseModal = () => {
  isShareAffiliateLink.value = {
    isShare: false,
    link: '',
    id: '',
    title: '',
  }
}

const shareLink = (social: string, link: string) => {
  shareToSocials(social, link)
}
onMounted(() => {
  getAffiliateLink()
})
</script>

<template>
  <div class="payout-text">
    <div v-if="affiliateLinks.length > 0">
      <div v-for="(link, index) in affiliateLinks" :key="link.id">
        <div
          class="d-flex justify-content-between py-2"
          :class="[index !== affiliateLinks.length - 1 ? 'border-bottom' : '']"
        >
          <div class="d-flex gap-2">
            <div
              @click="shareAffiliateLink(link)"
              class="bg-habahaba-100 btn btn-sm rounded-circle d-flex justify-content-center align-items-center"
              style="width: 40px; height: 40px"
            >
              <span class="material-icons-outlined text-habahaba-800"
                >share</span
              >
            </div>
            <div class="d-flex flex-column">
              <span>{{
                moment(link.createdAt).format('dddd, DD, MM YYYY')
              }}</span>
              <span
                class="text-small col-md-4 col-6 text-truncate text-habahaba-950"
                >{{ link.fullUrl }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="d-flex flex-column align-items-center justify-content-center"
    >
      <img
        src="../../public/images/transaction.png"
        style="width: 30px"
        class=""
      />

      <span class="text-gray-500">No available transactions</span>
    </div>
    </div>
  <div v-if="isShareAffiliateLink.isShare">
    <DialogModal
      :modal-id="isShareAffiliateLink.id"
      :title="isShareAffiliateLink.title"
      @show-dialog="handelCloseModal"
    >
      <template #body>
        <p class="fw-400">Share to grow your community</p>
        <div class="d-flex justify-content-center gap-3">
          <div v-for="social in socialIcons" :key="social.name">
            <div
              class="btn btn-sm"
              @click="shareLink(social.name, isShareAffiliateLink.link)"
            >
              <img
                :src="social.image"
                :alt="`${social.name} icon`"
                style="width: 35px"
              />
            </div>
          </div>
        </div>
      </template>
    </DialogModal>
  </div>
</template>

<style scoped>
.payout-text {
  font-size: 15px;
}

.text-small {
  font-size: 12px;
  color: #6c757d;
}
</style>
