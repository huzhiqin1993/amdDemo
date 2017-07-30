
/*
* @Author: Administrator
* @Date:   2017-06-12 15:35:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-13 22:52:23
* 编辑课时
*/


define(["jquery","artTem",'text!../../tpls/lessonManager.html',"text!../../tpls/editLesson.html","text!../../tpls/addLessons.html","bootstrap"],function($,art,lessonManagerTpl,editLessonTpl,addLessonsTpl){
    
    return function(){
             
//点击编辑课时
//--------------------------------------------------------------------------                            
              var cs_id=$('#btnLessonManager').attr('cs-id');

              $.get('/api/course/lesson',{cs_id:cs_id}, function(data) {
                          if(data.code!=200){
                              console.log(data.msg);
                              return;
                          }

                 //console.log(data);
              var lessonManager=art.render(lessonManagerTpl,data);

              var $lessonManagerTpl=$(lessonManager);
              $('#moduleContainer').html($lessonManagerTpl);
               



                $.get('/api/course/lesson',{cs_id:cs_id}, function(data) {
                          if(data.code!=200){
                              console.log(data.msg);
                              return;
                          }

                 //console.log(data);
              var lessonManager=art.render(lessonManagerTpl,data);

              var $lessonManagerTpl=$(lessonManager);
              $('#moduleContainer').html($lessonManagerTpl);
               
               //点击添加课时
 //-------------------------------------------------------------------------- 
             $lessonManagerTpl.find('#btnAddLessons').click(function(event) {		      
		      var $addLessons=$(addLessonsTpl);
		          $addLessons.remove();
		          $addLessons.appendTo('body');
		          $addLessons.modal();

                  $addLessons.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                       FormData = "ct_cs_id="+cs_id+"&"+FormData;

                     console.log(FormData);
                     $.post('/api/course/chapter/add',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }
                     console.log(data.msg);
                     $addLessons.modal('hide');
                     $('#btnLessonManager').trigger('click');

                    })             
             
                    return false;
                  })

		          })


               //点击编辑按钮 渲染数据到表单
 //--------------------------------------------------------------------------      
              $lessonManagerTpl.find('.btn-edit-lesson').click(function(event) {

		          var ct_id=$(this).attr('ct-id');

		          $.get("/api/course/chapter/edit",{ct_id:ct_id},function(res){
		            //1、异常处理
		            if(res.code!=200){
		                console.log(res.msg);
		                return;
		            }
		           console.log(res)

		      var editLesson=art.render(editLessonTpl,res);

		      var $editLesson=$(editLesson);
		          $editLesson.remove();
		          $editLesson.appendTo('body');
		          $editLesson.modal();

              //点击提交按钮发送数据
//----------------------------------------------------------------------
               

                 $editLesson.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                     //console.log(formData);
                     $.post('/api/course/chapter/modify',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }

                     $editLesson.modal('hide');

                     
                     $('#btnLessonManager').trigger('click');

                    })             
             
                    return false;
                  })

//----------------------------------------

		          })
		        
		            })    
              
              })
               
        })
    }
})