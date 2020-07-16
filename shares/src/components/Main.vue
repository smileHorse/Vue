<template>
  <Tabs type="card" value="transaction">
    <TabPane name="transaction" label="交易信息" icon="logo-apple"></TabPane>
    <TabPane name="shares" label="股票信息" icon="logo-windows">
      <Shares></Shares>
    </TabPane>
    <TabPane name="remark" label="备用" icon="logo-tux"></TabPane>
  </Tabs>
</template>

<script>
  import Shares from './Shares';

  import SqlHelper from '../libs/SqlHelper';

  export default {
    name: "Main",
    components: { Shares },
    mounted() {
      // 初始化SQLLite数据库
      SqlHelper.initDatabase();
    }
  }
</script>

<style scoped>

</style>
