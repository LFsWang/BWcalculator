<script setup>
import { ref, computed } from 'vue';

const buyPrice = ref(339);
const globalRate = ref(1);
const userLevelRate = ref(5);
const cpLow = ref(350);
const cpEarn = ref(50);
const pointsRate = ref(40);
const pointsUseRate = ref(0.8);


const _basePoints = () => {
  return (buyPrice.value / 100).toFixed(2);
};

const _userPoints = () => {
  return (_basePoints() * (+userLevelRate.value - 1)).toFixed(2);
};

const _eventPoints = () => {
  return (_basePoints() * (+pointsRate.value - 1)).toFixed(2);
};

const EarnPointsFunc = () => {
  var total = +_basePoints() + +_userPoints() + +_eventPoints();
  return Math.floor(total * 10) / 10;
};

const oriPrice = computed(() => {
  var base = buyPrice.value;
  if (+buyPrice.value + +cpEarn.value >= +cpLow.value)
    base = +base + +cpEarn.value;
  return (base / globalRate.value).toFixed(0);
});

const basePoints = computed(() => {
  return _basePoints();
}); 
const userPoints = computed(() => {
  return _userPoints();
});
const eventPoints = computed(() => {
  return _eventPoints();
});
const earnPoints = computed(() => {
  return EarnPointsFunc();
});
const oriEarnPoints = computed(() => {
  return (EarnPointsFunc() / pointsUseRate.value).toFixed(0);
});
</script>

<template>
  <div class="container">
    <h1>BookWalker 折扣計算機</h1>
    <p class="text-danger">
      沒保證計算是對的，僅供參考。
    </p>
    <div class="row">
      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >結帳價</span>
        <input
          v-model="buyPrice"
          type="text"
          class="form-control"
        >
      </div>

      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >全館折扣</span>
        <input
          v-model="globalRate"
          type="text"
          class="form-control"
        >
      </div>

      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >全館點數倍率</span>
        <input
          v-model="pointsRate"
          type="text"
          class="form-control"
        >
      </div>
      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >會員點數倍率</span>
        <input
          v-model="userLevelRate"
          type="text"
          class="form-control"
        >
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">折價券 滿</span>
        <input
          v-model="cpLow"
          type="text"
          class="form-control"
        >
        <span class="input-group-text">減</span>
        <input
          v-model="cpEarn"
          type="text"
          class="form-control"
        >
        <span class="input-group-text">元</span>
      </div>

      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3 text-danger"
        >估計原價</span>
        <input
          v-model="oriPrice"
          type="text"
          class="form-control text-danger"
          readonly
        >
      </div>

      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >一般點數</span>
        <input
          v-model="basePoints"
          type="text"
          class="form-control"
          readonly
        >
      </div>
      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >活動加贈點數</span>
        <input
          v-model="eventPoints"
          type="text"
          class="form-control"
          readonly
        >
      </div>
      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >LV獎勵點數</span>
        <input
          v-model="userPoints"
          type="text"
          class="form-control"
          readonly
        >
      </div>

      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3 text-danger"
        >獲得點數</span>
        <input
          v-model="earnPoints"
          type="text"
          class="form-control text-danger"
          readonly
        >
      </div>
      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3"
        >點數去買幾折書</span>
        <input
          v-model="pointsUseRate"
          type="text"
          class="form-control"
        >
      </div>
      <div class="input-group">
        <span
          id="inputGroup-sizing-default"
          class="input-group-text col-3 text-danger"
        >相當於折抵原價</span>
        <input
          v-model="oriEarnPoints"
          type="text"
          class="form-control text-danger"
          readonly
        >
      </div>
    </div>
  </div>
  <hr>
  <h2>
    你用 <span class="text-danger">{{ buyPrice }}</span> 元購買價值
    {{ +oriPrice + +oriEarnPoints }} 的書，相當於
    <span class="text-danger">{{
      ((buyPrice / (+oriPrice + +oriEarnPoints)) * 100).toFixed(2)
    }}</span>
    折。
  </h2>

  <hr>
  <p>折扣：9 折寫 0.9， 85 折寫 0.85。沒打折寫 1。</p>
  <p>全館點數倍率：40 倍寫 40。沒加倍寫 1。</p>
  <p>
    會員點數倍率看自己的會員等級，田你帳號 LV 紅字的結帳金額回饋 % 數。因此最低的 LV0 倍率要寫 1，因此最高的 LV7 倍率要寫 12。
    <a
      href="https://www.bookwalker.com.tw/explanation/level"
      target="_blank"
    >BW 官網會員介紹</a>
  </p>
  <p>
    原價是推算的，使用盡所有折扣估計。比如說滿 1000 打 9 折，結帳價寫 990
    的話，會被認為是 1100 打 9 折變成 990 。而沒有考慮到真的沒有滿 1000
    這一件事。
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
