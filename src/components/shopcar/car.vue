<template>
	<div id="tmpl">
        <div  class="row" v-for="(item,index) in datalist">
            <!--switch绑定的是value数组的值，-->
            <mt-switch v-model="value[index]" class="switch"></mt-switch>
            <img class="img"  :src="item.thumb_path" alt="商品图片" style="height: 75px;width: 75px"/>
      <div class="inforight">
          <h5 v-text="item.title"></h5>
          <div class="bottom">
              <ul>
                  <li>￥{{item.sell_price}}</li>
                  <!--购物车的数量组件中所需要的数据：根据goodsid获取对应的数量，将goodsid和初始数据传递给子组件，通过子组件
                  继续拧加减的操作-->
                  <li><carinputnumber :initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getiInputNumber" ></carinputnumber></li>
                  <!--:initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getiInputNumber"-->

                  <li><a href="javascript:;" @click="delrow(item.id,index)">删除</a></li>
              </ul>
          </div>
      </div>
        </div>
        <!--总价结算的部分-->
        <div id="total">
            <div class="desc">
                <ul>
                    <li>总计（不含运费）</li>
                    <li>已勾选商品{{totalcount}}件,总价:￥{{totalAmount}}元</li>
                </ul>
            </div>
            <div id="button">
                <mt-button  type="danger" size="small">去结算</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import common from '../../kits/common.js';
    import {getgoodsObject,updateData,removeItem} from '../../kits/localSg.js';
    /*引入子组件，然后分析购物车所需要的数据，以及传递过来的数据*/
    import carinputnumber from '../subcom/carinputNumber.vue';
    export default{
        components:{carinputnumber},
        computed:{
//			1.0 定义计算总件数的属性
            totalcount(){
//				计算逻辑：只需要计算出this.value数组中的ture值有多少个即可
        var trueArr =  this.value.filter(function(item){return item;});
//		计算出当前选中的商品的总价格
        //计算方式： 当前商品的购买数量 * 商品的单价 （其中两个值均从this.datalist中来）
        var amount = 0;
        var total=0;
        this.value.forEach((item,index) =>{
//判断当前item如果为true的话，则这个商品的总价格是要计算的
            if(item){
            var count = this.datalist[index].cou;
            var price = this.datalist[index].sell_price;
            var itemamount =   count * price;
            amount += itemamount;
            total +=count;
        }
    });

    this.totalAmount = amount;
    return total;
    }
    },

    data(){
        return{
            totalAmount:0,
            value:[],
            datalist:[
/*                {
                    "cou": 1,
                    "id": 87,
                    "title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
                    "sell_price": 2195,
                    "thumb_path": "http://182.254.146.100:8080/upload/201504/20/thumb_201504200154277661.jpg"
                },
                {
                    "cou": 1,
                    "id": 88,
                    "title": "苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）",
                    "sell_price": 5780,
                    "thumb_path": "http://182.254.146.100:8080/upload/201504/20/thumb_201504200154277661.jpg"
                }*/
            ]
        }
    },
    created(){
        this.getdatalist();
    },
    methods:{
        delrow(goodsid,index){
            /*
            * 1.0 移除value中的数据
            * 2.0 移除datalist中的数据
            * 3.0 移除localStorage中的数据
            * */
            this.value.splice(index,1);
            this.datalist.splice(index,1);
            removeItem(goodsid);
        },
        getiInputNumber(resObj){
//			 1.0 更新localStorage中的数据
            updateData(resObj);

//			2.0 更新 this.datalist中的当前数量
            for(var i = 0;i <this.datalist.length ; i++){
                if(this.datalist[i].id == resObj.goodsid){
                    if(resObj.type =='add'){
                        this.datalist[i].cou = this.datalist[i].cou + 1;
                        break;
                    }else{
                        if(this.datalist[i].cou ==1){
                            return;
                        }else{
                            this.datalist[i].cou = this.datalist[i].cou - 1;
                            break;
                        }

                    }

                }
            }

        },

        getdatalist(){
            var obj= getgoodsObject();
            var idstring='';
            for (var key in obj){
                idstring += key+',';
            }
            idstring=idstring.substr(0,idstring.length-1);
            /*   var apidomain='http://182.254.146.100:8899';*/
            console.log(idstring);
            var url  = 'http://182.254.146.100:8899/api/goods/getshopcarlist/'+idstring;
            this.$http.get(url).then(function (res){
                if(res.body.status !=0){
                    Toast(res.body.message);
                    return;
                }
                //将locaStorage中的所有的商品对应的count的值赋值给message中每个对象的cou
                /*es6里面没有this，会一直向上找，找到vue实例对象，所以在箭头函数里面使用this还是指vue实例对象*/
                res.body.message.forEach((item)=>{
                    item.cou = obj[item.id];
                    this.value.push(false);

            });
                //	为了解决一个bug所以必须在此处初始化values数组全部为false

            console.log(this.value);
            this.datalist=res.body.message;

            })

        }



    }


	}
</script>

<style scoped>
 .row{
     border-bottom: 1px solid #000;
     height: 100px;
     display: flex;
     padding: 5px;
 }
 .row .switch {
    flex: 1;
     margin-right: 5px;

}
    .img {
        flex: 2;
        height: 75px;
        width: 75px;
        margin-right: 5px;
    }
    .inforight{
        flex: 5;
    }
 .inforight ul {
     padding-left: 0px;
 }
    .inforight ul li {
        display: inline-block;
        list-style: none;
        font-size: 13px;
    }
    .bottom li:nth-of-type(1){
        color: red;
        margin-right: 10px;
    }
    .bottom li:nth-of-type(3){
        margin-left: 10px;
    }
 #total{
     height: 100px;
     background-color: rgba(0,0,0,0.1);
     display: flex;
     padding: 5px;;
 }

 #total ul {
     padding-left: 0px;
 }
 #total li{
     list-style: none;
     font-size: 14px;
 }

 #button{
     flex:0 0 60px;
     margin: 30px 0 0 0 ;
 }

 .desc{

     flex:1;
 }
</style>