<template>
  <div>
  <div class="all-html">
  <Loading :active.sync="isLoading"></Loading>
     <div class="jumbotron jumbotron-padding jumbotron-fluid bg-pro-image d-flex align-items-end mb-0">
      </div>


    <div class="container-fluid py-5 text-white fade-type" style="position:relative">
    <div class="row">
      <div class="col-md-5 bg-cover"
           style="position: absolute; top: 0; bottom: 0;
           background-image: url(https://upload.cc/i1/2020/07/07/4tBHKY.jpg);">
      </div>
      <div class="container">
        <div class="row justify-content-end text-md-dark">
           <div class="col-md-7 ">
              <div class="h1">我們的故事</div>
              <p>魔術的世界千變萬幻，在剛開始踏入這個領域時，必定會被五花八門的戲法驚得不知如何學起。Magic Store 身為全台最大的魔術商店，專營道具研發與製造。我們的夥伴們以自身學習魔術以及多年表演的經歷，知道好的道具能讓學習效果加倍，
              讓表演更絢麗奪目，因此我們販賣的產品，必定是夥伴們親自試玩過，具有優良品質且絕對安全的魔術道具。</p>
              <p>在Magic Store 買到的商品，都附有完整的影片教學，手把手教你如何玩魔術！不再有不知道如何使用的問題，
              帶你一步步邁向魔術大師之路。</p>
              <p>快和 Magic Store 的夥伴們一起踏進魔術的世界吧！</p>
              <div class="col-md-12 pl-0">
                <router-link class="btn btn-outline-secondary btn-sm mt-3" to="/product_list">
                  <i class="fas fa-arrow-left"></i> 回到商品列表
                </router-link>
            </div>
           </div>
        </div>
      </div>
    </div>
  </div>
  </div>

  <section>
    <div class="container mt-5">
      <div class="row about-items">
        <div class="col-md-4 pr-2">
          <div class="h4"><i class="fa fa-thumbs-up" aria-hidden="true"></i> 安全</div>
          <div class="h5 mb-3">用心為消費者把關</div>
          <p>Magic Store 魔術道具都經過嚴格檢驗，在安全上絕對禁得起考驗，比起來路不明的道具使用上更讓人安心。
          </p>
        </div>
        <div class="col-md-4">
          <div class="h4"><i class="fa fa-heart" aria-hidden="true"></i> 高品質</div>
          <div class="h5 mb-3">嚴格挑選道具</div>
          <p>為了讓商品符合實用、耐用、好用的【三用原則】，我們團隊在品質上絕不馬虎，在消費者收到商品後，一定能感受到我們的用心。</p>
        </div>
        <div class="col-md-4">
          <div class="h4"><i class="fa fa-play" aria-hidden="true"></i> 影片教學</div>
          <div class="h5 mb-3">淺顯易懂的影片帶你上手</div>
          <p>我們每項道具，都附有由專業魔術師拍攝的教學影片，讓你脫離不會使用道具的窘境，也能學習職業魔術師們的手法，
          輕鬆學會魔術。</p>
        </div>
      </div>
    </div>
  </section>

  <section class="partner mb-5 mt-5">
   <div class="container text-center">
     <div class="h1 text-center mb-5">夥伴們</div>
     <div class="row">
      <div class="col-md-4">
        <div class="card border-0">
          <img src="https://randomuser.me/api/portraits/men/9.jpg" class="card-img-top justify-content-center" alt="">
          <div class="card-body">
            <h3 class="card-title">Jose Aldo</h3>
            <div class="h5">共同創辦人</div>
            <p class="card-text">曾是加州魔術大賽首獎、賭城 OCT Bar 鎮店魔術師。秉持著對魔術的熱愛，投入魔術道具研發，並親自拍攝部分教學影片。</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0">
          <img src="https://randomuser.me/api/portraits/men/40.jpg" class="card-img-top justify-content-center" alt="">
          <div class="card-body">
            <h3 class="card-title">Kahbid Nurmagomedov</h3>
            <div class="h5">魔術師</div>
            <p class="card-text">曾任魔術協會理事長，從高中時便已經開始魔術表演。</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0">
          <img src="https://randomuser.me/api/portraits/men/3.jpg" class="card-img-top justify-content-center" alt="">
          <div class="card-body">
            <h3 class="card-title">Nate Diaz</h3>
            <div class="h5">魔術師</div>
            <p class="card-text">從事魔術教學長達15年，擅長以幽默有趣的教學方式引到學生進入魔術的世界。為了幫助更多魔術初心者，和創辦人一起投入道具研發。</p>
          </div>
        </div>
      </div>
     </div>
   </div>
  </section>

  <section class="bg-light py-5 map-item">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.761851330043!2d121.55029452347972!3d25.042154793356275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc5aec33c8b%3A0x90aa29a7d4fb5ad0!2zMTA25Y-w5YyX5biC5aSn5a6J5Y2A5b-g5a2d5p2x6Lev5Zub5q61MTgx5be3N-W8hGE06Jmf!5e0!3m2!1szh-TW!2stw!4v1594632005570!5m2!1szh-TW!2stw" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
        <div class="col-md-6">
          <div class="h1 mb-5">聯絡我們</div>
          <ul>
            <li><i class="fa fa-phone" aria-hidden="true"></i> 連絡電話：0912-345678</li>
            <li><i class="fa fa-map-marker" aria-hidden="true"></i> 地址：台北市忠孝東路四段</li>
            <li><i class="fa fa-envelope" aria-hidden="true"></i> 信箱：gggggggg@gmail.com</li>
            <li><i class="fa fa-user" aria-hidden="true"></i> 聯絡人：居先生</li>
            <li><i class="fa fa-id-card" aria-hidden="true"></i> 客服時間：11：00 ~ 18：00 週六日公休</li>
          </ul>
        </div>
      </div>
    </div>
  </section>



  </div>
</template> 

<script>
import $ from 'jquery';

export default{
  data(){
    return{
      isLoading:false,
    };
  },
}