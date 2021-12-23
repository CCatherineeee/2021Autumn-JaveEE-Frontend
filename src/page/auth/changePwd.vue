<template>
  <el-container>
    <el-header>
      <div class="subheader">
        Account Recovery
        <el-divider></el-divider>
      </div>
    </el-header >
    <div style="overflow-y:scroll;height:300px">
    <!-- TODO: footer置地-->
        <el-footer v-if="valid" >
          <div style="margin-top:10px;margin-bottom:10px">Recover account for {{mail}} </div>
          <el-form :rules="rules">
            <el-form-item prop="newPwd">
              <div class="s-label"> 
              <label >New password</label>
              </div>
              <el-input class="s-input" v-model="newPwd"></el-input>
            </el-form-item>
            <el-form-item  prop="copyNewPwd">
              <div class="s-label">
              <label >New password (again)</label>
              </div>
                <el-input class="s-input" v-model="copyNewPwd"></el-input>
                <p style="s-p">Passwords must contain at least eight characters, including at least 1 letter and 1 number.</p>
            </el-form-item>

            <el-form-item v-if="invalidAction">
              这个链接已经过期了额，请重新点击发送！
              <el-link  href="http://localhost:8080/#/api/users/account-recovery/change-pwd">从新发送邮件</el-link>.
              <link>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForms()">Recover Account</el-button>
            </el-form-item>

            <div className='fs-caption license '>
                By clicking "Recover Account", you agree to our
                <el-link  href="https://stackoverflow.com/legal/terms-of-service/public" class="my-link"> terms of service</el-link>,
                <el-link  href="https://stackoverflow.com/legal/privacy-policy"  class="my-link">  privacy policy</el-link> and
                <el-link  href="https://stackoverflow.com/legal/cookie-policy"  class="my-link"> cookie policy</el-link>.
            </div>
          </el-form>
        </el-footer>

        <el-footer v-else>
        该链接已失效
        </el-footer>
    <el-aside></el-aside>
    </div>
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
      invalidAction:false,
      valid:true,
      mail:"",
      newPwd:"",
      copyNewPwd:"",

      rules:{
        newPwd:[
          {required: false, message: '请输入密码', trigger: 'blur'},
        //   {
        //     type: 'string',
        //     message: '请输入不包含空格的字符',
        //     trigger: 'blur',
        //     transform(newPwd) {
        //       if (newPwd && newPwd.indexOf(' ') === -1) {
        //         return newPwd
        //       } else {
        //         console.log("value",newPwd)
        //         console.log('this',this.newPwd)
        //         return false
        //       }
        //     }
        //   },

        //   {
        // trigger: 'blur',
        // validator: (value, callback) => {
        //   var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
        //   if (!passwordreg.test(value)) {
        //     callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
        //   }else{
        //     callback()
        //   }
        // } }


        ],
        copyNewPwd:[
            {required: false, message: '请输入密码', trigger: 'blur'},
        //     {
        //        trigger: 'blur',
        //         validate: (value, callback) => {
        //          if(this.newPwd!=this.copyNewPwd){
        //            callback(new Error('新旧密码必须相同'))
        //          }
        //          else{
        //             callback()
        //   }
        // } 
        //     }

        ]
      }
    }
  },

//TODO 怎么不执行
  mounted(){
    // 检查连接是否有效
    // console.log("路由",this.$route)
    // console.log(this.$route.params.token)
    // console.log(this.$route.query)
    // let id=this.$route.query.token
    //   checkURL(id)
    //   .then((res)=>{
    //     if(res.data.code==200){
    //       console.log('连接有效')
    //       this.valid=true;
    //       this.mail=res.data.data.email;
    //     }else{
    //       console.log('连接失效！')
    //     }

    //   })
  },
  methods: {
    validateInput(value){
      var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
          if (!passwordreg.test(value)) {
            this.$message({
          message:'密码必须由数字、字母、特殊字符组合,请输入6-16位',
          type:"error"
        })
        return false;
          }else{
            return true;
          }
    },
    checkInput(){
      if(this.newPwd==""||this.copyNewPwd==""){
        this.$message({
          message:"请输入密码",
          type:"error"
        });
      }else if(this.newPwd!=this.copyNewPwd){
        this.$message({
          message:"新旧密码必须相同",
          type:"error"
        })}else{
          this.validateInput(this.newPwd);
        };
      }
    },
    submitForms(){
      // checkURL()
      // .then((res)=>{
      //   if(res.data.code==500){
      //     this.invalidAction=true;
      //   }
      // })

      this.checkInput()

      

      formData:{
        mailAddr:this.mail;
        newPwd:this.newPwd
      };

      // resetPwd(formData)
      // .then((res)=>{
      //   if(res.data.code==200){
      //     args={
      //       "mailaddr":this.email,
      //       "password":this.newPwd
      //     }
      //     this.login(args)
      //     .then((res)=>{
      //       if(res.data.code==200){
      //         this.$store.commit('changeLogin', res.data.data.token, res.data.data.id)// 存储token
      //         this.$router.push("/");
      //       }else{
      //         this.$message({
      //           message:"内部错误",
      //           type:"error"
      //         })
      //       }

      //     });
      //   }else{
      //     this.$message({
      //       message:"内部错误",
      //       type:"error"
      //     })
      //   }
        
      // });

    }
    
  }

</script>

<style scoped>
.subheader{
  clear: both;
  /* margin-bottom: 10px; */
  height: 40px;
  padding-bottom: 0;
  /* border-bottom: 1px solid var(--black-075); */
  box-sizing: content-box;
  font-size: 2em;
  font-weight: 100;
    
}
.s-p{
  font-size: 12px !important;
  color: var(--fc-light) !important;
      margin-bottom: 4px !important;
      margin-top: 4px !important;
      width:50%
}

.s-label {
    padding: 0 0px;
    color: var(--fc-dark);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
}
.s-input  {
    -webkit-appearance: none;
    width: 50%;
    margin: 0;
    padding: .6em .7em;
    border: 1px solid var(--bc-darker);
    border-radius: 3px;
    background-color: var(--white);
    color: var(--fc-dark);
    font-size: 13px;
    font-family: inherit;
}
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
