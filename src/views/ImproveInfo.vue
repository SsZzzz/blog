<template>
  <div>
    <input type="file" class="file" ref="file" @change="change">
    <avatar
      class="avatar"
      @click.native="upload"
      :username="store.userInfo.username"
      :src="editForm.avator"
      :size="150"
      :rounded="false"
    ></avatar>
    <form @submit.prevent="edit">
      <input
        v-model="editForm.username"
        v-validate="'required|min:3'"
        name="username"
        type="text"
        placeholder="用户名"
      >
      <span class="veeError" v-show="errors.has('username')">{{ errors.first('username') }}</span>
      <input
        v-model="editForm.password"
        v-validate="'required|min:6'"
        name="password"
        type="password"
        placeholder="密码"
      >
      <span class="veeError" v-show="errors.has('password')">{{ errors.first('password') }}</span>
      <input v-model="editForm.email" v-validate="'email'" name="email" placeholder="邮箱">
      <span class="veeError" v-show="errors.has('email')">{{ errors.first('email') }}</span>
      <button type="submit">保存</button>
    </form>
  </div>
</template>
<script>
import store from "../assets/js/store";
import Avatar from "vue-avatar";
export default {
  data() {
    const editForm = {
      username: "",
      password: "",
      email: "",
      avator: ""
    };
    for (let key in editForm) {
      editForm[key] = store.userInfo[key];
    }
    return {
      store,
      editForm
    };
  },
  methods: {
    upload() {
      this.$refs.file.click();
    },
    change() {
      const file = this.$refs.file.files[0];
      if (!file) {
        return;
      }
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message({
          content: "上传头像图片只能是 JPG或PNG 格式!",
          type: "error"
        });
        return;
      }
      if (!isLt2M) {
        this.$message({
          content: "上传头像图片大小不能超过 2MB!",
          type: "error"
        });
        return;
      }
      const formdata = new FormData(); // 创建form对象
      formdata.append("image", file);
      this.$api.saveImage(formdata).then(res => {
        const { code, message, data } = res.data;
        if (code === 1) {
          this.editForm.avator = data.image;
        } else {
          this.$message({ content: message, type: "error" });
        }
      });
    },
    edit() {
      this.$validator.validate().then(res => {
        if (res) {
          this.$api.editUserInfo(this.editForm).then(res => {
            const { code, message, data } = res.data;
            if (code === 1) {
              this.$message({ content: message, type: "success" });
              this.store.userInfo = data;
            } else {
              this.$message({ content: message, type: "error" });
            }
          });
        }
      });
    }
  },
  components: {
    Avatar
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.scss";
.file {
  display: none;
}
.avatar {
  margin-top: 20px;
  border: 1px solid $borderColor1;
  cursor: pointer;
}
input,
button {
  height: 40px;
  margin-top: 30px;
}
input {
  width: 300px;
}
button {
  width: 100px;
}
</style>
