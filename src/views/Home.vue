<template>
  <div class="home">
    <el-tabs v-model="tab" @tab-click="tabChanged">
      <el-tab-pane label="全部" name="all">
        <content-list :list="list"></content-list>
      </el-tab-pane>
      <el-tab-pane label="精华" name="good">
        <content-list :list="list"></content-list>
      </el-tab-pane>
      <el-tab-pane label="分享" name="share">
        <content-list :list="list"></content-list>
      </el-tab-pane>
      <el-tab-pane label="问答" name="ask">
        <content-list :list="list"></content-list>
      </el-tab-pane>
      <el-tab-pane label="招聘" name="job">
        <content-list :list="list"></content-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getTopics } from '@/utils/api'
import { setSession, getSession } from '@/utils/util'
import ContentList from '../components/ContentList'

export default {
  components: { ContentList },
  name: 'Home',
  data() {
    return {
      // 当前tab
      tab: 'all',
      list: [],
      // 帖子列表页数
      page: 1,
      // 一次请求到帖子数
      limit: 20,
      // 存储所有tab对应的数据，切换tab后就不用重新以limit20加载
      store: {}
    }
  },
  created() {
    this.tab = getSession('activeTab') ? getSession('activeTab') : 'all'
    this.getTopics()
    window.addEventListener('scroll', this.scrollMethod)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollMethod);
  },
  methods: {
    // 获取首页的帖子列表数据
    getTopics() {
      getTopics({
        page: this.page,
        limit: this.limit,
        tab: this.tab
      }).then(res => {
        this.list = res.data
        this.limit = this.limit + 10
        this.store[this.tab] = {
          limit: this.limit,
          data: res.data
        }
      })
    },
    // 当前Tab变化时判断Store里是否已经存储数据
    tabChanged() {
      // 保存当前的tab
      setSession('activeTab', this.tab)
      const store = this.store
      if (!store[this.tab]) {
        this.limit = 20
        this.list = []
        this.getTopics()
        return 
      }
      this.list = store[this.tab].data
      this.limit = store[this.tab].limit
    },
    // 滚动函数，判断当前滚动条是否到了底部来决定是否重新拉取数据
    scrollMethod() {
      const sumH = document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
      if (viewH + scrollH >= sumH) {
        this.getTopics();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  margin: auto;
  width: 75%;
  padding: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>