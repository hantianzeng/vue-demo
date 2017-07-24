<template>
	<div id="subtmpl">
		<div class="inleft div" @click="substrict">-</div>
		<div class="incenter div" v-text="count"></div>
		<div class="inright div"  @click="add">+</div>
	</div>
</template>
<!--购物车要实现的功能逻辑：
 1.从父组件获取到商品数量的初始值；商品的id
 2.然后通过加减的操作，再将操作后的值返回给父组件
 -->
<script>
	/*父组件传递给子组件两个参数：
	* 1.initCount
	* 2.goodsid
	* 子组件返回给父组件两个参数：
	* 1.增加或者减少的属性，来操作目前的数据；
	* 2.商品的id*/
	export default{
		props:['initCount','goodsid'],
		data(){
			return {
				count:1,
				resObj:{goodsid:0,type:'add'}
			}
		},
		created(){
			this.count = this.initCount;
		},
		methods:{
			substrict(){
				this.count--;
//				确保最小值为1
				if(this.count <1){
					this.count = 1;
				}
				this.sendmessage('substrict');
			},
			add(){
				this.count++;
				this.sendmessage('add');
				/*不传递具体数值，是通过设置obj里面的对象的属性来判断的，如果属性是*/
			},
			sendmessage(type){
				this.resObj.type = type;
				this.resObj.goodsid = this.goodsid;
				this.$emit('cardataobj',this.resObj);
			}
		}
	}

</script>

<style scoped>
	#subtmpl .div{
		width: 40px;
		height: 25px;
		line-height: 25px;
		border: 1px solid #000;
		display: inline-block;
		text-align: center;
	}

</style>