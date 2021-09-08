<template>
  <div class="topic">
    <div class="left">
      <div class="title" v-html='topic.title'></div>
      <div class="info">
        <span>
          发布于&nbsp;
          {{$moment(topic.create_at, 'YYYY-MM-DD').startOf('day').fromNow()}}
          &nbsp;·&nbsp;
        </span>
        作者：
        <router-link :to="'/user/'+topic.loginname">
          {{topic.loginname}}
        </router-link>
        &nbsp;·&nbsp;
        <span>{{topic.visit_count}}次浏览&nbsp;·&nbsp;</span>
        <span>
          来自：
          {{$tab[topic.tab]&&$tab[topic.tab].name}}
        </span>
      </div>
      <divider></divider>
      <div class="content" v-html='topic.content'></div>
      <reply :data="topic.replies"></reply>
    </div>

    <div class="right">
      <profile-panel :loginname="topic.loginname"></profile-panel>
      <other-topic></other-topic>
      <recent-reply></recent-reply>
    </div>
  </div>
</template>

<script>
import { getTopicById } from "@/utils/api"
import Divider from '../components/Divider.vue'
import Reply from '../components/Reply.vue'
import ProfilePanel from '../components/ProfilePanel.vue'
import OtherTopic from '../components/OtherTopic.vue'
import RecentReply from '../components/RecentReply'

export default {
  name: 'Topic',
  components: {
    Divider,
    Reply,
    ProfilePanel,
    OtherTopic,
    RecentReply
  },
  data() {
    return {
      topic: {}
    }
  },
  created() {
    this.getData(this.$route.params.id)
  },
  methods: {
    getData(id) {
      getTopicById(id).then(res => {
        this.topic = {
          ...res.data,
          ...res.data.author
        }
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.id);
    next();
  }
}
</script>

<style lang="less" scoped>
.topic {
  display: flex;
  margin-bottom: 100px;
  .title {
    color: black;
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 8px;
  }
  .content {
    color: #333;
    line-height: 1.6;
    margin-bottom: 50px;
    /deep/ img {
      width: 100%;
    }
  }
  .left {
    width: 72%;
    float: left;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    .info {
      display: flex;
      align-items: center;
      color: #838383;
      font-size: 12px;
    }
  }
  .right {
    float: right;
    width: 25%;
    height: 100%;
    margin-left: 2%;
  }
}
</style>