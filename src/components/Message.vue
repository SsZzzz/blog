<template>
  <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
    <div id="message" v-show="visible" :class="type">
      <div class="content">{{content}}</div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      duration: 2000,
      type: "info"
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      setTimeout(() => {
        this.close();
      }, this.duration);
    },
    destroyElement() {
      setTimeout(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      }, 1000);
    },
    close() {
      this.visible = false;
      this.destroyElement();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
#message {
  height: 40px;
  width: 300px;
  border-radius: 5px;
  position: fixed;
  left: 0;
  right: 0;
  top: 30px;
  margin: auto;
  .content {
    height: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
  }
}
.info {
  background-color: $info3;
  color: $info1;
  border: 1px solid $info2;
}
.success {
  background-color: $success3;
  color: $success1;
  border: 1px solid $success2;
}
.error {
  background-color: $danger3;
  color: $danger1;
  border: 1px solid $danger2;
}
</style>
