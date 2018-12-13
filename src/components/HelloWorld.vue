<template>
  <div class="login">
  <login :visible="dialogFormVisible"  @login="login" @logout="logout"/>
  <view-ops 
    :user="user.user" 
    :db="user.db" 
    :roles="user.roles" 
    :visible="dialogOpsVisible"  
    @ok="updateRole" 
    @cancel="cancelRole" />
  <el-main>
    <el-table
    :data="users"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="db"
      label="DB"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user"
      label="User"
      width="120">
    </el-table-column>
    <el-table-column
      prop="roles"
      label="Roles">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="option"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleOps(scope.row)" type="text" size="small">View</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
  <el-footer></el-footer>
  </div>
</template>

<script>
import Login from './Login'
import Vue from 'vue'
import ViewOps from './ViewOps'
import _ from 'underscore'

export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
        user: '',
        db: '',
        roles: []
      },
      users: [],
      dialogFormVisible: false,
      dialogOpsVisible: false
    }
  },
  created () {
    Vue.http.get('/users').then( res => {
      let data = res;
      data = _.map(data, (x) => {
        return {
          user: x.user,
          db: x.db,
          roles: JSON.stringify(x.roles)
        }
      });
      this.users = data
    }).catch (err => {
      if (err.code === 401) {
        this.dialogFormVisible = true;
      }
    })
  },
  methods: {
    handleOps(row) {
      let roles = JSON.parse(row.roles);
      roles = _.filter(roles, (x) => {
        return x.db === row.db;
      });
      this.user = {
        user: row.user,
        db: row.db,
        roles: _.pluck(roles, 'role')
      };
      this.dialogOpsVisible = true;
    },
    login (data) {
      this.dialogFormVisible = false
      Vue.http.post('/sessions', data).then(data => {
        Vue.http.get('/users').then( res => {
          let data = res;
          data = _.map(data, (x) => {
            return {
              user: x.user,
              db: x.db,
              roles: JSON.stringify(x.roles)
            }
          });
          this.users = data
        }).catch (err => {
          if (err.code === 401) {
            this.dialogFormVisible = true;
          }
        })
      }).catch(err => {
      });
    },
    updateRole (data) {
      this.dialogOpsVisible = false
      let user = data.user
      let db = data.db
      delete data.user
      delete data.db
      Vue.http.put(`/dbs/${db}/users/${user}`, data).then(res => {
        this.$message({
          message: 'SUCCESS!',
          type: 'success'
        });
      }).catch(err => {
        this.$message({
          message: `${err.message}`,
          type: 'warning'
        });
      })
    },
    cancelRole () {
      debugger;
      this.dialogOpsVisible = false
    },
    logout () {
      this.dialogFormVisible = false
    }
  },
  components: {
    Login: Login,
    ViewOps: ViewOps
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
