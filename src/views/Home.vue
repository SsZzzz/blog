<template>
  <div id="home">
    <header>
      <div
        class="icon"
        :class="{visited:'main'=== $route.name}"
        style="font-size:22px;"
        @click="turnURL('main')"
      >
        <i class="fa fa-home" aria-hidden="true"></i>
      </div>
      <div class="icon" :class="{visited:'tags'=== $route.name}" @click="turnURL('tags')">
        <i class="fa fa-tags" aria-hidden="true"></i>
      </div>
      <div class="icon" :class="{visited:'timeLine'=== $route.name}" @click="turnURL('timeLine')">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
      </div>
      <div class="icon" :class="{visited:'aboutMe'=== $route.name}" @click="turnURL('aboutMe')">
        <i class="fa fa-user" aria-hidden="true"></i>
      </div>
      <!-- <div class="icon" :class="{visited:'test'=== $route.name}" @click="turnURL('test')">
        <i class="fa fa-globe" aria-hidden="true"></i>
      </div>-->
      <transition
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutRight"
      >
        <div class="icon" v-if="$route.name==='main'" @click="isSearch=!isSearch">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </transition>
      <div class="dropdown">
        <avatar :username="store.userInfo.username" :src="store.userInfo.avator" :size="32"></avatar>
        <div style="height:10px;"></div>
        <div class="dropdown-content" v-if="!store.logined">
          <a href="javascript:void(0)" @click="open('isLogin')">登录</a>
          <a href="javascript:void(0)" @click="open('isRegister')">注册</a>
        </div>
        <div class="dropdown-content" v-if="store.logined">
          <a href="javascript:void(0)" @click="improveInfo">完善信息</a>
        </div>
      </div>
    </header>
    <main>
      <keep-alive include="mPage,tags,aboutMe,timeLine">
        <router-view :is-search="isSearch" @close-search="isSearch=!isSearch"/>
      </keep-alive>
    </main>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="dialog" id="login" v-show="isLogin">
        <div class="title">登录</div>
        <form @submit.prevent="login" data-vv-scope="loginForm">
          <input
            v-model="loginForm.username"
            v-validate="'required|min:3'"
            name="username"
            type="text"
            placeholder="用户名"
          >
          <span
            class="veeError"
            v-show="errors.has('loginForm.username')"
          >{{ errors.first('loginForm.username') }}</span>
          <input
            v-model="loginForm.password"
            v-validate="'required|min:6'"
            name="password"
            type="password"
            placeholder="密码"
          >
          <span
            class="veeError"
            v-show="errors.has('loginForm.password')"
          >{{ errors.first('loginForm.password') }}</span>
          <button type="submit">登录</button>
        </form>
      </div>
    </transition>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="dialog" id="register" v-show="isRegister">
        <div class="title">注册</div>
        <form @submit.prevent="register" data-vv-scope="registerForm">
          <input
            v-model="registerForm.username"
            v-validate="'required|min:3'"
            name="username"
            type="text"
            placeholder="用户名"
          >
          <span
            class="veeError"
            v-show="errors.has('registerForm.username')"
          >{{ errors.first('registerForm.username') }}</span>
          <input
            v-model="registerForm.password"
            v-validate="'required|min:6'"
            name="password"
            type="password"
            placeholder="密码"
          >
          <span
            class="veeError"
            v-show="errors.has('registerForm.password')"
          >{{ errors.first('registerForm.password') }}</span>
          <div class="captchaDiv">
            <input
              v-model="registerForm.captcha"
              v-validate="'required'"
              name="captcha"
              type="text"
              placeholder="验证码"
              class="captchaInput"
            >
            <div v-html="svgCaptcha" class="captcha"></div>
          </div>
          <span
            class="veeError"
            v-show="errors.has('registerForm.captcha')"
          >{{ errors.first('registerForm.captcha') }}</span>
          <button type="submit">注册</button>
        </form>
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="mask" v-show="isLogin||isRegister" @click="close"></div>
    </transition>
  </div>
