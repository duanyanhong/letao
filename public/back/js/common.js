/**
 * Created by wwwya on 2018/1/11.
 */

$(function () {

  NProgress.configure({ showSpinner: false });

  $(document).ajaxStart(function () {
    NProgress.start();
  });

  $(document).ajaxStop(function () {
      setTimeout(function() {
        NProgress.done();
      },1000);
  });

if(location.href.indexOf("login.html")==-1) {
  $.ajax ({
    type :"get",
     url :"/employee/checkRootLogin",
      success :function (info) {
          if(info.error==400) {
            location.href="login.html";
          }
      }

  });
}
  $(".second").prev().on("click",function () {
     $(this).next().slideToggle();
  })

  $(".icon_menu").on("click",function() {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
  })


  $(".icon_logout").on("click",function() {

    $("#logoutModal").modal("show");

  });
  $(".btn_logout").off().on("click",function () {
      //console.log(111)
    $.ajax({
      type:'get',
      url:"/employee/employeeLogout",
      success:function (info) {
         if(info.success) {
           location.href='login.html';
         }
      }
    })
  })


})