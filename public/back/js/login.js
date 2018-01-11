/**
 * Created by wwwya on 2018/1/11.
 */

$(function () {

  var $form =$("form");

  $form.bootstrapValidator( {

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      username: {

        validators : {
          notEmpty:{

            message:"用户名不能为空！"
          },

          callback:{
            message:"用户名不存在！"
          }
        }
      },

      password : {
        validators:{
          notEmpty:{
            message:"密码不能为空！"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码必须是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }

      }
    }

  });
//需要给表单注册一个校验成功的事件，这个事件在表单校验成功的时候会触发。success.form.bv

  $form.on("success.form.bv",function (e) {
    //console.log(111);
    e.preventDefault();

    $.ajax({
      type:"post",
      url:'/employee/employeeLogin',
      data:$form.serialize(),
      success:function (info) {
         if(info.success) {
           location.href ="index.html";
         }

        if(info.error==1000) {
          $form.info("bootstrapValidator").updateStatus("username", "INVALID", "callback");

        }
        if(info.error===1001) {
          $form.info("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  });



})