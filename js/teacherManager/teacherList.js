/*
* @Author: Administrator
* @Date:   2017-06-14 21:25:03
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-16 15:42:35
*/

define(["jquery","artTem",'text!../../tpls/teacherManager.html','text!../../tpls/editTeacher.html','text!../../tpls/addTeacher.html',
    'text!../../tpls/teacherScan.html',"bootstrap",'picker','pickerlang'],function($,art,teacherListTpl,editTeacherTpl,addTeacherTpl,teacherScanTpl){
    
    return function(){
        
//------------------------讲师列表-------------------------       
       $.get('/api/teacher', function(data) {
            if(data.code!=200){
                console.log(data.msg);
                return;
            }

            var teacherList=art.render(teacherListTpl,data);

            var $teacherList=$(teacherList);

            $('#moduleContainer').html($teacherList);
            
//----------------------编辑讲师--------------------------------
           
            $teacherList.find('.btn-edit').click(function(event) {

            	var tc_id=$(this).parent().attr('tc-id');

               $.get('/api/teacher/edit',{tc_id:tc_id} ,function(data) {

	            if(data.code!=200){
	                console.log(data.msg);
	                return;
	            }
	           
	             var editTeacher=art.render(editTeacherTpl,data.result);
	             var  $editTeacher=$(editTeacher);
	                  $editTeacher.remove();
	                  $editTeacher.appendTo('body');
	                  $editTeacher.modal();
	                 
                    $editTeacher.find('#editteacherpicker').datetimepicker({

                        format: 'yyyy-mm-dd',
                        //weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
                        //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                        autoclose: true,
                        minView: "month",
                        todayBtn: true,
                        todayHighlight: true,
                        language: "zh-CN"

                      });    
                  $editTeacher.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                     //console.log(FormData);
                     $.post('/api/teacher/update',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }
                     console.log(data.msg);
                     $editTeacher.modal('hide');  
                     $('#btnTeacherManager').trigger('click');
                    
                    })
             
                    return false;
                  })
              }) 

            });
//----------------------添加讲师---------------------------------------
     $teacherList.find('#btnAddTeacher').click(function(event) {
            
                 var  $addTeacher=$(addTeacherTpl);
                      $addTeacher.remove();
                      $addTeacher.appendTo('body');
                      $addTeacher.modal();
                        
                      $addTeacher.find('#addTeaherPicker').datetimepicker({

                        format: 'yyyy-mm-dd',
                        //weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
                        //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                        autoclose: true,
                        minView: "month",
                        todayBtn: true,
                        todayHighlight: true,
                        language: "zh-CN"

                      });
                                
                  $addTeacher.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                     //console.log(FormData);
                     $.post('/api/teacher/add',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }
                     console.log(data.msg);
                     $addTeacher.modal('hide');  
                     $('#btnTeacherManager').trigger('click');
                    
                    })
             
                    return false;
                  })
              }) 
//----------------------查看讲师---------------------------------------
     $teacherList.find('.btn-scan').click(function(event) {

                var tc_id=$(this).parent().attr('tc-id');

                $.get('/api/teacher/view',{tc_id:tc_id} ,function(data) {

                if(data.code!=200){
                    console.log(data.msg);
                    return;
                }
               
                 var teacherScan=art.render(teacherScanTpl,data.result);
                 var  $teacherScan=$(teacherScan);
                      $teacherScan.remove();
                      $teacherScan.appendTo('body');
                      $teacherScan.modal();
                  })
              }) 
//-------------------------------修改讲师状态----------------------------------------
      $teacherList.find('.btn-changestate').click(function(event) {

                var tc_id=$(this).parent().attr('tc-id');
                var tc_status=$(this).parent().attr('tc-status');
                var $this=$(this);

                $.get('/api/teacher/handle',{tc_id:tc_id,tc_status:tc_status} ,function(data) {

                if(data.code!=200){
                    console.log(data.msg);
                    return;
                }

               //console.log(data);
               $this.parent().attr('tc-status',data.result.tc_status);

               $this.text(data.result.tc_status==1?'注销':'启用');
               $this.parent().siblings('.changestate').text(data.result.tc_status==0?'注销':'启用');
               
                  })
              }) 
//--------------------------------------------------------------------------------------
        })


    }
})