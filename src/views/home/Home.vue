<template>
  <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <tab-control  
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick" ref="tabControl1"
            class="tab-control"
            v-show="isTabFixed"/>
    <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
          <home-swiper :banners="banners"
                  @swiperImageLoad="swiperImageLoad"/>
        <recommend-views :recommends="recommends"/>
        <feature-view/>
        <tab-control  
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick" ref="tabControl2"
            />
        <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
     
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendViews from './childComps/RecommendViews'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {itemImgListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {BACKTOP_DISTANCE} from 'common/const'

export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendViews,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    mixins: [itemImgListenerMixin, backTopMixin],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    },
    mounted() {
    },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 1)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2.取消图片加载监听
      this.$bus.$off('itemImageLoad', this.itemImgLink)
    },
    methods: {
      // 事件监听相关的方法
      
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // backClick() {
      //   this.$refs.scroll.scrollTo(0, 0)
      // },
      contentScroll(position) {
        // 判断BackTop是否显示
        // this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
        // 决定tabControl是否吸顶(position: fixed)
         this.isTabFixed = (-position.y) > this.tabOffsetTop
         // 判断BackTop是否显示
         this.listenBackTop(position)
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        // 获取tabControl中的offsetTop
      // 所有组件中都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      // 网络请求的方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
         const page = this.goods[type].page +1
         getHomeGoods(type, page).then(res => {
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page += 1

          // 上拉加载更多的完成
           this.$refs.scroll.finishPullUp()
           
      })
      }
    }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

    .content {
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 51px;
  } */
</style>