<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="isActiveStyle"> <slot name="item-text"></slot></div>
  </div>
</template>

<script scoped>
export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      isActiveStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // 添加这个.catch(err => err) 不会报错，就是自己捕获异常
        this.$router.push(this.path).catch(err => err)
        // 3.0.1 版本以上双击会报错
        // this.$router.push(this.path)
      }
    }
}
</script>

<style scoped>
.active {
  color: #f00;
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
}
</style>