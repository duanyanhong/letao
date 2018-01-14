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

      $(".dropdown-menu").html(template("menuTpl", info));
    }
  });


});

 $(".dropdown-menu").on("click","a",function() {
        var content =  $(this).text()
       //console.log(content);

   $(".dropdown-text").text(content);

   var id = $(this).data("id");
   $("#categoryId").val(id);

   //手动把categoryId设置为VALID状态
   $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
 })

  //初始化文件上传的插件
  $("#fileupload").fileupload({
    dataType:'json',

    done:function (e,data) {

      var result = data.result.picAddr;
      console.log(result);

      $(".img-box img").attr("src", result);


      $("#brandLogo").val(result);

      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");

    }
  });

  var $form = $("form");
  $form.bootstrapValidator({

    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{

      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入品牌的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传品牌的图片"
          }
        }
      }
    }
  });
  $form.on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function (info) {
        if(info.success) {
          $("#addModal").modal("hide");
          page = 1;
          render();

          $form.data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text('请选择一级分类');
          $(".img_box img").attr("src", 'images/none.png');
        }
      }
    })
  });


});

