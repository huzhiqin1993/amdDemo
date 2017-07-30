/*
* @Author: Administrator
* @Date:   2017-06-12 15:35:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-14 16:39:29
* 编辑课时
*/


define(["jquery","artTem",'text!../../tpls/courseList.html','text!../../tpls/addCourse.html','text!../../tpls/upLoadImg.html',"bootstrap"],function($,art,courseListTpl,addCourseTpl,upLoadImgTpl){
    
    return function(){
        
       $.get('/api/course', function(data) {
            if(data.code!=200){
                console.log(data.msg);
                return;
            }

            var courseList=art.render(courseListTpl,data);

            var $courseListTpl=$(courseList);

            $('#moduleContainer').html($courseListTpl);
//点击编辑课时
//--------------------------------------------------------------------------            
            $courseListTpl.find('.btn-edit-lesson').click(function(event) {

              var cs_id=$(this).attr('cs-id');
              
              $('#btnLessonManager').attr('cs-id',cs_id);

               $('#btnLessonManager').trigger('click');
    
            })
//点击编辑课程
//--------------------------------------------------------------------------            
   
             $courseListTpl.find('.btn-edit-course').click(function(event) {

              var cs_id=$(this).next().attr('cs-id');
              
              $('#btnCouserEdit').attr('cs-id',cs_id);

               $('#btnCouserEdit').trigger('click');
    
            })

//点击更新图片
//--------------------------------------------------------------------------            
   
	$courseListTpl.find('.updateimg').click(function(event) {

          var $upLoadImg=$(upLoadImgTpl);
	          $upLoadImg.remove();
	          $upLoadImg.appendTo('body');
	          $upLoadImg.modal();
        var cs_id=$(this).attr('cs-id');
 
		var form = document.forms.namedItem("fileinfo");
		form.addEventListener('submit', function(e) {

		  oData = new FormData(form);
          oData.append("cs_id",cs_id);
		  var oReq = new XMLHttpRequest();

		  oReq.open("POST", "/api/uploader/cover", true);
		  oReq.onload = function(oEvent) {
		    if (oReq.status == 200) {
		     console.log("Uploaded!");
		    } else {
		     console.log(oReq.status);
		    }
		  };

		  oReq.send(oData);
		  
		  $upLoadImg.modal('hide');

		 $('#btnCouserManager').trigger('click');
		  e.preventDefault();
		}, false);
		    
	})

//点击添加课程
//--------------------------------------------------------------------------            
         $courseListTpl.find('.addCourse').click(function(event) {

              var $addCourse=$(addCourseTpl);
		          $addCourse.remove();
		          $addCourse.appendTo('body');
		          $addCourse.modal();

                  $addCourse.on('submit','form',function(event) {

                   var FormData=$(this).serialize();

                     //console.log(formData);
                     $.post('/api/course/create',FormData,function(data) {
                        
                        if(data.code!=200){
                            console.log(data.msg);
                            return;
                        }
                     console.log(data.msg);
                     $addCourse.modal('hide');
                     $('#btnCouserManager').trigger('click');

                    })             
             
                    return false;
                  })
    
            })


        })
    }
})