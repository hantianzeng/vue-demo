<template>
    <div id="tmpl">
        <div class="title">
            <ul class="cateUl">
                <li v-for="item in cateList" @click="getimages(item.id)">
                    {{item.title}}
                </li>
            </ul>
        </div>

        <!--图片展示-->
        <div id="imglist">
            <ul>

                <li v-for="item in list">
                    <router-link  v-bind="{to:'/photo/photoinfo/'+item.id}">

                    <img v-lazy="item.img_url">

                    <div id="desc">
                        <h5 v-text="item.title"></h5>
                        <p v-text="item.zhaiyao"></p>
                    </div>
                    </router-link>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    export default{
        data(){
        return {
            cateList:[],
            list:[]
        }
    },
    created(){
     this.getcates();
        //2.0 加载图片数据
        var all = 0; //获取所有数据
        this.getimages(all);
    },
    methods:{
        /*1.0获取图片的分类列表*/
        getcates (){
            var url=common.apidomain+ '/api/getimgcategory';
            this.$http.get(url).then(function (res){
                if(res.body.status !=0){
                    Toast(res.body.message);
                    return;
                }
                this.cateList=res.body.message;
            })
        },
        /*2.0获取具体的图片的分类，渲染页面*/
        getimages (cateid){
            /*http://182.254.146.100:8899*/
            var apidomain='http://182.254.146.100:8899';
            var url = apidomain + '/api/getimages/'+cateid;
            this.$http.get(url).then(function (res){
                if(res.body.status!=0){
                    Toast(res.body.message);
                    return;
                }
                this.list=res.body.message;
            })
        }
    }
    }

</script>

<style scoped>
    /*使用css样式来构建水平滚动条的滑动效果  over-flow-x:auto*/
    .title{
        width: 100%;
        max-width: 100%;
        overflow-y:hidden;
        overflow-x:auto;

    }
    /*滚动条消失*/
    ::-webkit-scrollbar {
        display: none;
    }
   .cateUl {
    width: 1000px;
    padding-left: 10px;
    display: flex;
    overflow-scrolling:touch

    }
    .cateUl li{
        flex: 1;
        list-style: none;
        height: 40px;
        line-height: 40px;
        text-align: center;
        float: left;
        margin-left: 5px;
        padding-right: 2px;
        color: dodgerblue;

    }
.cateUl li a{
    padding: 5px;
        border-right:1px solid cadetblue ;
    }

   #imglist ul{
       padding: 15px;
   }
    #imglist li{
        list-style: none;
    }
    #desc h5{
        padding-left: 5px;
        width: 100%;
        height: 30px;
        font-size: 14px;
        background-color: lightskyblue;
        color: #fff;
        line-height: 30px;
        border-radius: 4px;
    }
</style>