<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"/>
     <scroll class="content" ref="scroll">
            <detail-swiper :images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :params-info="paramsInfo"/>
     </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetialShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'


export default {
    name: 'Detail',
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramsInfo: {}
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Scroll
    },
    created() {
        // 保存传入的iid
        this.iid = this.$route.params.iid;
        // 根据iid请求详情数据
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
        })
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
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