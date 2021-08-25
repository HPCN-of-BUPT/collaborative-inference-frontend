<template>
  <div style="text-align: center">
      <div id="Header">
        <h1 id="word">深度学习模型推演系统</h1>
      </div>
    <div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">

        <el-menu-item index="1">
          <span slot="title">模型切割</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">模型部署</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">模型测试</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>


</template>

<script>
export default {
  name: "framework"
}
</script>

<style scoped>
#Header {
  width: 90%;
}

#word {
  text-align: center;
  margin-top: -15px;
  height: 60px;
}

h1 {
  color: #02A7F0;
  letter-spacing: 10px;
  font-size: 2em;
}

</style>
