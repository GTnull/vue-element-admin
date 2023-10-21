<template>
    <el-col :span="12">
    <h4>指标： 1.1.2.招生计划完成率</h4>

    <el-card class="box-card" shadow="never">
        <div>指标填报说明：统计学年专业实际招生人数/计划招生人数x100%。</div>
    </el-card>
    
    <!-- TODO：必填项设置 -->
    <el-card> 
        <el-row>专业实际招生人数： <el-input v-model="inputReal" placeholder="请输入内容" style="width:100px;"></el-input></el-row>
        <el-row>专业计划招生人数： <el-input v-model="inputPlan" placeholder="请输入内容" style="width:100px;"></el-input></el-row>
        
    </el-card>
    

</el-col>
</template>

<script>
export default {
    name: 'Form2',
    
    data() {
        return {
            inputReal: '',
            inputPlan: '',
        }
    },
}
</script>
