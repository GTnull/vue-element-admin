<template>
    <el-col :span="18">
    <h4>指标： 1.2.4.专业质量监测排名</h4>
    
    <el-card class="box-card" shadow="never"> 
        <div>指标填报说明：参与中等职业学校专业质量监测，且排名位于前1/4（教育督导委员会）</div>
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="专业质量监测排名：" required="true">
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
