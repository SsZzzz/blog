<template>
  <div>
    <div class="item" v-for="(item ,index) in list" :key="index">
      <span class="month">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
        {{item.month}}...
      </span>
      <ul>
        <li v-for="(i,index) in item.list" :key="index">
          <span class="date">{{i.createDate}}</span>
          <a href="javascript:void(0)" @click="viewArticle(i.id)" class="title">{{i.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "timeLine",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getTimeLine();
  },
  methods: {
    getTimeLine() {
      this.$api.getTimeLine().then(res => {
        const { code, data } = res.data;
        if (code === 1) {
          this.list = data;
        }
      });
    },
    viewArticle(id) {
      this.$router.push({ name: "article", query: { id } });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector("main").scrollTop = to.meta.scrollTop;
    });
  },
  beforeRouteLeave(to, from, next) {
    from.meta.scrollTop = document.querySelector("main").scrollTop;
    next();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.scss";
.item {
  margin-top: 20px;
  .month {
    font-size: 25px;
    i {
      color: $danger1;
    }
  }
  li {
    margin: 15px 0;
    color: $fontColor2;
    .date {
      font-size: 14px;
      margin-right: 15px;
    }
    .title {
      font-size: 18px;
      color: $main2;
      text-decoration: none;
      &:active {
        color: $main1;
      }
    }
  }
}
</style>
