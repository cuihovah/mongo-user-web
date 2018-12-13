<template>
  <el-dialog title="Login admin mongodb user" :visible.sync="visible">
    <el-form>
      <el-form-item label="Roles" :label-width="formLabelWidth">
        <el-checkbox-group 
          v-model="checkedRole">
          <el-checkbox v-for="role in ['read', 'readWrite', 'backup', 'restore']" :label="role" :key="role">{{role}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Duration" :label-width="formLabelWidth">
            <el-slider
              :format-tooltip="formatTooltip"
              v-model="aliveX">
            </el-slider>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">OK</el-button>
      <el-button type="warning" @click="cancel">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'underscore'

export default {
  props: ['visible', 'user', 'db', 'roles'],
  data () {
    return {
      alive: 0,
      aliveX: 0,
      checkedRole: [],
      formLabelWidth: '100px'
    }
  },
  watch: {
    db: () => {
      this.aliveX = 0
      this.checkedRole = this.roles
    }
  },
  methods: {
    formatTooltip (val) {
      if (val <= 10) {
          this.alive = 1 * 60 * 1000;
          return '1 min';
      }
      if (val <= 20) {
        this.alive = 1 * 60 * 1000;
          return '10 mins';
      }
      if (val <= 30) {
        this.alive = 1 * 60 * 1000;
          return '30 mins';
      }
      if (val <= 40) {
        this.alive = 1 * 3600 * 1000;
        return '1 hour';
      }
      if (val <= 50) {
        this.alive = 3 * 3600 * 1000;
        return '3 hours';
      }
      if (val <= 60) {
        this.alive = 6 * 3600 * 1000;
        return '6 hours';
      }
      if (val <= 70) {
        this.alive = 12 * 3600 * 1000;
        return '12 hours';
      }
      if (val <= 80) {
        this.alive = 1 * 86400 * 1000;
        return '1 days';
      }
      if (val <= 90) {
        this.alive = 3 * 86400 * 1000;
        return '3 days';
      }
      this.alive = 7 * 86400 * 1000;
      return '7 days';
    },
    ok () {
      this.aliveX = 0
      let result = {
        db: this.db,
        user: this.user,
        alive: this.alive,
        roles: _.map(this.checkedRole, (x) => {
          return {
            role: x,
            db: this.db
          }
        })
      }
      this.$emit('ok', result)
    },
    cancel () {
      this.aliveX = 0
      debugger
      this.$emit('cancel')
    }
  }
}
</script>