<template>
  <div>
    <div v-if="num!== '0'">
      <h1>Got {{num}} Results For You</h1>
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
      </el-container>
    </div>
    </div>
    <div v-else>
      <h1>Sorry, there is no result for you</h1>
    </div>
  </div>
</template>
<script>
import qResults from '../../components/common/qResults'
import bus from '../../core/js/bus.js'
export default {
    name: 'search',
    components:{
        qResults
    },
    watch: {
        '$route': function (to, from) {
        }
    },
    data () {
        return {
          hasValue: false,
          keyWords: '',
          has_q: false,
          hasResults: false,
          words: '',
          questionList: [],
          num:0
        }
    },
    methods: {
        getRsList () {
          var params = new URLSearchParams()
          params.append('keywords', this.$route.query.searchCode)
          params.append('page', 1)
            this.$axios.post("/api/question/search" , params,{
              headers:{
                "x-auth-token":localStorage.getItem('token')
              }
            })
            .then( (res) => {
              if(res.data.code === 200)
              {
                this.questionList = JSON.parse(res.data.data.questions)
                console.log(this.questionList)
                this.num = res.data.data.validnumber
                if(res.data.data.validnumber === 0){
                  this.has_q = false
                }
                else
                  this.has_q = true
              }
            })
            .catch((error) => {
                console.log(error);
                this.$message("Net Error")
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
      },
    },
  mounted () {
    this.getRsList()
  },
}
</script>
<style scoped>
/**/

/******************/
.displaying-results-highlight {
    font-weight: bold;
}
.mr2 {
    margin-right: 2px !important;
}
.displaying-results {
    margin: 0 0 12px 0;
    font-size: 12px;
    color: #6a737c;
    line-height: 1;
}
/**************/
.bigsearch-inner {
    display: flex;
    margin-bottom: 24px;
}
.s-input {
    width: 100%;
    margin: 0;
    padding-left: 8px;
    border: 1px solid #bbc0c4;
    border-radius: 3px;
    box-shadow: inset 0 0 1px rgba(145,153,161,0.2), 0 0 0 rgba(255,255,255,0);
    font-family: inherit;
    line-height: 1.30769231;
}
.s-input:focus-within {
    position: relative;
    border-color: #66bfff;
    box-shadow: inset 0 0 4px #eff0f1, 0 0 0 4px rgba(0,149,255,0.15);
    outline: 0;
}
/***************/
.mb24 {
    margin-bottom: 24px;
}
.s-btn:hover, .search-btn:hover{
    background: #1480d6;
}
.search-btn {
    padding: .56em .43em;
    margin-left: 8px;
}
.s-btn {
    padding: .7em .56em;
}
.s-btn, .search-btn{
    position: relative;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: transparent;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.15384615;
    text-decoration: none;
    cursor: pointer;
    border-color: rgba(0,89,153,0);
    box-shadow: 0 0 0 0 rgba(0,149,255,0);
    color: #fff;
    background-color: #0095ff;
    border-color: #07c;
    box-shadow: inset 0 1px 0 0 rgba(102,191,255,0.75), 0 0 0 0 rgba(0,149,255,0);
}
.ask-new-question {
    padding-left: 8px;
    display: flex;
    align-items: center;
}
.advanced a {
    color: #07C;
    text-decoration: none;
    cursor: pointer;
}
.advanced {
    display: flex;
    align-items: center;
    margin-right: 8px;
}
.ask-questions {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
#headline {
    color: #242729;
    font-size: 1.68rem !important;
    font-weight: normal;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    display: flex;
    align-items:center;
    margin: 0;
    padding: 0;
}
.search-box {
    display: flex;
}
.search-container {
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
    width: calc(100% - 300px - 24px);
}
@media (max-width: 640px) {
    .search-container {
        width: 100%;
    }
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
