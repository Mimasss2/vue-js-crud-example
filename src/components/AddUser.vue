<template>
  <div class="submit-form">
    <div v-if="!submitted" >
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
        <label for="userTele">电话号码</label>
        <input
            type="text"
            class="form-control"
            id="tele"
            required
            v-model="user.userTele"
            name="userTele"
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

      <div class="form-group">
        <label for="classId">班级号</label>
        <input
          class="form-control"
          id="classId"
          required
          v-model="user.classId"
          name="classId"
        />
      </div>
      <br>
      <button @click="saveUser" class="btn btn-success">提交</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">注册</button>
    </div>
  </div>
</template>

<script>
import VolunteerDataService from "../services/VolunteerDataService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        classId: null,
        userName: null,
        userTele: null,
        userPwd: null,
      },
      submitted: false
    };

  },
  methods: {
    saveUser() {
      var data = {
        classId: this.user.classId,
        userName: this.user.userName,
        userTele: this.user.userTele,
        userPwd: this.user.userPwd,
      };

      VolunteerDataService.createUser(data)
          .then(response => {
            this.success = response.data;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
      this.success = false;
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
