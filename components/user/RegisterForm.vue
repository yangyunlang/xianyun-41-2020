<template>
  <!-- model：指定表单的数据对象，ref：获取dom对象， rules:表单验证规则 -->
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>
<script>
export default {
  data () {
    //确认密码
    //rule当前的规则
    //value输入框的值
    //callback 比如要执行，如果传入一个错误的对象，当前的字段就会报错
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPassword !== "") {
          //验证和确认密码是否一致，手动触发确认密码验证
          this.$refs.form.validateField('checkPassword');
        }
        callback();
      }
    };

    // 验证确认密码
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    //验证手机号码
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入手机号"))
      } else if (/^1[3-9][0-9]{9}$/.test(value) == false) { // 判断是否是手机号码的正则
        callback(new Error("手机号码格式错误"));
      } else {
        callback();
      }
    }
    return {
      // 表单数据
      form: {
        username: "",   // 登录用户名/手机
        password: "",    // 登录密码
        checkPassword: "", // 确认密码
        nickname: "",	// 昵称
        captcha: ""		// 手机验证码
      },
      // 表单规则
      rules: {
        username: [
          // required表示必填，message错误的提示信息. trigger输入框失去焦点时候触发验证
          // { required: true, message: '请输入用户名', trigger: 'blur' }
          { validator: validateUsername, trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        password: [
          // validator是验证的函数，输入框失去焦点时候触发函数执行
          { validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { validator: validateCheckPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //发送验证码
    handleSendCaptcha () {
      //判断手机号码不能为空
      if (this.form.username == "") {
        return;
      }

      // 调用store仓库中user模块下的发送验证码的方法
      this.$store.dispatch("user/sendCaptcha", this.form.username).then(res => {
        this.$message.success("模拟手机验证码: 000000");
      })
    },

    //注册
    handleRegSubmit () {
      //   console.log(this.form);
      this.$refs.form.validate(valid => {
        //表单验证全部通过
        if (valid) {
          //调用注册的接口
          // console.log(this.form);
          //props是除了checkPassword以外剩余的属性
          const { checkPassword, ...data } = this.form;

          // 调用store仓库中user模块下注册的方法
          this.$store.dispatch("user/register", data).then(res => {
            this.$message.success("注册成功");
            // 跳转到首页
            this.$router.push("/")
          })
        }
      });

    }
  }
};


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