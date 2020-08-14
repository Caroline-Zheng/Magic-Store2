<template>  
   <div>
   <loading :active.sync="isLoading">
    </loading>
      <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">購買時間</th>
        <th width="120">Email</th>
        <th width="120">購買款項</th>
        <th width="120">應付金額</th>
        <th width="90">是否付款</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orderList" :key="item.id" >
        <td>{{ item.create_at | date }}</td>
        <td>{{ item.user.email }}</td>
        <td class="text-right">
           <ul class="list-unstyled">
              <li v-for="product in item.products">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
        </td>
        <td class="text-right">{{ item.total | currency }}</td>
        <td>
          <span v-if="item.is_paid" class="text-success">已付款</span>
          <span v-else>未付款</span>
        </td>
      </tr>
    </tbody>
  </table>
   </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
          orderList:{},
          isLoading:false,
        };
    },
    methods: {
        getOrderList(page = 1){
            const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            const vm =  this;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
            vm.orderList = response.data.orders;
            console.log(response.data);
            vm.isLoading = false;
    });
        },
    },
    created() {
        this.getOrderList();
    },
}
</script>