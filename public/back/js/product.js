/**
 * Created by wwwya on 2018/1/14.
 */
$(function () {

  var page =1;
  var pageSize =2;
  var imgArr = [];

  var $form = $("form");

  var render = function () {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
          console.log(info);

          $("tbody").html(template("tml",info));


        //  渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size :"normal",

        itemTexts:function (type,page,current) {
          //console.log(type, page, current);
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
            //console.log(type, page, current);
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


//  添加商品

  $(".btn_add").on("click",function () {
    $("#addModal").modal("show") ;

    $.ajax({
      type:"get",
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
          console.log(info);
        $(".dropdown-menu").html(template("tml2",info ));
      },
    })

  });


  $(".dropdown-menu").on("click","a",function() {
    $(".dropdown-text").text($(this).text());

    $("#brandId").val($(this).data("id"));


    //$form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

    $("#fileupload").fileupload({
      dataType:'json',
      done:function(e,data) {
        console.log(data.result);
            if(imgArr.length >= 3) {
              return;
            }
        //var result =data.result.picAddr;
        //
        //$(".img_box img").attr("src",result);

        $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100" alt="">');


        imgArr.push(data.result);
        //console.log(imgArr);

        if( imgArr.length===3) {
          $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
        }else {
          $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
        }
      }
    });


//  表单校验

  $form.bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId: {
        validators: {
          notEmpty: {
            message: "二级分类不能为空"
          }
        }
      },
      proName:{
        validators: {
          notEmpty: {
            message: "商品名称不能为空"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "商品描述不能为空"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"商品库存不能为空"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入合法的库存"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"商品尺码不能为空"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message: "请输入合法的尺码，比如(32-44)"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "商品原价不能为空"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "商品价格不能为空"
          }
        }
      },
      productLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      },
    }

  });


//  表单验证成功事件
   $form.on('success.form.bv', function (e) {
     e.preventDefault();

     var formNum = $form.serialize();

     formNum +="&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr;
     formNum +="&picName1="+imgArr[1].picName+"&picAddr1="+imgArr[1].picAddr;
     formNum +="&picName1="+imgArr[2].picName+"&picAddr1="+imgArr[2].picAddr;
     console.log( formNum);

     $.ajax({
       type:"post",
       url:"/product/addProduct",
       data:formNum,
       success:function(info)  {
         //console.log(info);
         if(info.success) {
           $("#addModal").modal("hide");

           page=1;
           render();

           $form.data("bootstrapValidator").resetForm(true);
           $(".dropdown-text").text("请选择二级分类");
           $(".img_box img").remove();

           imgArr=[];

         }
       }

     })
   });


});
