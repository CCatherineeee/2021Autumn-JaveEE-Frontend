<template>
<div>
  <p class="tag-headline">Questions tagged [{{tagInfo.tagName}}]</p>
  <br />
  <p>{{tagInfo.tagDescription}}</p>
  <br />
  <p>{{tagInfo.tagView}} views</p>
  <el-row>
    <el-col span="18"><p>{{questionList.length}} questions</p></el-col>
    <el-col span="6"><el-button type="primary"  @click="skipToAsk()">Ask Question</el-button></el-col>
  </el-row>
  <el-divider></el-divider>

  <div v-for="(item,index) in questionList" :key="index">
    <el-container class='posts'>
      <el-aside style="width: 80px">
        <div class='stats-container'>
          <div class='stats'>
            <div class='vote'>
              <span class='vote-count'>{{item.view}}</span>
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
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class='summary'>
          <el-link :underline="false" style="font-size: large;color: #1e7cf0" @click="skipToQuestion(item.questionId)">{{item.title}}</el-link>
          <br />
          <br />
          <div v-html="formatImag(item.description)"></div>
          <br />
        </div>
      </el-main>
      <el-aside>
        <div
          class='owner'>
          <div class='user-block fc-black-500'>
            <div class='action-time'>
              <p>asked {{getMyTime(item.postTime)}} by</p>
              <el-link style="color: #1e7cf0" :underline="false"> {{userList[index].userName}}</el-link>
            </div>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</div>
</template>

<script>
export default {
  name: 'tagDetail',
  data () {
    return {
      tagInfo: null,
      questionList: null,
      userList: null,
      tagId: null
    }
  },
  methods: {
    getTagInfo () {
      this.$axios.get('/api/tag/getTagById', {
        params: {
          id: this.tagId
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.tagInfo = res.data.data[1]
          this.questionList = res.data.data[2]
          this.userList = res.data.data[3]
        } else {
          this.$message('Tag Not Exist')
        }
      }).catch((error) => {
        console.log(error)
        this.$message('Net Error')
      })
    },
    formatImag (content) {
      return content.replace(/<img/g, "<img style='max-width:60%;height:auto;'")
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
    skipToAsk () {
      this.$router.push({name: 'askQuestion'})
    },
    skipToQuestion (id) {
      this.$router.push({path: '/question', query: {'id': id}})
    }
  },
  mounted () {
    this.tagId = this.$route.query.id
    var params = new URLSearchParams()
    params.append('id', this.tagId)
    this.$axios.post('/api/tag/addTagViews', params).then((res) => {
      console.log(res)
      this.getTagInfo()
    })
  }
}
</script>

<style scoped>
.tag-headline {
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
</style>
