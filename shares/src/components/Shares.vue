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
      this.datas = SqlHelper.getShares();
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
        this.datas.splice(index, 1);

        // 从数据库中删除数据
        SqlHelper.deleteShares(row.id);
      },
      handleSave (index) {
        this.datas[index].id = this.editId;
        this.datas[index].name = this.editName;
        this.editIndex = -1;

        if (this.datas.length > 0 && this.datas[this.datas.length - 1].id != '') {
          this.datas.push({id: '', name: ''});
        }

        // 保存数据至数据库
        if (this.editMode == 1) {
          let result = SqlHelper.insertShares(this.editId, this.editName);
          alert(result);
        } else {
          SqlHelper.updateShares(this.editId, this.editName);
        }
      },
    }
  }
</script>

<style scoped>

</style>
