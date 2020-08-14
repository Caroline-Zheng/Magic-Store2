<template>
  <div>
    <div class="all-html">
    <div class="fixed-top">
    <div class="bg-dark py-1">
        <div class=" marquee text-white">
          <span class="text-left"><i class="fas fa-volume-up"></i> 歡慶周年</span>
          <marquee>Magic Store 滿3歲囉！即日起至9月30日前，輸入指定優惠碼全館6折，還可以抽限量魔術道具歐！</marquee>
        </div>
      </div>
     
      <nav class="navbar navbar-expand-lg nav-bg navbar-light">
     <div class="container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">首頁 <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"  to="/product_list">商品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"  to="/about">關於我們</router-link>
          </li>
          </ul>
          <form class="form-inline ">
              <router-link to="/cart" class="mr-3 cart-color"><i class="fas fa-cart-plus"></i> 購物車( {{ cartVal }} )
              <span class="badge badge-pill badge-danger"></span></router-link>
              <router-link class="mr-3 cart-color" to="/login"><i class="fas fa-cog"></i> 後台管理</router-link>
          </form>
          
        </div>
      </div>
    </nav>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import jQuery from 'jquery';

export default{
  data(){
    return{
      cartVal:0,
    }
  },
  created() {
    const vm = this;
    vm.$bus.$on('get:cartval',(val) =>{
      vm.cartVal = val;
    })
  },
}
</script>