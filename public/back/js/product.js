/**
 * Created by wwwya on 2018/1/14.
 */
$(function () {

  var page =1;
  var pageSize =2;

  var render = function () {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
          //console.log(info);

          $("tbody").html(template("tml",info));


        //  渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size :"normal",

        itemTexts:function (type,page,current) {
          console.log(type, page, current);
          switch (type) {
            case "frist" :
            case "first":
              return "首页";
            case "prev":
              return "上一页";
            case "next":
              return "下一页";
            case "last":
              return "尾页";
            case "page":
              return page;

          }

        },
          tooltipTitles: function (type, page, current) {
            //根据type的不同，返回不同的字符串
            console.log(type, page, current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "去第"+page+"页";
            }
            //return 111;
          },
          useBootstrapTooltip:true,
          onPageClicked:function (a,b,c,p) {
              page=p;
              render();
          }
        });
      },

    });

  };
 render();

});
