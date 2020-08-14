<template >
   <div>
   <div class="all-html">
   <Loading :active.sync="isLoading"></Loading>
     <div class="jumbotron jumbotron-padding jumbotron-fluid bg-item-image d-flex justify-content-center align-items-end">
      <span class="introduce display-4">產品介紹</span>
      </div>

      <div class="container">
         <div class="row">
           <div class="col-md-12 d-flex justify-content-end">
              <router-link class="btn btn-outline-secondary btn-sm mb-4" to="/product_list">
                <i class="fas fa-arrow-left"></i> 返回商品列表
              </router-link>
            </div>
             <div class="col-lg-6 col-md-7 pic-con mx-3 mx-sm-0" 
            :style="{ 'background-image': 'url(' + product.imageUrl + ')' }">
            <img  width="100%" alt="">
          </div>
           <div class="col-lg-6 col-md-5 content my-sm-3 px-md-5">
            <ul class="item-list">
              <li><b>商品名稱</b>{{product.title}}</li>
              <li><span>單位</span>每份 / {{product.unit}}</li>
              <li><b>剩餘現貨</b>100 份</li>
              <li><b>付款方式</b><i class="far fa-credit-card"></i> 模擬付款</li>
            </ul>
            <div class="pay">
              <div class="d-flex justify-content-between">
                <span class="text-secondary">小計 {{ temp.num*product.price | currency }}</span>
                <div class="price">
                  <div  v-if="!product.origin_price">{{ product.price | currency }} 元</div>
                  <del class=" text-secondary" v-if="product.origin_price">原價 {{ product.origin_price | currency }}</del>
                  <div  v-if="product.origin_price">特價 {{ product.price | currency }}</div>
                </div>
              </div>
              <div class="row item-select">
                <div class="col-sm-6 mb-2">
                  <select name="" class="form-control mr-3" v-model="temp.num">
                    <option :value="num" v-for="num in 10" :key="num">
                      選購 {{num}} 份
                    </option>
                  </select>
                </div>
                <div class="col-sm-6 cart mb-2">
                  <button type="button" class="btn btn-danger btn-sm" @click="addtoCart(product.id,temp.num)">
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    <i class="fas fa-cart-plus" v-else></i>
                    加到購物車
                  </button>
                </div>
              </div>
              
            </div>            
          </div>
          <div class="col-md-12 mt-5">
            <h3 class="text-secondary"  v-if="product.description">商品介紹</h3>
            <p style="font-size:18px">{{product.description}}</p>
            <hr>
            <h3 class="text-secondary" v-if="product.content">商品描述</h3>
            <p style="font-size:18px">{{product.content}}</p>
          </div>
        </div>
          
          </div> 
       </div>

      <div class="container mt-5">
          <div class="guess-like">猜你也喜歡...</div>
            <div class="row mt-5">
              <div class="col-md-4 mb-4" v-for="item in filterData" :key="item.id">
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
                <router-link :to="'/item/'+item.id" @click.native="reloadAll" class="btn btn-outline-secondary btn-sm">
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
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
          products:[],
          product:[],
          isLoading:false,
          itemId:'',
          temp:{
            num:1,
          },
          status: {
            loadingItem: '',
          },
        }
    },
    computed: {
      filterData() {
        const tempData = []
        this.products.forEach((item)=>{
        if(item.category == this.product.category && item.id !== this.product.id) {
          console.log(item)
          tempData.push(item)
        }
        });
        return tempData;
      }
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
          const vm =  this;
          const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${vm.itemId}`;
          vm.status.loadingItem = id;
          this.$http.get(url).then((response) => {
          vm.product = response.data.product;
          vm.status.loadingItem = '';
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
    reloadAll(){
      this.$router.go(0);
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, {data:cart}).then((response) => {
        console.log(response.data);
        vm.status.loadingItem = '';
        vm.getCart();
        vm.getCartVal();
     });
    },
    },
    created() {
        this.itemId = this.$route.params.itemId;
        this.getProduct();
        this.getProducts();
        this.getCartVal();
    },
}
</script>