/*����localstorage�İ���*/
/*��ȡ���ݣ�var str =localstorage.getItem(key);
* ��Ӻ�׷�����ݣ�localStorage.setItem(key,value);value��һ���ַ���
* �Ƴ����ݣ�localStorage.remove��key��;
* �洢�����ݱ����Ǳ�׼��json�ַ����������ڻ�ȡ���ݵ�ʱ��
* ����ֱ��ʹ��JSON.parse��ת��
* */
/*1.0 ���ô洢���ݵ�key*/
export const KEY='goodsdata';
export const valueObj={goodsid:0,count:0};
/*�洢���ݵĹ���*/
/*value �����ݸ�ʽ  {goodsid:0 , count:8}*/
export function setItem(value){
    //1.0 ��ȡjson��ʽ
    var jsonString =  localStorage.getItem(KEY);
    jsonString = jsonString || '[]';
    var arr =   JSON.parse(jsonString);
    // 2.0 ��value׷�ӽ���arr
    arr.push(value);
    // 3.0 ��arr ת����json�ַ�����������
    localStorage.setItem(KEY,JSON.stringify(arr));
}



/*��ȡ���ݵĹ���*/

export function getItem(){
    var jsonString =  localStorage.getItem(KEY);
//    ��json��ʽ�ַ���ת���� js����
    // jsonString����һ����׼��json��ʽ
    jsonString = jsonString || '[]';

    return JSON.parse(jsonString);
}
// 4.0 �Ƴ����� goodsid:��Ʒid
export function removeItem(goodsid){
    var arr = getItem();
//    ����arr�е�goodsid�ʹ���Ĳ���goodsidһ�µ�����ȫ���Ƴ�
    for(var i= arr.length -1 ;i>=0 ; i--){
        if(arr[i].goodsid == goodsid){
            arr.splice(i,1);
        }
    }

//    �����µ�arr�����localStorage��
    localStorage.setItem(KEY,JSON.stringify(arr));

}

export function getgoodsObject(){
//   ��ȡ ����
    /*
     * arr�ĸ�ʽ��
     * [{goodsid:87,count:1},{goodsid:87,count:3},{goodsid:88,count:1}]
     * */
    var arr  = getItem();
// ��arr�����е�goodid��ͬ�Ķ������ϲ���ͬһ������
    var resObj ={};
    for(var i = 0 ; i<arr.length; i++){
        var item = arr[i];
        if(!resObj[item.goodsid]){
            //    ���û�е�ǰ��Ʒ�����ݣ������һ������
            resObj[item.goodsid] = item.count;
        }else{
            //    �Ѿ��е�ǰ��Ʒ�������ˣ���cont׷��
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count + item.count;
        }
    }

    return resObj;
}
//obj�ĸ�ʽ��{goodsid:87,type:'add'}
export function updateData(obj){
    var arr  = getItem();

    var count = 1;
    if(obj.type =='add'){
        //��
        arr.push({goodsid:obj.goodsid,count:count});
    }else{
        //�� ��Ҫ����������ж��£�����Ϊ1 ��ֱ��ɾ��   ��Ϊ1  �ǾͰ�count��ֵ��1
        for(var i =0 ;i < arr.length ; i++){
            //�����������е�countֵ����1����ɾ��������󣬷�����������count��1�Ժ󱣴��ȥ
            if(arr[i].goodsid == obj.goodsid){
                if(arr[i].count > 1){
                    arr[i].count = arr[i].count -1;
                    break;
                }else{
                    //ɾ���˶���
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }

//    �����µ�arr�����localStorage��
    localStorage.setItem(KEY,JSON.stringify(arr));

}