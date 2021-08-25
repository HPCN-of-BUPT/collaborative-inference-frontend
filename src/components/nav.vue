<template>
      <div id="nav">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">

          <el-menu-item index="1" style="text-align: center">
            <span slot="title">模型切割</span>
          </el-menu-item>
          <el-menu-item index="2" style="text-align: center">
            <span slot="title">模型部署</span>
          </el-menu-item>
          <el-menu-item index="3" style="text-align: center">
            <span slot="title">模型测试</span>
          </el-menu-item>
        </el-menu>
      </div>

</template>

<script>
export default {
  name: "nav",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
  #nav{
    width: 150px;
    text-align: left;
    margin-left: 100px;
  }

</style>
