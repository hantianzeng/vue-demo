/*负责localstorage的帮助*/
/*获取数据：var str =localstorage.getItem(key);
* 添加和追加数据：localStorage.setItem(key,value);value是一个字符串
* 移除数据：localStorage.remove（key）;
* 存储的数据必须是标准的json字符串，这样在获取数据的时候，
* 可以直接使用JSON.parse来转换
* */
/*1.0 设置存储数据的key*/
export const KEY='goodsdata';
export const valueObj={goodsid:0,count:0};
/*存储数据的功能*/
/*value 的数据格式  {goodsid:0 , count:8}*/
export function setItem(value){
    //1.0 获取json格式
    var jsonString =  localStorage.getItem(KEY);
    jsonString = jsonString || '[]';
    var arr =   JSON.parse(jsonString);
    // 2.0 将value追加进入arr
    arr.push(value);
    // 3.0 将arr 转换成json字符串保存起来
    localStorage.setItem(KEY,JSON.stringify(arr));
}



/*获取数据的功能*/

export function getItem(){
    var jsonString =  localStorage.getItem(KEY);
//    将json格式字符串转换成 js对象
    // jsonString：是一个标准的json格式
    jsonString = jsonString || '[]';

    return JSON.parse(jsonString);
}
// 4.0 移除数据 goodsid:商品id
export function removeItem(goodsid){
    var arr = getItem();
//    查找arr中的goodsid和传入的参数goodsid一致的数据全部移除
    for(var i= arr.length -1 ;i>=0 ; i--){
        if(arr[i].goodsid == goodsid){
            arr.splice(i,1);
        }
    }

//    将最新的arr保存回localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));

}

export function getgoodsObject(){
//   获取 数组
    /*
     * arr的格式：
     * [{goodsid:87,count:1},{goodsid:87,count:3},{goodsid:88,count:1}]
     * */
    var arr  = getItem();
// 将arr数组中的goodid相同的多个对象合并成同一个对象
    var resObj ={};
    for(var i = 0 ; i<arr.length; i++){
        var item = arr[i];
        if(!resObj[item.goodsid]){
            //    如果没有当前商品的数据，则添加一个数据
            resObj[item.goodsid] = item.count;
        }else{
            //    已经有当前商品的数据了，则将cont追加
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count + item.count;
        }
    }

    return resObj;
}
//obj的格式：{goodsid:87,type:'add'}
export function updateData(obj){
    var arr  = getItem();

    var count = 1;
    if(obj.type =='add'){
        //加
        arr.push({goodsid:obj.goodsid,count:count});
    }else{
        //减 需要分两种情况判断下：本身为1 就直接删除   不为1  那就把count的值键1
        for(var i =0 ;i < arr.length ; i++){
            //如果这个对象中的count值等于1，则删除这个对象，否则将这个对象的count减1以后保存回去
            if(arr[i].goodsid == obj.goodsid){
                if(arr[i].count > 1){
                    arr[i].count = arr[i].count -1;
                    break;
                }else{
                    //删除此对象
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }

//    将最新的arr保存回localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));

}