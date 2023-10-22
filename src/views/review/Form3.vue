<template>
  <el-col :span="12">
    <h4>指标： 1.2.1 人陪方案/课程标准规范度</h4>

    <el-card class="box-card" shadow="never">
      <div>指标填报说明：基于《上海市中等职业学校专业教学标准》制定本专业人才培养方案及课程标准，
        经本专业专家指导委员会进行审核及修订。专业人才培养方案及课程标准应符合编制规范，
        有完整的专家指导委员会会议记录及审核意见。</div>
    </el-card>

    <!-- TODO：必填项设置 -->
    <el-card>
      <el-row>专业人才培养方案附件： <el-input v-model="inputReal" placeholder="请输入内容" style="width:100px;" /></el-row>
      <el-row>专业人才培养方案专家指导委员会会议记录： <el-input v-model="inputPlan" placeholder="请输入内容" style="width:100px;" /></el-row>
      <el-row>专业人才培养方案专家指导委员会审核意见附件： <el-input v-model="inputPlan" placeholder="请输入内容" style="width:100px;" /></el-row>
      <el-row>专业课程标准附件： <el-input v-model="inputReal" placeholder="请输入内容" style="width:100px;" /></el-row>
      <el-row>专业课程标准专家指导委员会会议记录： <el-input v-model="inputPlan" placeholder="请输入内容" style="width:100px;" /></el-row>
      <el-row>专业课程标准专家指导委员会审核意见附件： <el-input v-model="inputPlan" placeholder="请输入内容" style="width:100px;" /></el-row>

    </el-card>

  </el-col>
</template>

<script>
export default {
  name: 'Form2',

  data() {
    return {
      inputReal: '',
      inputPlan: ''
    }
  }
}
</script>
