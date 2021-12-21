
<template>
  <el-container>
    <el-header>
      <!-- <div class="post-form-header">
        <div class='post-form-headline'>
nihoa 
        </div>
      </div> -->
    </el-header>
    <el-main>
        <el-container>
          wohenhao  
        </el-container>
    </el-main>
    <el-aside></el-aside>

  </el-container>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  name: 'askQuestion.vue',
  data () {
    return {
      form: {
        title: '',
        description: '',
        tagnames: ''
      }
    }
  },
  methods: {

    postQuestion () {
      this.$axios.post('/api/question/addQuestion', JSON.stringify(this.form),
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
          }
        }
      ).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message('Posted Successfully！')
          this.form.description = ''
          this.form.tagnames = ''
          this.form.title = ''
        } else if (res.data.code === 401) {
          this.$message('please login first！')
        } else {
          this.$message('Net Error!')
        }
      })
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
