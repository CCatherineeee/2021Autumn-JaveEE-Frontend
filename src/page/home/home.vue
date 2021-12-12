<template>
    <div class="home-container">
        <div class="mainbar">
            <div class="grid">
                <h1 class="top-questions">
                    Top Questions
                </h1>
                 <div class="ask-question">
                     <button disabled="disabled">Ask Question</button>
                 </div>
            </div>
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
            <div class="qlist">
                <div class="qlist-inner">
                    <div v-for="(item, index) in questions" :key="index" class="question-summary">
                        <div class="interaction">
                            <div class="votes">
                                <div class="mini-counts">{{item.score}}</div>
                                <p>votes</p>
                            </div>
                            <div 
                            :class="{answered: item.answer_count > 0 ? true : false }"
                            class="answers"
                            >
                                <div class="mini-counts">{{item.answer_count}}</div>
                                <p>answers</p>
                            </div>
                            <div class="view">
                                <div class="mini-counts">{{item.view_count}}</div>
                                <p>view</p>
                            </div>
                        </div>
                        <div class="summary">
                            <h3>
                                <a class="description" href="javascript;void(0)">
                                    {{item.title}}
                                </a>
                            </h3>
                            <div class="tags">
                                <a 
                                v-for="(tag, tagIndex) in item.tags" 
                                href="javascript:void(0)"
                                :key="tagIndex"
                                >{{tag}}</a>
                            </div>
                            <div class="started">
                                <a class="started-link" href="javascript:void(0)">
                                    <span v-if="item.answer_count > 0">
                                        <span v-if="item.last_activity_date > item.last_edit_date">
                                            answered
                                        </span>
                                        <span v-else>
                                            modified
                                        </span>
                                    </span>
                                    <span v-else>asked</span> 
                                    <span class="relativetime">
                                        <span v-if="item.creation_date && (!item.last_activity_date && !item.last_edit_date)">
                                            {{calculateGap(item.creation_date)}}
                                        </span>
                                        <span v-if="item.creation_date && (item.last_activity_date && !item.last_edit_date)">
                                            {{calculateGap(item.last_activity_date)}}
                                        </span>
                                        <span v-if="item.creation_date && (!item.last_activity_date && item.last_edit_date)">
                                            {{calculateGap(item.last_edit_date)}}
                                        </span>
                                        <span v-if="item.creation_date && (item.last_activity_date && item.last_edit_date)">
                                            {{calculateGap(item.last_activity_date)}}
                                        </span>
                                        ago
                                    </span>
                                </a>
                                <a class="uname" href="javascript:void(0)">{{item.owner.display_name}}</a>
                                <span class="reputation-score" title="reputation score">{{item.owner.reputation}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sidebar">

        </div>
    </div>
</template>
<script>

export default {
    name: 'home',
    components:{
        
    },
    watch: {
        // 'questions': function (value) {
        //     // this.calculateGap()
        //     console.log(value);
        // }
    },
    data () {
        return {
            isSelected: false,
            filterArr: [
                {
                    name: 'interesting',
                    isSelected: true
                },
                {
                    name: 'featured',
                    isSelected: false
                },
                {
                    name: 'hot',
                    isSelected: false
                },
                {
                    name: 'week',
                    isSelected: false
                },
                {
                    name: 'month',
                    isSelected: false
                }
            ],
            prefix: 'http://api.stackexchange.com/2.2/',
            questions: []
        }
    },
    mounted () {
        this.getQuestions()
    },
    filters: {
       
    },
    methods: {
        calculateGap (time) {
            let old = (time + '').length > 10 ? time : time * 1000;
            let gap = new Date().getTime() - old;
            let days = parseInt(gap / parseInt(1000 * 60 * 60 * 24));
            let hours = parseInt(gap / parseInt(1000 * 60 * 60));
            let mins = parseInt(gap / parseInt(1000 * 60));
            let secs = parseInt(gap / parseInt(1000));
            if (days > 0) {
                return days + ' days'
            } else {
                if (hours > 0) {
                    return hours + ' hours'
                } else {
                   if (mins > 0) {
                       return mins + ' mins'
                   } else {
                       if (secs > 0) {
                           return secs + ' secs'
                       }
                   }
                }
            }
        },
        getQuestions () {
            let that = this
            axios.get(this.prefix + 'questions',{
                params: {
                    order: 'desc',
                    sort: 'activity',
                    site: 'stackoverflow'
                }
            })
            .then(function (res) {
                console.log(res)
               that.questions = res.data.items;
                console.log(that.questions);
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        selectChannel (item, index) {
            console.log(item, index)
            for (let i in this.filterArr) {
                this.filterArr[i].isSelected = false;
            }
            this.filterArr[index].isSelected = true;
        }
    }
}
</script>
<style scoped> 
/***************/
.reputation-score {
    font-weight: bold;
    color: #848d95;
    font-size: 12px;
    margin-right: 2px;
}
.started .uname:hover{
     color: #3cacfc;
}
.started a:not(.started-link) {
    font-size: 12px;
    color: #07C;
}
.started-link:hover {
    color: #1279c9;
}
.started-link {
    font-size: 12px;
    color: #9199a1;
}
.started a {
    cursor: pointer;
}
.started {
    width: auto;
    line-height: inherit;
    padding-top: 4px;
    white-space: nowrap;
    float: right;
}
/******************/
.tags a {
    font-size: 12px;
    color: #39739d;
    background-color: #E1ECF4;
    border: 1px solid #E1ECF4;
    position: relative;
    display: inline-block;
    padding: .4em .5em;
    margin: 2px 6px 2px 0;
    line-height: 1;
    white-space: nowrap;
    text-decoration: none;
    text-align: center;
    border-radius: 3px;
    transition: all .15s ease-in-out;
}
.tags {
    line-height: 18px;
    float: left; 
}
/****************/
.summary h3 {
    margin-bottom: .35em;
}
.summary h3 a:hover {
    color: #3cacfc;
}
.description {
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
    color: #07C;
    line-height: 1.3;
    margin-bottom: 1.2em;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
}
/*************/
.question-summary .interaction .answered{
    color: #45A163;
    border: 1px solid rgba(69,161,99,0.5);
    border-radius: 3px;
}
.question-summary .interaction .answered .mini-counts {
    color: #45A163;
}
.mini-counts {  
    font-size: 17px;
    font-weight: 300;
    color: #6a737c;
    margin-bottom: 4px;
}
.interaction .votes, .interaction .answers, .interaction .view{
    display: inline-block;
    /* height: 38px; */
    min-width: 38px;
    margin: 0 3px 0 0;
    font-size: 11px;
    color: #848d95;
    padding: 7px 6px;
    text-align: center;
}
.interaction {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    margin-right: 0;
    padding: 0 8px 0 0;
    box-sizing: content-box;
    flex-shrink: 0;
}
.summary {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    width: auto;
    float: none;
    margin: 0;
    overflow: hidden;
}
/*************/
.question-summary {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #eff0f1;
    padding: 12px 8px;
    display: flex;
}
.qlist-inner {
    margin-bottom: 30px;
}
.qlist {
    border-top: 1px solid #d6d9dc;
    margin-left: -24px;
}
/******************/
.active {
    color: #3b4045;
    background-color: rgba(174,192,209,0.25);
    border-color: #76808a;
    z-index: 25;
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
/************************/
.ask-question button:hover {
    background: #1480d6;
}
 .ask-question button {
    box-shadow: inset 0 1px 0 0 rgba(102,191,255,0.75), 0 0 0 0 rgba(0,149,255,0);
    color: #FFF;
    position: relative;
    padding: 0.85em 0.58em;
    border: 1px solid #07c;
    border-radius: 3px;
    outline: none;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.15384615;
    text-decoration: none;
    cursor: pointer;
    background-color: #0095ff;
 }
.ask-question {
    padding-left: 8px;
}
.top-questions{
    font-size: 1.7rem !important;
    flex: 1 auto !important;
   
    font-weight: normal;
    color: #242729;;
}
.grid {
    display: flex;
}
/*****************/
.sidebar {
    width: 300px;
    float: right;
    margin: 0 0 15px;
}
.mainbar {
    width: calc(100% - 300px - 24px);
    float: left;
    margin: 0;
    padding: 0;
}
.home-container {
    width: 100%;
    height: 100%;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
}
/*********媒体查询**********/
@media (max-width: 980px){
    .sidebar{
        display: none;
    }
    .mainbar {
        width: 100%;
    }
    .qlist {
        margin-left: -16px;
        margin-right: -16px;
        width: calc(100% + 2*16px);
    }
}
@media (max-width: 640px) {
    .sidebar{
        display: none;
    }
    .question-summary {
        display: block;
    }
    .interaction {
        padding-bottom: 8px
    }
    .interaction .votes, .interaction .view {
        padding: 4px 0;
        line-height: 1;
        box-sizing: border-box;
        width: auto;
        height: auto;
        border-radius: 3px;
        min-width: auto;
        text-align: left;
        margin: 0 4px 0 0
    }
    .interaction .votes .mini-counts,
    .interaction .view .mini-counts,
    .interaction .answers .mini-counts,
    .interaction .votes p,
    .interaction .view p,
    .interaction .answers p
    {
        display: inline-block;
        font-size: 12px;
        height: 12px;
    }
    .interaction .answers {
        padding: 2px 5px;
    }
    .interaction .answers .mini-counts {
        margin-bottom: 0;
    }
}
</style>