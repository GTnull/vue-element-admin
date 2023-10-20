<template>
  <div class="grid-content bg-purple">
    <h3>专业：数字媒体技术应用</h3>
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px">
        <el-tree
          :data="data123"
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
        />
      </el-col>

      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px">
        <h4>指标： 1.1.1.获得市级及以上荣誉</h4>
        <div>指标填报说明：获得上海市级及以上荣誉数量。
          如：国家级教育教学成果奖、上海市教育教学成果奖、产教融合试点专业、上海市中等职业学校示范品牌及试点专业、市教委组织的教学改革试点专业、中职专业及贯通专业评估获评“优秀”等累加数量。</div>
        <div />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          添加荣誉
        </el-button>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
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

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="荣誉名称" width="150" />
          <el-table-column prop="name" label="获得时间" width="80" />
          <el-table-column prop="address" label="获得教师" />
          <el-table-column prop="attachment" label="证书附件" />
          <el-table-column prop="act" label="操作">
            <a style="color: blue"> 修改 删除</a>
          </el-table-column>
        </el-table>
        <p /><p /><p /><p />
        <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
          保存
        </el-button>

        <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
          提交并填写下一项
        </el-button>
      </el-col>

    </el-row>

  </div>
</template>
<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { parseTime } from '@/utils'
const tableData = [
  {
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
const calendarTypeOptions = [
  { key: 'CN', display_name: '荣誉1' },
  { key: 'US', display_name: '荣誉2' },
  { key: 'JP', display_name: '荣誉3' },
  { key: 'EU', display_name: '荣誉4' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  data() {
    return {
      tableData,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '添加荣誉'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      data123: [
        {
          id: 1,
          label: <h4>1.专业基础建设</h4>,
          children: [
            {
              id: 3,
              label: '1.1.专业影响及规模',
              children: [
                {
                  id: 4,
                  label: <a href='http://localhost:9527/#/documentation/index'>1.1.1.获得市级以上荣誉 </a>
                  // label: "1.1.1.获得市级以上荣誉",
                },
                {
                  id: 5,
                  label: '1.1.2.招生计划完成率',
                  disabled: true
                }
              ]
            },
            {
              id: 2,
              label: '1.2.专业规范执行 （教学运行中心填写核对）',
              disabled: true,
              children: [
                {
                  id: 6,
                  label: '1.2.1.人陪方案/课程标准规范度'
                },
                {
                  id: 7,
                  label: '1.2.2.年度调停课率',
                  disabled: true
                },
                {
                  id: 7,
                  label: '1.2.3.教学规范达成度',
                  disabled: true
                },
                {
                  id: 7,
                  label: '1.2.4.专业质量检测排名',
                  disabled: true
                }
              ]
            }
          ]
        },
        {
          id: 1,
          label: <h4>2.师资队伍建设</h4>,
          children: [
            {
              id: 3,
              label: '2.1.数量与结构',
              children: [
                {
                  id: 4,
                  label: '2.1.1.“双师型”专任教师占比'
                },
                {
                  id: 5,
                  label: '2.1.2.高级职业技能等级证书（高级工及以上）',
                  disabled: true
                },
                {
                  id: 5,
                  label: '2.1.3.高级职称专任教师占比',
                  disabled: true
                },
                {
                  id: 5,
                  label: '2.1.4.高层次教学团队（工作室）数',
                  disabled: true
                },
                {
                  id: 5,
                  label: '2.1.5.企业兼职教师占比',
                  disabled: true
                }
              ]
            },
            {
              id: 2,
              label: '2.2.教育教学能力',
              disabled: true,
              children: [

              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
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
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
