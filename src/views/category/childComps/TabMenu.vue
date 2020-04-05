<template>
<scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item" 
      v-for="(item, index) in categorys" :key="index"
      @click="itemClick(index)"
      :class="{active: index===courrentIndex}">
        {{item.title}}
      </div>
  </div>
</scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
    name: 'TabMenu',
    props: {
        categorys: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            courrentIndex: 0
        }
    },
    methods: {
        itemClick(index) {
            this.courrentIndex = index
            this.$emit('selectItem', index)
        }
    },
    components: {
        Scroll
    }
}
</script>

<style scoped>
     #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>