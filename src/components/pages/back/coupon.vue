<template>
  <div>
  <loading :active.sync="isLoading"> </loading>
     <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的優惠券
      </button>
    </div>

     <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="120">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-center">{{ item.percent }}%</td>
          <td>{{item.due_date }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm mr-1"
              @click="openModal('edit',item)">
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm" 
              @click="openModal('preDelete',item)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
<!-- Coupon Modal -->
     <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠卷</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model = "newCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="tempCouponCode">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="tempCouponCode"
                v-model = "newCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model = "newCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model = "newCoupon.due_date"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="newCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="updateCoupon"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>


     <!-- Del Coupon Modal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ newCoupon.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click = "delCoupon"
              >
              確認刪除
            </button>
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
      isLoading: false,
      coupons:[],
      newCoupon:{},
      type:'',
    };
  },
  methods: {
    getCoupons( page = 1){
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
      console.log(response.data);
      vm.isLoading = false;
      vm.coupons = response.data.coupons;
      });
    },
    openModal(type,item){
      if(type === 'new'){
        this.newCoupon = {};
        this.type = 'new';
        $('#couponModal').modal('show');
      }else if(type === 'edit'){
        this.newCoupon = Object.assign({}, item);
        this.type = 'edit';
        $('#couponModal').modal('show');
      }else if(type === 'preDelete'){
        this.newCoupon = item;
        $('#delCouponModal').modal('show');
      }
    },
    updateCoupon(){
      const vm = this;
      let httpMethod = 'post';
      let api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon`;
      if(this.type === 'edit'){
        api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.newCoupon.id}`;
        httpMethod = 'put';
      }
      vm.isLoading = true;
      this.$http[httpMethod](api,{data:vm.newCoupon}).then((response) => {
      console.log(response.data);
      vm.isLoading = false;
      if(response.data.success){
        $('#couponModal').modal('hide');
        vm.getCoupons();
      }else{
        console.log('新增失敗');
      }
      });
    },
    delCoupon(){
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.newCoupon.id}`;
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
      console.log(response.data);
      vm.isLoading = false;
      if(response.data.success){
        $('#delCouponModal').modal('hide');
        vm.getCoupons();
      }else{
        $('#delCouponModal').modal('hide');
        vm.getCoupons();
        console.log('刪除失敗');
      };
      });
    },
  },
  created() {
    this.getCoupons();
  },
}
</script>