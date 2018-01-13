/**
 * Created by wwwya on 2018/1/13.
 */

$(function () {

  var page =1;
  var pageSize =5;

  render();
  //封装渲染。
  function  render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
          console.log(info);
        var result =template("tmpl",info);
        $("tbody").html(result);


      // 渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total / info.size),
          numberOfpages : 5,
          onPageClicked:function (a,b,c,p) {
              page = p;
              render();
          }
        });

      }
    });
  }



  $("tbody").on("click",".btn",function () {

    $("#userModal").modal("show");

    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success")?1 : 0;

    $(".btn_confirm").on("click",function () {
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info) {
          //console.log(info);
          if(info.success) {
            $("#userModal").modal("hide");
            render();
          }
        }

      })

    })
  })





});
