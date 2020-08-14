import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/components/dashboard';
import Front from '@/components/front';

import Login from '@/components/pages/back/Login';
import Products from '@/components/pages/back/products';
import Coupon from '@/components/pages/back/coupon';
import OrderList from '@/components/pages/back/OrderList';


import Home from '@/components/pages/front/home';
import ProductList from '@/components/pages/front/productList';
import About from '@/components/pages/front/about';
import Item from '@/components/pages/front/item';
import CustomerOrder from '@/components/pages/front/customerOrder';
import Cart from '@/components/pages/front/cart';
import OrderDone from '@/components/pages/front/OrderDone';

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'*',
            redirect:'login',
        },
        // {
        //     name:'首頁',
        //     path:'/',
        //     component:Home,
        //     meta: { requiresAuth: true },
        // },
        {
            name:'Front',
            path:'/',
            component:Front,
            children:[
                {
                    name:'home',
                    path:'',
                    component:Home,
                },
                {
                    name:'販賣商品頁',
                    path:'product_list',
                    component:ProductList,
                },
                {
                    name:'about',
                    path:'about',
                    component:About,
                },
                {
                    name:'item',
                    path:'item/:itemId',
                    component:Item,
                },
                {
                    name:'customerOrder',
                    path:'customer_order',
                    component:CustomerOrder,
                },
                {
                    name:'cart',
                    path:'cart',
                    component:Cart,
                },
                {
                    name:'OrderDone',
                    path:'order_done/:orderId',
                    component:OrderDone,
                },
            ],
        },
        {
            name:'登入',
            path:'/login',
            component:Login,
        },
        {
            name:'dashboard',
            path:'/admin',
            component:Dashboard,
            children:[
                {
                    name:'Products',
                    path:'products',
                    component:Products,
                    meta: { requiresAuth: true },
                },
                {
                    name:'OrderList',
                    path:'orderList',
                    component:OrderList,
                    meta: { requiresAuth: true },
                },
                {
                    name:'Coupon',
                    path:'coupon',
                    component:Coupon,
                    meta: { requiresAuth: true },
                },
            ],
        },
        
    ]
});