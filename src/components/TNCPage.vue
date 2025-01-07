<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAffiliateStore } from '@/stores'
import { showAlert } from  '@/modules/popup'
import { useStorage} from '@vueuse/core'

const router = useRouter()
const affiliateStore = useAffiliateStore()

useStorage('isTermsAccepted', {accepted: false})

const isTermsAccepted = (value: boolean)=>{
  affiliateStore.setTncAccepted(value)
  if(value){
    showAlert({
      // title: 'Success',
      // text: 'Terms and Conditions accepted successfully',
      // icon: 'success',
      // timer: 1000
      type: 'success',
      message: 'Terms and Conditions accepted successfully',
    })
    localStorage.setItem('isTermsAccepted', '{"accepted": true}')
    // useStorage('isTermsAccepted', {accepted: false, greeting: 'hello'}, localStorage, {mergeDefaults: true})
    // console.log(JSON.parse(localStorage.getItem('isTermsAccepted') as string))
    // console.log(localStorage)
    setTimeout(()=>{
      router.push({name: 'user-signup'})
    }, 3000)
  }
  else {
    showAlert({
      // title: 'Error',
      // text: 'You must accept the terms and conditions to proceed',
      // icon: 'error'
      type: 'error',
      message: 'You must accept the terms and conditions to proceed',
    })
  }
}
</script>

