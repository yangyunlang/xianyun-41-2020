// 用户管理
export const state = () => ({
  // 采用接口返回的数据结构
  userInfo: {
    token: "",
    user: {}
  }
});

export const mutations = {
  //保存用户信息的store
  setUserInfo(state, data) {
    state.userInfo = data;
  },

  //清除用户数据
  cleanUserInfo(state, info) {
    if (process.browser) {
      localStorage.removeItem("userInfo");
    }
    state.userInfo = {};
  }
};

export const actions = {
  //登录
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data: data
    }).then(res => {
      const data = res.data;
      //保存到state
      commit("setUserInfo", data);
      return data;
    });
  },

  // 发送手机验证码, data是手机号码字符串
  sendCaptcha(store, data) {
    return this.$axios({
      url: "/captchas",
      method: "POST",
      data: {
        tel: data // 用户名就是手机号码
      }
    });
  }
};
