import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations_type'

export default  {
    addCart(context, payload) {
        // payload添加新的商品
        // 数组有哪些方法? push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
        // let oldProduct = null
        // for(let item of state.cartList) {
        //     if(item.iid === payload,iid) {
        //         oldProduct = item
        //     }
        // }
        return new Promise((resolve, reject) => {
            
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if(oldProduct) {
            // oldProduct.count += 1
            context.commit(ADD_COUNTER, oldProduct)
            resolve('当前数量+1')
        }else {
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
            resolve('添加商品成功')
        }
        })
        
    }
}