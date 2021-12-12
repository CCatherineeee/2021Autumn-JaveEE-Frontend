<template>
    <footer class="footer-container">
        <div class="footer-inner">
            <div class="footer-logo">
                <a href="javascript:void(0)">
                    <img src="../../assets/footer-logo.png" alt="">
                </a>
            </div>
            <nav class="footer-nav">
                <dl v-for="(item, itemIndex) in navArr" :key="itemIndex">
                    <dt>
                        <a href="javascript:void(0)">
                            {{item.title}}
                        </a>
                    </dt>
                    <dd v-if="itemIndex < 3" v-for="(it, index) in item.arr" :key="index">
                        <a href="javascript:void(0)">
                            {{it.name}}
                        </a>
                    </dd>
                    <dd v-if="itemIndex === 3" v-for="(it, index) in item.arr" :key="index">
                        <a class="site-footer-expandable" href="javascript:void(0)">
                            {{it.name}}
                        </a>
                    </dd>
                </dl>
            </nav>
            <div class="footer-copyright">
                <ul class="list">
                    <li v-for="(item, index) in linkedArr" :key="index" class="-item">
                        <a href="javascript:void(0)">
                            {{item.name}}
                        </a>
                    </li>
                </ul>
                <p class="license">
                    site design / logo © 2018 Stack Exchange Inc; user contributions licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="license">cc by-sa 3.0</a>
                    with
                    <a href="javascript:void(0)" rel="license">
                        attribution required
                    </a>.
                    <span id="svnrev">rev&nbsp;2018.9.20.31643</span>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'users',
    components:{
        
    },
    data () {
        return {
            linkedArr: [
                {name: 'Blog'},
                {name: 'Facebook'},
                {name: 'Twitter'},
                {name: 'LinkedIn'}
            ],
            navArr: [
                {
                    title: 'STACK OVERFLOW',
                    arr: [
                        {name: 'Questions'},
                        {name: 'Jobs'},
                        {name: 'Developer Jobs Directory'},
                        {name: 'Salary Calculator'},
                        {name: 'Help'},
                        {name: 'Mobile'},
                        {name: 'Disable Responsiveness'}
                    ]
                }, {
                    title: 'PRODUCTS',
                    arr: [
                        {name: 'Teams'},
                        {name: 'Talent'},
                        {name: 'Engagement'},
                        {name: 'Enterprise'}
                    ]
                }, {
                    title: 'COMPANY',
                    arr: [
                        {name: 'About'},
                        {name: 'Press'},
                        {name: 'Work Here'},
                        {name: 'Legal'},
                        {name: 'Privacy Policy'},
                        {name: 'Contact Us'}
                    ]
                }, {
                    title: 'STACK EXCHANGE NETWORK',
                    arr: [
                        {name: 'Technology'},
                        {name: 'Life / Arts'},
                        {name: 'Culture / Recreation'},
                        {name: 'Science'},
                        {name: 'Others'}
                    ]
                }
            ]
        }
    },
    methods: {
        
    }
}
</script>
<style scoped> 
.footer-container .footer-inner .footer-nav dl dd .site-footer-expandable:after {
    right: 5px;
    top: 50%;
    margin-top: -2px;
    z-index: 2;
    width: 4px;
    height: 4px;
    max-width: 4px;
    transform: rotate(45deg);
    border-top: 1px solid transparent;
    border-right: 1px solid transparent;
    border-color: rgba(132,141,149,0.8);
    border-bottom-right-radius: 1px;
    content: '';
    position: absolute;
    overflow: hidden;
    pointer-events: none;
}
.footer-container .footer-inner .footer-nav dl dd .site-footer-expandable:before {
    right: 0;
    top: 50%;
    margin-top: -6px;
    max-width: 12px;
    width: 12px;
    height: 12px;
    background-color: rgba(132,141,149,0.35);
    opacity: .5;
    border-radius: 3px;
}
/***************************/
.footer-copyright .license a {
    color: #848d95;
}
.footer-copyright .list a:hover {
    color: #bbc0c4;
    cursor: pointer;
}
.footer-copyright .license{
    margin-bottom: 24px;
    margin-top: auto;
}
.footer-copyright .list li+li {
    margin-left: 12px;
}
.footer-copyright .list li a {
    color: #848d95;
}
.footer-copyright ul {
    display: flex;
    margin: 0;
    padding: 0;
}
.footer-copyright {
    flex: 1 1 150px;
    display: flex;
    flex-direction: column;
}
/***********************/
.footer-nav dl dd a:hover {
    color: #bbc0c4;
}
.footer-nav dl dt a:hover {
    color: #f2f3f3;
}
.footer-nav dl dd a, .footer-nav dl dt a {
    word-wrap:break-word; 
    cursor: pointer;
    font-weight: bold;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
}
.footer-nav dl:last-child dt a {
    /* background: red; */
    width: 50px;
}
.footer-nav dl dd a {
    color: #848d95;
}
.footer-nav dl dt a {
    color: #bbc0c4;
} 
.footer-nav dl dd{
    color: #848d95;
    padding: 4px 0;
    line-height: 1.30769231;
    display: inline-block;
    text-decoration: none;
}
.footer-nav dl dt{
    text-transform: uppercase;
    margin-bottom: 12px;
    color: #bbc0c4;
    line-height: 1.30769231;
    max-width: 230px;
}
.footer-nav dl:last-child {
    padding-right: 32px;
    position: relative;
    flex: 0 1 230px;
}
.footer-nav dl {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
}
.footer-nav {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 2;
    flex-shrink: 0;
    flex-basis: auto;
}
/*******************/
.footer-inner .footer-logo a img {
    width: 32px;
    height: 37px;
}
.footer-logo a {
    width: 100%;
    height: 100%;
}
.footer-logo {
    flex: 0 0 64px;
    margin: -12px 0 32px 0;
}
.footer-inner {
    max-width: 1264px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.footer-container {
    padding: 32px 12px 12px 12px;
    background-color: #242729;
    background-image: none;
    background-position: top left;
    background-repeat: no-repeat;
    background-size: auto;
    color: #6a737c;
}
</style>