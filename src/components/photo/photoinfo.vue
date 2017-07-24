<template>
    <div id="tmpl">
 <!--      <div id="box">
       {{photoinfo}}</div>-->
     <!--图片的详情信息-->
        <div id="desc">
            <h5>{{photoinfo.title}}</h5>
            <p>{{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}  <span>{{photoinfo.click}}次浏览</span></p>
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">

                    <img class="preview-img  mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"  v-for="(item, index) in list"  :src="item.src" height="100" @click="$preview.open(index,list)"
                            >

                </ul>
            </div>
            <div class="desc_content" v-html="photoinfo.content">

            </div>
        </div>
    </div>
</template>

<script>
    import comment from '../subcom/comment.vue';
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    export default{
        components:{
            comment
        },
        data(){
        return {
            id:0 ,
            photoinfo:{}
            ,
            list :[]
            /*[
                {
                    src: 'http://pic.ffpic.com/files/2014/0704/0704jdhgqsjbz4.jpg',
                    w: 600,
                    h: 400
                }, {
                    src: 'https://placekitten.com/1200/900',
                    w: 1200,
                    h: 900
                }
                    ,
                {
                    src: 'http://pic.ffpic.com/files/2014/0519/0519zrjsgqbztp8.jpg',
                    w: 1200,
                    h: 900
                }
                    ,
                {
                    src: 'http://pic.ffpic.com/files/2014/0519/0519zrjsgqbztp8.jpg',
                    w: 1200,
                    h: 900
                },
                {
                    src: 'http://pic.ffpic.com/files/2014/0519/0519zrjsgqbztp8.jpg',
                    w: 1200,
                    h: 900
                },
                {
                    src: 'http://pic.ffpic.com/files/2014/0519/0519zrjsgqbztp8.jpg',
                    w: 1200,
                    h: 900
                }
            ]*/
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.getInfo();
        this.getimgs();
    },
    methods:{
        getInfo(){
           var url =common.apidomain +'/api/getimageInfo/'+this.id;
            this.$http.get(url).then(function(res) {
                if(res.body.status!=0){
                    Toast(res.body.message);
                    return;
                }
                this.photoinfo=res.body.message[0];

            })
        },
        getimgs(){
            var apidomain='http://182.254.146.100:8899';
            var url = apidomain + '/api/getthumimages/'+this.id;
            this.$http.get(url).then(function(res){
                var body = res.body;
                if(body.status != 0 ){
                    Toast(body.message);
                    return;
                }

//					将正常的逻辑数据赋值给this.list数组
//					由于vue-preview组件要求的数据是 {src:,w:,h:}但是服务器响应回来的数据中是没有 w ,h 的，所以只能自己添加了
                body.message.forEach(function(item){
//						当前所有图片不管有多大都设置为宽高为400，就会导致图片失真了，所以应该按照图片的实际尺寸来设置
                    var img = document.createElement('img');
                    img.src = item.src;
                    item.h = img.height;
                    item.w = img.width;
                });
                this.list = body.message;
            });

        },
    }
    }

</script>

<style scoped>
#box{
    width: 100%;
    height: 200px;
    background-color: lightskyblue;
}
    #desc{
        width: 100%;
    }
#desc h5{
    padding-left: 5px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: cadetblue;
    color: #fff;
}
    .desc_content{
        background-color: oldlace;
        width: 100%;
        padding: 5px;

    }
.mui-content,.mui-content ul{
    background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right:0px;
    border-bottom:0px;
    float: left;
}

.mui-grid-view.mui-grid-9{
    border-top:0px;
    border-left:0px;
}

</style>