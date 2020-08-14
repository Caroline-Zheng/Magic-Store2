<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
  <div class="jumbotron jumbotron-padding jumbotron-fluid bg-cart-image d-flex align-items-end"></div>

  <div class="my-5 row justify-content-center">
    <div class="container">
      <div class="row mb-4 text-center">
        <div class="col">
          <div class="alert alert-primary" role="alert">
              1. 確認購物車內容
          </div>
        </div>
        <div class="col">
            <div class="alert alert-primary" role="alert">
              2. 填寫購買資料
           </div>
        </div>
        <div class="col">
           <div class="alert alert-danger" v-if="!order.is_paid" role="alert">
              3. 付款完成
           </div>
           <div class="alert alert-primary" v-else role="alert">
              3. 付款完成
           </div>
        </div>
    </div>
    </div>
    </div>
    

    <div class="page-banner">
      <h1 class="text-center">訂單資料</h1>
    </div>
      <div class="container">
      <div class="my-5 row justify-content-center content">
        <form class="col-md-6" @submit.prevent="payOrder">
          <table class="table">
           <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
              <th>小計</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id" >
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
                <td>總計 {{ order.total | currency }} 元</td>
              </tr>
            </tfoot>
          </table>
       


        <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger mb-5">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
  
     
  
  
  </div>
</template>

<script>
export default {
  data(){
    return{
      orderId:'',
      order:{
        user:{},
      },
      isLoading:false,
    }
  },
  methods: {
    getOrder(){
      const vm =  this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
      vm.order = response.data.order;
      console.log(response.data);
      vm.isLoading = false;
    });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.getOrder();
        }
        vm.isLoading= false; 
      })
    },
  },
  created(){
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
}
</script>