/**
 * Created by wwwya on 2018/1/13.
 */

$(function () {

  var page = 1;
  var pageSize = 5;

  var render = function () {

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);

        $("tbody").html(template("tmp2", info));

        //  动态渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),

          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }

        })
      },

    })
  }
  render();

//  添加按钮功能

  $(".btn_add").on("click", function () {
    $("#addModal").modal("show");
  })


//  表单校验


  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类的名称不能为空"
          }
        }
      }
    }
  });
  $form.on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $form.serialize(),
      success: function (info) {
        console.log(info);

        if(info.success) {
          $("#addModal").modal("hide");

          page=1;
          render();

          $form.data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })


});