<template>
  <div class="feed-back-wrapper">
    <small v-if="feedbackList.length > 0" class="mb-2 d-block"
      >Note: click on chat icon to send and view comments.</small
    >
    <div class="row g-2 mx-0" v-if="feedbackList.length > 0">
      <div
        class="col-lg-4 col-md-6"
        v-for="feedbacklist in feedbackList"
        :key="feedbacklist.id"
      >
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="card-title text-center mt-3">
                {{ feedbacklist.title }}
              </h5>
              <div class="d-flex alihm-items-center gap-1">
                <span
                  role="button"
                  @click="
                    openCommentContainer(feedbacklist.id, feedbacklist.comments)
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
                    />
                  </svg>
                </span>
                <span>{{
                  feedbacklist.comments
                    ? Object.keys(feedbacklist.comments).length
                    : 0
                }}</span>
              </div>
            </div>
            <p class="text-muted">{{ feedbacklist.description }}</p>
            <div class="d-flex align-items-center justify-content-between">
              <span class="badge">
                {{ feedbacklist.category }}
              </span>
              <span class="">
                By: <strong>{{ feedbacklist.userName }}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-0 mt-5" v-else>
      <div class="col-md-6 mx-auto">
        <div class="card border-0">
          <div
            class="card-body d-flex align-items-center justify-content-center"
          >
            <p>No Feedback yet Be the first to feedback</p>
          </div>
        </div>
      </div>
    </div>
    <div class="comments-main-wrapper" v-if="openContainer">
      <div class="comment-list-class">
        <ul>
          <li
            v-for="commentsobject in commentsObject"
            :keft="commentsobject.index"
          >
            <p class="text-wrap mb-1" v-html="commentsobject.comments"></p>
            <div class="d-flex align-items-center justify-content-between">
              <span class="text-truncate h6">{{
                commentsobject.userName
              }}</span>
              <span class="fw-light text-muted">
                {{ formatDate(commentsobject.date) }}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <form @submit.prevent="sendComments" class="comments-form">
        <span role="button" class="close-btn" @click="closeCommentsContainer()"
          >X</span
        >
        <div class="form-group mb-3">
          <textarea
            v-model.trim="commentObject.comments"
            :id="feedbackId"
            class="form-control"
            rows="5"
            placeholder="Write a comment&#10;Replace **text** with <strong>bold</strong>&#10;Replace *text* with <em>italic</em>&#10;Replace ```code``` with a code block"
            @input="updatePreview"
          ></textarea>
          <!-- <div class="formatted-preview" v-html="formattedComment"></div> -->
        </div>
        <div class="form-group mb-3">
          <input
            type="text"
            placeholder="Write your name"
            class="form-control"
            v-model.trim="commentObject.userName"
          />
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-sm"
            :disabled="commonStore.loading"
          >
            Add Comments
            <span
              class="spinner-border text-success"
              v-if="commonStore.loading"
              role="status"
            ></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useCommonStore } from "@/stores/common";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  push,
  update
} from "firebase/database";
import { db } from "@/fireBase.config";
const toast = useToast();
export default {
  name: "feedback",
  components: {},
  data() {
    return {
      commonStore: useCommonStore(),
      feedbackList: [],
      feedbackId: "",
      commentsObject: [],
      openContainer: false,
      formattedComment: "",
      commentObject: {
        comments: "",
        userName: "",
        date: new Date().toISOString()
      }
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
    },
    showToastError(message) {
      const toast = useToast();
      toast.error(message, {
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
    },
    openCommentContainer(id, commentsList) {
      if (!this.openContainer) {
        this.feedbackId = id;
        this.commentsObject = commentsList;
        this.openContainer = true;
      } else {
        this.showToastError("PLease fisrt close the modal");
      }
    },
    closeCommentsContainer() {
      this.openContainer = false;
    },
    async sendComments() {
      const toast = useToast();
      if (!this.commentObject.comments || !this.commentObject.userName) {
        toast.error("Please fill all fields");
        return;
      }

      try {
        const database = getDatabase();
        const feedbackRef = dbRef(
          database,
          `feedback/${this.feedbackId}/comments`
        );
        const newCommentRef = push(feedbackRef);
        await update(newCommentRef, this.commentObject);

        // Clear form fields
        this.commentObject.comments = "";
        this.commentObject.userName = "";
        this.formattedComment = "";

        toast.success("Comment added successfully!");
        this.closeCommentsContainer();
      } catch (error) {
        toast.error("Error adding comment");
        console.error("Error adding comment:", error);
      }
    },
    updatePreview() {
      const formattedText = this.formatText(this.commentObject.comments);
      this.formattedComment = formattedText;
    },
    formatText(text) {
      let formattedText = text;

      formattedText = formattedText.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );
      formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");

      formattedText = formattedText.replace(/```(.*?)```/g, "<code>$1</code>");

      return formattedText;
    },
    formatDate(dateTimeString) {
      const dateTime = new Date(dateTimeString);
      const year = dateTime.getFullYear();
      const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
      const day = dateTime.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  },
  watch: {
    commentText(newValue) {
      this.updatePreview();
    }
  },
  mounted() {
    const database = getDatabase();
    const feedbackRef = dbRef(database, "feedback");

    // Listen for changes to the "feedback" node
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        this.feedbackList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
      }
    });
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.feed-back-wrapper {
  padding-bottom: 15px;
  .card {
    text-decoration: none;
    cursor: pointer;
    .card-body {
      .card-title {
        font-size: 16px;
        text-transform: capitalize;
      }
      span[role="button"] {
        &:has(svg) {
          fill: rgba(0, 0, 0, 0.5);
        }
      }
      p.text-muted {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        height: 3.6em;
        line-height: 1.8em;
        word-break: break-all;
      }
      span {
        &.badge {
          border: 1px solid var(--bs-btn-border-color);
          color: var(--bs-btn-border-color);
          border-radius: 50px;
          font-weight: 400;
          display: inline-flex;
          align-items: center;
          line-height: 14px;
          padding: 5px 10px;
          text-transform: capitalize;
        }
        strong {
          font-weight: 500;
          text-transform: capitalize;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
.comments-main-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  max-width: 400px;
  min-height: max-content;
  width: 100%;
  padding: 40px 20px 20px;
  border: 1px solid var(--bs-btn-border-color);
  border-radius: 5px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 400px) {
    max-width: calc(100svw - 20px);
  }

  .comment-list-class {
    max-height: 200px;
    overflow-y: auto;
    margin: 0 0 10px 0;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        background: rgba(0, 0, 0, 0.06);
        padding: 5px 10px;
        &:not(:last-of-type) {
          margin-bottom: 10px;
          border-radius: 5px;
        }
      }
    }
  }
  .comments-form {
    .close-btn {
      border-radius: 3px;
      position: absolute;
      top: -1px;
      right: -1px;
      padding: 2px 10px;
      border: 1px solid var(--bs-btn-border-color);
    }
    textarea.form-control{
      max-height: 300px;
      height: 180px;
      resize: none;
    }
  }
}
</style>
