<template>
  <div>
    <frontNav></frontNav>
    <router-view></router-view>
    <frontFooter></frontFooter>
  </div>
</template>

<script>
import frontNav from './frontNav';
import frontFooter from './frontFooter';

export default {
    components:{
       frontFooter,
       frontNav,
    },
}
</script>