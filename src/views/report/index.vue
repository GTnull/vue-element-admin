<template>
  <div class="grid-content bg-purple">
    <h3>专业：数字媒体技术应用</h3>
    <el-row :gutter="40">
      <el-col :span="8">
        <el-tree
          ref="eltree"
          icon-class="el-icon-eleme"
          :data="treeData"
          node-key="id"
          :default-expand-all="true"
          :expand-on-click-node="false"
          :highlight-current="true"
          :render-content="renderContent"
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :span="16">
        <el-row>
          <!-- 动态的切换右侧组件 -->
          <component
            :is="dynamicChildComponentName"
            :ref="dynamicChildComponentName"
            identity="report"
          />
        </el-row>

        <el-row>
          <div v-if="dynamicChildComponentName !== ''">
            <el-button
              :loading="loading"
              size="mini"
              type="primary"
              @click="dynamicChildSaveMethod"
            >
              保存
            </el-button>
            <el-button
              :loading="loading"
              size="mini"
              type="primary"
              @click="submitAndNext"
            >
              提交并填写下一项
            </el-button>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Form1 from './Form1.vue'
import Form2 from './Form2.vue'
import Form3 from './Form3.vue'
import Form4 from './Form4.vue'
import Form5 from './Form5.vue'
import Form6 from './Form6.vue'
export default {
  name: 'Doc',
  components: {
    Form1,
    Form2,
    Form3,
    Form4,
    Form5,
    Form6
  },
  data() {
    return {
      selectKey: '',
      finishKey: [],
      saveCompoment: '',
      dynamicChildComponentName: 'Form1',
      treeData: [
        {
          id: 1,
          selectKey: '1.1.1',
          label: <h4> 1. 专业基础建设 </h4>,
          children: [
            {
              id: 2,
              selectKey: '1.1.1',
              label: '1.1.专业影响及规模',
              children: [
                {
                  id: 3,
                  selectKey: '1.1.1',
                  label: '1.1.1.获得市级以上荣誉',
                  form: 'Form1'
                },
                {
                  id: 4,
                  selectKey: '1.1.2',
                  label: '1.1.2.招生计划完成率',
                  disabled: true,
                  form: 'Form2'
                }
              ]
            },
            {
              id: 5,
              selectKey: '1.2',
              label: '1.2.专业规范执行 （教学运行中心填写核对）',
              disabled: true,
              children: [
                {
                  id: 6,
                  selectKey: '1.2.1',
                  label: '1.2.1.人陪方案/课程标准规范度',
                  form: 'Form3'
                },
                {
                  id: 7,
                  selectKey: '1.2.2',
                  label: '1.2.2.年度调停课率',
                  form: 'Form4',
                  disabled: true
                },
                {
                  id: 8,
                  selectKey: '1.2.3',
                  label: '1.2.3.教学规范达成度',
                  form: 'Form5',
                  disabled: true
                },
                {
                  id: 9,
                  selectKey: '1.2.4',
                  label: '1.2.4.专业质量检测排名',
                  form: 'Form6',
                  disabled: true
                }
              ]
            }
          ]
        },
        {
          id: 10,
          label: <h4> 2. 师资队伍建设 </h4>,
          children: [
            {
              id: 11,
              label: '2.1.数量与结构',
              children: [
                {
                  id: 12,
                  selectKey: '2.1.1',
                  label: '2.1.1.“双师型”专任教师占比'
                },
                {
                  id: 13,
                  selectKey: '2.1.2',
                  label: '2.1.2.高级职业技能等级证书（高级工及以上）',
                  disabled: true
                },
                {
                  id: 14,
                  selectKey: '2.1.3',
                  label: '2.1.3.高级职称专任教师占比',
                  disabled: true
                },
                {
                  id: 15,
                  selectKey: '2.1.4',
                  label: '2.1.4.高层次教学团队（工作室）数',
                  disabled: true
                },
                {
                  id: 16,
                  selectKey: '2.1.5',
                  label: '2.1.5.企业兼职教师占比',
                  disabled: true
                }
              ]
            },
            {
              id: 2,
              label: '2.2.教育教学能力',
              disabled: true,
              children: []
            }
          ]
        }
      ],
      treeLeafNodeList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    // 设置默认选中
    const defaultNode = this.$refs.eltree.getNode(3)
    const treeFormNode = getTreeFormNode(defaultNode)
    this.setSelectTree(treeFormNode)
  },
  created() {
    // 从树结构中，查找出所有的叶子结点，用于跳转下一项
    this.getTreeLeafNodeList(this.treeData)
  },
  methods: {
    setSelectTree(node) {
      this.$refs.eltree.setCurrentNode(node)
      this.$refs.eltree.setCurrentKey(node.id)
    },
    handleNodeClick(data) {
      // 设置右侧组件
      const currentNode = this.$refs.eltree.getCurrentNode()
      const treeFormNode = getTreeFormNode(currentNode)
      this.dynamicChildComponentName = treeFormNode.form
    },
    submitAndNext() {
      // 拿到当前准备提交的form
      const currentNode = this.$refs.eltree.getCurrentNode()
      const treeFormNode = getTreeFormNode(currentNode)
      if (treeFormNode.children !== undefined) {
        return
      }
      // 如果已添加，则无需重复添加
      if (this.finishKey.includes(treeFormNode.id)) {
        return
      }
      // 完成标识，添加当前节点
      this.finishKey.push(treeFormNode.id)
      // 查找下一个节点
      let nextLeafNode
      for (let i = 0; i < this.treeLeafNodeList.length; i++) {
        if (treeFormNode.id === this.treeLeafNodeList[i].id) {
          nextLeafNode = this.treeLeafNodeList[i + 1]
          break
        }
      }
      if (nextLeafNode) {
        this.setSelectTree(nextLeafNode)
        this.dynamicChildComponentName = nextLeafNode.form
      }
    },
    renderContent(h, { node, data, store }) {
      // 重新渲染，如果finishKey包含当前节点，那么添加对号
      if (this.finishKey.includes(node.key)) {
        return (
          <span>
            <div>
              {' '}
              {node.label}{' '}
              <icon
                class='el-icon-success'
                style='color: green;float: right;position: absolute;right: 10px;'
              />
            </div>{' '}
          </span>
        )
      }
      return <span> {node.label} </span>
    },
    getTreeLeafNodeList(treeData) {
      if (!treeData) {
        return
      }
      treeData.forEach((item) => {
        if (item.children) {
          const children = this.getTreeLeafNodeList(item.children)
          if (children) {
            this.treeLeafNodeList.push(children)
          }
        } else {
          this.treeLeafNodeList.push(item)
        }
      })
    },
    dynamicChildSaveMethod() {
      const childComponent = this.$refs[this.dynamicChildComponentName]
      // todo 子节点的自定义保存方法
      childComponent.save()
    }
  }
}
function getTreeFormNode(node) {
  // 递归查找节点的components
  if (node.children && node.children.length > 0) {
    return getTreeFormNode(node.children[0])
  }
  return node
}
</script>

<style>
/* 树节点之间边距 */
.el-tree-node {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
