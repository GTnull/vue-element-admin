<template>
  <div class="dashboard-editor-container">
    <h4>欢迎登录上海信息技术学校专业建设与发展质量评估系统</h4>
    <h4>请各专业老师按照各指标的填报要求，如实填报并上传相关证明材料</h4>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="40">

      <el-col :span="12">
        <el-card class="box-card">
          <div>审批情况总览 </div>
        系部：
        <el-select v-model="value" class="m-2" placeholder="" size="small" @change="$forceUpdate()">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        专业：
        <el-select v-model="value" class="m-2" placeholder="" size="small" @change="$forceUpdate()">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <div class="chart-wrapper">
          <pie-chart />
        </div>
        </el-card>
        
      </el-col>

      <el-col :span="12">
        <!-- <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-order"></i>
        <span>卡片名称</span>
      </div>
      <div style="margin-left: 100px;">
        <div v-for= "x  in todolistData"><el-radio v-model="radio" label="1">{{x}}</el-radio></div>
      </div>
        
        </el-card> -->

        <el-row :gutter="0">
          <todo-list />
        </el-row>

        <el-row :gutter="0">
          <todo-list1 />
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import TodoList1 from './components/TodoList1'
import BoxCard from './components/BoxCard'
const todolistData = [
  "abc",
  "dsfdsf",
  "sdfsdfsdf"
]

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

const options = [{
  value: '智能制造',
  label: '智能制造'
},
{
  value: '材料与检测',
  label: '材料与检测'
},
{
  value: '信息技术系',
  label: '信息技术系'
},
{
  value: '商务管理系',
  label: '商务管理系'
},
{
  value: '中本贯通',
  label: '中本贯通'
}
]

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    TodoList1,
    BoxCard
  },
  data() {
    return {
      options,
      todolistData
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
        position: absolute;
        top: 0px;
        border: 0;
        right: 0;
    }

    .chart-wrapper {
        background: #fff;
        padding: 126px 66px 0;
        margin-bottom: 62px;
    }
}

@media (max-width:1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}
</style>
