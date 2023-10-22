<template>
  <el-col :span="12">
    <h4>指标： 1.1.2.招生计划完成率</h4>

    <el-card class="box-card" shadow="never">
      <div>指标填报说明：统计学年专业实际招生人数/计划招生人数x100%。</div>
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="专业实际招生人数： " required="true">
          <el-input v-model="form.inputReal" placeholder="0" />
        </el-form-item>
        <el-form-item label="专业计划招生人数：" required="true">
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
  },
  created() {
    this.initData()
  },
  method: {
    save() {
      // 子组件的保存方法, 用于父组件进行调用
      console.log('Form2 子组件的保存方法被调用了')
    },
    initData() {
      // 从缓存中取数据，并设置到数据中
      const localData = localStorage.getItem('Form2')
      console.log(localData)
    }
  }
}
</script>
