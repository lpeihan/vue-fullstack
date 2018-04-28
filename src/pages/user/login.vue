<template>
  <form class="form-horizontal" @submit="login">
    <div class="form-group">
      <label for="account" class="col-sm-2 control-label">用户名</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" placeholder="请输入用户名" v-model="user.account">
      </div>
    </div>
    <div class="form-group">
      <label for="password" class="col-sm-2 control-label">密码</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" placeholder="请输入密码" v-model="user.password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default">登录</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        account: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      this.$http.post('login', this.user);
    }
  }
};
</script>
