<template>
  <div class="list row">
<!--    <div class="col-md-8">-->
<!--      <div class="input-group mb-3">-->
<!--        <input type="text" class="form-control" placeholder="Search by title"-->
<!--               v-model="title"/>-->
<!--        <div class="input-group-append">-->
<!--          <button class="btn btn-outline-secondary" type="button"-->
<!--                  @click="searchTitle"-->
<!--          >-->
<!--            Search-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="col-md-6">
      <h4>Activity List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(activity, index) in activities"
            :key="index"
            @click="setActiveActivity(activity, index)"
        >
          {{ activity.activityTitle }}
        </li>
      </ul>

<!--      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">-->
<!--        Remove All-->
<!--      </button>-->
    </div>
    <div class="col-md-6">
      <div v-if="successInfo">
        <br />
        <p>活动申请成功</p>
        <button @click="seeActivity" class="btn btn-success">查看活动信息</button>
      </div>
      <div v-else-if="currentActivity">
        <h4>Activity</h4>
        <div>
          <label><strong>编号:</strong></label> {{ currentActivity.activityId }}
        </div>
        <div>
          <label><strong>名称:</strong></label> {{ currentActivity.activityTitle }}
        </div>
        <div>
          <label><strong>描述:</strong></label> {{ currentActivity.activityDescription }}
        </div>
        <div>
          <label><strong>状态:</strong></label> {{ currentActivity.activityStatus ? (currentActivity.activityStatus == 2 ? "取消":"结束") : "开放" }}
        </div>
        <div>
          <label><strong>所需人数:</strong></label> {{ currentActivity.activityNumPeople }}
        </div>
        <div>
          <label><strong>地点:</strong></label> {{ currentActivity.activityPlace }}
        </div>
        <div>
          <label><strong>要求:</strong></label> {{ currentActivity.activityRequirements }}
        </div>
        <div>
          <label><strong>时间:</strong></label> {{ currentActivity.activityTime }}
        </div>
        <div v-if="login" align="center">
          <br>
          <button @click="apply" class="btn btn-success">申请参加</button>
        </div>
        <div v-else>
          <br>
          <p>**登录后才可申请参加活动！请先登录！**</p>
        </div>
      </div>
      <div v-else>
        <br />
        <p>请选择一个活动</p>
      </div>
    </div>
  </div>
</template>

<script>
import VolunteerDataService from "../services/VolunteerDataService";

export default {
  name: "activities-list",
  data() {
    return {
      activities: [],
      currentActivity: null,
      successInfo: false,
      currentIndex: -1,
      title: "",
      login: localStorage.getItem("login") == "undefined" ? false:localStorage.getItem("login"),
    };
  },
  methods: {
    retrieveActivities() {
      VolunteerDataService.getAllActivities()
          .then(response => {
            this.activities = response.data;
            console.log(response.data);
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveActivities();
      this.currentActivity = null;
      this.currentIndex = -1;

      this.login =  localStorage.getItem("login") == "undefined" ? false:localStorage.getItem("login");
    },

    setActiveActivity(activity, index) {
      this.currentActivity = activity;
      this.currentIndex = index;
      this.successInfo = false;
    },
    apply() {
      var data = {
        appStatus: 0,
        activityId: this.currentActivity.activityId,
        userId: localStorage.getItem("userId")
      }
      VolunteerDataService.apply(data)
          .then(response => {
            this.successInfo = true;
            console.log(response.data);
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    seeActivity() {
      this.successInfo = false;
    }


  },
  mounted() {
    this.retrieveActivities();
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
