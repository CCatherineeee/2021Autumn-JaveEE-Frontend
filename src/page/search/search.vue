<template>
    <div ref="searchContainer" class="search-container">
        <div class="mb24 search-box">
            <div v-if="has_q" >Search Results</div>
            <div v-else >Search</div>
            <div class="ask-questions">
                <div class="advanced">
                    <a href="#" class="js-advanced-tips-toggle">Advanced Search Tips</a>
                </div>
                <div class="ask-new-question" role="navigation" aria-label="ask new question">
                    <a href="/questions/ask" style="font-size: 14px;" class="s-btn">Ask Question</a>
                </div>
            </div>
        </div>
        <div v-if="has_q" class="displaying-results">
            <span class="mr2">results found containing</span>
            <span class="displaying-results-highlight">{{words}}</span>
        </div>
        <div class="bigsearch-inner">
            <input v-model="keyWords" name="q" class="s-input" type="text" maxlength="140" size="80">
            <button @click="getResults(keyWords, 'current')" class="search-btn">search</button>
        </div>

        <!---rearch-results-->
        <q-results v-if="has_q" v-on:filter-by="filterBy" ref="Results" :q="keyWords" :results="resultsObj" :has_results="hasResults"></q-results>

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
            resultsObj: {}
        }
    },
    methods: {
        getRsList () {
          var params = new URLSearchParams()
          params.append('keywords', this.$route.query.searchCode)
          params.append('page', 1)
            this.$axios.post("/api/api/question/search" , params,{
              headers:{
                "x-auth-token":localStorage.getItem('token')
              }
            })
            .then(function (res) {
                console.log(res)
            })
            .catch(function (error) {
                console.log(error);
            })
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
</style>
