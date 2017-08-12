/**
 * Created by King-z on 2016/10/23 0023.
 */

// 创建密码表
function creat() {/*创建密码表*/
    var a = [];
    /*初始化矩阵完成*/
    a[0] = [17,17,5];
    a[1] = [21,18,21];
    a[2] = [2,2,19];
    return a;
}

function out(arr){
    var content="";
    for(var i=0;i<3;i++){
        for(var j =0;j<3;j++){
            content+=arr[i][j]+"&nbsp;";
        }
        content+="<br/>";
    }
    return content;
}
function lock(content,arr){/*加密返回密文*/
    var cLength = content.length;
    /*奇数*/
    if(cLength%3){
        var k = 3-cLength%3;
        for(var ti=0;ti<k;ti++) {
            content += "K";
            cLength++;
        }
    }/*保证能配对*/
    var result="";

    var p1,p2,p3,c1,c2,c3;
    for(var i=0;i<cLength;i=i+3){
        p1=code2num(content[i]);//p1
        p2=code2num(content[i+1]);//p2
        p3=code2num(content[i+2]);//p3
        c1=calculate(p1,p2,p3,arr[0]);
        c2=calculate(p1,p2,p3,arr[1]);
        c3=calculate(p1,p2,p3,arr[2]);
        result+= num2code(c1)+num2code(c2)+num2code(c3)+"&nbsp;";
    }
    return result;
}
/*传入 p1p2p3 K(n)传出C(n)*/
function calculate(p1,p2,p3,K){
    var C=p1*K[0]+p2*K[1]+p3*K[2];
    C%=26;
    return C;

}
/*字母数字之间的转换*/
function num2code(num){
    return String.fromCharCode(num+65);
}
function code2num(str){
    return str.charCodeAt()-65;
}

function contentValidate(str) {
    str = str.replace(/\s|"|-/g,"");//去空
    str = str.toUpperCase();//所有小写转成大写
    var pattern = new RegExp("[`~!@#$^&*(-)=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]","g");
    str = str.replace(pattern,"");//去掉特殊字符及Z
    console.log(str);
    var arr =str.split("");
    var temp,temp1;
    var result=[];
    for(i=0;i<arr.length;i=i+2){
        temp = arr[i].charCodeAt();
        if(arr[i+1])
        temp1 = arr[i+1].charCodeAt();
        if (90 < temp || temp < 65||90 < temp1 || temp1 < 65)
            return "";
        if(arr[i]==arr[i+1]){
            if(arr[i]!="K")
            result.push(arr[i],"K",arr[i+1]);
            else
                result.push(arr[i],"L",arr[i+1]);
        }else{
            result.push(arr[i],arr[i+1]);
        }

    }
    return arr.join("");
}
/*开始解密*/

$(function(){
    /*大写字母A 到Z 的值是从65 到90，小写a 是从97-122 开始的*/
    $("#on_lock").click(function(){
        var content=$("#psw").val();
        content = contentValidate(content);
        if(content.length==0)alert("明文含有不合法字符");
        var keyArr= creat();
        var result = lock(content,keyArr);
        $("#key").html(out(keyArr));
        $("#result").html("结果："+result);
    });
});