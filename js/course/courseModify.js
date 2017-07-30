
/*
* @Author: Administrator
* @Date:   2017-06-12 15:35:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-14 20:51:30
* 编辑课程
*/


define(["jquery","artTem",'text!../../tpls/courseEdit.html'],function($,art,courseModifyTpl){
    
    return function(){
             
//点击编辑课时
//--------------------------------------------------------------------------                            
              var cs_id=$('#btnCouserEdit').attr('cs-id');

              $.get('/api/course/basic',{cs_id:cs_id}, function(data) {
                          if(data.code!=200){
                              console.log(data.msg);
                              return;
                          }

                 console.log(data);
               var courseModify=art.render(courseModifyTpl,data.result);

               var $courseModify=$(courseModify);
               $('#moduleContainer').html($courseModify);
               

               $courseModify.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                     //console.log(formData);
                     $.post('/api/course/update/basic',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }
    
                     $('#btnCouserManager').trigger('click');

                    })             
             
                    return false;
                  })

        })
    }
})