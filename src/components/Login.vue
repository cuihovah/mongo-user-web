<template>
  <el-dialog title="Login admin mongodb user" :visible.sync="visible">
    <el-form>
      <el-form-item label="URL" :label-width="formLabelWidth">
        <el-input v-model="url" placeholder="MongoDB URL"></el-input>
      </el-form-item>
      <el-form-item label="DB" :label-width="formLabelWidth">
        <el-input v-model="dbName" placeholder="DB Name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="login">Login</el-button>
      <el-button type="warning" @click="logout">Logout</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['visible'],
  data () {
    return {
      url: '',
      dbName: '',
      formLabelWidth: '100px',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    login() {
      this.$emit('login', {
        url: this.url,
        dbName: this.dbName
      })
    },
    logout() {
      this.$emit('logout')
    }
  }
}

</script>