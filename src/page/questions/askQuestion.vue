<template>
  <el-container>
    <el-header>
      <div class="post-form-header">
        <div class='post-form-headline'>
          Ask a public question
        </div>
      </div>
    </el-header>
    <el-main>
        <el-container>
          <el-header></el-header>
          <br />
          <br />
          <br />
          <el-main style="background-color: #eff0f1">
            <el-form>
              <h3>Title</h3>
              <p>Be specific and imagine you’re asking a question to another person</p>
              <br />
              <el-form-item>
                <el-input v-model="form.title" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"></el-input>
              </el-form-item>
              <h3>Body</h3>
              <p>Include all the information someone would need to answer your question</p>
              <br />
              <el-form-item>
                <quill-editor ref="text" v-model="form.description" class="myQuillEditor" style="background-color: white" />
              </el-form-item>
              <br />
              <h3>Tag Name</h3>
              <p>Add only 1 tags to describe what your question is about</p>
              <el-form-item>
                <el-input v-model="form.tagnames" placeholder="e.g. (ajax django string)"></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="postQuestion">Post Your Qustion</el-button>
          </el-main>
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
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAxMCwiZXhwIjoxNjM5MzAzMjk1LCJpYXQiOjE2MzkzMDE0OTV9.aG1gAMuhmuYcCbmO3dtAxagyEPUagRcJd2cGpHS1Dew'
          }
        }
      ).then((res) => {
        if (res.data.code === 200) {
          this.$message('Posted Successfully！')
          this.form.description = ''
          this.form.tagnames = ''
          this.form.title = ''
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
