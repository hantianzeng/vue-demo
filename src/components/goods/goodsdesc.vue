<template>
    <div id="tmpl">
        <h4 v-text="detailInfo.title"></h4>
        <hr/>
        <p v-html="detailInfo.content"></p>
    </div>
</template>

<script>
    import comment from '../subcom/comment.vue';
    import slider from '../subcom/slider.vue'
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    export default  {
        data(){
        return {
            detailInfo:{}
        }

    },
    created(){
        this.id=this.$route.params.id;
        this.getinfo();

    },
    methods:{
        getinfo(){
            var url =common.apidomain +'/api/goods/getdesc/'+this.id;
            this.$http.get(url).then(function (res){
                if(res.body.status!=0){
                    Toast(res.body.message);
                }
                this.detailInfo=res.body.message[0];
                console.log(res.body.message[0]);
            })
        }
    }

    }
</script>

<style scoped>

</style>