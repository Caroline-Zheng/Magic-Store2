<template>
  <div class="all-html">
    
    <Loading :active.sync="isLoading"></Loading>
  <div class="jumbotron jumbotron-padding jumbotron-fluid bg-cart-image d-flex align-items-end"></div>

  <div class="my-5 row justify-content-center" v-if="cart.final_total">
    <div class="container">
    <div class="row mb-4 text-center">
    <div class="col">
       <div class="alert alert-primary" role="alert">
          1. 確認購物車內容
       </div>
    </div>
    <div class="col">
        <div class="alert alert-danger" role="alert">
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
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
        <th>小計</th>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id" >
          <td class="align-middle">
              {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
              </div>
          </td>
          <td class="align-middle">{{ item.qty }}</td>
          <td class="align-middle">{{ item.product.price | currency }} 元</td>
          <td class="align-middle">{{ item.final_total | currency }} 元</td>
        </tr>
      </tbody>
      <tfoot>
         <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>總計 {{ cart.final_total | currency }} 元</td>
        </tr>
      </tfoot>
    </table>
    </div>
    </div>


  
  <div class="my-5 row justify-content-center">
  <form class="col-md-6" @submit.prevent="createOrder">
    <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail"
        v-model="form.user.email" placeholder="請輸入 Email" 
        v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}">
      <span class="text-danger" v-if="errors.has('email')">
      {{ errors.first('email') }}</span>
    </div>
  
    <div class="form-group">
      <label for="username">收件人姓名</label>
      <input type="text" class="form-control" name="name" id="username"
        v-model="form.user.name" placeholder="輸入姓名"
        v-validate="'required'" :class="{'is-invalid':errors.has('name')}">
      <span class="text-danger" v-if="errors.has('name')">姓名為必填欄位</span>
    </div>
  
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      <input type="tel" class="form-control" id="usertel" name="usertel"
        v-validate="'required'" :class="{'is-invalid':errors.has('usertel')}"
        v-model="form.user.tel" placeholder="請輸入電話">
      <span class="text-danger" v-if="errors.has('usertel')">電話為必填欄位</span>
    </div>
  
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
        placeholder="請輸入地址" v-validate="'required'" :class="{'is-invalid':errors.has('address')}" >
      <span class="text-danger" v-if="errors.has('address')">地址欄位不得空白</span>
    </div>
  
    <div class="form-group">
      <label for="comment">留言</label>
      <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger">確認付款去</button>
    </div>
  </form>
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
            status:{
              loadingItem:'',
            },
            cart:{},
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
            vm.$router.push(`/order_done/${response.data.orderId}`);
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
      this.getCart();
    },
}
</script>