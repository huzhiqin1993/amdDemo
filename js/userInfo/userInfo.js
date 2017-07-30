/*
* @Author: Administrator
* @Date:   2017-06-12 20:37:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-16 08:54:54
*/

define(["jquery","artTem",'text!../../tpls/userInfo.html','upload',"bootstrap"],function($,art,userInfoTpl){
    
    return function(){
        
       $.get('/api/teacher/profile', function(data) {
            if(data.code!=200){
                console.log(data.msg);
                return;
            }

            var userInfo=art.render(userInfoTpl,data);

            var $userInfo=$(userInfo);

            $('#moduleContainer').html($userInfo);
            

             $userInfo.find("#infoPicUpload").uploadify({
                
                fileObjName:"tc_avatar",        //指定上传文件的时候，表单的name
                swf: 'assets/uploadify/uploadify.swf',  //指向本地的flash文件(.swf)
                uploader: '/api/uploader/avatar',    //指向服务器的地址
                fileTypeExts: '*.gif; *.jpg; *.png', //限制上传文件类型
                buttonText:"选择图片",
                onUploadComplete:function(){
                    $("#btnUserInfo").trigger("click");
                }
            })

        })
    }
})