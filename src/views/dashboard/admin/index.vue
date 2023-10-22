<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="40">

      <el-col :span="12">
        <el-card class="box-card">
          <div>专业排名: </div>
          学年：
          <el-select v-model="value1" placeholder="" size="small" @change="$forceUpdate()">
            <el-option v-for="item in schoolYear" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          排名区间：
          <el-select v-model="value2" class="m-2" placeholder="" size="small" @change="$forceUpdate()">
            <el-option v-for="item in rank" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-card>

      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div> 专业建设趋势分析：</div>
          时间：
          <el-select v-model="value3" class="m-2" placeholder="" size="small" @change="$forceUpdate()">
            <el-option v-for="item in schoolYear" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          专业：
          <el-select v-model="value4" class="m-2" placeholder="" size="small" @change="$forceUpdate()">
            <el-option v-for="item in subjects" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div class="chart-wrapper">
            <line-chart :chart-data="lineChartData" />
          </div>
        </el-card>

      </el-col>

    </el-row :span="24">
    <el-card class="box-card">
      <div> 专业建设趋势分析：</div>
      时间：
      <el-select v-model="value5" class="m-2" placeholder="" size="small" @change="$forceUpdate()">
        <el-option v-for="item in schoolYear" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      专业：
      <el-select v-model="value6" class="m-2" placeholder="" size="small" @change="$forceUpdate()">
        <el-option v-for="item in subjects" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div class="chart-wrapper" stype="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </div>
    </el-card>
    <el-row />
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
  'abc',
  'dsfdsf',
  'sdfsdfsdf'
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
const subjects = [
  { value: '计算机网络技术', label: '计算机网络技术' },
  { value: '分析与检验技术', label: '分析与检验技术' },
  { value: '直播电商服务', label: '直播电商服务' }
]
const schoolYear = [{
  value: '2022-2023学年',
  label: '2022-2023学年'
},
{
  value: '2021-2022学年',
  label: '2021-2022学年'
}
]
const rank = [
  { value: '0~20%', label: '0~20%' },
  { value: '20~40%', label: '20~40%' },
  { value: '40~60%', label: '40~60%' },
  { value: '60~80%', label: '60~80%' },
  { value: '80~100%', label: '80~100%' }
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
      todolistData,
      schoolYear,
      rank,
      subjects
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