</template>
<script>
import store from "../assets/js/store";
import Avatar from "vue-avatar";
export default {
  data() {
    return {
      store,
      isSearch: false, //是否调出搜索框
      isLogin: false, //是否调出登录框
      isRegister: false, //是否调出注册框
      svgCaptcha: "",
      registerForm: {
        username: "",
        password: "",
        captcha: ""
      },
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  watch: {
    isSearch() {
      this.changeScrolling("isSearch");
    },
    isLogin() {
      this.changeScrolling("isLogin");
    },
    isRegister() {
      this.changeScrolling("isRegister");
    }
  },
  methods: {
    turnURL(name) {
      this.$router.push({ name });
    },
    login() {
      this.$validator.validateAll("loginForm").then(res => {
        if (res) {
          this.$api.login(this.loginForm).then(res => {
            const { code, message, data } = res.data;
            if (code === 1) {
              this.$message({ content: message, type: "success" });
              this.isLogin = false;
              this.store.logined = true;
              this.store.userInfo = data;
              this.clearForm("loginForm");
            } else {
              this.$message({ content: message, type: "error" });
            }
          });
        }
      });
    },
    register() {
      this.$validator.validateAll("registerForm").then(res => {
        if (res) {
          this.$api.register(this.registerForm).then(res => {
            const { code, message } = res.data;
            if (code === 1) {
              this.$message({ content: message, type: "success" });
              this.isRegister = false;
              this.clearForm("registerForm");
            } else {
              this.$message({ content: message, type: "error" });
            }
          });
        }
      });
    },
    close() {
      this.isLogin = false;
      this.isRegister = false;
    },
    open(param) {
      if (param === "isLogin") {
        this.isLogin = true;
      } else if (param === "isRegister") {
        this.getCaptcha();
        this.isRegister = true;
      }
    },
    improveInfo() {
      this.$router.push({ name: "improveInfo" });
    },
    clearForm(form) {
      for (let key in this[form]) {
        this[form][key] = "";
      }
      setTimeout(() => {
        this.errors.clear(form);
      }, 10);
    },
    getCaptcha() {
      this.$api.captcha().then(res => {
        const { code, data } = res.data;
        if (code === 1) {
          this.svgCaptcha = data;
        }
      });
    },
    changeScrolling(p) {
      if (this[p]) {
        this.$route.meta.scrollTop = document.scrollingElement.scrollTop; //记录滚动条的位置
        document.querySelector("#home").style.position = "fixed"; //将滚动条移除
        document.querySelector("#home").style.width = "100%"; //当设置position:fixed之后,宽度若是没有设置为100%,会变窄
        document.querySelector("#home").style.top =
          -this.$route.meta.scrollTop + "px"; //设置为fixed后,界面会移到顶部,所以要将界面移到原来的位置.
      } else {
        document.querySelector("#home").style.position = "static"; //恢复滚动条
        document.scrollingElement.scrollTop = this.$route.meta.scrollTop; //将滚动条恢复到原来的位置
      }
    }
  },
  components: {
    Avatar
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: $main1;
  z-index: 10;
  padding: 0 40px;
  .dropdown {
    position: relative;
    float: right;
    width: 32px;
    height: 32px;
    margin-top: 9px;
    &:hover .dropdown-content {
      display: block;
    }
    .dropdown-content {
      display: none;
      position: relative;
      background-color: $backgroundColor2;
      width: 100px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      left: -40px;
    }
    a {
      color: $fontColor1;
      text-decoration: none;
      display: block;
      padding: 10px 0;
      text-align: center;
      &:hover {
        background-color: $backgroundColor1;
      }
    }
  }
}
main {
  background-color: $backgroundColor3;
  margin-top: 50px;
  overflow: hidden;
  width: 100%;
  & > div {
    padding: 0 40px;
  }
}
.icon {
  float: left;
  cursor: pointer;
  height: 100%;
  width: 50px;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
  color: white;
  transition: all 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.visited {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.dialog {
  position: fixed;
  width: 300px;
  padding: 20px;
  background-color: white;
  top: 25vh;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 12;
  .title {
    font-size: 20px;
    color: $fontColor2;
    padding: 0 0 15px 0;
    border-bottom: 1px solid $borderColor1;
  }
  input {
    height: 35px;
    margin-top: 25px;
    width: 100%;
  }
  .captchaDiv {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    .captchaInput {
      width: 160px;
      margin-top: 0;
    }
  }

  button {
    margin-top: 25px;
    padding: 8px 20px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 0 20px;
  }
  main {
    & > div {
      padding: 0 20px;
    }
  }
}
</style>
