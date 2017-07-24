<template>
    <div id="tmpl">
        <!--轮播图展示商品图片-->
        <slider :imgs="imgs"></slider>
        <!--展示商品的参数-->
        <!--商品购买模块-->
        <div id="buy">
            <h4 v-text="info.title"></h4>
            <p class="line"></p>
            <ul>
                <li class="price">
                    市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price}}</span>
                </li>
                <li>
                    <!--采用子组件的形式来表现-->
                    购买数量： <inputnumber v-on:dataobj="getcount" class="inputnumber"></inputnumber>
                </li>
                <transition name="show"
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @after-enter="afterEnter">
                <div id="ball" v-if="isshow"></div>
                </transition>
                <li>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>

                </li>
            </ul>

        </div>
        <!--商品参数的模块-->
        <div id="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号： {{info.goods_no}}</li>
                <li>库存情况： {{info.stock_quantity}}</li>
                <li>上架时间： {{info.add_time}}</li>
            </ul>
        </div>
        <!--其它信息模块-->
        <div id="other">
            <!--使用路由实现图文详情页面的跳转-->
            <router-link  v-bind="{to:'/goods/goodsdesc/'+info.id}">
            <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>

            <mt-button type="danger" size="large">商品评论</mt-button>
        </div>
    </div>

</template>

<script>
    import comment from '../subcom/comment.vue';
    import slider from '../subcom/slider.vue'
    import common from '../../kits/common.js';
    /*使用子组件的方式实现inputnumber的功能，点击实现增加和较少的效果*/
    import inputnumber from '../subcom/inputnumber.vue'
    import { Toast } from 'mint-ui';
    //	使用vm对象
    import {vm,COUNTSTR} from '../../kits/vm.js';
    /*按需导入所需的数据对象*/
    import {setItem,valueObj} from  '../../kits/localSg.js';
   export default {
       components:{slider,inputnumber},
       data (){
        return {
            id:0,
            imgs:[],
            info:{
//					"id": 87,
//					"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
//					"add_time": "2015-04-19T16:51:03.000Z",
//					"goods_no": "SD9102356032",
//					"stock_quantity": 60,
//					"market_price": 2499,
//					"sell_price": 2195
            },  // 存储商品的详细信息
            inputNumberCount:1,
            isshow:false

        }
    },
    created(){
        this.getroute();
        this.getimgs();
        this.getparams();
        this.getcount(1);
    },
    methods:{
        beforeEnter(el){
      /*设定小球的初始位置*/
            el.style.transform="translate(0px,0px)";
        },
        enter(el,done){
            /*保证小球出现的代码*/
            el.offsetWidth;

            el.style.transform="translate(190px,407px)";
            done();

        },
        afterEnter(el){
            /*重置小球的初始状态*/
            this.isshow=!this.isshow;
        },
        toshopcar(){
//				触发事件/*向购物车的组件传递数据，也就是向上传递数据*/
            vm.$emit(COUNTSTR,this.inputNumberCount);
            /*不是传统意义上的父子间传值*/
            /*将数据保存到localStorage中去*/
            valueObj.goodsid=this.id;
            valueObj.count=this.inputNumberCount;
            this.isshow=!this.isshow;
            setItem(valueObj);
            /*小球动画，动画永远都是出现状态，没有回去的状态*/


        },
        getroute(){
            this.id=this.$route.params.id;
        },
        getimgs(){
            var apidomain='http://182.254.146.100:8899';
            var url  = apidomain + '/api/getthumimages/'+this.id;
            this.$http.get(url).then(function(res){
                if(res.body.status!=0){
                    Toast(res.body.message);
                }
                this.imgs =res.body.message;
            });
        },
        getparams(){
            var url = common.apidomain +'/api/goods/getinfo/'+this.id;
            this.$http.get(url).then(function (res){
                if (res.body.status!=0){
                    Toast(res.body.message);
                }
                this.info=res.body.message[0];

            })
        },
        /*getcount的参数就是产品能够获取子组件中获取的数据*/
        getcount (count){
            this.inputNumberCount=count;
        }

    }
   }
</script>

<style scoped>
    .silder{
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
        margin: 5px;
    }
    #buy{
        position: relative;
    }
    #buy,#params,#other
    {
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
    #buy h4{
        color:#0094ff;
        padding: 5px;
    }
    #buy li,#params li{
        list-style: none;
        padding: 8px;
    }

    #buy .price span{
        color:red;
    }

    #other .imgdesc{
        margin-bottom: 20px;
    }
    #ball {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        left:63px;
        bottom: 81px;
        transition: all 0.4s ease;
        z-index: 100;
    }

</style>