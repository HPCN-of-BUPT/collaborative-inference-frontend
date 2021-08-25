<template>
  <div id="test">
    <Title></Title>
    <el-row>
      <el-col :span="4">
        <div id="nav">
          <el-menu
            default-active="3"
            class="el-menu-vertical-demo"
            @select="handleSelect">

            <el-menu-item index="1" style="text-align: center">
              <span slot="title">模型切割</span>
            </el-menu-item>
            <el-menu-item index="2" style="text-align: center">
              <span slot="title">模型部署</span>
            </el-menu-item>
            <el-menu-item index="3" style="text-align: center">
              <span slot="title">模型测试</span>
            </el-menu-item>
            <!--
            <el-menu-item index="4" style="text-align: center">
              <span slot="title">结果展示</span>
            </el-menu-item>
            -->
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div style="width: 80%;margin-left: 30px">
          <el-card class="image_card" style="margin: 10px">

            <div>
              <el-row>
                <el-col :span="12" style="padding: 5px">
                  <el-image :src="src1" id="ori_image"></el-image>
                  <div>
                    <span style="color: #026df0; letter-spacing: 6px; font: bolder ">原图像</span>
                  </div>
                </el-col>
                <el-col :span="12" style="padding: 5px">
                  <el-image :src="src2">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                  <div>
                    <span style="color: #026df0; letter-spacing: 6px;">检测图像</span>
                  </div>
                </el-col>
              </el-row>

            </div>

          </el-card>
        </div>

      </el-col>

    </el-row>

    <div id="res">
      <el-card >
        <div slot="header" class="clearfix">
          <span>详细检测结果</span>
          <el-button size="small" type="primary" v-on:click="true_upload">重新上传
            <input class="file" name="file" type="file" ref="upload_image"
                   style="display: none"
                   @change="upload_image($event)" accept=""/>
          </el-button>
        </div>

        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick" stretch="true">
            <el-tab-pane label="检测结果" name="first">
              <el-table :data="result_tableData" style="width: 100%" :row-class-name="CurrentRow">
                <el-table-column prop="filename" label="文件名">
                </el-table-column>
                <el-table-column prop="model_name" label="检测模型">
                </el-table-column>
                <el-table-column prop="result" label="识别结果">
                </el-table-column>
                <el-table-column prop="accuracy" label="准确率">
                </el-table-column>
              </el-table>
            </el-tab-pane>

                <el-tab-pane label="系统" name="third">
                  <el-table :data="system_tableData" style="width: 100%" :row-class-name="CurrentRow">
                    <el-table-column prop="filename" label="文件名">
                    </el-table-column>
                    <el-table-column prop="tensor_size" label="传输数据量">
                  </el-table-column>
                    <el-table-column prop="edge_time" label="边端推理时间">
                    </el-table-column>
                    <el-table-column prop="cloud_time" label="云端推理时间">
                    </el-table-column>
                    <el-table-column prop="cloud_edge_ratio" label="云边协同比">
                    </el-table-column>
                    <el-table-column prop="transmit_time" label="传输时间">
                    </el-table-column>
                    <el-table-column prop="time" label="总推理耗时">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
          </el-tabs>
        </div>


      </el-card>
    </div>
  </div>


</template>

<script>
export default {
  name: "test",
  data() {
    return {
      src1: '',
      src2:'',
      activeName:'',
      result_tableData:[],
      cloud_tableData:[],
      edge_tableData:[],
      edge_cloud_tableData:[],
      system_tableData:[],
      edge_timer:null,
      result_timer:null
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == '1') {
        this.$router.push('cutting')
      } else if (key == '2') {
        this.$router.push('arrange')
      } else if (key == '3') {
        this.$router.push('test')
      }
    },
    true_upload(){
      this.$refs.upload_image.click()
    },
    upload_image(event){
      var file = event.target.files[0]
      var fr = new FileReader()
      var that = this
      fr.readAsDataURL(file)
      fr.onload = function(e) {
        that.src1 = this.result
      }

      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      this.$axios.post('api' + '/image_upload',param,config)
        .then((response) => {
          var msg = response.data.msg
          var status = response.status
          console.log(response)
          if(status == 200 && msg == 'success'){
            this.$message.success("上传成功")

            let _this = this;
            _this.edge_timer = setInterval(this.getEdgeStatus(_this), 3000);
          }else{
            this.$message.success("上传失败")
          }
          // this.src2 = 'data:;base64,'+ msg['img_base64']
          // this.system_tableData = [{'filename':msg['filename'],
          //                             'tensor_size':msg['transmitsize'],
          //                               'edge_time':msg['edgetime'],
          //                               'cloud_time':msg['cloudtime'],
          //                               'transmit_time':msg['transmittime']}]
        })

    },
    getEdgeStatus(_this){
      this.$axios.get('api' + '/edge')
        .then((response) =>{
          if(response.status == 200 && response.data.msg == 'true'){
            this.$message.success("边端成功接收图像")
            clearInterval(_this.edge_timer);

            let that = this
            that.result_timer = setInterval(this.getResult(that), 8000);
          }
        })
    },
    getResult(that){
      this.$axios.get('api' + '/get_result')
        .then((response) =>{
          if(response.status == 200 && response.data.msg == 'true'){
            this.$message.success("检测完成")
            clearInterval(that.result_timer);

            this.src2 = 'data:;base64,'+ response.data.img_base64['img_base64']
            this.system_tableData = [{'filename':msg['filename'],
                                          'tensor_size':msg['transmitsize'],
                                             'edge_time':msg['edgetime'],
                                             'cloud_time':msg['cloudtime'],
                                            'transmit_time':msg['transmittime']}]
          }
        })
    },
    CurrentRow({row, rowIndex}){
      if (rowIndex === 1) {
        return 'current-row';
      }
      return '';
    }

  }
}
</script>

<style scoped>
#test {
  margin-left: 10%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.img_info_1 {
  height: 30px;
  width: 275px;
  text-align: center;
  line-height: 30px;
}
#res{
  text-align: center;
  margin-top: 30px;
  width: 70%;
  margin-left: 10%;
}
.el-table .current-row {
  background: #f0f9eb;
}
</style>
