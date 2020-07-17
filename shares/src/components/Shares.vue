<template>
  <Table border :columns="columns" :data="datas">
    <template slot-scope="{ row, index }" slot="id">
      <Input type="text" v-model="editId" v-if="editIndex === index" :disabled="editMode == 2" />
      <span v-else>{{ row.id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button type="success" @click="handleSave(index)">保存</Button>
        <Button type="warning" @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <div v-if="row.id == ''">
          <Button type="success" @click="handleEdit(row, index, 1)">新增</Button>
        </div>
        <div v-else>
          <Button type="success" @click="handleEdit(row, index, 2)">修改</Button>
          <Button type="warning" @click="handleDelete(row, index)">删除</Button>
        </div>
      </div>
    </template>

  </Table>
</template>

<script>
  import SqlHelper from '../libs/SqlHelper';

  export default {
    name: "Shares",
    mounted() {
      // 从数据库中加载股票信息
      this.datas = [];
      let promise = SqlHelper.getShares();
      if (promise) {
        promise.then(result => {
          for (let i = 0; i < result.rows.length; i++) {
            this.datas.push({id: result.rows.item(i).id, name: result.rows.item(i).name});
          }

          this.datas.push({id: '', name: ''});
        }, error => {
          this.showErrorMsg('加载股票信息失败');
        })
      }
    },
    data() {
      return {
        columns: [{
          title: '股票代码',
          slot: 'id',
          align: 'center',
        }, {
          title: '股票名称',
          slot: 'name',
          align: 'center',
        }, {
          title: '操作',
          slot: 'action',
          align: 'center',
        }],
        datas: [],

        editMode: -1,
        editIndex: -1,
        editId: '',
        editName: '',
      }
    },
    methods: {
      handleEdit (row, index, mode) {
        this.editId = row.id;
        this.editName = row.name;
        this.editIndex = index;
        this.editMode = mode;
      },

      handleDelete (row, index) {
        let self = this;
        this.$Modal.confirm({
          title: '删除股票信息',
          content: '确认要删除该股票信息吗?',
          onOk: function () {
            self.datas.splice(index, 1);

            // 从数据库中删除数据
            let promise = SqlHelper.deleteShares(row.id);
            if (promise) {
              promise.then(result => {
                self.showSuccessMsg('删除数据成功');
              }, err => {
                self.showErrorMsg('删除数据失败');
              })
            }
          }
        });
      },

      handleAdd(index) {
        let promise = SqlHelper.getSharesById(this.editId);
        promise.then(result => {
          if (result.rows.length > 0) {
            this.showErrorMsg('id重复，请重新输入');
            return;
          } else {
            this.handleSave(index);
          }
        });
      },

      handleSave(index) {
        let promise = SqlHelper.getSharesById(this.editId);
        promise.then(result => {
          if (this.editMode === 2 || result.rows.length <= 0) {
            this.handleSaveImpl(index);
          } else if (this.editMode === 1 && result.rows.length > 0) {
            this.showErrorMsg('id重复，请重新输入');
          }
        });
      },

      handleSaveImpl(index) {
        this.datas[index].id = this.editId;
        this.datas[index].name = this.editName;
        this.editIndex = -1;

        if (this.datas.length > 0 && this.datas[this.datas.length - 1].id != '') {
          this.datas.push({id: '', name: ''});
        }

        // 保存数据至数据库
        let promise = null;
        if (this.editMode == 1) {
          promise = SqlHelper.insertShares(this.editId, this.editName);
        } else {
          promise = SqlHelper.updateShares(this.editId, this.editName);
        }
        if (promise) {
          promise.then(result => {
            this.showSuccessMsg(this.editMode == 1 ? '新增数据成功' : '修改数据成功');
          }, err => {
            this.showErrorMsg(this.editMode == 1 ? '新增数据失败' : '修改数据失败');
          })
        }
      },

      showSuccessMsg(content) {
        this.$Message.success({content: content, duration: 5, closable: true, background: true});
      },

      showErrorMsg(content) {
        this.$Message.error({content: content, duration: 5, closable: true, background: true});
      },
    }
  }
</script>

<style scoped>

</style>
