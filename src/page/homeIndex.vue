<template>
    <div>
        <!-- <top-bar></top-bar> -->
        <div style="width: 100%;height: 100%;" class="banner-view">
            <!-- <router-view name="childBanner"></router-view> -->
            <!-- <home-banner v-if="isBannerShow"></home-banner> -->
        </div>
        <section class="content">
           <div class="left-sidebar">
               <div class="left-sidebar-inner">
                   <ul class="left-sidebar-inner-ul">
                        <li
                        :class="{active: item.isActive}"
                        @click="changeView(item, index)"
                        v-for = "(item, index) in sideBarArr"
                        :key="index"
                        class="sidebarli">
                            <a href="javascript:void(0)" class="nav-links-link">
                                {{item.name}}
                            </a>
                        </li>
                    </ul>
                    <div class="teams">
                        <div class="teams-inner">
                            <strong class="grid--cell">Teams</strong>
                            <span class="grid--cell mt2 fs-caption fc-medium">Q&amp;A for work </span>
                            <a href="javascript:void(0)" class="learn-more">
                                Learn More
                            </a>
                            <div class="message-key">
                                <svg width="53" height="49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M49 11l.2 31H18.9L9 49v-7H4V8h31" fill="#CCEAFF"></path>
                                    <path d="M44.5 19v-.3l-.2-.1-18-13-.1-.1H.5v33h4V46l.8-.6 9.9-6.9h29.3V19z" stroke="#1060E1" stroke-miterlimit="10"></path>
                                    <path d="M31 2l6-1.5 7 2V38H14.9L5 45v-7H1V6h25l5-4z" fill="#fff"></path>
                                    <path d="M7 16.5h13m-13 6h14m-14 6h18" stroke="#1060E1" stroke-miterlimit="10"></path>
                                    <path d="M39 30a14 14 0 1 0 0-28 14 14 0 0 0 0 28z" fill="#FFB935"></path>
                                    <path d="M50.5 14a13.5 13.5 0 1 1-27 0 13.5 13.5 0 0 1 27 0z" stroke="#F48024" stroke-miterlimit="10"></path>
                                    <path d="M32.5 21.5v-8h9v8h-9zm2-9.5V9.3A2.5 2.5 0 0 1 37 6.8a2.5 2.5 0 0 1 2.5 2.5V12h-5zm2 3v2m1-2v2" stroke="#fff" stroke-miterlimit="10"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
           <div class="right-content">
               <div style="width: 100%;height: 100%;" class="main-view">
                   <!-- <router-view name="main"></router-view> -->
                    <router-view></router-view>
               </div>
           </div>
       </section>

    </div>
</template>
<script>
// import Vue from 'vue'
import homeBanner from '../components/header/homeBanner'
export default {
  name: 'homeIndex',
  components: {
    homeBanner
  },
  watch: {
    '$route': function (to, from) {
      this.getStyleInit()
    }
  },
  data () {
    return {
      isFocus: false,
      isActive: true,
      isBannerShow: false,
      sideBarArr: [
        {
          name: 'Home',
          path: '/',
          isActive: true
        }, {
          name: 'PUBLIC'
        }, {
          name: 'Stack Overflow',
          path: '/questions',
          isActive: false
        }, {
          name: 'Tags',
          path: '/tags',
          isActive: false
        }, {
          name: 'Users',
          path: '/users',
          isActive: false
        }, {
          name: 'Jobs',
          path: '/jobs',
          isActive: false
        }
      ]
    }
  },
  mounted () {
    this.getStyleInit()
  },
  methods: {
    getStyleInit () {
      let arr = this.sideBarArr
      for (let i in arr) {
        arr[i].isActive = false
      }
      let index = this.sideBarArr.findIndex((item) => {
        return item.path === this.$route.path
      })
      if (this.$route.path === '/search') {
        this.sideBarArr[2].isActive = true
      } else {
        this.sideBarArr[index].isActive = true
      }
      if (!index) {
        this.isBannerShow = true
      } else {
        this.isBannerShow = false
      }
    },
    skip (item, index) {
      let newSideBar = []
      if (item.path) {
        for (let i in this.sideBarArr) {
          newSideBar.push({
            name: this.sideBarArr[i].name,
            path: this.sideBarArr[i].path,
            isActive: false
          })
        }
      }
      newSideBar[index].isActive = true
      this.sideBarArr = newSideBar
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: item.path})
      document.getElementById('search').value = ''
    },
    changeView (item, index) {
      if (item.name === 'Home') {
        this.isBannerShow = true
      } else {
        this.isBannerShow = false
      }
      if (index !== 1) {
        this.skip(item, index)
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
.learn-more {
    position: relative;
    padding: .55em;
    border: 1px solid #0095ff;
    border-radius: 3px;
    background-color: transparent;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.15384615;
    text-decoration: none;
    cursor: pointer;
    margin-top: 12px;
    text-align: center;
    box-sizing: border-box;
    color: #07C;
}
.message-key {
    position: absolute;
    right: -6px;
    top: 4px;
}
.teams-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #e4e6e8;
    border-radius: 3px;
    padding: 16px;
    overflow: hidden;
}
.teams {
    margin-bottom: 12px;
    padding: 6px !important;
}
/****************/
.active {
   font-weight: bold;
    background: rgba(12,13,14,0.05);
    border-right: 3px solid #F48024;
}
/*********************/
.sidebarli{
    cursor: pointer;
}
.left-sidebar-inner .left-sidebar-inner-ul .sidebarli:nth-child(2) {
    cursor: auto !important;
}
.sidebarli:nth-child(3) {
    width: inherit;
    height: 33px;
    line-height: 33px;
}
.sidebarli:nth-child(2) {
    margin: 15px 0 4px 0;
}
.sidebarli:nth-child(1), .sidebarli:nth-child(4), .sidebarli:nth-child(5), .sidebarli:nth-child(6) {
    width: inherit;
    height: 31px;
    line-height: 31px;
}
.sidebarli:nth-child(3), .sidebarli:nth-child(4), .sidebarli:nth-child(5), .sidebarli:nth-child(6) {
    padding-left: 20px;
}
.nav-links-link {
    box-sizing: border-box;
    cursor: pointer;
}
.left-sidebar-inner-ul .sidebarli:nth-child(2) .nav-links-link{
    cursor: auto;
}
.left-sidebar-inner .left-sidebar-inner-ul .sidebarli {
    /* background: red; */
}
.left-sidebar-inner .left-sidebar-inner-ul .sidebarli a{
    padding-left: 10px;
    color: #535a60;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
}
.left-sidebar-inner .left-sidebar-inner-ul .sidebarli:hover a {
     color: #0C0D0E;
}
.left-sidebar-inner .left-sidebar-inner-ul .sidebarli:nth-child(2):hover a {
     color: #535a60;
}
.active a {
    color: #0C0D0E !important;
}
/*****************************/
.right-content{
    max-width: 1100px;
    width: calc(100% - 164px);
    background-color: #FFF;
    border-radius: 0;
    border: 1px solid #d6d9dc;
    border-top-width: 0;
    border-bottom-width: 0;
    border-left-width: 1px;
    border-right-width: 0;
    padding: 24px;
    box-sizing: border-box;
}
.left-sidebar-inner {
    position: -webkit-sticky;
    position: sticky;
    width: auto;
    margin-bottom: 8px;
    top: 74px;
}
.left-sidebar {
   width: 164px;
    padding-top: 24px;
    flex-shrink: 0;
    z-index: 1000;
    position: relative;
    box-shadow: 0 0 0 rgba(12,13,14,0.05);
    transition: box-shadow ease-in-out .1s,transform ease-in-out .1s;
}
section {
    max-width: 1264px;
    width: 100%;
    background: none;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}
.banner-view {
    margin-top: 50px;
}
/***********媒体查询**********/
@media (max-width: 980px) {
    .right-content {
        padding-left: 16px;
        padding-right: 16px;
    }
}
@media (max-width: 640px) {
    .right-content {
        width: 100%;
    }
    .left-sidebar {
        display: none;
    }
}
</style>
