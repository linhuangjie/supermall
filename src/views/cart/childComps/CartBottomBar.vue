<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button"/>
          <span>全选</span>
      </div>
      <div class="price">
          合计: {{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
          去计算：({{ checkLength }})
      </div>
      <!-- <check-button class="select-all"/>
      <span>全选</span>
      <span class="total-price">合计：￥{{totalPrice}}</span>
      <span class="buy-product">去计算({{$store.getters.cartCount}})</span> -->
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if(this.cartList.length === 0) return false
            // 1.使用数组高阶函数filter
            // return !(this.cartList.filter(item => !item.checked).length)
            // 2.使用数组高阶函数find
            return !this.cartList.find(item => !item.checked)
            // 3.使用普通遍历
            for(let item of this.cartList) {
                if(!item.checked) {
                    return false
                }

                return true
            }
        }
    },
    methods: {
      checkClick() {
          if(this.isSelectAll) {  //全部选中时
              this.cartList.forEach(item => item.checked = false)
          } else {
              this.cartList.forEach(item => item.checked = true)
          }
      },
      calcClick() {
          if(!this.isSelectAll) {
              this.$toast.show('你的购物车为空', 2000)
          }
      }
    }
}
</script>

<style scoped>
   .bottom-bar {
       position: relative;
       height: 40px;
       background-color: #eee;
       line-height: 40px;
       display: flex;
       font-size: 14px;
   }
   .check-content {
       display: flex;
       align-items: center;
       margin-left: 10px;
       width: 63px;
   }

   .check-button {
       width: 22px;
       height: 22px;
       line-height: 20px;
       margin-right: 8px;
   }

   .price {
       margin-left: 20px;
       flex: 1;
   }
   .calculate {
       width: 90px;
       background-color: red;
       color: #fff;
       text-align: center;
   }
</style>