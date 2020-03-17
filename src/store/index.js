import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装vuex插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCart(state, payload) {
            // payload添加新的商品
            let oldProduct = null
            for(let item of state.cartList) {
                if(item.iid === payload,iid) {
                    oldProduct = item
                }
            }
            if(oldProduct) {
                oldProduct.count += 1
            }else {
                payload.count = 1
                state.cartList.push(payload)
            }
            
        }
    }
})

// 3.挂载到Vue实例上
export default store