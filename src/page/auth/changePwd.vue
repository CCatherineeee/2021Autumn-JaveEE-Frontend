<template>
  <el-container>
    <el-header>
         <div class="jobs-container">
      <el-row >
        <el-col :span="20"><h1>Account Recovery</h1></el-col>
      </el-row>
          <el-divider></el-divider>


    </div>
    </el-header>
    <el-main>
      
        <el-container v-if="valid">
          Recover account for {{mail}} 

        <el-form :rules="rules">
           <el-form-item label="New password" prop="newPwd">
          <el-input v-model="newPwd"></el-input>
        </el-form-item>

        <el-form-item label="New password (again)" prop="copyNewPwd">
            <el-input v-model="copyNewPwd"></el-input>
        </el-form-item>

        <el-form-item v-if="invalidAction">
          这个链接已经过期了额，请重新点击发送！
          <el-link  href="http://localhost:8080/#/api/users/account-recovery/change-pwd">从新发送邮件</el-link>.
          <link>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">Recover Account</el-button>
        </el-form-item>
        </el-form>
        </el-container>

        <el-container v-else>
        该链接已失效
      </el-container>
    </el-main>
    <el-aside></el-aside>

  </el-container>
</template>

<script>
import {resetPwd} from '@/api/auth'
import {checkURL} from '@/api/auth'
import {login} from '@/api/auth'

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  
  components: {
    quillEditor
  },
  data () {
    return {
      invalidAction:true,
      valid:true,
      mail:"",
      newPwd:"",
      copyNewPwd:"",

      rules:{
        newPwd:[
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            type: 'string',
            message: '请输入不包含空格的字符',
            trigger: 'blur',
            transform(value) {
              if (value && value.indexOf(' ') === -1) {
                return value
              } else {
                return false
              }
            }
          },

          {
        trigger: 'blur',
        validator: (value, callback) => {
          var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
          if (!passwordreg.test(value)) {
            callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
          }else{
            callback()
          }
        } }


        ],
        copyNewPwd:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
               trigger: 'blur',
                validate: (value, callback) => {
                 if(this.newPwd!=this.copyNewPwd){
                   callback(new Error('新旧密码必须相同'))
                 }
                 else{
                    callback()
          }
        } 
            }

        ]
      }
    }
  },

//TODO 怎么不执行
  mounted(){
    // 检查连接是否有效
    console.log(this.$route.params.token)
    console.log(this.$route.query)
    let id=this.$route.query.token
      checkURL(id)
      .then((res)=>{
        if(res.data.code==200){
          console.log('连接有效')
          this.valid=true;
          this.mail=res.data.data.email;
        }else{
          console.log('连接失效！')
        }

      })
  },
  methods: {
    submitForm(){
      this.checkURL()
      .then((res)=>{
        if(res.data.code==500){
          this.invalidAction=true;
        }
      })

      

      formData:{
        mailAddr:this.mail;
        newPwd:this.newPwd
      };

      resetPwd(formData)
      .then((res)=>{
        if(res.data.code==200){
          args={
            "mailaddr":this.email,
            "password":this.newPwd
          }
          this.login(args)
          .then((res)=>{
            if(res.data.code==200){
              this.$store.commit('changeLogin', res.data.data.token, res.data.data.id)// 存储token
              this.$router.push("/");
            }else{
              this.$message({
                message:"内部错误",
                type:"error"
              })
            }

          });
        }else{
          this.$message({
            message:"内部错误",
            type:"error"
          })
        }
        
      });

    }
    
  }
}
</script>

<style scoped>

  .post-form-header {
    height: 130px;
    background-image: url("https://cdn.sstatic.net/img/ask/background.svg?v=2e9a8205b368");
    background-repeat: no-repeat;
    background-position: right bottom !important;
    padding-top: 24px !important;
    padding-bottom: 24px !important;
    padding-left: 4px;
    display: flex;
    align-items: center;
  }
  .post-form-headline {
    font-size: 27px;
  }

  .post-form-section {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    color: #242729;
  }
  aside {
    flex-shrink: 0;
    color: #242729;
  }
  .right-panel {
    width: 300px;
    margin-left: 24px;
  }
</style>
