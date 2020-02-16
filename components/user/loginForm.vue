<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <!-- 新增了prop属性 -->
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <!-- 新增了prop属性 -->
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      form: {
        username: "",   //登录用户名/手机
        password: ""    //登录密码
      },
      // 表单规则
      rules: {
        username: [
          // required表示必填，message错误的提示信息. trigger输入框失去焦点时候触发验证
          { required: true, message: "请输入用户名", trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    // 提交登录
    handleLoginSubmit () {
      // 验证表单
      this.$refs['form'].validate((valid) => {
        // 为true表示没有错误
        if (valid) {
          // 删除代码
          // this.$axios({
          //     url: "/accounts/login",
          //     method: "POST",
          //     data: this.form
          // }).then(res => {
          //     console.log(res.data);
          // })

          // 新增代码
          this.$store.dispatch("user/login", this.form).then(res => {
            // 成功提示
            this.$message({
              message: "登录成功，正在跳转",
              type: "success"
            });
            // 跳转到首页,如果使用push跳转，路由内存里面会多一条记录
            //如果是replace替换当前路由
            setTimeout(() => {
              //如果this.$route.query.returnUrl没有值，跳转到首页
              this.$router.replace(this.$route.query.returnUrl || "/")
            }, 1000);
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
