<template>
  <div>
    <div class="title">
      <span>{{article.title}}</span>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <div class="date">{{article.date}}</div>
    <div class="titleImage">
      <img v-if="article.titleImage" :src="article.titleImage">
    </div>
    <div class="content" v-html="compiledMarkdown(article.content)" v-highlight></div>
    <div class="label">
      <i class="fa fa-tag" aria-hidden="true"></i>
      <span>{{article.label}}</span>
    </div>
    <div class="comment">
      <avatar
        :username="store.userInfo.username"
        :src="store.userInfo.avator"
        :size="40"
        class="avatar"
      ></avatar>
      <div class="commentMain">
        <textarea v-model="comment"></textarea>
        <button @click="release">发布</button>
      </div>
      <div class="commentMask" v-show="!store.logined">
        <span>请先登录</span>
      </div>
    </div>
    <div class="commentary" v-for="item in commentList" :key="item.id">
      <avatar :username="item.username" :src="item.avator" :size="40" class="avatar"></avatar>
      <div class="commentaryMain">
        <div class="info">
          <span class="username">{{item.username}}</span>
          <span class="releaseTime">{{item.releaseTime}}</span>
        </div>
        <div class="content">{{item.comment}}</div>
        <div class="replyButton" v-show="store.logined">
          <span @click="showReplyComment(item.id)">reply</span>
        </div>
        <div class="replyComment" v-show="item.id===replyCommentId">
          <textarea v-model="replyComment"></textarea>
          <button @click="replyCommentEvent" class="reply">回复</button>
          <button @click="closeReplyComment" class="close">关闭</button>
        </div>
        <div
          class="commentary subCommentary"
          v-for="subItem  in item.subCommentList"
          :key="subItem.subId"
        >
          <avatar
            :username="subItem.subUsername"
            :src="subItem.subAvator"
            :size="30"
            class="avatar"
          ></avatar>
          <div class="commentaryMain">
            <div class="info">
              <span class="username">{{subItem.subUsername}}</span>
              <span class="releaseTime">{{subItem.subReleaseTime}}</span>
            </div>
            <div class="content">{{subItem.subComment}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../assets/js/store";
import Avatar from "vue-avatar";
import marked from "marked";
export default {
  data() {
    return {
      store,
      article: {},
      comment: "",
      replyComment: "",
      replyCommentId: 0,
      commentList: []
    };
  },
  created() {
    this.getArticle();
    this.getCommentList();
  },
  methods: {
    getArticle() {
      this.$api.getArticle({ id: this.$route.query.id }).then(res => {
        const { code, data } = res.data;
        if (code === 1) {
          this.article = data[0];
        }
      });
    },
    getCommentList() {
      this.$api
        .getCommentList({ articleid: this.$route.query.id })
        .then(res => {
          const { code, data } = res.data;
          if (code === 1) {
            this.commentList = data;
          }
        });
    },
    release() {
      if (!this.comment) {
        this.$message({ content: "请填写内容", type: "error" });
        return;
      }
      this.$api
        .comment({ articleid: this.article.id, comment: this.comment })
        .then(res => {
          const { code, message } = res.data;
          if (code === 1) {
            this.comment = "";
            this.$message({ content: message, type: "success" });
            this.getCommentList();
          }
        });
    },
    showReplyComment(id) {
      this.replyComment = "";
      this.replyCommentId = id;
    },
    closeReplyComment() {
      this.replyComment = "";
      this.replyCommentId = 0;
    },
    replyCommentEvent() {
      if (!this.replyComment) {
        this.$message({ content: "请填写内容", type: "error" });
        return;
      }
      this.$api
        .replyComment({
          commentid: this.replyCommentId,
          comment: this.replyComment
        })
        .then(res => {
          const { code, message } = res.data;
          if (code === 1) {
            this.getCommentList();
            this.$message({ content: message, type: "success" });
            this.replyCommentId = 0;
          }
        });
    },
    compiledMarkdown(content) {
      if (content) {
        return marked(content);
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  components: {
    Avatar
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.scss";
.title {
  font-size: 30px;
  padding: 25px 0 10px 0;
  border-bottom: 1px solid $borderColor1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 18px;
    text-decoration: none;
    color: $main2;
    &:active {
      color: $main1;
    }
  }
}
.date {
  color: $fontColor3;
  padding-top: 10px;
  margin-bottom: 16px;
}
.titleImage {
  text-align: center;
  img {
    max-height: 300px;
  }
}
.label {
  color: $main2;
  i {
    margin-right: 10px;
  }
}
.comment,
.commentary {
  display: flex;
  .avatar {
    margin-right: 20px;
  }
}
.comment {
  position: relative;
  padding-top: 20px;
  margin: 10px 0 20px 0;
  border-top: 1px solid $borderColor1;

  .commentMain {
    flex-grow: 1;
    button {
      width: 80px;
      height: 35px;
      float: right;
      margin-top: 10px;
    }
  }
}
.commentMask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: $fontColor3;
  & > span {
    margin-bottom: 30px;
  }
}

.commentary {
  margin: 20px 0;
  .commentaryMain {
    flex-grow: 1;
    .info {
      .username {
        color: $fontColor2;
        font-size: 18px;
      }
      .releaseTime {
        color: $fontColor3;
        font-size: 14px;
        margin-left: 20px;
      }
    }
    .content {
      margin: 10px 0;
    }
    .replyButton > span {
      color: $fontColor3;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
        color: $fontColor2;
      }
    }
    .replyComment {
      margin-top: 10px;
      height: 110px;
      textarea {
        height: 60px;
      }
      button {
        width: 70px;
        height: 30px;
        float: right;
        margin-top: 10px;
      }
      .close {
        margin-right: 10px;
        background-color: $danger1;
        &:hover {
          background-color: darken($danger1, 8%);
        }
      }
    }
  }
}
.subCommentary {
  margin: 10px 0;
}
textarea {
  width: 100%;
  height: 100px;
  border: 1px solid $borderColor1;
}
</style>
