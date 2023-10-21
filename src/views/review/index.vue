<template>
<div class="grid-content bg-purple">
    reviewer
    <h3>专业：数字媒体技术应用</h3>
    <el-row :gutter="40">
        <el-col :span="8">
            <el-tree ref="eltree" icon-class="el-icon-eleme" :data="data123" node-key="id" :default-expand-all="true" :default-checked-keys="checkedKeys" :expand-on-click-node="false" :highlight-current="true" :render-content="renderContent" @node-click="handleNodeClick" />
        </el-col>

        <div v-if="selectKey==='1.1.1' || selectKey==='1' || selectKey==='1.1'">
            <form1></form1>
        </div>
        <div v-if="selectKey==='1.1.2'">
            <form2></form2>
        </div>
        <div v-if="selectKey==='1.2.1'">
            <form3></form3>
        </div>
        <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
            保存
        </el-button>
        <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="submitAndNext">
            提交并填写下一项
        </el-button>

    </el-row>
</div>
</template>

<script>
import Form1 from './Form1.vue'
import Form2 from './Form2.vue'
import Form3 from './Form3.vue'

export default {
    name: 'doc',
    components: {
        Form1,
        Form2,
        Form3,
    },
    data() {
        return {
            selectKey: 1,
            finishKey: [],
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

            sortOptions: [{
                label: 'ID Ascending',
                key: '+id'
            }, {
                label: 'ID Descending',
                key: '-id'
            }],
            statusOptions: ['published', 'draft', 'deleted'],
            showReviewer: false,

            dialogPvVisible: false,
            pvData: [],
            rules: {
                type: [{
                    required: true,
                    message: 'type is required',
                    trigger: 'change'
                }],
                timestamp: [{
                    type: 'date',
                    required: true,
                    message: 'timestamp is required',
                    trigger: 'change'
                }],
                title: [{
                    required: true,
                    message: 'title is required',
                    trigger: 'blur'
                }]
            },
            downloadLoading: false,
            checkedKeys: [1],
            data123: [
              {
                id: '1',
                label: <h4>1.专业基础建设</h4>,
                children: [
                  {
                    id: '1.1',
                    label: '1.1.专业影响及规模',
                    children: [
                      {
                        id: '1.1.1',
                        label: "1.1.1.获得市级以上荣誉",
                      },
                      {
                        id: '1.1.2',
                        label: '1.1.2.招生计划完成率',
                        disabled: true
                      }
                    ]
                  },
                  {
                    id: '1.2',
                    label: '1.2.专业规范执行 （教学运行中心填写核对）',
                    disabled: true,
                    children: [
                      {
                        id: '1.2.1',
                        label: '1.2.1.人陪方案/课程标准规范度'
                      },
                      {
                        id: '1.2.2',
                        label: '1.2.2.年度调停课率',
                        disabled: true
                      },
                      {
                        id: '1.2.3',
                        label: '1.2.3.教学规范达成度',
                        disabled: true
                      },
                      {
                        id: '1.2.4',
                        label: '1.2.4.专业质量检测排名',
                        disabled: true
                      }
                    ]
                  }
                ]
              },
              // {
              //   id: 1,
              //   label: <h4>2.师资队伍建设</h4>,
              //   children: [
              //     {
              //       id: 3,
              //       label: '2.1.数量与结构',
              //       children: [
              //         {
              //           id: 4,
              //           label: '2.1.1.“双师型”专任教师占比'
              //         },
              //         {
              //           id: 5,
              //           label: '2.1.2.高级职业技能等级证书（高级工及以上）',
              //           disabled: true
              //         },
              //         {
              //           id: 5,
              //           label: '2.1.3.高级职称专任教师占比',
              //           disabled: true
              //         },
              //         {
              //           id: 5,
              //           label: '2.1.4.高层次教学团队（工作室）数',
              //           disabled: true
              //         },
              //         {
              //           id: 5,
              //           label: '2.1.5.企业兼职教师占比',
              //           disabled: true
              //         }
              //       ]
              //     },
              //     {
              //       id: 2,
              //       label: '2.2.教育教学能力',
              //       disabled: true,
              //       children: [

              //       ]
              //     }
              //   ]
              // }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            const currentKey = this.$refs.eltree.getCurrentKey()
            console.log('handleNode' + currentKey)
            this.selectKey = currentKey

        },
        submitAndNext() {
            const currentNode = this.$refs.eltree.getCurrentNode()
            if (currentNode.children !== undefined) {
                return
            }
            if (this.finishKey.includes(currentNode.id)) {
                return
            }
            this.finishKey.push(currentNode.id)
        },
        renderContent(h, {
            node,
            data,
            store
        }) {
            // 重新渲染，如果finishKey包含当前节点，那么添加对号
            if (this.finishKey.includes(node.key)) {
                return ( < span >
                    <
                    div > {
                        node.label
                    } < icon class = 'el-icon-success'
                    style = 'color: green;float: right;position: absolute;right: 10px;' / >
                    <
                    /div> </span >
                )
            }
            return ( < span > {
                        node.label
                    } < /span>)
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
        }
    }
</script>

<style>
/* 树节点之间边距 */
.el-tree-node {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
