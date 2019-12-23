<template>
  <div class="login">
<!-- 放置一个卡片组件 -->
<el-card class="login-card">
<div class="title">
  <img src="../../assets/img/logo_index.png" alt="">
</div>
<!-- 登录表单 表单容器  el-form 需要绑定model属性 rules属性绑定验证规则对象-->
<!-- 行内样式 -->
 <el-form ref="myForm" style="margin-top:30px" :model="loginForm" :rules="loginRules">
   <!-- 表单域 一行  校验 => prop => 要检验的字段名-->
<el-form-item prop="mobile">
<!-- 放具体的组件 登录手机号  v-model 双向绑定数据对象-->
<el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
</el-form-item>
<el-form-item prop="code">
  <!-- 表单域, 里面有双向绑定 -->
  <el-input v-model="loginForm.code" style= "width:65%" placeholder="请输入验证码"></el-input>
  <!-- 其中加了按钮属性，浮动靠右 -->
  <el-button style="float:right" plain>发送验证码</el-button>
</el-form-item>
<!-- /表单域 复选框 -->
<el-form-item prop="check">
<el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
</el-form-item>
<!--表单域， 登录按钮   注册点击事件 -->
<el-form-item>
<el-button @click="submitLogin" style="width:100%" type="primary">登录</el-button>
</el-form-item>
 </el-form>
</el-card>
  </div>
</template>

<script>
export default {
// 第一步 在data中定义表单数据对象
  data () {
    return {
      // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则 验证登录表单的  key(字段名):value(数组)
        // required true -> 必填
        // 一个对象里面是一个规则，满足条件后才执行
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/,
          message: '验证码不正确'
        }],
        // 自定义校验函数，里面有三个参数
        //   rule当前的规则 没什么用
        // value指的就是我们要校验的字段的值
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            // 认为校验通过，通行
            callback() // 直接执行callback 认为通过
          } else {
            //  认为校验不通过 要提示信息
            callback(new Error('您必须同意'))
          }
        } }]
      }
    }
  },
  methods: {
    // 提交登录表单
    submitLogin () {
      // el-form 实例
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          // 认为前端效验登录成功
          // 地址参数  查询参数 params 对象
          // body参数 data对象
          this.$axios({
            url: '/authorizations', // 请求地址
            method: 'post', // 请求方法
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token) // 前端缓存令牌
            this.$router.push('/home') // 这个this指向组件实例 ，跳转到主页
            // 成功以后才会进入到then,
          }).catch(() => {
            // elementUI的方法
            this.$message({
              message: '您的手机号或者验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>  //只对当前组件样式产生作用
.login{
  background-image: url('../../assets/img/33.jpeg');
  // 背景图片自适应
  // background-size:cover;
  // 可视区域100%高度
  height: 100vh;
  display: flex;
  justify-content: left;
  align-items: center;
  .login-card {
    width: 440px;
    height: 350px;
    .title{
      text-align: center;
    }
    img{
      height: 40px;
    }
  }
}
</style>
