<template>
  <div id="detail">
      <detail-nav-bar/>
      <detail-swiper :images="topImages"/>
      <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

import {getDetail, Goods} from 'network/detail'


export default {
    name: 'Detail',
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {}
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo
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
        })
    }
}
</script>

<style scoped>

</style>