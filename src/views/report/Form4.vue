<template>
  <el-col :span="18">
    <h4>指标： 1.2.2.年度调停课率</h4>

    <el-card class="box-card" shadow="never">
      <div>指标填报说明：学年（因私）调停课学时/学年开课总学时。</div>
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="学年（因私）调停课学时：" required="true">
          <el-input v-model="form.inputReal" placeholder="0" />
        </el-form-item>
        <el-form-item label="学年开课总学时数：" required="true">
          <el-input v-model="form.inputPlan" placeholder="0" />
        </el-form-item>
      </el-form>
    </el-card>

  </el-col>
</template>

<script>
export default {
  name: 'Form2',

  data() {
    return {
      form: {
        inputPlan: '',
        inputReal: ''
      }
    }
  }
}
</script>
