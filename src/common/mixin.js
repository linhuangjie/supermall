import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
import {BACKTOP_DISTANCE} from 'common/const'
import {POP, NEW, SELL} from "./const";

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

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        listenBackTop(position) {
            // 判断BackTop是否显示
         this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
        }
    }

}

export const tabControlMixin = {
    data() {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }