<template>
  <div class="header">
    <div class="info">
      <a href="">
        <img :src='require("@/assets/image/cnodejs.svg")' alt="网站logo">
      </a>
      <span @click="dialogVisible = true">关于</span>
    </div>

    <el-dialog title="关于本项目" :visible="dialogVisible" width="35%">
      <div class="insight-dialog">
        <p>
          作者：cutexx
          <a href="https://linshuirong.cn/" target="_blank">参考：林水溶</a>
        </p>
        <p>
          源码：
          <el-icon type="star" class='el-icon-star-off'></el-icon>
          <a href="https://github.com/cutexx0125/vue_cnode" target="_blank" rel="nofollow noopener noreferrer">
            vue_Cnode
          </a>
          <el-icon type="star" class='el-icon-star-off' />
          &nbsp;欢迎Star~&nbsp;
          <el-icon type="star" class='el-icon-star-off' />
        </p>
        <div>
          <p>技术栈：</p>
          <ul>
            <li>Vue</li>
            <li>Vue Router</li>
            <li>ElementUI</li>
            <li>Axios</li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'mHeader',
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  background: #444;
  margin-bottom: 30px;
  .info {
    width: 1200px;
    height: 50px;
    margin: auto;
    a {
      width: 120px;
      height: 50px;
      display: block;
      float: left;
      img {
        padding-top: 10px;
        display: block;
        width: 100%;
      }
    }
    span {
      float: right;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
    }
  }
  .insight-dialog {
    p {
      margin-bottom: 10px;
    }
  }
}
</style>