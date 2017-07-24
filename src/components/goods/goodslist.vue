<template>
	<div id="tmpl">
		<div class="mui-content" style="background-color:#fff">
			<ul class="mui-table-view mui-grid-view">
				<li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list">
					<router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">

						<img class="mui-media-object" v-lazy="item.img_url">
						<div class="mui-media-body" v-text="item.title"></div>
						<div class="desc">
							<p style="margin-top: 5px">
								现价：<span style="color: red;font-size: 15px">￥{{item.sell_price}}</span>
								原价：<span><del>￥{{item.market_price}}</del></span>
							</p>
						<p style="margin-top: 15px"><span style="color: red"> 热卖中</span>
							<span style="margin-left: 20px">仅剩{{item.stock_quantity}}件</span>
						</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import comment from '../subcom/comment.vue';
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
      export default {
		  data(){
		return {
			list:[],
			imgList:[]
		}
	},
	created(){
	this.getlist();
	},
	methods:{
		getlist(){
//				获取到商品列表数据
			var url = common.apidomain + '/api/getgoods?pageindex=1';

			this.$http.get(url).then(function(res){
				if(res.body.status != 0 ){
					Toast(res.body.message);
					return;
				}

//					当服务器返回了正常数据的时候做赋值操作
				this.list = res.body.message;

			});
		}
	}
	  }
</script>
<style scoped>
.mui-table-view-cell{


}
	.mui-media-body{
		color: #007aff;
		font-weight: bold;
	}
	.desc{
		height: 80px;
		width: 100%;
		margin-top: 10px;
		background-color: #eee;
	}
.mui-table-view-cell a,.mui-table-view-cell li{
	padding-left: 0;
}
</style>