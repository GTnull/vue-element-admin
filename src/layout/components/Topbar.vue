<template>
  <div class="top-nav">
  后台管理系统
    <div class="log">后台管理系统</div>

    <el-menu :active-text-color="variables.menuActiveText" :default-active="activeMenu" mode="horizontal" @select="handleSelect">
      <div v-for="item in routes" :key="item.path" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item v-if="!item.hidden" :index="item.path">{{ item.meta ? item.meta.title : item.children[0].meta.title }}</el-menu-item>
        </app-link>
      </div>
    </el-menu>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a href="https://github.com/PanJiaChen/vue-admin-template/" target="_blank">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a href="https://panjiachen.github.io/vue-element-admin-site/#/" target="_blank">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
