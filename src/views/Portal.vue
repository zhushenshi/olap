<template>
  <div>
    <router-view />
    <tabbar route   active-color="#1890FF" inactive-color="#B3BFD0">
      <tabbar-item replace to="/portal/home" icon="home-o">
        <span class="tabText">首页</span>
          <template #icon="props">
            <img class="tabIcon" :src="props.active ? homeIcon.active : homeIcon.inactive"/>
          </template>
      </tabbar-item>
      <tabbar-item replace to="/portal/toDoList" icon="search">
        <span class="tabText">待办</span>
          <template #icon="props">
            <img class="tabIcon" :src="props.active ? toDoIcon.active : toDoIcon.inactive"/>
          </template>
      </tabbar-item>
      <tabbar-item replace to="/portal/queryArbitral" icon="home-o">
        <span class="tabText">视频开庭</span>
          <template #icon="props">
            <img class="tabIcon" :src="props.active ? videoIcon.active : videoIcon.inactive"/>
          </template>
      </tabbar-item>
      <tabbar-item replace to="/portal/queryArbitral" icon="search">
        <span class="tabText">案件查询</span>
          <template #icon="props">
            <img class="tabIcon" :src="props.active ? queryIcon.active : queryIcon.inactive"/>
          </template>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
export default {
  data () {
    return {
      homeIcon: {
        active: require('../assets/homeIcon_active.png'),
        inactive: require('../assets/homeIcon.png')
      },
      toDoIcon: {
        active: require('../assets/toDo_active.png'),
        inactive: require('../assets/toDo.png')
      },
      videoIcon: {
        active: require('../assets/video_active.png'),
        inactive: require('../assets/video.png')
      },
      queryIcon: {
        active: require('../assets/query_active.png'),
        inactive: require('../assets/query.png')
      }
    }
  },
  components: { Tabbar, TabbarItem }
}
</script>
<style lang="stylus" scoped>
.tabText
  font-size:10px;
  line-height:14px;
.tabIcon
  height:22px;
</style>
