<template>
<div>
  <div style="width: 100%;height: 100%;" class="banner-view">
  </div>
    <section class="content">

      <div class="register-content">
        <div v-if="succ" className='register-grid'>
         
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="my-form" >
            <el-form-item class="s-notice">
              <div style="margin-top:20px">
            <h1>Account recovery email sent to {{this.ruleForm.mailAddr}}</h1>
            </div>
            <div style="margin:auto 0">
            <br>
            If you don’t see this email in your inbox within 15 minutes, look for it in your
            <br>
             junk mail folder. If you find it there, please mark it as “Not Junk”.
             </div>
            </el-form-item>
          </el-form>

          </div>
        <div className='register-grid' v-else>
          <caption/>
          <div class="form-container">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                Forgot your account’s password ?
                Enter your email address and we’ll send you a recovery link.

            <el-form-item label="Email" prop="mailaddr">
                <el-input v-model="ruleForm.mailaddr"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="sendEmail()">Send recovery email</el-button>
            </el-form-item>

            </el-form>
            </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import { reqSendMail } from "@/api/auth";
import Caption from '../../components/auth/Caption.vue'


export default { 

    data(){
        return {
          succ:true,
            ruleForm:{
                mailaddr:'',
            },

            rules:{
                mailaddr: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'}
                ],
                
            }
        }
    },
    methods:{
        sendEmail(){
          console.log(this.ruleForm)
            reqSendMail(this.ruleForm)
            .then((res)=>{
              if(res.data.code==404){
                this.$message({
                  message:'用户不存在',
                  type:'error'
                })
                this.ruleForm.mailaddr='';
              }else if(res.data.code==500){
                this.$message({
                  message:'操作过于频繁，请稍后再试',
                  type:'error'
                })
              }else{
                this.mailaddr='';
                this.succ=true;
              }
            });
            
        },
    }
  
}

</script>

<style scoped>
.h-notice{
  font-size: 1.30769231rem !important;
  margin-bottom: 8px !important;
  display: flex;
}

.s-notice{
  padding: 16px;
    border: 1px solid transparent;
    border-radius: 3px;
    color: var(--fc-medium);
    font-size: 13px;
}
.my-form{
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color:#b7f0c5;
  opacity: 0.7;
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

.banner-view {
    margin-top: 50px;
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
.register-content {
  width: 100vw;
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90.7vh;
}

.register-grid  {
  display: flex;
  align-items: center;
  box-sizing: inherit;
}

.redirects {
  padding: 16px 16px 0 16px;
  text-align: center;
  font-size: 13px;
  margin-bottom: 24px;
}

@media (max-width: 799px) {
  .register-grid {
    flex-direction: column;
    padding: 7rem 0;
  }
  .register-content {
    height: auto;
    margin: auto 0;
  }
}
</style>
