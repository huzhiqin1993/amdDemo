/*
* @Author: Administrator
* @Date:   2017-06-08 20:53:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-16 21:24:09
*/

require.config({

	baseUrl:'js/lib',
	paths:{
        jquery:"jquery-2.1.4",
        cookie:"jquery.cookie",
        text:"text",
        artTem:'template-web',
        bootstrap:'../../assets/bootstrap/js/bootstrap',
        upload:'../../assets/uploadify/jquery.uploadify',
        picker:'../../assets/datetimepicker/js/bootstrap-datetimepicker',
        pickerlang:'../../assets/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN',
        echarts:'echarts',
        ueditor:'../../assets/UEditor/ueditor.all',
        ueditorconf:'../../assets/UEditor/ueditor.config'
    },
  shim:{
     pickerlang:{
      deps:['jquery']
    },
    bootstrap:{
      deps:['jquery']
    }
  }
})


require(['jquery','artTem','../course/courseEdit','../courseManager/courseManager',
  '../chartsCount/chartsCount','../userInfo/userInfo','../course/reflashLesson','../course/courseModify',
  '../teacherManager/teacherList','../userInfo/editUserInfo',
  'cookie'],function($,art,editLesson,courseManager,chartsCount,userInfo,reflashLesson,courseModify,teacherManager,editUserInfo){


var flag=false;
    // console.log(sessionStorage.getItem('tc_name'));
    // console.log(sessionStorage.getItem('tc_avatar'));
    // console.log($);

if(!$.cookie('tc_name')){
   window.location.href='login.html';
}

    $('.profile p').html($.cookie('tc_name'));
    $('.profile img').attr('src',$.cookie('tc_avatar'));

    

    $('.btn-box .btn').click(function(){

         if(!flag){
	    	move('.content-left','-200px');
	    	move('.content-right','0px');
	    	flag=true;
         }
         else{
         	move('.content-left','0px');
	    	move('.content-right','200px');
	    	flag=false;
         }	
    })

//退出登录功能的实现
    $('#btnLogout').click(function(event) {
       $.post('/api/logout', function(data) {
          if(data.code==200){

            $.removeCookie('tc_name');
            $.removeCookie('tc_avatar');

            window.location.href='login.html';
          }
       });
    });
//个人信息功能的实现
 $('#btnEditUserInfo').click(function(event) {
      editUserInfo();
    });

    // $couserManagerTpl=$(couserManagerTpl);

    // $couserManagerTpl.find('table tbody').append('<tr>\
    //             <td>waqe</td>\
    //             <td>qwe</td>\
    //             <td>qwe</td>\
    //             <td>qwrqw</td>\
    //             <td>qweq</td>\
    //         </tr>')
//-------------------------个人信息------------------------------
    $('#btnUserInfo').click(function(event) {
      
       userInfo();
    });

//-------------------------讲师管理------------------------------
 $('#btnTeacherManager').click(function(event) {
       //$('#moduleContainer').html('讲师管理')
         
       teacherManager();
    });
//-------------------------课程管理------------------------------
    $('#btnCouserManager').click(function(event) {

      editLesson();

    });
//-------------------------课时管理------------------------------
    $('#btnLessonManager').click(function(event) {

      reflashLesson();

    });
//-------------------------课程编辑------------------------------
    $('#btnCouserEdit').click(function(event) {

      courseModify();

    });


// ---------------------------课程分类-------------------------------
    $('#btnCourseCategroy').click(function(event) {
       //$('#moduleContainer').html($couserManagerTpl);
       courseManager();
    });

//-------------------图表统计-----------------------------
    $('#btnChart').click(function(event) {

       chartsCount();

    });

    $('#btnTeacherManager').trigger('click');


    function move(ele,duration){
    	$(ele).animate({
	            left:duration
	    	}, 1000)
    }
})