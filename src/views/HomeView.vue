<template>
  <div class="home-page">
    <div v-if="commonStore.userLoggedIn" class="h-100 w-100">
      <ul class="nav nav-pills my-3" id="feedback-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="see-feedback-tab"
            data-bs-toggle="pill"
            data-bs-target="#see-feedback-pane"
            type="button"
            role="tab"
            aria-controls="see-feedback-pane"
            aria-selected="true"
          >
            See Feedbacks
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="create-feedback-tab"
            data-bs-toggle="pill"
            data-bs-target="#create-feedback-pane"
            type="button"
            role="tab"
            aria-controls="create-feedback-pane"
            aria-selected="false"
          >
            Create Feedback
          </button>
        </li>
      </ul>
      <div class="tab-content" id="feedback-tabContent">
        <div
          class="tab-pane fade show active"
          id="see-feedback-pane"
          role="tabpanel"
          aria-labelledby="see-feedback-tab"
          tabindex="0"
        >
          <FeedBack />
        </div>
        <div
          class="tab-pane fade"
          id="create-feedback-pane"
          role="tabpanel"
          aria-labelledby="create-feedback-tab"
          tabindex="0"
        >
          <SendFeedBack />
        </div>
      </div>
    </div>
    <div
      v-else
      class="mb-5 d-flex align-items-center justify-content-center flex-column"
    >
      <h4>HI! There</h4>
      <p class="text-center">
        Welcome You have to login <br class="d-none d-md-block" />for giving
        your valueable feedback and see to others Feedback 
      </p>
    </div>
  </div>
</template>

<script>
import { useCommonStore } from "@/stores/common";
import { useToast } from "vue-toastification";
import FeedBack from "../components/FeedBack.vue";
import SendFeedBack from "../components/SendFeedBack.vue";
const toast = useToast();
export default {
  name: "Home",
  components: {
    FeedBack,
    SendFeedBack
  },
  data() {
    return {
      commonStore: useCommonStore()
    };
  },
  methods: {
    showToastSuccess(message) {
      const toast = useToast();
      toast.success(message, {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.5,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    }
  },
  mounted() {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    &.nav {
      justify-content: center;
      .nav-item {
        .nav-link {
          background: transparent;
          border: none;
          color: var(--bs-btn-border-color);
          border-radius: 0;
          &.active {
            border-bottom: 1px solid var(--bs-btn-border-color);
          }
        }
      }
    }
  }
}
</style>
