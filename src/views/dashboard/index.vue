<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import reporterDashboard from './reporter'
import reviewerDashboard from './reviewer'
import leaderDashboard from './leader'

export default {
  name: '',
  components: { adminDashboard, editorDashboard, leaderDashboard, reviewerDashboard, reporterDashboard },
  data() {
    return {
      currentRole: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // 根据不同用户切换首页
    this.currentRole = this.roles[0] + 'Dashboard'
  }
}
</script>
