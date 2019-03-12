<template>
  <div>
    <ul>
      <li v-for="(item,index) in labelList" :key="index">
        <a href="javascript:void(0)" @click="viewArticleList(item.id)">{{item.name}}</a>
        <span class="englishName">{{item.englishName}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "tags",
  data() {
    return {
      labelList: []
    };
  },
  created() {
    this.getLabel();
  },
  methods: {
    getLabel() {
      this.$api.getLabel().then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.labelList = data;
        }
      });
    },
    viewArticleList(id) {
      this.$router.push({ name: "main", query: { labelid: id } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.scss";
ul {
  padding: 0;
  margin-top: 20px;
}
li {
  list-style: none;
  margin: 10px 0;
}
a {
  text-decoration: none;
  font-size: 26px;
  color: $main2;
  &:active {
    color: $main1;
  }
}
.englishName {
  font-size: 20px;
  color: $fontColor2;
  margin-left: 10px;
}
</style>