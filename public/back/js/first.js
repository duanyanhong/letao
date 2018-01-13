/**
 * Created by wwwya on 2018/1/13.
 */

$(function () {

  var page = 1;
  var pageSize = 5;

  var render = function() {

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
          console.log(info);

        $("tbody").html( template("tmp2",info));

        


      },


    //  动态渲染分页


    })
  }
  render();

});