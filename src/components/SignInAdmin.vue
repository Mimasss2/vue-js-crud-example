<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="userName">用户名</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="user.userName"
          name="userName"
        />
      </div>
      <div class="form-group">
        <label for="userPwd">密码</label>
        <input
            type="text"
            class="form-control"
            id="pwd"
            required
            v-model="user.userPwd"
            name="userPwd"
        />
      </div>
      <button @click="signInUser" class="btn btn-success">登录</button>
    </div>

    <div v-else-if="!success">
      <h4>登录失败!请检查用户名/密码是否输入正确。</h4>
      <button class="btn btn-success" @click="newUser">返回</button>
    </div>
    <div v-else>
      <h4>登录成功!</h4>
      <button class="btn btn-success" @click="logout">退出</button>
    </div>
  </div>
</template>

<script>
import VolunteerDataService from "../services/VolunteerDataService";

export default {
  name: "signin-admin",
  data() {
    return {
      user: {
        userId: null,
        classId: null,
        userName: null,
        userTele: null,
        userPwd: null,
      },
      submitted: false
    };

  },
  methods: {
    signInUser() {
      var data = {
        userName: this.user.userName,
        userPwd: this.user.userPwd,
      };

      VolunteerDataService.signInAdmin(data.userName, data.userPwd)
          .then(response => {
            this.userId = response.data
            this.success = response.data !== 0 ;
            console.log(response.data);
            this.submitted = true;
            localStorage.setItem("loginAdmin", this.success);
            localStorage.setItem("adminId", this.userId);
          })
          .catch(e => {
            console.log(e);
          });

    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
      this.success = false;
    },

    logout() {
      localStorage.removeItem("loginAdmin");
      localStorage.removeItem("adminId");
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
