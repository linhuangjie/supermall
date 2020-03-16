<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titlesClick="titlesClick" ref="nav"/>
     <scroll class="content" ref="scroll" :probe-type="3" @scroll="countentScroll">
            <detail-swiper :images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"/>
            <detail-param-info ref="param" :params-info="paramsInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
     </scroll>
     <detail-bottom-bar/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetialShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommends} from 'network/detail'
import {itemImgListenerMixin} from 'common/mixin'
import {debounce} from 'common/utils'

export default {
    name: 'Detail',
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramsInfo: {},
            commentInfo: {},
            recommends: [],
            temeTopYs: [],
            getThemeTopY: null,
            countentIndex: 0
        }
    },
    mixins: [itemImgListenerMixin],  //混入
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid;
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            console.log(res)
            const data = res.result
            //1. 获取顶部轮播数据
            this.topImages = data.itemInfo.topImages
            // 2.获取商品数据
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 3.获取商家信息
            this.shop = new Shop(data.shopInfo)
            // 4.获取详情页数据
            this.detailInfo = data.detailInfo
            //5.获取商品参数信息
            this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            // 6.获取评论信息
            if(data.rate.cRate) {
                this.commentInfo = data.rate.list[0]
            }

            // 1.第一次获取值不对
            // 值不对的原因：this.$refs.param.$el压根没有被渲染出来
                // this.temeTopYs = []
                // this.temeTopYs.push(0)
                // this.temeTopYs.push(this.$refs.param.$el.offsetTop)
                // this.temeTopYs.push(this.$refs.comment.$el.offsetTop)
                // this.temeTopYs.push(this.$refs.recommend.$el.offsetTop)
                // console.log(this.temeTopYs)

            // this.$nextTick(() => {
            //     // 2.第二次获取：值不对
            //     // 值不对的原因: 图片没有计算在内
            //     // 根据最新的数据，对应的DOM已经被渲染出来了
            //     // 但是图片依然没有加载出来(目前获取到的offsetTop不包含图片的)
            //     // 一般offsetTop值不对的时候，但是图片的问题
            //    this.temeTopYs = []
            //     this.temeTopYs.push(0)
            //     this.temeTopYs.push(this.$refs.param.$el.offsetTop)
            //     this.temeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.temeTopYs.push(this.$refs.recommend.$el.offsetTop)
            //     console.log(this.temeTopYs) 
            // })

        })
        // 3.获取推荐数据
        getRecommends().then(res => {
            this.recommends = res.data.list
        })

        // 4.给getThemeTopY赋值
        this.getThemeTopY = debounce(() => {
            this.temeTopYs = []
             this.temeTopYs.push(0)
            this.temeTopYs.push(this.$refs.param.$el.offsetTop)
            this.temeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.temeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.temeTopYs.push(Number.MAX_VALUE)
            console.log(this.temeTopYs) 

        }, 200)

    },
    mounted() {  

    },
    destroyed() {
         this.$bus.$off('itemImageLoad', this.itemImgLinkener)
    },
    methods: {
        imageLoad() {
            // this.$refs.scroll.refresh()
            // console.log('-----')
            this.newRefresh()   
            this.getThemeTopY()
        },
        titlesClick(index) {
            this.$refs.scroll.scrollTo(0, -this.temeTopYs[index], 300)
        },
        countentScroll(position) {
            //1. 获取y值
            const positionY = -position.y
            // console.log(positionY)
            // 2.positionY和主题中的值进行对比
            // [0, 7888, 9541, 9780]
            // positionY 在0 和 7888 之间 index = 0
            // positionY 在 =7888 和 9541 之间 index = 1
            // positionY 在 =9541 和 9780 之间 index = 2

            // positionY 大于=9780 index = 3
            let length = this.temeTopYs.length
            // console.log(length)
            for (let i = 0; i < length-1; i++) {
                // console.log(i)
                if(this.countentIndex !== i && positionY >= this.temeTopYs[i] && positionY < this.temeTopYs[i+1]) {
                    this.countentIndex = i
                    this.$refs.nav.currentIndex = this.countentIndex
                }
                // if(this.countentIndex !== i && ((i < length -1 && positionY >= this.temeTopYs[i] && positionY < this.temeTopYs[i+1]) 
                // || (i === length-1 && positionY >= this.temeTopYs[i]))) {
                //     this.countentIndex = i
                //     // console.log(this.countentIndex)
                //     this.$refs.nav.currentIndex = this.countentIndex
                // }
                
            }
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content {
        height: calc(100% - 44px);
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>