function ajax(obj){
	var method=obj.method||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var success=obj.success;
	var data="";
	switch(typeof(obj.data)){
		case "undefined":;break;
		case "object":for(var i in obj.data){
			data+=i+"="+obj.data[i]+"&";
		}
			data=data.slice(0,-1);
			break;
		case "string":data=obj.data;
					break;
	}
	var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(method=="get"){
		xmlobj.open("get",url+"?"+data);
		if(dataType!="xml"){
			xmlobj.responseType=dataType;
		}
		xmlobj.send();	
	}
	if(method=="post"){
		xmlobj.open("post",url);
		if(dataType!="xml"){
			xmlobj.responseType=dataType;
		}
		xmlobj.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlobj.send(data);
	}
	xmlobj.onreadystatechange=function(){
		if(xmlobj.readyState==4){
			if(xmlobj.status==200){
				var result;
				if(dataType=="text"||dataType=="json"||dataType=="document"){
					result=xmlobj.response;
				}
				if(dataType=="xml"){
					result=xmlobj.responseXML;
				}
				if(success){
					success(result);
				}
			}else if(xmlobj.status==404){
				alert("没有拿到数据");
			}
		}else{
			alert("请求失败");
		}
	}
}
