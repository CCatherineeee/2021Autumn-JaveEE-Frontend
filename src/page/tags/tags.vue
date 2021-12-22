<template>
  <div>
    <div class="jobs-container">
      <h1>Tags</h1>
      <p>A tag is a keyword or label that categorizes your question with other, similar questions. </p>
      <p>Using the right tags makes it easier for others to find and answer your question.</p>
    </div>
    <el-divider></el-divider>
    <div v-for="(item,index) in tagList" :key="index">
      <el-col :span="8">
        <el-card shadow="hover" style="border-color: #6a737c;height: 200px">
          <el-tag @click="skipToTag(item.tagId)">{{item.tagName}}</el-tag>
          <br />
          <br />
          <p style="color: #3b4045">{{item.tagDescription}}</p>
          <br />
          <p style="color: #3b4045">{{questionList[index]}} questions</p>
        </el-card>
        <br />
      </el-col>
    </div>
  </div>
</template>
<script>

export default {
  name: 'tags',
  components: {

  },
  data () {
    return {
      tagList: [],
      questionList: []

    }
  },
  methods: {
    getAllTag () {
      this.$axios.get('/api/api/tag/getAllTag').then((res) => {
        if (res.data.code === 200) {
          this.tagList = res.data.data[1]
          this.questionList = res.data.data[2]
        }
      }).catch((error) => {
        console.log(error)
        this.$message('Net Error')
      })
    },
    skipToTag (id) {
      this.$router.push({path: '/tag', query: {id: id}})
    }
  },
  mounted () {
    this.getAllTag()
  }
}
</script>
<style scoped>

</style>