<template>
  <div class="bg-white text-responsive">
    <div
      class="w-100 text-white bg-habahaba-500 fixed-center d-flex flex-column align-content-center justify-content-center"
    >
      <div class="container">
        <div class="btn-sm cursor-pointer pb-2" @click="router.go(-1)">
          <span class="material-icons-outlined py-2" style="font-size: 14px">
            arrow_back_ios
          </span>
        </div>
        <div class="pb-3 line-height-normal">
          <small class="d-block fs-6">Hello &#128075;</small>
          <small class="  "
            >Before you create an account, please read and accept our Terms &
            Conditions</small
          >
        </div>
      </div>
    </div>
    <div class="container" style="padding-top: 7rem; padding-bottom: 2rem">
      <p class="fs-2">Terms & Conditions</p>
      <div class="d-flex gap-1 pb-2 align-items-center text-habahaba-400">
        <span class="material-icons-outlined fs-6"> schedule </span>
        <span class="fs-6">Last updated 20 Oct 2024</span>
      </div>
      <h5>Definition of Terms</h5>
      <ol>
        <li>
          <span class="fw-semibold">Affiliate Program:</span> The program by which affiliates
          can earn commission by promoting HabaHaba's services through unique
          links or promotional materials provided by HabaHaba.
        </li>
        <li>
          <strong>Affiliate:</strong> Any individual or business entity that has
          applied and has been duly accepted into the HabaHaba Affiliate
          Program.
        </li>
        <li>
          <strong>HabaHaba:</strong> The company and service provider offering a
          purpose-driven savings and investment platform, whose services are and
          will be promoted through the Affiliate Program.
        </li>
        <li>
          <strong>Commission:</strong> The payment to be earned by an Affiliate
          based on sales or leads generated through their referral efforts.
        </li>
        <li>
          <strong>Qualified Sale:</strong> A sale that meets all criteria as
          specified in these Terms and Conditions, entitling the Affiliate to
          earn a commission.
        </li>
      </ol>

      <h5>Acceptance into the Program</h5>
      <ol>
        <li>
          <strong>Application Process:</strong> Any individual or business
          interested to become a HabaHaba Affiliates must apply to the program
          through the defined application channels, and must submit all the
          required information. HabaHaba will reserve the right to approve or
          deny any application at its discretion.
        </li>
        <li>
          <strong>Eligibility Criteria: </strong>Affiliates will be required to,
          at the bare minimum, have an active social media presence across more
          than one social media channel. HabaHaba may reject applicants who do
          not meet the company’s standards for promotion.
        </li>
        <li>
          <strong>Ongoing Review: </strong>Affiliates’ accounts and promotional
          methods may be reviewed regularly. If an Affiliate no longer meets
          eligibility criteria or violates any program rules, HabaHaba reserves
          the right to suspend or terminate their participation.
        </li>
      </ol>
      <h5>Affiliate Responsibilities</h5>
      <ol>
        <li>
          <strong>Promotional Content: </strong>Confirmed Affiliates will be
          responsible for promoting HabaHaba’s services truthfully, ethically
          and accurately. Affiliates are encouraged to seek clarity where they
          may not be clear on any information, before such information is
          availed for public consumption.
        </li>
        <li>
          <strong>Compliance with Laws:</strong> Affiliates must comply with all
          the applicable laws of Kenya, including but not limited to all laws
          relating to advertising, data privacy and intellectual property
          rights.
        </li>
        <li>
          <strong>No Misrepresentation: </strong>Affiliates shall not mislead,
          misrepresent or misinterpret HabaHaba, its services or the affiliate
          relationship. Any misrepresentation, misinterpretation or misleading
          information about the brand may lead to eventual termination. HabaHaba
          however reserves the right to take ay decision it may deem necessary,
          should such misrepresentation, misinterpretation or misleading
          information lead to losses, damages or injurious repercussions,
          whether monetary or brand reputation.
        </li>
        <li>
          <strong>Prohibited Actions: </strong>Affiliates are prohibited from
          using deceptive, fraudulent, or misleading tactics, including but not
          limited to:
          <ol type="a">
            <li>
              Unauthorized use of "HabaHaba" or related keywords in paid search
              campaigns.
            </li>
            <li>False claims or promises about HabaHaba's services.</li>
            <li>
              Using spam, unsolicited emails, or other unethical advertising
              methods.
            </li>
          </ol>
        </li>
        <li>
          <strong>Referral Link Use: </strong>Affiliates must use only the
          provided referral link for tracking purposes. Altering or misusing
          referral links to manipulate sales tracking is strictly prohibited.
        </li>
      </ol>
      <h5>Affiliate Responsibilities</h5>
      <ol>
        <li>
          <strong>Promotional Content:</strong> Confirmed Affiliates will be
          responsible for promoting HabaHaba’s services truthfully, ethically
          and accurately. Affiliates are encouraged to seek clarity where they
          may not be clear on any information, before such information is
          availed for public consumption.
        </li>
        <li>
          <strong>Compliance with Laws:</strong> Affiliates must comply with all
          the applicable laws of Kenya, including but not limited to all laws
          relating to advertising, data privacy and intellectual property
          rights.
        </li>
        <li>
          <strong>No Misrepresentation: </strong>Affiliates shall not mislead,
          misrepresent or misinterpret HabaHaba, its services or the affiliate
          relationship. Any misrepresentation, misinterpretation or misleading
          information about the brand may lead to eventual termination. HabaHaba
          however reserves the right to take ay decision it may deem necessary,
          should such misrepresentation, misinterpretation or misleading
          information lead to losses, damages or injurious repercussions,
          whether monetary or brand reputation.
        </li>
        <li>
          <strong>Prohibited Actions: </strong>Affiliates are prohibited from
          using deceptive, fraudulent, or misleading tactics, including but not
          limited to:
          <ol type="a">
            <li>
              Unauthorized use of "HabaHaba" or related keywords in paid search
              campaigns.
            </li>
            <li>False claims or promises about HabaHaba's services.</li>
            <li>
              Using spam, unsolicited emails, or other unethical advertising
              methods.
            </li>
          </ol>
        </li>
        <li>
          <strong>Referral Link Use: </strong>Affiliates must use only the
          provided referral link for tracking purposes. Altering or misusing
          referral links to manipulate sales tracking is strictly prohibited.
        </li>
      </ol>
      <h5>Commission Structure</h5>
      <ol>
        <li>
          <strong>Commission Rate: </strong>The commission rate is set by
          HabaHaba and may vary based on the affiliate’s level, promotion volume
          or specific promotions. The right and the extent with which to effect
          such variations will be at the sole discretion of HabaHaba.
        </li>
        <li>
          Qualified Sales: A sale will be termed as Qualified only if a sale
          conversion is recorded. A sale conversion will be recorded if an
          individual or entity has through the influence of the Affiliate,
          created a profile on the HabaHaba platform and made an initial saving
          or investment. Only sales that are generated through the Affiliate's
          referral link and fulfill this HabaHaba's criteria for
          <strong>Qualified Sales </strong> will be eligible for commissions.
        </li>
        <li>
          <strong>Commission Payouts: </strong> Commissions will be paid out on
          a monthly basis, and will be done to the Affiliate's bank account or
          mobile money wallet. The Affiliate will be at liberty to chose their
          preferred payment mode from the two. No cash payments will be made by
          HabaHaba. The commissions will be pegged at 1% of the interest accrued
          on the investment done through the Affiliates.
        </li>
        <li>
          <strong>Reversals and Adjustments: </strong>HabaHaba reserves the
          right to reverse or adjust any commission in the case of returns,
          refunds or other instances where the sale is invalidated or based on
          prevailing circumstances.
        </li>
      </ol>
      <h5>Payment Terms</h5>
      <ol>
        <li>
          <strong>Payment Method: </strong> Payments to HabaHaba will be done
          via bank transfer, direct deposit or mobile money payment platform
          M-PESA. Affiliates will be responsible for providing the accurate
          payment information to their audiences.
        </li>
        <li>
          <strong>Taxes: </strong> Affiliates are solely responsible for any
          taxes applicable to their earnings. Should circumstances arise,
          HabaHaba may withhold payments if legally required or if directed,
          required or obligated to do so by a court of law.
        </li>
        <li>
          <strong>Minimum Payout: </strong>Payments will be issued on a monthly
          basis, based on the defined commission structure.
        </li>
      </ol>
      <h5>Intellectual Property</h5>
      <ol>
        <li>
          <strong>Marketing Collateral Usage: </strong>Affiliates may use
          HabaHaba’s marketing collateral i.e. logos, trademarks, banners and
          other branded content only in ways authorized by HabaHaba.
          Unauthorized usage, including altering brand assets, is prohibited.
        </li>
        <li>
          <strong>Content Restrictions: </strong>Affiliates are not permitted to
          create materials or promotions that imply ownership or partnership
          beyond the affiliate relationship.
        </li>
        <li>
          <strong>Copyrighted Materials: </strong>Affiliates must respect
          copyright laws and use only approved materials provided by HabaHaba or
          create original content.
        </li>
      </ol>
      <h5>Termination and Suspension</h5>
      <ol>
        <li>
          <strong>Termination by Affiliate: </strong>Affiliates may terminate
          their participation in the Affiliate Program at any time, by providing
          a 30(thirty)days written notification to HabaHaba.
        </li>
        <li>
          <strong>Termination by HabaHaba: </strong>HabaHaba reserves the right
          to suspend or terminate an Affiliate’s account without prior notice if
          the Affiliate violates any of these terms, engages or attempts to in
          any fraudulent activity.
        </li>
        <li>
          <strong>Post-Termination Obligations: </strong>Upon termination of an
          Affiliate partnership, the Affiliate must immediately cease using any
          of the HabaHaba branded content, referral links, and/or promotional
          materials, and must return within 24hours any marketing material,
          collateral or HabaHaba property in their possession. Any unpaid,
          qualified commissions will be paid within 14(fourteen) days. All
          non-qualified commissions will be forfeited.
        </li>
      </ol>
      <h5>Confidentiality</h5>
      <ol>
        <li>
          <strong>Affiliate Information: </strong>Both HabaHaba and the
          Affiliate agree to treat each other’s confidential information,
          including business practices and performance data, with strict
          confidentiality.
        </li>
        <li>
          <strong>Non-Disclosure: </strong>Affiliates are prohibited from
          sharing sensitive information regarding HabaHaba’s customers,
          strategies, or services with third parties.
        </li>
      </ol>
      <h5>Limitation of Liability</h5>
      <p>
        HabaHaba and its affiliates, staff, directors or partners shall not be
        liable for any damages, including but not limited to, loss of profits,
        data, or business interruption, arising out of or related to this
        Affiliate Program or directly affecting the Affiliates. Affiliates
        hereby agree that they are participating at their own volition, and that
        such losses will be borne solely by the Affiliates.
      </p>

      <h5>No Warranties</h5>
      <p>
        The Affiliate acknowledges that the HabaHaba platform is provided as is,
        without warranties of any kind, including any implied warranties of
        merchantability, and that HabaHaba's liability for damages resulting
        from the HabaHaba's use is limited to the amount paid by the Affiliate’s
        audience and as per the payment structure provided. The Affiliate agrees
        to indemnify HabaHaba against any and all claims arising from misuse,
        and not to attempt any unauthorized modifications and/or
        reverse-engineering. HabaHaba is not liable for full or partial service
        disruptions beyond its control.
      </p>
      <h3>Governing Law</h3>
      <p>
        These terms and conditions are governed by the laws of Kenya. Any
        disputes arising from the Affiliate Program will be subject to the
        exclusive jurisdiction of the Kenya courts.
      </p>
      <h5>Acceptance of Terms</h5>
      <p>
        By participating in the HabaHaba Affiliate Program, you acknowledge that
        you have read, understood and by your own volition, agree to abide by
        and be bound by these terms and conditions.
      </p>
      <div class="fixed-bottom pb-2">
        <div class="d-flex gap-4 justify-content-center">
          <button class="btn btn-habahaba-500 text-white" @click="isTermsAccepted(true)">Accept</button>
          <button class="btn btn-habahaba-100 text-gray-600" @click="isTermsAccepted(false)">Decline</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed-center {
  position: fixed;
  top: 0;
}
</style>
