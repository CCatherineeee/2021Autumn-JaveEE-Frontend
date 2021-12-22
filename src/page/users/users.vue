
<template>
  <el-container>
    <el-main>
          <div>
          <h1 className='headline'>Users</h1>
          </div>  

       <div className='users-box pl16 pr16 pb16'>
         <el-input v-model="inputName" placeholder="filter by user" width="200px" @keyup.enter="handleSearch"></el-input>
          
          <el-button-group>
            <el-button type="primary" >reputation</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="text"  @focus="handleSortBy(7)">week</el-button>
            <el-button type="text" @focus="handleSortBy(0)">month</el-button>
            <el-button type="text" @focus="handleSortBy(1)" autofocus=true >all</el-button>

          </el-button-group>
        </div>

      <div >
        <div >
        <el-row v-for="r in rowNums" :key="r" :gutter="20">
          <el-col :span="6"
            >
            <el-card class="box-card">
              <!-- TODO 姓名连接到用户主页-->
              <div  :ref="rowItems * (r - 1)" class="text item">
                typeList[rowItems * (r - 1)].userName
              </div>

              <div  :ref="rowItems * (r - 1)" class="text item">
                typeList[rowItems * (r - 1)].reputation
              </div>
            </el-card></el-col
          >
          <el-col :span="6"
            >
            <el-card class="box-card" v-if="rowItems * (r - 1) + 1<typeList.length">
              <div  :ref="rowItems * (r - 1)+1" class="text item">
                typeList[rowItems * (r - 1)+1].userName
              </div>

              <div  :ref="rowItems * (r - 1)+1" class="text item">
                typeList[rowItems * (r - 1)+1].reputation
              </div>
            </el-card></el-col
          >
          <el-col :span="6"
            >
            <el-card class="box-card" v-if="rowItems * (r - 1) + 2<typeList.length">
              <div  :ref="rowItems * (r - 1)+2" class="text item">
                typeList[rowItems * (r - 1)+2].userName
              </div>

              <div  :ref="rowItems * (r - 1)+2" class="text item">
                typeList[rowItems * (r - 1)+2].reputation
              </div>
            </el-card></el-col
          >
          <el-col :span="6"
            >
             <el-card class="box-card" v-if="rowItems * (r - 1) + 3<typeList.length">
              <div  :ref="rowItems * (r - 1)+3" class="text item">
                typeList[rowItems * (r - 1)+3].userName
              </div>

              <div  :ref="rowItems * (r - 1)+3" class="text item">
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
    }
  },

  computed:{
    rowNums: function () {
      return Math.ceil(this.typeList.length / 4);
    },

    itemNum:function(){
      return this.typeList.length;
    }
  },

  methods: {
    handleSortBy(type){
      this.sortType=type;

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
    },

    handleSearch(){
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
