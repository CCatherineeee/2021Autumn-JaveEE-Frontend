
<template>
  <el-container>
    <el-header>
      <div class="subheader">
        Users
      </div>
    </el-header>

    <el-main>      
       <div className='users-box pl16 pr16 pb16'>
          <el-input v-model="inputName" placeholder="filter by user" style="margin-top:10px;display:inline-block;width:40%" @keyup.enter="handleSearch"></el-input>
          <div  style="display:inline-block; float:right">
          <div style="display:inline-block; margin-right:20px">
          <label class="s-label">reputation</label>
          </div>

          <el-button-group  style="display:inline-block;">
            <el-button type="text"  @click="handleSortBy('7')" :class="[sortType==7?'s-filter-active':'s-filter']">week</el-button>
            <el-button type="text" @click="handleSortBy('0')" :class="[sortType==0?'s-filter-active':'s-filter']">month</el-button>
            <el-button type="text" @click="handleSortBy('1')" autofocus=true :class="[sortType==1?'s-filter-active':'s-filter']">all</el-button>

          </el-button-group>
          </div>
        </div>

      <div >
        <div class="s-users">
        <el-row v-for="r in rowNums" :key="r" :gutter="20">
          <el-col :span="6"
            >
            <el-card class="box-card">
              <div  :ref="rowItems * (r - 1)" class="text item">
                <el-button type="text"  @click="clickUser(typeList[rowItems * (r - 1)].userId)">typeList[rowItems * (r - 1)].userName</el-button>               
              </div>

              <div  :ref="rowItems * (r - 1)" class="text item reputation-score">
                typeList[rowItems * (r - 1)].reputation
              </div>
            </el-card></el-col
          >
          <el-col :span="6"
            >
            <el-card class="box-card" v-if="rowItems * (r - 1) + 1<typeList.length">
              <div  :ref="rowItems * (r - 1)+1" class="text item ">
                <el-button type="text"  @click="clickUser(typeList[rowItems * (r - 1)+1].userId)">typeList[rowItems * (r - 1)].userName</el-button>               
              </div>

              <div  :ref="rowItems * (r - 1)+1" class="text item reputation-score">
                typeList[rowItems * (r - 1)+1].reputation
              </div>
            </el-card></el-col
          >
          <el-col :span="6"
            >
            <el-card class="box-card" v-if="rowItems * (r - 1) + 2<typeList.length">
              <div  :ref="rowItems * (r - 1)+2" class="text item">
                <el-button type="text"  @click="clickUser(typeList[rowItems * (r - 1)+2].userId)">typeList[rowItems * (r - 1)].userName</el-button>               
              </div>

              <div  :ref="rowItems * (r - 1)+2" class="text item reputation-score">
                typeList[rowItems * (r - 1)+2].reputation
              </div>
            </el-card></el-col
          >
          <el-col :span="6"
            >
             <el-card class="box-card" v-if="rowItems * (r - 1) + 3<typeList.length">
              <div  :ref="rowItems * (r - 1)+3" class="text item">
                <el-button type="text"  @click="clickUser(typeList[rowItems * (r - 1)+3].userId)">typeList[rowItems * (r - 1)].userName</el-button>               
              </div>

              <div  :ref="rowItems * (r - 1)+3" class="text item reputation-score">
                typeList[rowItems * (r - 1)+3].reputation
              </div>
            </el-card></el-col
          >
        </el-row>
        </div>
      </div>

      <div>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="curPage"
         :page-size="40"
          background
          layout="prev, pager, next"
          :total="itemNum">
        </el-pagination>
      </div>
    </el-main>

  </el-container>
</template>

<script>
import {getUsers} from  '@/api/users'
import {searchUsers} from '@/api/users'
import {getUsersCount} from '@/api/users'
import {getSearchCount} from '@/api/users'

export default {
  components: {

  },
  data () {
    return {
      inputName:'',
      sortType:0,

      typeList:["a",'b','c','d','e','f'],
      rowItems:4,
      curPage:1,

      itemNum:0,
    }
  },

  computed:{
    rowNums: function () {
      return Math.ceil(this.typeList.length / 4);
    },

   
  },

  methods: {
    clickUser(id){
      this.$router.push({path:'/user',query:{id:id}});
      
    },
    handleSortBy(type){
      console.log('新改变的type：',type)
      this.sortType=Number(type);

      args:{
        tab:"Reputation";
        filter:this.curPage;
        duration:this.sortType

      };

      arg:{
         tab:"Reputation";
        duration:this.sortType;
      }

      getUsersCount(arg)
      .then((res)=>{
        if(res.data.code==200){
          this.itemNum=res.data.data;
        }else{
          this.itemNum=0;
          this.$message({
            message:"内部错误",
            type:"error"
          })
        }
      })
      
      getUsers(args)
      .then((res)=>{
        if(res.data.code==200){
            this.typeList=res.data.data;
        }else{
          this.$message({
            message:"内部错误",
            type:"error"
          })
        }
      })
    },

    handleSearch(){
      getSearchCount(this.inputName)
      .then((res)=>{
        if(res.data.code==200){
          this.itemNum=res.data.data;
        }else{
           this.$message({
            message:"内部错误",
            type:"error"
          })
        }
      })
      searchUsers(this.inputName)
      .then((res)=>{
        if(res.data.code==200){
          this.typeList=res.data.data;
        }else{
          this.$message({
            message:"内部错误",
            type:"error"
          })
        }
      })

    },

    handleCurrentChange(){
      args:{
        tab:"Reputation";
        filter:this.curPage;
        duration:this.sortType

      };
      getUsers(args)
      .then((res)=>{
        if(res.data.code==200){
            this.typeList=res.data.data;
        }else{
          this.$message({
            message:"内部错误",
            type:"error"
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.s-filter{
    display: block;
    margin: 0 0 0 2px;
    padding: 8px;
    border-bottom: 1px solid transparent;
    color: black;
    font-size: 12px;
    line-height: 1.92307692;
    text-decoration: none;
    transition: all 150ms cubic-bezier(.19, 1, .22, 1);
  
}

.reputation-score {
    font-weight: bold;
    font-size: 12px;
    margin-right: 2px;
}

.s-filter-active{
      /* border-color: green; */
      border-bottom: 1px solid transparent;
    font-weight: 700;
}

.subheader{
  clear: both;
  /* margin-bottom: 10px; */
  height: 40px;
  padding-bottom: 0;
  /* border-bottom: 1px solid var(--black-075); */
  box-sizing: content-box;
  font-size: 2em;
  font-weight: 100;
  
}
.s-users{
  margin-top:20px;
}

.s-label {
    padding: 0 0px;
    color: var(--fc-dark);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
}
.user-browser {
    float: none;
    clear: both;
    width: auto;
    padding: 0 16px 16px 16px;
    display: block;
}

  .user-browser .grid-layout {
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
    }


 .headline {
    font-size: 28px;
    margin-bottom: 24px;
    line-height: 1.3;
    font-weight: 400;
    padding-left: 16px;
    padding-right: 16px;
  }

    .users-box {
    display: block;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: space-around;
  }

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
 .el-row {
    margin-bottom: 20px;

  }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
