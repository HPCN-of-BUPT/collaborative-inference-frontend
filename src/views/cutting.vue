<template>
  <div id="cut">
    <Title></Title>

    <el-row :gutter="20">
      <el-col :span="4">
        <div id="nav">
          <el-menu
            default-active="1"
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
        <el-card class="box-card">
          <div slot="header" style="height: 15px">
            <span>通信限制条件</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="onClear">全部清空</el-button>
          </div>

          <div v-if="before_cut">
            <div class="input_model">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="5">
                      <span class="font_style">时延</span>
                    </el-col>
                    <el-col :span="19">
                      <el-select v-model="delay" placeholder="时延条件">
                        <el-option label="" value="2.3"></el-option>
                        <el-option label="" value="3.3"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="5">
                      <span class="font_style">带宽</span>
                    </el-col>
                    <el-col :span="19">
                      <el-select v-model="bandwidth" placeholder="带宽条件">
                        <el-option label="" value="100.1"></el-option>
                        <el-option label="" value="109.6"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                </el-col>

              </el-row>
            </div>
            <div class="input_model">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="5">
                      <span class="font_style">云算力</span>
                    </el-col>
                    <el-col :span="19">
                      <el-select v-model="cloud_computation" placeholder="云算力">
                        <el-option label="" value="15"></el-option>
                        <el-option label="" value="14"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="5">
                      <span class="font_style">边算力</span>
                    </el-col>
                    <el-col :span="19">
                      <el-select v-model="edge_computation" placeholder="边算力">
                        <el-option label="" value="15"></el-option>
                        <el-option label="" value="16"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                </el-col>
              </el-row>
            </div>

            <div class="input_model">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="5">
                      <span class="font_style">测试模型</span>
                    </el-col>
                    <el-col :span="19">
                      <el-select v-model="model_type" placeholder="测试模型">
                        <!--
                        <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.id">
                        -->
                        <el-option label="ResNet" value="ResNet"></el-option>
                        <el-option label="YOLOv3" value="YOLOv3"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="5">
                      <span class="font_style">模型文件</span>
                    </el-col>
                    <el-col :span="19" style="padding-left: 30px;text-align: left">
                      <el-row>
                        <el-col :span="15">
                          <el-select v-model="upload_else" placeholder="模型上传" @change="change_upload">
                            <el-option label="上传模型" value="1"></el-option>
                            <el-option label="模型训练" value="2"></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="9">
                          <div style="text-align: center" v-if="upload_true">
                            <el-button size="small" type="primary" v-on:click="true_upload">上传
                              <input class="file" name="file" type="file" ref="upload_models"
                                     style="display: none"
                                     @change="upload_models($event)" accept=""/>
                            </el-button>
                          </div>

                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>

              </el-row>
            </div>
            <div style="text-align: right">
              <el-button type="primary" @click="model_cut">开始</el-button>
            </div>
          </div>
          <div v-if="cutting">
            <div>模型切割进度</div>
            <div style="margin: 10px">
              <el-steps :active="model_step" finish-status="success" align-center>
                <el-step title="模型训练/上传模型"></el-step>
                <el-step title="模型切割"></el-step>
                <el-step title="模型评估"></el-step>
              </el-steps>
            </div>

            <div style="text-align: right">
              <el-button type="primary" @click="model_cut_quit" size="small">返回</el-button>
            </div>

          </div>

        </el-card>
      </el-col>
    </el-row>

    <div id="showres">
      <el-card class="card_res">
        <div slot="header">
          <span>模型切割评估</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="review">查看上次结果</el-button>
        </div>
        <div>

          <el-row>
            <el-col :span="12">
              <el-card class="cloud_card" style="margin: 10px">
                <div slot="header" class="clearfix" style="height: 15px">
                  <span>通信限制条件</span>
                </div>

                <div>
                  <el-table :data="restric_tableData" style="width: 100%">
                    <el-table-column prop="delay" label="时延">
                    </el-table-column>
                    <el-table-column prop="bandwidth" label="带宽">
                    </el-table-column>
                    <el-table-column prop="cloud_compute" label="云算力">
                    </el-table-column>
                    <el-table-column prop="edge_compute" label="边算力">
                    </el-table-column>
                    <el-table-column prop="model_type" label="模型">
                    </el-table-column>
                  </el-table>
                </div>

                <!--
                <div style="float: right">
                  <div>
                    <el-button style="padding: 3px 0;color: #02A7F0" type="text" @click="cloud_download_frame">云模型架构文件下载</el-button>
                  </div>
                  <div>
                    <el-button style="padding: 3px 0;;color: #02A7F0" type="text" @click="cloud_download_params">云模型参数文件下载</el-button>
                  </div>
                </div>
                -->
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="cloud_card" style="margin: 10px">
                <div slot="header" class="clearfix" style="height: 15px">
                  <span>切割模型大小</span>
                </div>

                <div>
                  <el-table :data="model_tableData" style="width: 100%">
                    <el-table-column prop="end_type" label="模型类型">
                    </el-table-column>
                    <el-table-column prop="flops" label="浮点运算量(运算次数/秒)">
                    </el-table-column>
                    <el-table-column prop="params" label="参数量(params)">
                    </el-table-column>
                    <el-table-column prop="output_datasize" label="输出数据量(bytes)">
                    </el-table-column>
                  </el-table>
                </div>

                <!--
                <div style="float: right">
                  <div>
                    <el-button style="padding: 3px 0;color: #02A7F0" type="text" @click="cloud_download_frame">云模型架构文件下载</el-button>
                  </div>
                  <div>
                    <el-button style="padding: 3px 0;;color: #02A7F0" type="text" @click="cloud_download_params">云模型参数文件下载</el-button>
                  </div>
                </div>
                -->
              </el-card>
            </el-col>

          </el-row>
        </div>

      </el-card>
    </div>


  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "cutting",
  data() {
    return {
      server_url: "http://127.0.0.1:5000",
      delay: '',
      bandwidth: '',
      cloud_computation: '',
      edge_computation: '',
      model_type: '',
      before_cut: true,
      cutting: false,
      restric_tableData: [],
      model_tableData: [],
      split_timer:null,
      resList:[],
      cutList:[],
      upload_else:'',
      upload_true:true,
      model_step:0
    }

  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === '1') {
        this.$router.push('cutting')
      } else if (key === '2') {
        this.$router.push('arrange')
      } else if (key === '3') {
        this.$router.push('test')
      }
    },
    true_upload(){
      this.$refs.upload_models.click()
    },
    upload_models(event){
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
          var label = response.data.result
          var name = this.test(label)
          this.$message.success(response.data.result)
        })

    },
    onClear() {
      this.delay = this.bandwidth = ""
    },
    model_cut() {
      this.cutting = true
      this.before_cut = false
      if(this.upload_else === '1'){
        this.model_step = 1
      }
      axios({
        method: "POST",
        url: 'api' + '/cut',
        data: {
          "delay": this.delay,
          "bandwidth": this.bandwidth,
          "cloud_computation": this.cloud_computation,
          "edge_computation": this.edge_computation,
          "model_id": this.model_type
        },
        headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type,Authorization"}
      }).then((response) => {
        if(response.status === 200){
          this.$message.success("切割完成")
          this.model_step = 2
          this.resList = [{"delay":this.delay,
            "bandwidth": this.bandwidth,
            "cloud_compute": this.cloud_computation,
            "edge_compute": this.edge_computation,
            "model_type": this.model_type}]
          this.restric_tableData = this.resList
          let that = this
          // that.split_timer = setInterval(this.get_model_result(that), 3000)
          this.get_model_result()
        }
      })

    },
    get_model_result(){
      axios({
        method: "GET",
        url: 'api' + '/cut_result',
        headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type,Authorization"}
      }).then((response) => {
        console.log(response)
        if (response.status === 200 && response.data.msg === "success") {
          this.$message.success("模型评估完成")
          this.model_step = 3
          // clearInterval(that.split_timer)
          var infos = response.data.results
          this.cutList = [{
            "end_type":"云模型", "flops": infos.cloud.flops, "params": infos.cloud.params,"output_datasize":infos.cloud.output_size
          },
            {
              "end_type":"边模型", "flops": infos.edge.flops, "params": infos.edge.params,"output_datasize":infos.edge.output_size
            }]
          this.model_tableData = this.cutList
        }
      })
    },
    review(){
      this.restric_tableData = this.resList
      this.model_tableData = this.cutList
    },
    model_cut_quit() {
      this.$message.success("已取消");
      this.cutting = false
      this.before_cut = true
    },
    cloud_download_frame() {
      var elemIF = document.createElement('iframe')
      elemIF.src = 'api' + '/download_frame'
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
    },
    cloud_download_params() {
      var elemIF = document.createElement('iframe')
      elemIF.src = 'api' + '/download_params'
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
    },
    change_upload(){
      if(this.upload_else === '1'){
        this.upload_true = true
      }else{
        this.upload_true = false
      }
    },
    train_model(){
      axios({
        method: "GET",
        url: 'api' + '/train',
        headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type,Authorization"}
      }).then((response) => {
        if (response.status === 200 && response.data === "success") {
          this.$message.success("模型训练完成")
          console.log(response)
          this.model_step = 1
        }
      })
    }
  }
}
</script>

<style scoped>
#cut {
  margin-left: 10%;
}

#showres {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 200px;
}


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 70%;
  margin-left: 50px;
}

.input {
  width: 300px;
  margin-left: 7px;
}

.input_model {
  margin-top: 10px;
}

.card_res {
  width: 90%;
}

</style>
