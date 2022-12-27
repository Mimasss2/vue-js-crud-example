<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Mimas</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">活动日志</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">过期活动</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/signInUser" class="nav-link">用户登录</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/insertUser" class="nav-link">用户注册</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/activity/all" class="nav-link">活动</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/signInAdmin" class="nav-link">管理员登录</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/insertAdmin" class="nav-link">管理员注册</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/application/getAppByAdminId" class="nav-link">申请查看（管理员）</router-link>
        </li>



      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
