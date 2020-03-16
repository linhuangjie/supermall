<template>
  <div>
      <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div v-for="(item, index) in titles" 
            :key="index" 
            class="itemTitle"
            :class="{active: index === currentIndex}"
            @click="titlesClick(index)">{{item}}</div>
        </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评价', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titlesClick(index) {
        this.currentIndex = index;
        this.$emit('titlesClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
}
</script>

<style>
  .title {
    display: flex;
  }
  .itemTitle {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>