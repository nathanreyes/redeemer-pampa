<template>
<div class='absolute w-full h-full pointer-events-none'>
  <div class='bg bg-img relative'>
    <div class='absolute w-full h-full flex justify-center items-center'>
      <div class='bg-rect-3 bg-grey-lightest flex-grow m-10'></div>
    </div>
    <div class='absolute w-full h-full'>
      <div class='bg-rect-2 bg-blue-darker'></div>
      <div class='bg-rect-1'></div>
    </div>
  </div>
</div>
</template>

<style scoped>
.bg {
  width: 100%;
  height: 500px;
  z-index: -1;
}
.bg-rect-1 {
  position: fixed;
  background-color: #1d89e2;
  border: 2px solid #327ab4;
  width: 1000px;
  height: 1000px;
  transform: translateX(-50%) translateY(-25%) rotateZ(45deg);
  z-index: 0;
}
.bg-rect-2 {
  position: fixed;
  width: 1000px;
  height: 1000px;
  transform: translateX(-40%) translateY(-50%) rotateZ(-80deg);
}
.bg-rect-3 {
  height: 80%;
  border-radius: 10px;
  opacity: 0.8;
}
.bg-img {
  background: url('https://res.cloudinary.com/dqgcfqzpk/image/upload/a_hflip,c_fill,w_1200,x_500,y_80/a_0/v1531280333/redeemer-pampa/hero.jpg');
  background-size: cover;
  background-attachment: scroll;
  background-repeat: no-repeat;
  /* background-position: 140px -120px; */
}
</style>