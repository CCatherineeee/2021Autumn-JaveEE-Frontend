<template>
    <div class="suspension">
        <div class="message">
            <p class="">
                This site uses cookies to deliver our services and to show you relevant ads and job listings. 
                By using our site, you acknowledge that you have read and understand our
                <a target="_blank" href="javascript:void(0)">Cookie Policy</a>,
                <a target="_blank" href="javascript:void(0)">Privacy Policy</a>, and our <a class="s-link s-link__inherit td-underline fc-white" target="_blank" href="https://stackoverflow.com/legal/terms-of-service/public">Terms of Service</a>. 
                Your use of Stack Overflow’s Products and Services, including the Stack Overflow Network, is subject to these policies and terms.
            </p>
        </div>
        <a class="cha"> 
            <img style='width: 30%;' src="../../assets/cha.png" alt="">
        </a>
    </div>
</template>
<script>

export default {
    name: 'suspension',
    components:{
    },
    data () {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style scoped> 
.message .cha img {
    width: 10% !important;
}
.message .cha {
    width: 18px;
} 
.message p a {
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif !important;;
    font-weight: bold;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
}
.message p {
    font-weight: bold;
    color: #fff;
    line-height: 1.61538462 !important;
    margin-right: 12px;
}
.suspension {
    width: 100%;
    display: flex;
    background-color: #3b4045 !important;
    padding: 16px !important;
}
.suspension-container {
    width: 100%;
}
</style>