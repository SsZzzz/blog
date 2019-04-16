<template>
  <div>
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <div v-show="isSearch" class="search">
        <input type="text" v-model="searchText" @keyup.enter="search" placeholder="按回车键搜索">
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="mask" v-show="isSearch" @click="closeSearch"></div>
    </transition>
    <div
      class="item"
      v-for="(item,index) in articleList"
      :key="index"
      @click="viewArticle(item.id)"
    >
      <div class="title">
        <span>{{item.title}}</span>
      </div>
      <div v-if="item.summary||item.titleImage" class="summary">
        <span>{{item.summary}}</span>
        <img v-if="item.titleImage" :src="item.titleImage">
      </div>
      <div class="tags">
        <i class="fa fa-tag" aria-hidden="true"></i>
        <span>{{item.label}}</span>
      </div>
      <div class="date">
        <span>{{item.date}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mPage",
  props: ["isSearch"],
  data() {
    return {
      searchText: "",
      articleList: []
    };
  },
  watch: {
    $route() {
      if (
        this.$route.name === "main" &&
        this.$route.query.labelid !== this.$route.meta.labelid
      ) {
        this.$route.meta.scrollTop = 0;
        this.getArticleList();
      }
    }
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.$api
        .getArticleList({
          title: this.searchText,
          labelid: this.$route.query.labelid
        })
        .then(res => {
          let { code, data } = res.data;
          if (code === 1) {
            this.articleList = data;
          }
        });
    },
    viewArticle(id) {
      this.$router.push({ name: "article", query: { id } });
    },
    search() {
      document.querySelector("html").scrollTop = 0;
      this.getArticleList();
    },
    closeSearch() {
      this.$emit("close-search");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector("html").scrollTop = to.meta.scrollTop;
    });
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.labelid = to.query.labelid;
    next();
    document.querySelector("html").scrollTop = 0;
    this.getArticleList();
  },
  beforeRouteLeave(to, from, next) {
    from.meta.labelid = this.$route.query.labelid;
    from.meta.scrollTop = document.querySelector("html").scrollTop;
    next();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
.search {
  width: 300px;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 2;
  input {
    padding-left: 10px;
    border: 1px solid $main1;
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
  }
}
.mask {
  z-index: 1;
}
.item {
  border: 1px solid $borderColor1;
  margin: 20px 0;
  padding: 20px;
  background-color: white;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
    background-color: lighten($main5, 16%);
  }
  .title {
    font-size: 26px;
    margin-bottom: 20px;
  }
  .summary {
    display: flex;
    justify-content: space-between;
    color: $fontColor2;
    img {
      height: 200px;
      margin: -50px 0 -66px 20px;
    }
  }
  .tags {
    margin: 20px 0 10px 0;
    color: $main2;
    i {
      margin-right: 10px;
    }
  }
  .date {
    margin: 10px 0 0 0;
    color: $fontColor3;
  }
}
</style>
