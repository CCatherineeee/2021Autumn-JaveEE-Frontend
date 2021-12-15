<template>
<div>
 <div style="width: 100%;height: 100%;" class="banner-view">
  </div>
    <section class="content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="mailaddr" prop="mailaddr">
          <el-input v-model="ruleForm.mailaddr"></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <div>
          忘记密码？
          <el-button type="text"  @click="forgetPwd()">忘记密码</el-button>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">Log In</el-button>
        </el-form-item>

        <div className='fs-caption license '>
            By clicking "Log in", you agree to our
            <el-link  href="https://stackoverflow.com/legal/terms-of-service/public"> terms of service</el-link>,
            <el-link  href="https://stackoverflow.com/legal/privacy-policy">  privacy policy</el-link> and
            <el-link  href="https://stackoverflow.com/legal/cookie-policy"> cookie policy</el-link>.

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
      this.$router.push('/account-recovery')
    },

    submitForm () {
      console.log('点击提交')
      login(JSON.stringify(this.ruleForm))
        .then((res) => {
          console.log(res)
          // 密码错误
          if (res.data.code === 400) {
            console.log('密码错误')
            // TODO 弹框提醒
          } else if (res.data.code === 404) {
            console.log('用户不存在')
            // TODO 弹窗提醒
          }
          // 成功登陆
          else {
            console.log('成功登陆')
            console.log(res.data.data.token)
            this.$store.commit('changeLogin', res.data.data.token, res.data.data.id)// 存储token
            // TODO 跳转至home界面
          }
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
  background-color: #2d2d2d;
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
