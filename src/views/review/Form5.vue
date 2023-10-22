<template>
    <el-col :span="18">
    <h4>指标： 1.2.3.教学规范达成度</h4>
    
    <el-card class="box-card" shadow="never"> 
        <div>指标填报说明：专业教学检查评分值。</div>
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="专业教学检查评分值：" required="true">
                <el-input v-model="form.name" placeholder="0"></el-input>
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
                name: '',
            }
        }
    },
}
</script>
