<template>
  <div>
    <div class="jobs-container">
      <el-row>
        <el-col :span="18"><h1>All Questions</h1></el-col>
        <el-col :span="6"><el-button type="primary"  @click="skipToAsk()">Ask Question</el-button></el-col>
      </el-row>

    </div>
    <p><b>{{questionList.length}} questions</b></p>
    <el-divider></el-divider>

    <div v-for="(item,index) in questionList" :key="index">
      <el-row class='posts'>
        <el-col span="4">
          <div class='stats-container'>
            <div class='stats'>
              <div class='vote'>
                <span class='vote-count'>{{item.view}}</span>
                <div class='count-text'>views</div>
              </div>

              <div class='vote' v-if="item.answerNum === 0">
                <span class='vote-count'>{{item.answerNum}}</span>
                <div class='count-text'>answers</div>
              </div>

              <div class='vote answer' v-else>
                <span class='vote-count fc-green-500'>{{item.answerNum}}</span>
                <div class='count-text'>answers</div>
              </div>

              <div class='vote'>
                <!-- <span class='vote-count'>{{item.tagnames.length ? 1 : 0}}</span> -->
                <span class='vote-count fc-green-500'>{{tagList[index].length}}</span>
                <div class='count-text'>tags</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col span="18">
          <div class='summary'>
            <el-link :underline="false" style="font-size: large" >{{item.title}}</el-link>
            <br />
            <br />
            <div v-html="item.description" ></div>
            <br />
            <el-row :gutter="2">
              <el-col v-for="(tag,idx) in tagList[index]" :key="idx" :span="3">
                <el-tag>
                  <el-link :underline="false" style="font-size: small">{{tag.tagName}}</el-link></el-tag>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col >
          <br />
          <br />
          <div
            class='owner'
            style='backgroundColor: backgroundColor'>
            <div class='user-block fc-black-500'>
              <div class='action-time'>
                <p>asked {{getMyTime(item.postTime)}}</p>
                <p>by {{userList[index].userName}}</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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
      questionList: [],
      tagList: [],
      userList: []
    }
  },
  methods: {
    getAllQuestion () {
      this.$axios('/api/question/getAllQuestion').then((res) => {
        if (res.data.code === 200) {
          this.questionList = res.data.data[0]
          this.tagList = res.data.data[1]
          this.userList =res.data.data[2]
        }
      }).catch((error) => {
        console.log(error)
        this.$message('网络错误')
      })
    },
    skipToAsk () {
      this.$router.push({name: 'askQuestion'})
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

.tags-badge {
  color: #242729;
  line-height: 18px;
}

.owner {
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 3px;
  text-align: left;
  vertical-align: top;
  width: 200px;
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

.user-logo {
  float: left;
  width: 32px;
  height: 32px;
  border-radius: 1px;
  margin-bottom: 6px;
}
.user-link {
  color: #0077cc;
  text-decoration: none;
  cursor: pointer;
}
.logo-wrapper {
  width: 32px;
  height: 32px;
  padding: 0;
  overflow: hidden;
}
.user-profile {
  margin-left: 8px;
  width: calc(100% - 40px);
  float: left;
  line-height: 17px;
  word-wrap: break-word;
}
.user-profile-link {
  color: #0077cc;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
}
</style>
