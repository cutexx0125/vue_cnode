<template>
  <div>
    <div class="topic" v-for="item in list" :key="item.id">
      <router-link :to="'/user/'+item.author.loginname">
        <img :src="item.author.avatar_url | imgCheck" alt="用户头像">
      </router-link>
      <span class="count">
        <em>{{item.reply_count}}</em>/<em>{{item.visit_count}}</em>
      </span>
      <el-tag :type="$tab[item.tab]&&$tab[item.tab].type">
        {{item.tab ? $tab[item.tab] && $tab[item.tab].name : '无分类'}}
      </el-tag>
      <router-link :to="'/topic/'+item.id" class="title">
        {{item.title}}
      </router-link>
      <span class="time">
        {{
          $moment(item.last_reply_at, 'YYYY-MM-DD').startOf('day').fromNow()
        }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentList',
  props: ['list'],
  filters: {
    imgCheck(url) {
      /* 源地址： https://avatars[1|2].githubusercontent.com/u/1159760?v=4&s=120
       * 把avatars后面的数字去掉即可访问到图片
       */
      return url.replace(/avatars[0-9]/,'avatars');
    }
  }
}
</script>

<style lang="less" scoped>
.topic {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 50px;
    border-radius: 50%;
    height: 50px;
  }
  .count {
    width: 50px;
    text-align: center;
    em:first-child {
      font-size: 1.2em;
      color: purple;
    }
    em:last-child {
      color: grey;
    }
  }
  .title {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    font-size: 14px;
  }
  span.time {
    width: 70px;
    text-align: right;
  }
}
</style>