<template>
  <div v-if="handled" align="center">
    该申请已成功处理！
  </div>
  <div v-else>
    <div class="list row">
      <div v-if="login">
        <div class="col-md-6">
          <h4>我收到的所有申请</h4>
          <ul class="list-group">
            <li class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(application, index) in applications"
                :key="index"
                @click="setActiveApplication(application, index)"
            >
              {{ application.activityTitle }} By {{application.userName}}
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <div v-if="currentApplication">
            <h4>申请</h4>
            <div>
              <label><strong>编号:</strong></label> {{ currentApplication.appId }}
            </div>
            <div>
              <label><strong>申请人名字:</strong></label> {{ currentApplication.userName }}
            </div>
            <div>
              <label><strong>申请人电话:</strong></label> {{ currentApplication.userTele }}
            </div>
            <div>
              <label><strong>申请状态:</strong></label> {{ currentApplication.appStatus ? (currentApplication.appStatus == 2 ? "拒绝":"接受") : "待审核" }}
            </div>
            <div>
              <label><strong>活动名称:</strong></label> {{ currentApplication.activityTitle }}
            </div>
            <div>
              <label><strong>活动状态:</strong></label> {{ currentApplication.activityStatus ? (currentApplication.activityStatus == 2 ? "取消":"结束") : "开放" }}
            </div>
            <div>
              <label><strong>申请修改时间:</strong></label> {{ currentApplication.appUpdateDate }}
            </div>
            <div>
              <div v-if="currentApplication.appStatus === 0"  align="center">
                <br>
                <button @click="acceptApp" class="btn btn-success">接受</button>
                or
                <button class="btn btn-danger" @click="rejectApp">拒绝</button>
              </div>
              <div v-else-if="currentApplication.appStatus === 2"  align="center">
                <br>
                <h5> 该申请已被拒绝！</h5>
              </div>
              <div v-else align="center">
                <br>
                <h5> 该申请已被接受！</h5>
              </div>
            </div>

            <!--        <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning">Edit</router-link>-->
          </div>
          <div v-else>
            <br />
            <p>请选择一个申请</p>
          </div>
        </div>
      </div>

      <div v-else>
        <h2>管理员登录后才可查看！</h2>
      </div>
    </div>
  </div>


</template>

<script>
import VolunteerDataService from "@/services/VolunteerDataService";

export default {
  name: "application-list-admin",
  data() {
    return {
      applications: [],
      currentApplication: null,
      currentIndex: -1,
      title: "",
      login: false,
      handled: false,
    };
  },
  methods: {
    retrieveApplications() {
      this.login = localStorage.getItem("loginAdmin") == "undefined" ? false:localStorage.getItem("loginAdmin");
      VolunteerDataService.showAppForAdmin(localStorage.getItem("adminId"))
        .then(response => {
          this.applications = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveApplications();
      this.currentTutorial = null;
      this.currentIndex = -1;
      this.handled = false;
    },

    setActiveApplication(application, index) {
      this.currentApplication = application;
      this.currentIndex = index;
    },

    acceptApp() {
      this.handled = true;
      VolunteerDataService.updateAppStatus(this.currentApplication.appId, 1)
          .then(response => {
            this.applications = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      // this.refreshList();
    },

    rejectApp(){
      this.handled = true;
      VolunteerDataService.updateAppStatus(this.currentApplication.appId, 2)
          .then(response => {
            this.applications = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      // this.refreshList();
    },
  },
  mounted() {
    this.retrieveApplications();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
