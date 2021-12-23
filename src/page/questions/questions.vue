<template>
  <div>
    <div>
      <el-row>
        <el-col :span="18"><h1>All Questions</h1></el-col>
        <el-col :span="6"><el-button type="primary"  @click="skipToAsk()">Ask Question</el-button></el-col>
      </el-row>

    </div>
    <p><b>{{questionList.length}} questions</b></p>
    <el-divider></el-divider>

    <div v-for="(item,index) in questionList" :key="index">
      <el-container class='posts'>
        <el-aside style="width: 80px">
          <div class='stats-container'>
            <div class='stats'>
              <div class='vote'>
                <span class='vote-count'>{{item.views}}</span>
                <div class='count-text'>views</div>
              </div>

              <div class='vote' v-if="item.acceptId === null">
                <span class='vote-count'>{{item.answerNum}}</span>
                <div class='count-text'>answers</div>
              </div>

              <div class='vote answer' v-else>
                <span class='vote-count fc-green-500'>{{item.answerNum}}</span>
                <div class='count-text'>answers</div>
              </div>

              <div class='vote'>
                <!-- <span class='vote-count'>{{item.tagnames.length ? 1 : 0}}</span> -->
                <span class='vote-count fc-green-500'>{{item.linkedTagList.length}}</span>
                <div class='count-text'>tags</div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <div >
            <el-link :underline="false" style="font-size: large;color: #1e7cf0" @click="skipToQuestion(item.questionId)">{{item.title}}</el-link>
            <br />
            <br />
            <div v-html="formatImag(item.description)"></div>
            <br />
            <el-row :gutter="2">
              <el-col v-for="(tag,idx) in item.linkedTagList" :key="idx" :span="3">
                <el-tag @click="skipToTag(tag.tagId)">
                  <el-link :underline="false" style="font-size: small; color: #1e7cf0">{{tag.tag.tagName}}</el-link></el-tag>
              </el-col>
            </el-row>
          </div>
        </el-main>
        <el-aside>
          <div
            class='owner'
            style='backgroundColor: backgroundColor'>
            <div class='user-block fc-black-500'>
              <div class='action-time'>
                <p>asked {{getMyTime(item.postTime)}} by</p>
                <el-link style="color: #1e7cf0" :underline="false"> {{item.user.userName}}</el-link>
              </div>
            </div>
          </div>
        </el-aside>
      </el-container>
    </div>
    <el-pagination
      :page-size=3
      :current-page.sync="curPage"
      @current-change="getAllQuestion"
      layout="prev, pager, next"
      :total=questionNum>
    </el-pagination>
  </div>
</template>
<script>

export default {
  name: 'questions',
  components: {
  },
  data () {
    return {
      questionList: [],
      tagList: [],
      userList: [],
      curPage: 1,
      questionNum: 1
    }
  },
  methods: {
    getAllQuestion () {
      console.log(this.curPage)
      this.$axios.get('/api/question/getAllQuestion',{
        params:{
          page : this.curPage
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.questionList = res.data.data[0]
          this.questionNum = res.data.data[1]
        }
      }).catch((error) => {
        console.log(error)
        this.$message('Net Error')
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
    formatImag (content) {
      return content.replace(/<img/g, "<img style='max-width:100%;height:auto;'")
    },
    skipToQuestion (id) {
      this.$router.push({path: '/question', query: {'id': id}})
    },
    skipToTag (id) {
      this.$router.push({path: '/tag', query: {id: id}})
    },
    skipToAsk () {
      this.$router.push({name: 'askQuestion'})
    }

  },
  mounted () {
    this.getAllQuestion()
    console.log(this.questionList)
  }
}
</script>
<style scoped>

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
