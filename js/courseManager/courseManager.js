/*
* @Author: Administrator
* @Date:   2017-06-12 18:52:19
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-12 19:08:16
* 课程管理
*/

define(["jquery","artTem",'text!../../tpls/courseManager.html','text!../../tpls/addCourseCategroy.html','text!../../tpls/editCourseCategroy.html',"bootstrap"],function($,art,couserManagerTpl,CourseCategroyTpl,editCourseCategroyTpl){
    
    return function(){
      $.get('/api/category', function(data) {
        if(data.code!=200){
            console.log(data.msg);
            return;
        }
          //console.log(data)
          //cgpid=0
          var result=data.result;

          var courseCategoryList=art.render(couserManagerTpl,{
                result:result  
            });
          var $couserManagerTpl=$(courseCategoryList);

          $('#moduleContainer').html($couserManagerTpl);


        //添加分类操作
         $.get('/api/category/top', function(data) {
            if(data.code!=200){
                console.log(data.msg);
                return;
            }
            var res=data.result;

            var addCourseCategory=art.render(CourseCategroyTpl,{
                res:res
            });

            //console.log(data);
            var $CourseCategroyTpl=$(addCourseCategory);

                $CourseCategroyTpl.remove();
                $CourseCategroyTpl.appendTo('body');
             $('#btnAdd .addCategroy').click(function(event) {
              /* Act on the event */
              //alert(1)
              
                   $('#categroyContainer').modal();

                   

                  $CourseCategroyTpl.on('submit','form',function(event) {

                   var formData=$(this).serialize();

                     //console.log(formData);
                     $.post('/api/category/add',formData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }

                     $CourseCategroyTpl.modal('hide');  
                     $('#btnCourseCategroy').trigger('click');
                    
                    })
             
                    return false;
                  })
                  
            });

         //编辑分类列表
             $couserManagerTpl.find('.btn-edit').click(function(event) {
              /* Act on the event */
             
              var cg_id=$(this).attr('cg-id');

                 $.get('/api/category/edit',{cg_id:cg_id},function(data) {

                      if(data.code!=200){
                          console.log(data.msg);
                          return;
                      }
                       console.log(data);

                  var editCourseCategroyTpl1=art.render(editCourseCategroyTpl,data);
                       var $editCourseCategroyTpl=$(editCourseCategroyTpl1);
                          $editCourseCategroyTpl.remove();
                          $editCourseCategroyTpl.appendTo('body');
                          $editCourseCategroyTpl.modal();

                        
                  $editCourseCategroyTpl.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                     //console.log(formData);
                     $.post('/api/category/modify',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }

                     $editCourseCategroyTpl.modal('hide');  
                     $('#btnCourseCategroy').trigger('click');
                    
                    })
             
                    return false;
                  })
                     
                 })

              })

         })

       });
    }
})