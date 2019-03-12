<template>
  <div>
    <div class="photo">
      <img src="../assets/img/me.jpg">
    </div>
    <div class="content">
      <span>博客简述</span>
      <ul>
        <li>本博客前台使用vue,后台使用vue+element-ui,服务使用node+koa2+mysql.</li>
        <li>本博客前台源码为github,后台源码为github,服务为github.</li>
      </ul>
      <span>关于我</span>
      <ul>
        <li>姓名:苏泽</li>
        <li>学历:本科</li>
        <li>学校:浙江科技学院</li>
        <li>邮箱:suze0526@gmail.com|1144270183@qq.com</li>
        <li>坐标:杭州</li>
        <li>github地址:https://github.com/SsZzzz</li>
        <li>技能
          <ul>
            <li>html,html5</li>
            <li>css,css3</li>
            <li>javascript,es6</li>
            <li>vue,element-ui,vux</li>
            <li>node,koa2</li>
            <li>java</li>
            <li>oracle,mysql</li>
          </ul>
        </li>
        <li>其他
          <ul>
            <li>常用工具:vscode,git,navicat,eclipse</li>
            <li>使用过echarts等工具</li>
            <li>有良好的代码习惯,es6编程遵循Airbnb编码规范</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "aboutMe"
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.scss";
.photo {
  width: 250px;
  height: 250px;
  margin: 20px auto;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
.content {
  width: 700px;
  margin: 0 auto;
  span {
    font-size: 22px;
  }
  li {
    font-size: 18px;
    color: $fontColor2;
    margin: 10px;
  }
}
</style>

