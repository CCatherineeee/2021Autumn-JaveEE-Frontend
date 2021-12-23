<template>
  <div >

    <div class="usr-back" style="width: 30%;text-align: center;">
      <h1>{{user.info.userName}}</h1>
      <i class="el-icon-user-solid">  user ID:  {{user.info.userId}}</i>
      <br />
      <br />
      <i class="el-icon-s-tools">  email:  {{user.info.mail}}</i>
    </div>
    <el-container>

      <el-aside style="width: 20%">
        <br />
        <el-header>
          <h3>States</h3>
        </el-header>
        <el-main class="usr-back" >
          <el-col>
            <p style="font-size: medium;color: #3b4045;">{{user.info.reputation}}</p>
            <p style="color: #6a737c"><b>reputation</b></p>
            <br />
            <br />
          </el-col>
          <el-col>
            <p style="font-size: medium;color: #3b4045;">{{user.answers.length}}</p>
            <p style="color: #6a737c"><b>answers</b></p>
            <br />
            <br />
          </el-col>
          <el-col>
            <p style="font-size: medium;color: #3b4045;">{{user.questions.length}}</p>
            <p style="color: #6a737c"><b>questions</b></p>
            <br />
            <br />
          </el-col>
        </el-main>
      </el-aside>
      <el-main>
          <el-header><h3>Following Tags</h3></el-header>
          <el-main class="usr-back">
            <div v-for="(item,index) in user.followTags" :key=index>
              <el-row>
                <el-col span="12">
                  <el-tag><el-link :underline="false" style="color: #1e7cf0" @click="skipToTag(item.tagId)">{{item.tagName}}</el-link></el-tag>
                </el-col>
                <el-col span="6">
                  <p>{{item.tagView}}  views</p>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
          </el-main>
        <el-header>
          <el-row>
            <el-col span="12">
              <h3><br />My Posts</h3>
            </el-col>
            <el-col span="12">
              <br />
              <div class="filter-grid">
                <div class="empty"></div>
                <div class="filter">
                  <div class="filter-inner">
                    <a
                      v-for="(item, index) in filterArr"
                      :class="{active: item.isSelected}"
                      @click="selectChannel(item, index)"
                      :key="index"
                      href="javascript:void(0)">
                      {{item.name}}

                    </a>

                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <div v-if="filterArr[0].isSelected === true">

          <el-main class="usr-back">

            <div v-for="(item,index) in user.questions" :key=index>
              <el-container>
                <el-aside style="width: 70px">
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
                  <el-row>
                    <el-col span="20">
                      <el-link @click="skipToQuestion(item.questionId)">{{item.title}}</el-link>
                    </el-col>
                    <el-col span="4">
                      <p>{{item.time.split("T")[0]}}</p>
                    </el-col>
                  </el-row>
                  <br />
                </el-main>
              </el-container>
              <el-divider></el-divider>
            </div>
          </el-main>
        </div>
        <div v-if="filterArr[1].isSelected === true">
          <el-main class="usr-back">
            <div v-for="(item,index) in user.answers" :key=index>
              <el-row>
                <el-col span="20">
                  <p>{{item.description}}</p>
                </el-col>
                <el-col span="4">
                  <p>{{item.time.split("T")[0]}}</p>
                </el-col>
              </el-row>
              <br />
              <el-divider></el-divider>
            </div>
          </el-main>
        </div>
      </el-main>
    </el-container>
    <el-container>

    </el-container>
  </div>

</template>

<script>
export default {
  name: 'useDetail',
  data(){
    return{
      filterArr: [
        {
          name: 'Question',
          isSelected: true
        },
        {
          name: 'Answer',
          isSelected: false
        },
      ],
      user:{
        userName:"Manlai A",
        mail:"2870375520@qq.com",
        userId:"1",
        info: null,
        answers:10,
        questions:[],
        followTags:[
          {
            tagName:"test",
            posts:10
          },
          {
            tagName:"123",
            posts:10
          },
          {
            tagName:"123",
            posts:10
          },

        ]

      },
      userId: 5
    }
  },
  methods:{
    getUserInfo(){
      this.$axios.get("/api/users/info",{
        params:{
          userid: this.userId
        }
      }).then((res)=>{
        console.log(res.data.data)
        this.user.questions = JSON.parse(res.data.data.questions)
        this.user.answers = JSON.parse(res.data.data.answers)
        this.user.followTags = JSON.parse(res.data.data.followtags)
        this.user.info = JSON.parse(res.data.data.user)
        console.log(this.user.questions)
      })
    },
    selectChannel (item, index) {
      console.log(item, index)
      for (let i in this.filterArr) {
        this.filterArr[i].isSelected = false
      }
      this.filterArr[index].isSelected = true
    },
    skipToQuestion (id) {
      this.$router.push({path: '/question', query: {'id': id}})
    },
    skipToTag (id) {
      this.$router.push({path: '/tag', query: {id: id}})
    },
  },
  mounted () {
    this.userId = this.$route.query.id
    console.log(this.userId)
    this.getUserInfo()
  }
}
</script>

<style scoped>
.usr-back{
  padding: 30px;
  border-radius: 10px;
  border-style:solid;
  border-color: #535a60;
}
.filter-inner a {
  padding: 0 8px;
  box-shadow: 0 0 0 0 rgba(145,153,161,0);
  color: #6a737c;
  position: relative;
  padding: 0.7em 0.92em;
  outline: none;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.15384615;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #adb3b9;
}
.filter-inner a:nth-child(2),
.filter-inner a:nth-child(3),
.filter-inner a:nth-child(4),
.filter-inner a:nth-child(5){
  border-left: none;
}
.filter-inner a:nth-child(1) {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.filter-inner a:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
/*********************/
.filter-inner {
  display: flex;
  text-transform: capitalize;
}
.empty {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  font-size: 1.30769231rem !important;
}
.filter-grid {
  display: flex;
  margin-bottom: 16px !important;
}
.active {
  color: #3b4045;
  background-color: rgba(174,192,209,0.25);
  border-color: #76808a;
  z-index: 25;
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
