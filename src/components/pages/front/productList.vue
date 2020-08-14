<template>
   <div>
   <div class="all-html" >
   <Loading :active.sync="isLoading"></Loading>
     <div class="jumbotron jumbotron-padding jumbotron-fluid bg-pro-image d-flex align-items-end">
      </div>
    

    <div class="container">
      <div class="row">
        <div class="col-md-3 mt-5 all-category">
         <div class="sticky-top" style="top:100px">
          <div class="sidebar-title h5"> 商品分類 </div>
          <ul style="list-style:none;padding:0">
            <li  class="category-list mb-2" v-for="(item,key) in filter.list" :key="key">
               <a  href="#" @click.prevent="changeCategory(item)">{{item}}</a>
            </li>
          </ul>
        </div>
        </div>
        <div class="col-md-9">
            <div class="row mt-5">
              <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                  <div style="height: 160px; background-size: cover; background-position: center"
                    :style="{backgroundImage:`url(${item.imageUrl})`}">
                  <span class="badge category-type float-right mt-1 mr-1">{{item.category}}</span>
                </div>
              <div class="card-body" >
                <h5 class="card-title">
                  <a href="#" class="text-dark">{{item.title}}</a>
                </h5>
                <p class="card-text text-short">{{item.description}}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                  <del class="h6" v-if="item.origin_price">原價 {{ item.origin_price | currency }} </del>
                  <div class="h5" v-if="item.origin_price">特價 {{ item.price | currency }} </div>
                </div>
              </div>
              <div class="card-footer d-flex">
                <router-link :to="'/item/'+item.id" class="btn btn-outline-secondary btn-sm">
                  查看更多
                </router-link>
                <button type="button" @click="addToCart(item.id)" class="btn btn-outline-danger btn-sm ml-auto">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  <i class="fas fa-cart-plus" v-else></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      
      
      
      
      </div>
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
            filter:{
              list:['全部商品','卡牌道具','浪漫獻禮','整人玩具','其他道具'],
              str:'全部商品',
            },
            status:{
              loadingItem:'',
            },
            product:{},
            cart:{},
            coupon_code:'',
            form:{
              user:{
                name:'',
                email:'',
                tel:'',
                address:'',
              },
              message:'',
            },
        };
    },
    methods: {
      getProducts(){
       const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
       const vm =  this;
       vm.isLoading = true;
       this.$http.get(url).then((response) => {
       vm.isLoading = false;
       if (vm.filter.str !== '全部商品'){
         let filterPro = response.data.products.filter(function(item){
           return item.category == vm.filter.str;
         });
         vm.products = filterPro;
       }else{
         vm.products = response.data.products;
       }
    });
    },
    
    addToCart(id, qty = 1){
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm =  this;
      vm.status.loadingItem = id;
      const cart = {
        product_id : id,
        qty
      }
      this.$http.post(url, {data:cart}).then((response) => {
      console.log(response.data);
      vm.status.loadingItem = '';
      vm.getCart();
      vm.getCartVal();
    });
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
    changeCategory(str){
      const vm = this;
      vm.filter.str = str;
      vm.getProducts();
    },
    createOrder(){
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
      const vm =  this;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if (result) {
          // do stuff if not valid.
          this.$http.post(url,{data:order}).then((response) => {
          console.log('訂單已建立',response);
          if(response.data.success){
            vm.$router.push(`/customer_checkout/${response.data.orderId}`);
          }
          vm.isLoading = false;
      });
      }else{
        console.log('欄位不完整');
      }
    });
    },
    },
    created() {
      this.getProducts();
      this.getCartVal();
    },
}
</script>

