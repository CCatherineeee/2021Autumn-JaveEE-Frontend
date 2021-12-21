<template>
    <header class="top-bar">
        <div class="logo-container">
            <a class='logo' href="javascript:void(0)">
                <img src="../../assets/stack_logo.png" alt="">
                <span class="stack-font">stack
                    <span class="flow">overflow</span>
                </span>
            </a>
        </div>
        <form action="/search" method="get" class="search" autocomplete="off">
            <div class="input-search">
                <input v-model="searchCode" id='search' type="text" @input="watchInput" @blur="hideSubmit()" @focus="focus()" placeholder="Search…" maxlength="240">
                <button @click="goSearch()" id="submit" type="button">
                    <svg style="color: #fff;" aria-hidden="true" class="iconSearch" width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#fff" d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path>
                    </svg>
                </button>
            </div>
        </form>
        <ul class="secondary">
            <li class="-item searchbar-trigger">
                <a href="#" class="-link">
                    <svg aria-hidden="true" class="svg-icon iconSearch" width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#848d95" @mouseover="changeColor($event)" d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path>
                    </svg>
                </a>
            </li>
            <li class="-item">
                <a href="javascript:void(0)" class="-link" title="Recent inbox messages">
                    <svg aria-hidden="true" class="svg-icon iconInbox" width="20" height="18" viewBox="0 0 20 18">
                        <path fill="#848d95" d="M15.19 1H4.63c-.85 0-1.6.54-1.85 1.35L0 10.79V15c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-4.21l-2.87-8.44A2 2 0 0 0 15.19 1zm-.28 10l-2 2h-6l-2-2H1.96L4.4 3.68A1 1 0 0 1 5.35 3h9.12a1 1 0 0 1 .95.68L17.86 11h-2.95z"></path>
                    </svg>
                    <span class="indicator-badge js-unread-count _important" style="display: none;"></span>
                </a>
            </li>
            <li class="-item">
                <a href="javascript:void(0)" class="-link" title="Recent achievements: reputation, badges, and privileges earned" data-unread-class="_highlighted-positive">
                    <svg aria-hidden="true" class="svg-icon iconAchievements" width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#848d95" d="M15 2V1H3v1H0v4c0 1.6 1.4 3 3 3v1c.4 1.5 3 2.6 5 3v2H5s-1 1.5-1 2h10c0-.4-1-2-1-2h-3v-2c2-.4 4.6-1.5 5-3V9c1.6-.2 3-1.4 3-3V2h-3zM3 7c-.5 0-1-.5-1-1V4h1v3zm8.4 2.5L9 8 6.6 9.4l1-2.7L5 5h3l1-2.7L10 5h2.8l-2.3 1.8 1 2.7h-.1zM16 6c0 .5-.5 1-1 1V4h1v2z"></path>
                    </svg>
                    <span class="indicator-badge js-unread-count _positive" style="display: none;"></span>
                </a>
            </li>
            <li class="-item help-button-item" data-remove-order="1">
                <a href="javascript:void(0)" class="-link" title="Help Center and other resources">
                <svg aria-hidden="true" class="svg-icon iconHelp" width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#848d95" d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm.81 12.13c-.02.71-.55 1.15-1.24 1.13-.66-.02-1.17-.49-1.15-1.2.02-.72.56-1.18 1.22-1.16.7.03 1.2.51 1.17 1.23zM11.77 8a5.8 5.8 0 0 1-1.02.91l-.53.37c-.26.2-.42.43-.5.69a4 4 0 0 0-.09.75c0 .05-.03.16-.18.16H7.88c-.16 0-.18-.1-.18-.15.03-.66.12-1.21.4-1.66a5.29 5.29 0 0 1 1.43-1.22c.16-.12.28-.25.38-.39a1.34 1.34 0 0 0 .02-1.71c-.24-.31-.51-.46-1.03-.46-.51 0-.8.26-1.02.6-.21.33-.18.73-.18 1.1H5.75c0-1.38.35-2.25 1.1-2.76.52-.35 1.17-.5 1.93-.5 1 0 1.79.18 2.49.71.64.5.98 1.18.98 2.12 0 .57-.2 1.05-.48 1.44z"></path>
                </svg>
                </a>
            </li>
            <li class="-item">
                <a href="javascript:void(0)" class="-link" data-gps-track="site_switcher.show" title="A list of all 174 Stack Exchange sites">
                    <svg aria-hidden="true" class="svg-icon iconStackExchange" width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#848d95" d="M1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 0 0 2-2v-2H1v2zM15 1H3a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2zM1 6h16v4H1V6z"></path>
                    </svg>
                </a>
            </li>
            <li class="-ctas">
                <a href="javascript:void(0)" class="login s-btn btn-topbar-clear py8" rel="nofollow" @click="goLogin">Log In</a>
                <a href="javascript:void(0)" class="sign-up s-btn s-btn__primary py8 btn-topbar-primary" rel="nofollow" @click="goSignUp">Sign Up</a>

            </li>
        </ul>
    </header>
</template>
<script>
import * as publicModule from '../../core/js/publicMethod'
import bus from '../../core/js/bus.js'
export default {
    name: 'topbar',
    data () {
        return {
            isFocus: false,
            searchCode: '',
            key: ''
        }
    },
    watch: {
        '$route': function(to, from) {
            console.log(to)
            //     this.searchCode = ''
        }
    },
    mounted () {
    },
     beforeDestroy () {
    },
    created() {
        let that = this
        bus.$on('clear-search', function() {
            that.clearSearch()
        });
        bus.$on('message-topbar', function(key) {
            that.messageTopbar(key)
        });
    },
    methods: {
        watchInput (value) {
            console.log(value)
        },
        messageTopbar (key) {
            this.searchCode = key
        },
        clearSearch () {
            this.searchCode = ''
        },
        goSearch () {
            console.log(this.searchCode);
            bus.$emit('message-search', this.searchCode);
            publicModule.goArouter(this, '/search'+ '?q=' + this.searchCode);
        },
        goLogin () {
          publicModule.goArouter(this, '/login');
        },
        goSignUp(){
            publicModule.goArouter(this, '/register');
        },
        changeColor (e) {
            // console.log(e)
            //   console.log(e.path.style.fill)
            // e.path.style.fill = 'red';
        },
        hideSubmit () {
            document.querySelector('#submit').style.opacity = '0'
            document.querySelector('.input-search').style.border = '1px solid #ccc'
            document.querySelector('.input-search').style.boxShadow = ''
        },
        focus () {
            console.log(this.searchCode)
            document.querySelector('#submit').style.opacity = '1'
            document.querySelector('.input-search').style.border = '1px solid #1997fc'
            document.querySelector('.input-search').style.boxShadow = 'inset 0 2px 2px #fafafb, 0 0 5px rgba(0,199,204,0.4);';
        }
    }
}
</script>
<style scoped>
.input-search #submit .iconSearch ​path{
    transition: opacity 200ms cubic-bezier(.165, .84, .44, 1);
    vertical-align: bottom;
    ​fill: #fff;
}
/************secondary***********/
.top-bar .secondary .-ctas .sign-up:hover{
    background: #07c;
}
.top-bar .secondary .-ctas .login:hover{
    background: #e3edf5;
}
.py8 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
}
.s-btn {
    position: relative;
    padding: .9em;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: transparent;
    outline: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.15384615;
    text-decoration: none;
    cursor: pointer;
    border-color: rgba(0,89,153,0);
}
.top-bar .secondary .-ctas .btn-topbar-primary {
    font-weight: normal;
    background: none;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    color: #FFF;
    background-color: #0095ff;
    border: 1px solid #07c;
    box-shadow: inset 0 1px 0 #66bfff;
}
.top-bar .secondary .-ctas .btn-topbar-clear {
    font-weight: normal;
    background: none;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    color: #07C;
    background-color: transparent;
}
.top-bar .-secondary .-ctas {
    padding-left: 4px;
    white-space: nowrap;
}
.top-bar .secondary .-item:hover {
    background: #eff0f1;
}
.top-bar .secondary .searchbar-trigger {
    opacity: 0;
}
.top-bar .secondary .-item {
    position: relative;
    flex-shrink: 0;
    display: inline-flex;
    padding-bottom: 0;
    height: 100%;
}
.top-bar .secondary .-item .-link {
    color: #848d95;
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    transition: background-color cubic-bezier(.165, .84, .44, 1) .25s,color cubic-bezier(.165, .84, .44, 1) .25s;
}
.secondary {
    height: 100%;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 48px;
    align-items: center;
    flex-grow: 1;
    justify-content: flex-end;
}
/***********search************/
.search {
    display: block;
}
.search .input-search button:hover {
    background: #07c;
}
.search .input-search button {
    font-weight: normal;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    color: #FFF;
    background-color: #0095ff;
    border: 1px solid #07c;
    box-shadow: inset 0 1px 0 #66bfff;
    height: 35px;
    width: 44px;
    margin: 0;
    border-radius: 0 3px 3px 0;
    z-index: -1;
    padding: 0 12px;
    opacity: 0;
    transition: opacity .35s cubic-bezier(.165, .84, .44, 1);
    float: right;
}
.input-search input {
    width: 80%;
    margin-left: 3%;
    transition: all 600ms cubic-bezier(.165, .84, .44, 1);

}
.input-search:hover {
    border: 1px solid #1997fc;
    box-shadow: inset 0 2px 2px #fafafb, 0 0 5px rgba(0,199,204,0.4);
}
.input-search {
    max-width: 352px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 4px;
}
.top-bar .search {
    padding: 0 0 0 28px;
    flex: 10000 1 auto;
    max-width: 400px;
    position: relative;

}
/************logo*************/
.stack-font .flow {
    font-weight: bold;
    font-size: 17px;
}
.stack-font {
    font-size: 18px;
    color: black;
}
.logo-container .logo span {
    display: inline-block;
    white-space:nowrap;
    line-height: 52px;
    height: 47px;;
}
.logo-container .logo img {
    width: 25px;
    height: 30px;
}
.logo-container .logo{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    align-items: center;
}
.logo-container {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 16%;
    height: 100%;
}
.top-bar {
    position: fixed;
    display: flex;
    align-items: center;
    min-width: auto;
    box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(59,64,69,0.1);
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1050;
    background-color: #fafafb;
    transition: box-shadow cubic-bezier(.165, .84, .44, 1) .25s;
    height: 50px;
    box-sizing: border-box;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
    border-top: 3px solid #F48024;
}
.container {
    width: 100%;
    height: 100%;
}
/*****媒体查询*******/
@media (max-width:790px){
    .search{
        display:none;
    }
    .top-bar .secondary .searchbar-trigger {
        opacity: 1;
        transition: opacity  600ms cubic-bezier(.165, .84, .44, 1);
    }
}
</style>
