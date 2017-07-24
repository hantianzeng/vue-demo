// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

// 3.0.2 导入路由规则对应的组件对象
import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
/*新闻列表组件*/
import newslist from './components/news/newslist.vue';
/*新闻详情组件*/
import newsinfo from './components/news/newsinfo.vue';
/*图片展示的组件*/
import photolist from './components/photo/photolist.vue';
/*图片详情页的组件*/
import photoinfo from './components/photo/photoinfo.vue';
/*商品购买的组件*/
import goodslist from './components/goods/goodslist.vue';
/*商品详情信息的组件*/
import goodsinfo from './components/goods/goodsinfo.vue'
/*商品的详情信息里面的 图文信息的页面组件*/
import goodsdesc from './components/goods/goodsdesc.vue'
// 3.0.2 定义路由规则
var router1 = new vueRouter({
	linkActiveClass:'mui-active',  //改变路由激活时的class名称
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:home},   //首页
		{path:'/shopcar',component:shopcar},  // 购物车
		{path:'/news/newslist',component:newslist}, //新闻资讯列表页面
		{path:'/news/newsinfo/:id',component:newsinfo} , // 新闻资讯详情页面
		{path:'/photo/photolist',component:photolist},//图片展示页面
		{path:'/photo/photoinfo/:id',component:photoinfo},//图片详情页面展示效果
		{path:'/goods/goodslist',component:goodslist},//商品购买的页面展示组件
		{path:'/goods/goodsinfo/:id',component:goodsinfo}, //商品详细信息页面组件
		{path:'/goods/goodsdesc/:id',component:goodsdesc} //商品详细信息页面组件

	]
	});

// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);

// 5.0 注册mui的css样式
import '../statics/mui/css/mui.css';

// 6.0 导入一个当前系统的全局基本样式，指定后续加载的组件在当前页面的样式，比如上下的间距，留出上下边框的空间
import '../statics/css/site.css';

// 7.0 将vue-resource在vue中绑定，自动在vue对象实例上注入一个$http对象就可以使用ajax方法了
import vueResource from 'vue-resource';
Vue.use(vueResource);

// 8.0 定义一个全局过滤器实现日期的格式化
import moment from 'moment';
// 9.0 使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
/*选择npm 来安装这个包
定义全局的时间过滤器
* 在过滤器的函数体中，使用return来返回这个过滤器对象*/
Vue.filter('datefmt',function(input,fmtstring){
//	使用momentjs这个日期格式化类库实现日的格式化功能
	return moment(input).format(fmtstring);
});

import { Actionsheet } from 'mint-ui';

Vue.component(Actionsheet.name, Actionsheet);
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);
// 5.0 利用Vue对象进行解析渲染
/*一个项目就只有一个vue实例，所以子组件可以互相通信，传递数据*/
new Vue({
		/*实例的挂载点*/
	el:'#app',
	// 使用路由对象实例
		/*挂载路由实例*/
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});