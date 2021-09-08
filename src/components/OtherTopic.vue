<template>
  <div class="panel">
    <header>最近创建的话题</header>
    <Divider class="divider" />
    <div v-for='item in user.recent_topics' :key="item.id">
      <div :key='item.id'>
        <router-link v-if='simple' :to="{path: '/topic/' + item.id}" class="o-content">{{item.title}}</router-link>
        <div v-else>
          <div class='main'>
            <div>
              <router-link class="avatar" :to="{path: '/user/' + item.author.loginname}">
                <img :src='item.author && item.author.avatar_url' alt="头像" />
              </router-link>
              <router-link key={item.id} :to="{path: '/topic/' + item.id}" class="o-content">
                {{item.title}}
              </router-link>
            </div>
            <span class="time">
              {{$moment(item.last_reply_at, 'YYYY-MM-DD')
              .startOf('day')
              .fromNow()}}
            </span>
          </div>
          <Divider class="inside-divider" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 用户创建的其他话题 组件
 */
// import eventProxy from "../utils/eventProxy";
import Divider from "./Divider"

export default {
  name: "OtherTopic",
  props: {
    simple: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
     getUser(msg,data) {
         this.user = data
      }
  },
  mounted() {
   this.pid = this.$pubsub.subscribe('user', this.getUser)
  },
  beforeDestroy() {
     this.$pubsub.unsubscribe(this.pid)
  },
  components: {
    Divider
  }
};
</script>

<style lang="less" scoped>
.panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  header {
    color: black;
    font-weight: bold;
  }
  > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
      }
    }
    .time {
      float: right;
      color: #777;
      font-size: 11px;
    }
    .inside-divider {
      margin: 10px 0;
    }
    .avatar {
      margin-left: 10px;
    }
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;
  }
}
.divider {
  margin: 12px 0;
}
.o-content {
   font-size: 14px;
}
</style>

