<template>
  <el-col :span="16">
    <h4>指标： 1.1.1.获得市级及以上荣誉</h4>

    <el-card class="box-card" shadow="never">
      <div>
        指标填报说明：获得上海市级及以上荣誉数量。
        如：国家级教育教学成果奖、上海市教育教学成果奖、产教融合试点专业、上海市中等职业学校示范品牌及试点专业、
        市教委组织的教学改革试点专业、中职专业及贯通专业评估获评“优秀”等累加数量。
      </div>
    </el-card>
    <el-button
      v-if="identity === 'report'"
      class="filter-item"
      style="margin-left: 10px"
      type="primary"
      icon="el-icon-edit"
      @click="handleCreate"
    >
      添加荣誉
    </el-button>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="荣誉名称：" prop="honorId">
          <el-select v-model="temp.honorId" class="filter-item" placeholder="">
            <el-option
              v-for="item in honorList"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="获得时间：" prop="time">
          <el-date-picker v-model="temp.time" type="datetime" placeholder="" />
        </el-form-item>
        <el-form-item label="获得教师：" prop="teacher">
          <el-input v-model="temp.teacher" />
        </el-form-item>

        <el-form-item label="证书附件：" prop="attachment">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        :border="true"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >Confirm</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#FFDEAD', color: '#333' }"
    >
      <el-table-column prop="honorName" label="荣誉名称" width="150" />
      <el-table-column prop="time" label="获得时间" width="80" />
      <el-table-column prop="teacher" label="获得教师" />
      <el-table-column prop="attachment" label="证书附件">
        <!-- <template slot-scope="scope"> -->
        <!--todo 使用el-image错误 -->
        <i class="el-icon-picture" />
        <!-- </template> -->
      </el-table-column>
      <el-table-column prop="action" label="操作">
        <a style="color: blue"> 修改 删除</a>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script>
const honorList = [
  {
    key: '1',
    display_name: '荣誉1'
  },
  {
    key: '2',
    display_name: '荣誉2'
  },
  {
    key: '3',
    display_name: '荣誉3'
  },
  {
    key: '4',
    display_name: '荣誉4'
  },
  {
    key: '5',
    display_name: '上海市教育教学成果奖'
  },
  {
    key: '6',
    display_name: '产教融合试点专业'
  }
]
const consttableData = [
  {
    honorId: '5',
    honorName: '上海市教育教学成果奖',
    time: '2022.09',
    teacher: '章三',
    attachment: './img/bird.jpeg',
    action: '修改 删除'
  },
  {
    honorId: '6',
    honorName: '产教融合试点专业',
    time: '2022.09',
    teacher: '重要奖项',
    attachment: 'img/bird.jpeg',
    action: '修改 删除'
  }
]

export default {
  name: 'Form1',
  props: {
    identity: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tableData: consttableData,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '添加荣誉'
      },
      rules: {
        honorId: [
          { required: true, message: '荣誉名称不能为空', trigger: 'blur' }
          // 其他验证规则
        ]
        // 其他表单字段的验证规则
      },
      temp: {},
      dialogFormVisible: false,
      honorList
    }
  },
  created() {
    this.resetTemp()
    this.initData()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        honorId: undefined,
        time: new Date(),
        teacher: '',
        attachment: ''
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.honorName = honorList.find(
            (honor) => honor.key === this.temp.honorId
          ).display_name
          // todo 修改成dayjs
          // this.temp.time = dayjs(this.temp.time).format('YYYY-MM')
          const date = new Date(this.temp.time)
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, '0') // 获取月份，并确保是两位数

          this.temp.time = `${year}-${month}`
          const data = this.temp
          this.tableData.push(data)
          console.log(123, data)
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
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
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
      this.$notify({
        title: '保存成功',
        message: '保存成功',
        type: 'success',
        duration: 2000
      })
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
