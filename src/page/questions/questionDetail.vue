<template>
  <div>
    <el-container v-if="isExsit === true">
        <div class='post-form-headline'>
          <el-row>
            <el-col span="13"><h2>{{questionInfo.title}}</h2></el-col>
            <el-col v-for="(tag,idx) in tagList" :key="idx" :span="2">
              <el-tag>
                <el-link :underline="false" style="font-size: small; color: #1e7cf0" @click="skipToTag(tag.tagId)">{{tag.tagName}}</el-link></el-tag>
            </el-col>
            <el-col span="4"><el-button type="primary" @click="followQuestion">Follow Question</el-button></el-col>
          </el-row>
        </div>
        <p>asked {{getMyTime(questionInfo.postTime)}} by <el-link style="color: #1e7cf0" :underline="false"> {{questionInfo.user.userName}}</el-link>
        </p>
      <el-divider></el-divider>
      <el-main>
        <div>
          <el-row class='posts'>
            <el-col span="2">
              <div class='stats-container'>
                <div class='stats'>
                  <div class='vote'>
                    <span class='vote-count'>{{questionInfo.view}}</span>
                    <div class='count-text'>views</div>
                  </div>

                  <div class='vote' v-if="questionInfo.acceptId === null">
                    <span class='vote-count'>{{questionInfo.answerNum}}</span>
                    <div class='count-text'>answers</div>
                  </div>

                  <div class='vote answer' v-else>
                    <span class='vote-count fc-green-500'>{{questionInfo.answerNum}}</span>
                    <div class='count-text'>answers</div>
                  </div>

                  <div class='vote'>
                    <!-- <span class='vote-count'>{{item.tagnames.length ? 1 : 0}}</span> -->
                    <span class='vote-count fc-green-500'>{{tagList.length}}</span>
                    <div class='count-text'>tags</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col>
              <div v-html="formatImag(questionInfo.description)" ></div>
              <br />
            </el-col>
          </el-row>
        </div>
        <br />
        <h2>Answers</h2>
        <br />
        <div v-for="(item,index) in answerList" :key="index">
          <el-container>
            <el-main>
              <el-tag v-if="item.answerId === questionInfo.acceptId">[ this answer is accepted ]
              </el-tag>
              <br />
              <br />
              <div v-html="formatImag(item.description)" ></div>
              <el-button type="text" @click="acceptAnswer(item.answerId)">accept this answer</el-button>
            </el-main>
            <el-aside style="background-color: #e4e6e8;border-radius: 10px;height: 80px">
              <el-main >
                <p>answered by <el-link style="color: #1e7cf0">{{item.userName}}</el-link></p>
                <p>{{getMyTime(item.postTime)}}</p>
              </el-main>
            </el-aside>
          </el-container>
          <el-divider></el-divider>
        </div>
        <el-container>
          <el-main style="background-color: #eff0f1">
            <el-form>
              <h3>Your Answer</h3>
              <br />
              <el-form-item>
                <quill-editor ref="text" v-model="form.description" class="myQuillEditor" style="background-color: white" />
              </el-form-item>
            </el-form>
            <el-button @click="postAnswer">Post Your Answer</el-button>
          </el-main>
        </el-container>
      </el-main>
      <el-header>
      </el-header>
    </el-container>
    <div v-if="isExsit === false">
      <p>not exist</p>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'questionDetail',
  components: {
    quillEditor
  },
  data () {
    return {
      question_id: null,
      answerList: [],
      tagList: [],
      questionInfo: null,
      isExsit: null,
      form: {
        description: ''
      },
      hasAuth: false
    }
  },
  methods: {
    async getQuestionDeatil () {
      this.$axios.get('/api/api/question/getQuestion', {
        params: {
          id: this.question_id
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.questionInfo = res.data.data[0]
          this.tagList = res.data.data[1]
          this.answerList = res.data.data[2]
          this.isExsit = true
          if (this.questionInfo.userId === localStorage.getItem('id')) { this.hasAuth = true }
        } else {
          this.isExsit = false
        }
      })
    },
    getMyTime (time) {
      var d = new Date(time)
      // eslint-disable-next-line camelcase
      var cur_d = new Date()
      // eslint-disable-next-line camelcase
      var diff = (cur_d - d) / 1000

      var days = parseInt(diff / 86400) // 天  24*60*60*1000
      var hours = parseInt(diff / 3600) - 24 * days // 小时 60*60 总小时数-过去的小时数=现在的小时数
      var minutes = parseInt(diff % 3600 / 60) // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
      if (days === 0 && hours === 0) { return minutes.toString() + ' minutes ago' } else if (days === 0) { return hours.toString() + ' hours ago' } else { return days.toString() + ' days ago' }
    },
    postAnswer () {
      this.$axios.post('/api/answers/addAnswer', JSON.stringify({
        description: this.form.description,
        questionId: this.question_id
      }), {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message('Posted Successfully')
          this.form.description = ''
          this.getQuestionDeatil()
        } else {
          this.$message('please login first!')
        }
      }).catch((error) => {
        console.log(error)
        this.$message('Net Error')
      })
    },
    formatImag (content) {
      return content.replace(/<img/g, "<img style='max-width:60%;height:auto;'")
    },
    async addQuestionView () {
      var params = new URLSearchParams()
      params.append('id', this.question_id)
      this.$axios.post('/api/api/question/addQuestionViews', params).then((res) => {
      }).catch((error) => {
        console.log(error)
        this.$message('Net Error')
      })
    },
    acceptAnswer (id) {
      let params = new URLSearchParams()
      params.append('questionId', this.question_id)
      params.append('answerId', id)
      this.$axios.post('/api/api/question/acceptAnswer', params).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message('Accept Successfully')
        } else {
          this.$message('Net Error')
        }
      }).catch((error) => {
        console.log(error)
        this.$message('Net Error')
      })
    },
    skipToTag (id) {
      this.$router.push({path: '/tag', query: {id: id}})
    },
    followQuestion(){
      let params = new URLSearchParams()
      params.append('questionid', this.question_id)
      this.$axios.post("/api/api/followquestion/addfollow",params,{
        headers:{
          "x-auth-token":localStorage.getItem('token')
        }
      }).then((res)=>{
        if(res.data.code === 200){
          this.$message("Followes Question Successfully")
        }
        else if(res.data.code === 401){
          this.$message("Please Login")
        }
        else{
          this.$message("Net Error")
        }
      }).catch((error)=>{
        console.log(error)
        this.$message("Net Error")
      })
    }
  },
  async mounted () {
    this.question_id = this.$route.query.id
    await this.addQuestionView()
    await this.getQuestionDeatil()
  }
}
</script>

<style scoped>
.post-form-headline {
  font-size: 27px;
}
.posts {
  padding: 12px 8px 12px 8px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #4a4e51;
}
.stats-container {
  margin-right: 16px;
  width: 58px;
  color: #6a737c;
  margin-left: 8px;
  font-size: 11px;
}
.vote {
  padding: 0;
  margin-bottom: 8px;
  text-align: center;
}
.vote-count {
  font-size: 20px;
}

.count-text {
  font-size: 12px;
}

.answer {
  color: #63b47c;
  border: 1px solid #63b47c;
  border-radius: 3px;
}

.owner {
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 3px;
  background-color: #f2f3f3;
  text-align: left;
  vertical-align: top;
  width: 200px;
  height: 50px;
}
.user-block {
  box-sizing: border-box;
  padding: 5px 6px 0 7px;
  color: #6a737c;
}
.action-time {
  margin-top: 1px;
  margin-bottom: 4px;
  font-size: 12px;
  white-space: nowrap;
}
</style>
