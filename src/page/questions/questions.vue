<template>
  <div>
    <div class="jobs-container">
        <h1>All Questions</h1>
    </div>
  </div>
</template>
<script>

export default {
  name: 'questions',
  components: {

  },
  data () {
    return {
      questionList: []
    }
  },
  methods: {
    getAllQuestion () {
      this.$axios('/api/question/getAllQuestion').then((res) => {
        console.log(res)
        if (res.data.code === 200) { this.questionList = res.data.data }
      })
    }

  },
  mounted () {
    this.getAllQuestion()

  }
}
</script>
<style scoped>

</style>
