<template>
<div>
  <div style="width: 100%;height: 100%;" class="banner-view">
  </div>
  <section class="content">

    <!-- TODO: 添加logo-->
    <div className='icon-holder'>
      <Logo className='icon' />
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     
      <el-form-item  prop="mailaddr" label="Email" style="margin-left:0">
        <el-input v-model="ruleForm.mailaddr"></el-input>
      </el-form-item>
      


      <el-form-item  prop="password" label="Password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <div>
        <el-button type="text"  @click="forgetPwd()" class="mybtn">忘记密码</el-button>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm()" class="mybtn">Log In</el-button>
      </el-form-item>

      <div className='fs-caption license '>
          By clicking "Log in", you agree to our
          <el-link  href="https://stackoverflow.com/legal/terms-of-service/public" class="my-link"> terms of service</el-link>,
          <el-link  href="https://stackoverflow.com/legal/privacy-policy"  class="my-link">  privacy policy</el-link> and
          <el-link  href="https://stackoverflow.com/legal/cookie-policy"  class="my-link"> cookie policy</el-link>.

      </div>
    </el-form>

  </section>
</div>
</template>

<script>
import {login} from '@/api/auth'


export default {
  data () {
    return {
      ruleForm: {
        mailaddr: '',
        password: ''
      },

      rules: {
        mailaddr: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    forgetPwd () {
      console.log('修改密码')
      this.$router.push('/api/users/account-recovery/change-pwd')
    },

    submitForm () {
      console.log('点击提交')
      login(JSON.stringify(this.ruleForm))
        .then((res) => {
          console.log(res)
          // 密码错误
          if (res.data.code === 400) {
            console.log('密码错误')
            this.$message({
              message:"密码错误！",
              type:"warning"
            });
            this.ruleForm.password="";

          } else if (res.data.code === 404) {
            console.log('用户不存在')
            this.$message({
              message:"用户不存在！",
              type:"warning"
            });
          }
          // 成功登陆
          else {
            console.log('成功登陆')
            console.log(res.data.data.token)
            console.log(res.data.data.id)
            this.$store.commit('changeLogin', res.data.data.token)// 存储token
            localStorage.setItem("id",res.data.data.id)
            this.$router.push("/");
          }
          this.resetForm();
        }).catch((error)=>{
          this.$message("Net Error")
      })
      this.resetForm()
    },

    resetForm () {
      this.ruleForm.mailaddr = ''
      this.ruleForm.password = ''
      console.log('清空表单')
    }

  }
}
</script>

<style scoped>

.my-link{
  color:rgb(91, 152, 231)
}

.icon-holder {
  text-align: center;
  margin-bottom: 15px;
}
  .icon-holder.icon {
    width: 45px;
    height: 45px;
  }


.mybtn{
  margin:auto 10px;

}
.fs-caption {
    color:#6a737c;
    font-size: 12px;
  }

.fs-caption .license {
margin-top: 32px;
}
.fs-caption  .form-label {
font-weight: 600;
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
