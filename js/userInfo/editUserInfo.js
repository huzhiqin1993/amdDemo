/*
* @Author: Administrator
* @Date:   2017-06-12 20:37:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-16 22:59:21
*/

define(["jquery","artTem",'text!../../tpls/editUserInfo.html','ueditor','ueditorconf',"bootstrap"],function($,art,editUserInfoTpl){
    
    return function(){
       $(function(){

           $.get('/api/teacher/profile', function(data) {
            if(data.code!=200){
                console.log(data.msg);
                return;
            }

            var editUserInfo=art.render(editUserInfoTpl,data.result);

            var $editUserInfo=$(editUserInfo);
                $editUserInfo.remove();
                $editUserInfo.appendTo('body');

	            $editUserInfo.modal();
	                 
                    $editUserInfo.find('#editinfopicker').datetimepicker({

                        format: 'yyyy-mm-dd',
                        //weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
                        //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                        autoclose: true,
                        minView: "month",
                        todayBtn: true,
                        todayHighlight: true,
                        language: "zh-CN"

                      });  


                 

                  $editUserInfo.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                     //console.log(FormData);
                     $.post('/api/teacher/modify',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }
                     console.log(data.msg);
                     $editUserInfo.modal('hide');  
                     //ue.destroy();
                    //$editUserInfo.find('#userIntroduce').remove()
                    UE.delEditor('userIntroduce');
                    })
             
                    return false;
                  })
             
  
             var ue = UE.getEditor('userIntroduce');  

//              $editUserInfo.on('hidden.bs.modal', function () {
//     // 关闭Dialog前移除编辑器
//     $editUserInfo.find('#userIntroduce').remove()
// });

   	
$('#editUserInfo').on('hidden.bs.modal', function () {
 ue.destroy();
})

        })

       })
       
    }
})