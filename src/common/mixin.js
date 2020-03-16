import {debounce} from './utils'

export const itemImgListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
          // 3.监听item中图片加载完成
       this.newRefresh = debounce(this.$refs.scroll.refresh)

       this.itemImgListener = () => {
        this.newRefresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}