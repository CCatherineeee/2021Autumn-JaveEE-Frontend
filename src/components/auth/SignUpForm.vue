<template>
<div>
  <div style="width: 100%;height: 100%;" class="banner-view">
  </div>
    <section class="content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
        <el-button type="primary" class="mybtn" @click="submitForm()">Sign Up</el-button>
    </el-form-item>

        <div className='fs-caption license '>
            By clicking "Sign up", you agree to our
            <el-link  href="https://stackoverflow.com/legal/terms-of-service/public" class="my-link"> terms of service</el-link>,
            <el-link  href="https://stackoverflow.com/legal/privacy-policy" class="my-link">  privacy policy</el-link> and
            <el-link  href="https://stackoverflow.com/legal/cookie-policy" class="my-link"> cookie policy</el-link>.

        </div>
      </el-form>


    </section>
  </div>
</template>

<script>
import {register} from '@/api/auth'

export default {
  data(){
    return {
        ruleForm:{
            name:'',
            email:'',
            password:'',
        },

        rules:{
            name:[
                {required:true,message:'请输入昵称',trigger:'blur'}
            ],
            email: [
                {required: true, message: '请输入邮箱', trigger: 'blur'}
            ],
            password:[
                {required: true, message: '请输入密码', trigger: 'blur'}
            ],
        }
    }
  },

  methods:{
    validateMail(value){
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.ruleForm.email != '' && !regEmail.test(this.ruleForm.email)) {
          
          this.ruleForm.email = ''
          return false;
    }
    return true;
    },

    validateInput(value){
      var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
          if (!passwordreg.test(value)) {
            
        return false;
          }else{
            return true;
          }
    },
    submitForm(){
      if(!this.validateMail(this.ruleForm.email)){
        this.$message({
              message: '邮箱格式不正确',
              type: 'error'
          })
        return;
      }
      if(!this.validateInput(this.ruleForm.password)){
        this.$message({
          message:'密码必须由数字、字母、特殊字符组合,请输入6-16位',
          type:"error"
        })
        return ;
      }

      register(JSON.stringify(this.ruleForm))
      .then((res)=>{
        if(res.data.code==402){
          this.$message({
            message:'该邮箱用户已存在！',
            type:'warning'
          })
          this.resetForm();
        }else if(res.data.code==500){
          this.$message({
            message:'内部错误',
            type:'warning'
          })
          this.resetForm();
        }
        else{ // 成功注册
          this.resetForm();
          this.$router.push('/login');
        }

      })

    },

    resetForm(){
        this.ruleForm.email='';
        this.ruleForm.password='';
        this.ruleForm.name='';
        console.log('清空表单');
    }

    }
  }


</script>

<style scoped>
.fs-caption {
    color:#6a737c;
    font-size: 12px;
  }
.mybtn{
  margin:auto 40px;

}
.fs-caption .license {
margin-top: 32px;
}
.fs-caption  .form-label {
font-weight: 600;
}

.my-link{
  color:rgb(91, 152, 231)
}

.form-container  {
  width: 320px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1);
  padding: 24px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  background-color: #f7f3f3e1;
  border-radius: 7px;
  box-sizing: inherit;
  display: block;
}

  .form-container div{
    margin: 6px 0;
  }

  .form-container  div button {
      margin: 5px 0 3px 0;
      width: 100%;
    }


  .form-container .fs-caption {
    color:#6a737c;
    font-size: 12px;
  }

  .form-container .license {
    margin-top: 32px;
  }
  .form-container .form-label {
    font-weight: 600;
  }


.icon-holder {
  text-align: center;
  margin-bottom: 15px;
}

  .icon-holder .icon {
    width: 45px;
    height: 45px;
  }


.redirects {
  padding: 16px 16px 0 16px;
  text-align: center;
  font-size: 13px;
  margin-bottom: 24px;
}
</style>
