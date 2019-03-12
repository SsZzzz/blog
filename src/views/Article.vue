<template>
  <div>
    <div class="title">
      <span>{{article.title}}</span>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <div class="date">{{article.date}}</div>
    <img class="titleImage" v-if="article.titleImage" :src="article.titleImage">
    <div class="content" v-html="compiledMarkdown(article.content)"></div>
    <div class="label">
      <i class="fa fa-tag" aria-hidden="true"></i>
      <span>{{article.label}}</span>
    </div>
  </div>
</template>
<script>
import marked from "marked";
export default {
  data() {
    return {
      article: {}
    };
  },
  created() {
    this.getArticle();
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
    compiledMarkdown(content) {
      if (content) {
        return marked(content);
      }
    },
    goBack() {
      this.$router.go(-1);
    }
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
  float: right;
  height: 300px;
}
.label {
  color: $main2;
  i {
    margin-right: 10px;
  }
}
</style>
