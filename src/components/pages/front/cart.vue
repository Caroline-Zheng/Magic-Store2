<template>
  <div class="all-html">
  <Loading :active.sync="isLoading"></Loading>
  <div class="jumbotron jumbotron-padding jumbotron-fluid bg-cart-image d-flex justify-content-center align-items-end">
  <p class="display-4 cart-title">購物車</p></div>
  

  <div class="mb-5 mt-3 row justify-content-center" v-if="cart.final_total">
    <div class="container">
    <div class="row mb-4 text-center">
    <div class="col">
       <div class="alert alert-danger" role="alert">
          1. 確認購物車內容
       </div>
    </div>
    <div class="col">
        <div class="alert alert-secondary" role="alert">
          2. 填寫購買資料
       </div>
    </div>
    <div class="col">
        <div class="alert alert-secondary" role="alert">
          3. 付款完成
       </div>
    </div>
    </div>
    <table class="table">
      <thead>
        <th>刪除</th>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
        <th>小計</th>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id" >
          <td class="align-middle">
            <button type="button"  class="btn btn-outline-danger btn-sm">
              <i class="far fa-trash-alt" @click="removeCartItem(item.id)"></i>
            </button>
          </td>
          <td class="align-middle">
              {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
              </div>
          </td>
          <td class="align-middle">{{ item.qty }}</td>
          <td class="align-middle">{{ item.product.price | currency }}</td>
          <td class="align-middle">{{ item.final_total | currency }}</td>
        </tr>
      </tbody>
    </table>
    
     <div class="col-md-12 d-flex justify-content-end">
      <router-link class="btn keep-shopping btn-sm mb-4" to="/product_list">
        <i class="fas fa-arrow-left"></i> 繼續購物
      </router-link>
    </div>


    </div>
    </div>

    
   
  

    <div class="container" v-if="cart.final_total">
      <div class="bg-light mb-0 pr-3" style="height:200px">
        <div class="con">
          <p class="text-right pt-3 mb-0"> 總計: {{ cart.final_total | currency }}</p>
          <p class="text-secondary text-right">皆以新台幣NTD付款</p>
          <div class="input-group mb-3 input-group-sm  coupon-input">
            <input type="text" class="form-control" v-model = "coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
            <button class="btn btn-outline-secondary" @click="addCouponCode" type="button">
              套用優惠碼
            </button>
            </div>
          </div>
          <div class="text-right">
            <router-link to="/customer_order" class="btn btn-checkout">結帳去 
              <i class="fas fa-arrow-right"></i></button>
            </router-link>
          </div>
      </div>
    </div>
  </div>

  <div class="container" v-else>
    <img class="no-cart-img mb-4 mt-5" src="https://upload.cc/i1/2020/07/06/4LCGRe.png" alt="">
    <div class="no-cart-text text-center mb-5">目前購物車還沒有商品，趕快購物去！</div>
    <div class="d-flex justify-content-end">
      <router-link class="btn keep-shopping btn-sm mb-4" to="/product_list">
         <i class="fas fa-arrow-left"></i> 返回商品列表
      </router-link>
    </div>
  </div>
 
 
 
 
 
 </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
    return{
        products:[],
        isLoading:false,
        cart:[],
        coupon_code:'',
        modalType:'', 
    };
    },
    methods: {
      getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading= true;
      this.$http.get(api).then((response) => {
        vm.isLoading= false;
        vm.products = response.data.products;
        console.log(response.data.products)
      })
    },
    getCart(){
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm =  this;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
      vm.cart = response.data.data;
      console.log(response.data);
      vm.isLoading = false;
    });
    },
    getCartVal(){
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.isLoading = false;
        this.$bus.$emit('get:cartval',response.data.data.carts.length);
      })
    },
    removeCartItem(id){
      const vm =  this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      let msg = confirm('確定要刪除此商品？');
      if(msg == true){
        this.$http.delete(url).then((response) => {
        vm.getCart();
        vm.getCartVal();
        vm.isLoading = false;
    });
    }else{
      vm.isLoading = false;
    }
    },
    addCouponCode(){
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/coupon`;
      const vm =  this;
      const coupon = {
        code:vm.coupon_code,
      }
      vm.isLoading = true;
      this.$http.post(url,{data:coupon}).then((response) => {
      vm.getCart();
      vm.isLoading = false;
    });
    },
    },
    created(){
        this.getProducts();
        this.getCart();
        this.getCartVal();
    },
}
</script>
