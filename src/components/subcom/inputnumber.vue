<template>
    <div id="subtmpl">
        <div class="mui-numbox">
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="substrict">-</button>
            <input class="mui-input-numbox" type="number" v-model="count">
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
        return {
            count :1 //代表购买商品的数量
        }
    },
    methods:{
        substrict(){
            this.count--;
//				确保最小值为1
            if(this.count <1){
              Toast("this is the minimum number")
                this.count = 1;
            }
            this.sendmessage();
        },
        add(){
            this.count++;
            this.sendmessage();
        },
        /*使用子组件向父组件传值,所以上面的操作，都需要在操作完之后进行保存*/
        sendmessage(){
            this.$emit('dataobj',this.count);
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