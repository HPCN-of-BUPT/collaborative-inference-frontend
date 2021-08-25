<template>
  <div id="arrange">
    <Title></Title>

    <el-row>
      <el-col :span="4">
        <div id="nav">
          <el-menu
            default-active="2"
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
        <div style="width: 60%;margin-left: 70px">
              <el-card class="yunduan" style="margin: 10px">
                <div slot="header" class="clearfix">
                  <span>模型部署</span>
                </div>

                <div class="input_model">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <span class="font_style">部署模型</span>
                    </el-col>
                    <el-col :span="18" style="text-align: left">
                      <el-select v-model="model_type" placeholder="模型选择" class="input">
                        <el-option label="" value="YOLOv3"></el-option>
                        <el-option label="" value="ResNet"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </div>
                <div class="input_model">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <span class="font_style">通信限制条件</span>
                    </el-col>
                    <el-col :span="18" style="text-align: left">
                      <el-select v-model="res_type" placeholder="条件选择" class="input">
                        <el-option label="限制条件一" value="1"></el-option>
                        <el-option label="限制条件一" value="2"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </div>

                <div class="input_model">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <span class="font_style">云IP地址</span>
                    </el-col>

                    <el-col :span="18" style="text-align: left">
                      <el-input v-model="cloud_ip" placeholder="请输入内容" class="input"></el-input>
                    </el-col>
                  </el-row>
                </div>

                <div class="input_model">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <span class="font_style">云端口号</span>
                    </el-col>

                    <el-col :span="18" style="text-align: left">
                      <el-input v-model="cloud_port" placeholder="请输入内容" class="input"></el-input>
                    </el-col>
                  </el-row>
                </div>

                <div class="input_model" style="text-align: center">
                  <el-button type="primary" size="small" @click="cloud_deploy" >云模型部署</el-button>
                </div>

                <div class="input_model">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <span class="font_style">边IP地址</span>
                    </el-col>

                    <el-col :span="18" style="text-align: left">
                      <el-input v-model="edge_ip" placeholder="请输入内容" class="input"></el-input>
                    </el-col>
                  </el-row>
                </div>

                <div class="input_model">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <span class="font_style">边端口号</span>
                    </el-col>

                    <el-col :span="18" style="text-align: left">
                      <el-input v-model="edge_port" placeholder="请输入内容" class="input"></el-input>
                    </el-col>
                  </el-row>
                </div>

                <div class="input_model" style="text-align: center">
                  <el-button type="primary" size="small" @click="edge_deploy" >边模型部署</el-button>
                </div>


              </el-card>
        </div>

      </el-col>
    </el-row>

  </div>

</template>

<script>
export default {
  name: "arrange",
  data() {
    return {
      cloud_ip:'',
      cloud_port:'',
      edge_ip:'',
      edge_port:'',
      cloud_frame_file: [],
      cloud_params_file: [],
      edge_frame_file: [],
      edge_params_file: [],
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      model_type:'',
      res_type:''
    };
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
    cloud_true_upload1(){
      this.$refs.cloud_upload1.click()
    },
    cloud_true_upload2(){
      this.$refs.cloud_upload2.click()
    },
    edge_true_upload1(){
      this.$refs.edge_upload1.click()
    },
    edge_true_upload2(){
      this.$refs.edge_upload2.click()
    },
    cloud_upload_frame(event){
      var file = event.target.files[0]
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      this.$axios.post('api' + '/cloud_upload_frame',param,config)
        .then((response) => {
          this.$message.success(response.data.result)
        })
    },
    cloud_upload_params(event){
      var file = event.target.files[0]
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      this.$axios.post('api' + '/cloud_upload_params',param,config)
        .then((response) => {
          this.$message.success(response.data.result)
        })
    },
    cloud_deploy(){
      axios({
        methods: "post",
        url:"",
        data:[{"cloud_ip":this.cloud_ip,"cloud_port":this.cloud_port}]
      }).then((response) => {
        if (response.data.result == "failure") {
          this.$message.error("连接失败!");
        } else {
          this.$message.success("连接成功!");
        }
      })

    },
    edge_upload_frame(event){
      var file = event.target.files[0]
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      this.$axios.post('api' + '/edge_upload_frame',param,config)
        .then((response) => {
          this.$message.success(response.data.result)
        })
    },
    edge_upload_params(event){
      var file = event.target.files[0]
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      this.$axios.post('api' + '/edge_upload_params',param,config)
        .then((response) => {
          this.$message.success(response.data.result)
        })
    },
    edge_deploy(){
      axios({
        methods: "post",
        url:"",
        data:[{"edge_ip":this.edge_ip,"edge_port":this.edge_port}]
      }).then((response) => {
        if (response.data.result == "failure") {
          this.$message.error("连接失败!");
        } else {
          this.$message.success("连接成功!");
        }
      })

    }
  }
}
</script>

<style scoped>
#arrange {
  margin-left: 10%;
}

.input {
  height: 15px;
  width: 300px;
}

.input_model {
  margin: 20px;
}
.input_model2 {
  margin: 20px;
}

.font_style {
  font-size: small;
}

.file{


}

</style>
