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
          v-model="user.adminName"
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
            v-model="user.adminTele"
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
            v-model="user.adminPwd"
            name="userPwd"
        />
      </div>

      <div class="form-group">
        <label for="classId">学院号</label>
        <input
          class="form-control"
          id="classId"
          required
          v-model="user.schoolId"
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
        schoolId: null,
        adminName: null,
        adminTele: null,
        adminPwd: null,
      },
      submitted: false
    };

  },
  methods: {
    saveUser() {
      var data = {
        schoolId: this.user.schoolId,
        adminName: this.user.adminName,
        adminTele: this.user.adminTele,
        adminPwd: this.user.adminPwd,
      };

      VolunteerDataService.createAdmin(data)
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
