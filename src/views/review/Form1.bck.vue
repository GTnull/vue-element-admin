<template>
  <el-col :span="16">
    <h4>指标： 1.1.1.获得市级及以上荣誉</h4>

    <el-card class="box-card" shadow="never">
      <div>指标填报说明：获得上海市级及以上荣誉数量。
        如：国家级教育教学成果奖、上海市教育教学成果奖、产教融合试点专业、上海市中等职业学校示范品牌及试点专业、
        市教委组织的教学改革试点专业、中职专业及贯通专业评估获评“优秀”等累加数量。</div>

    </el-card>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="荣誉名称：" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="获得时间：" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="" />
        </el-form-item>
        <el-form-item label="获得教师：" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="证书附件：">
          <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
            上传
          </el-button>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#FFDEAD', color: '#333' }">
      <el-table-column prop="date" label="荣誉名称" width="150" />
      <el-table-column prop="name" label="获得时间" width="80" />
      <el-table-column prop="address" label="获得教师" />
      <el-table-column prop="attachment" label="证书附件" />
      <el-table-column prop="act" label="操作">
        <a style="color: blue"> 修改 删除</a>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script>
const calendarTypeOptions = [{
  key: 'CN',
  display_name: '荣誉1'
},
{
  key: 'US',
  display_name: '荣誉2'
},
{
  key: 'JP',
  display_name: '荣誉3'
},
{
  key: 'EU',
  display_name: '荣誉4'
}
]
const consttableData = [{
  date: '上海市教育教学成果奖',
  name: '2022.09',
  address: '重要奖项',
  attachment: '',
  act: '修改 删除'
},
{
  date: '产教融合试点专业',
  name: '2022.09',
  address: '重要奖项',
  attachment: '',
  act: '修改 删除'
}
]

export default {
  name: 'Form1',

  data() {
    return {
      tableData: consttableData,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '添加荣誉'
      },
      temp: {
        date: new Date(),
        name: '',
        address: '',
        attachment: '',
        id: undefined
      },
      dialogFormVisible: false,
      calendarTypeOptions
    }
  },
  created() {
    this.initData()
  },
  methods: {
    resetTemp() {
      this.temp = {
        date: new Date(),
        name: '',
        address: '',
        attachment: '',
        id: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      const data = this.temp
      this.tableData.push(data)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    save() {
      // 子组件的保存方法, 用于父组件进行调用
      console.log('Form1 子组件的保存方法被调用了')
      localStorage.setItem('Form1', generateJson(this.tableData))
    },
    initData() {
      // todo 从后端取数据，放到tableData
      // 从缓存中取数据，并设置到数据中
      const localData = localStorage.getItem('Form1')
      this.tableData = parseJson(localData) || consttableData
    }
  }
}
// 解析 JSON 字符串为对象
function parseJson(jsonString) {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('解析 JSON 失败:', error)
    return null
  }
}

// 将对象转换为格式化的 JSON 字符串
function generateJson(data) {
  try {
    return JSON.stringify(data, null, 2) // 使用缩进为2的格式化
  } catch (error) {
    console.error('生成 JSON 失败:', error)
    return null
  }
}

</script>

