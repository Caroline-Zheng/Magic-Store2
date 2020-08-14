<template>
  <div class="all-html">
  <Loading :active.sync="isLoading"></Loading>
   

      <div class="jumbotron jumbotron-padding jumbotron-fluid bg-image d-flex align-items-end mb-0">
      <div class="container">
        <div class="bg-lighter p-3">
          <h1 class="display-4 magic-store">Magic Store</h1>
          <p class="lead">Prepare For Awesome</p>
        </div>  
      </div>
      </div>
     

  <section style="position: relative;" class="container-fluid pb-3 text-white">
      <div class="container">
      <div class="row text-md-dark-home fade-type">
          <div class="col-md-7 mt-5" style="z-index:1">
            <h2 class="news">最新消息 News</h2>
            <dl class="row mt-4">
                <dt class="col-sm-3 news-date">2020/07/31</dt>
                <dd class="col-sm-9 news-text">哈利波特生日當天全館滿千送百</dd>
                <dt class="col-sm-3 news-date">2020/06/20</dt>
                <dd class="col-sm-9 news-text">本周五近距離魔術大會邀您共襄盛舉！！</dd>
              
                <dt class="col-sm-3 news-date">2020/05/30</dt>
                <dd class="col-sm-9 news-text">慶祝台灣零確診，全館八折起</dd>
              
                <dt class="col-sm-3 news-date">2020/05/19</dt>
                <dd class="col-sm-9 news-text">全新卡牌道具登場，等你大顯身手！</dd>
              
                <dt class="col-sm-3  news-date">2020/04/01</dt>
                <dd class="col-sm-9 news-text">慶祝愚人節，全館滿2000送整人娃娃</dd>
              </dl>
          </div>
          </div>
          </div>
          <div class="row justify-content-end fade-type" style="z-index:0">
            <div class="col-md-5 bg-cover"style="
                  position: absolute; top: 0; bottom: 0;
                  background-image: url(https://upload.cc/i1/2020/06/17/WOckbx.jpg)">
            </div>
          </div>
    </section>

      <div class="hot-sell">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <h3 class="display-4">熱銷產品</h3>
          </div>
          <div class="col-md-12 col-sm-8 ">
            <swiper :options="swiperOption">
              <swiper-slide v-for="item in products" :key="item.id" v-if="item.is_enabled">
                <div class="card border-0 shadow-sm mb-5">
                  <div class="pro-pic" style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"  >
                    <span class="badge badge-warning float-right mt-1 mr-1">{{ item.category }}</span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text text-short">{{ item.description }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h5" v-if="!item.origin_price">{{ item.price | currency }} 元</div>
                      <del class="h6" v-if="item.origin_price">原價 {{ item.origin_price | currency }} 元</del>
                      <div class="h5" v-if="item.origin_price">現在只要 {{ item.price | currency }} 元</div>
                    </div>
                  </div>
                  <div class="card-footer d-flex">
                    <router-link :to="'/item/'+item.id" class="btn btn-outline-secondary btn-sm">
                      查看更多
                    </router-link>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                      <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                      <i class="fas fa-cart-plus" v-else></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </swiper-slide>
               <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
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
            cartVal: 0,
            products:[],
            isLoading:false,
            status:{
              loadingItem:'',
            },
            swiperOption: {
              autoplay: {
                delay: 2500,
                disableOnInteraction: false
              },
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
              breakpoints: {
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30
              },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 30
              }
            }
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
        vm.products = response.data.products;
       console.log(response.data);
       vm.isLoading = false;
    });
    },
    getProduct(id){
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm =  this;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
      vm.product = response.data.product;
      console.log(response.data);
      vm.status.loadingItem = '';
    });
    },
    addtoCart(id, qty = 1){
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
      $('#productModal').modal('hide');
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
    },
    created() {
      this.getProducts();
      this.getCartVal();
    },
}
</script>
