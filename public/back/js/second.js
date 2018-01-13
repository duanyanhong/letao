/**
 * Created by wwwya on 2018/1/13.
 */

$(function () {

  var page= 1;
  var pageSize = 5;

  var render=function () {
    $.ajax({
      type: 'get',
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success:function (info) {
          console.log(info);
        $("tbody").html(template("tmp3", info));

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }
  render();

$(".btn_add").on("click",function () {

  $("#addModal").modal("show");

  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:1,
      pageSize:100
    },
    success:function (info) {
        console.log(info);
      $(".dropdown-menu").html(template("menuTpl", info));
    }
  });


});




});

