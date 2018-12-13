<template>
  <div id="app">
  <el-row class="header">
    <el-col :span="4"><img src="./assets/mongodb-logo-white.png" height="30px"></el-col>
    <el-col :span="16">&nbsp;</el-col>
    <el-col :span="4"><el-button type="text" @click="logout" style="color: white;">Logout</el-button></el-col>
  </el-row>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  methods: {
    logout () {
      Vue.http.delete('/sessions').then( res => {
        if (window) {
          window.location.href = '/'
        }
      }).catch(err => {
        if (window) {
          window.location.href = '/'
        }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  background-color: #666;
  padding: 10px 0px;
}
</style>
