<template>
<div>
  <div style="width: 100%;height: 100%;" class="banner-view">
  </div>
    <section class="content">
      <div class="register-content">
        <div className='register-grid'>
        <auth-form class="form-container"></auth-form>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import AuthForm from '../../components/auth/AuthForm.vue'

export default {
  components: { AuthForm },

  methods: {

  }
}

</script>

<style scoped>
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
