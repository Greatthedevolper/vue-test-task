<template>
  <div class="feedback-wrapper">
    <form @submit.prevent="sendFeedback" class="feedback-form">
      <div class="row mx-0">
        <h4>Create Feedback</h4>
        <div class="col-md-6">
          <div class="form-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter title here"
              v-model.trim="feedBackObject.title"
              autocomplete="on"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group mb-3">
            <select
              name=""
              class="form-select"
              v-model.trim="feedBackObject.category"
            >
              <option value="" selected disabled>Choose a category</option>
              <option value="full-stock">Full Stock</option>
              <option value="Social-media">Social media</option>
              <option value="Web-development">Web development</option>
              <option value="graphic-designing">Graphic designing</option>
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter your Name here"
              v-model.trim="feedBackObject.userName"
              autocomplete="on"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group mb-3">
            <textarea
              class="form-control"
              placeholder="Enter Your feedback Here"
              v-model.trim="feedBackObject.description"
            ></textarea>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="commonStore.loading"
            >
              Send Feedback
              <span
                class="spinner-border text-success"
                v-if="commonStore.loading"
                role="status"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { getDatabase, ref as dbRef, push, set } from "firebase/database";
import { useToast } from "vue-toastification";
import { db } from "@/fireBase.config";
import { useCommonStore } from "@/stores/common";

export default {
  name: "SendFeedback",
  data() {
    return {
        commonStore: useCommonStore(),
      feedBackObject: {
        title: "",
        category: "",
        userName: "",
        description: "",
        favourite: false,
        comments: []
      }
    };
  },
  methods: {
    async sendFeedback() {
        this.commonStore.loading = true;
      const toast = useToast();
      if (
        !this.feedBackObject.title ||
        !this.feedBackObject.category ||
        !this.feedBackObject.userName ||
        !this.feedBackObject.description
      ) {
        toast.error("Please fill all fields");
        return;
      }

      try {
        const database = getDatabase();
        const feedbackRef = dbRef(database, "feedback");
        const newFeedbackRef = push(feedbackRef);
        await set(newFeedbackRef, this.feedBackObject);
        this.feedBackObject.title = "";
        this.feedBackObject.category = "";
        this.feedBackObject.userName = "";
        this.feedBackObject.description = "";
        this.commonStore.loading = false;
        toast.success("Feedback sent successfully!");
      } catch (error) {
        toast.error("Error sending feedback");
        console.error("Error sending feedback:", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.feed-back-wrapper {
  padding: 30px 20px;
  border-radius: 5px;
  max-width: 600px;
  border: 1px solid hsla(160, 100%, 37%, 0.9);
  margin: auto;
  width: 100%;
  .form-sign-up {
    .form-group {
      &:not(:last-of-type) {
        padding-bottom: 10px;
      }
      position: relative;
      .form-control {
        &:focus-visible,
        &:focus {
          border-color: hsla(160, 100%, 37%, 0.2);
          outline: 0;
          box-shadow: 0 0 0 0.1rem hsla(160, 100%, 37%, 0.2);
        }
      }
      .error-message {
        display: none;
        color: red;
        // position: absolute;
        bottom: 8px;
      }
      &:has(input:invalid) {
        .error-message {
          display: block;
        }
      }
    }
  }
}
</style>
