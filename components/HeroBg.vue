<template>
<div class='absolute w-full h-full pointer-events-none'>
  <div class='bg bg-img relative'>
    <div class='bg-shapes absolute w-full h-full'>
      <div class='bg-rect-2 bg-blue-darker fixed'></div>
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
  transform-origin: 50% 50%;
  transform: translateX(-50%) translateY(-40%) rotateZ(70deg);
  z-index: 0;
}
.bg-rect-2 {
  width: 1000px;
  height: 1000px;
  transform: translateX(-40%) translateY(-50%) rotateZ(-80deg);
}
.bg-img {
  background: url('https://res.cloudinary.com/dqgcfqzpk/image/upload/a_hflip,c_fill,w_1200,x_500,y_80/a_0/v1531280333/redeemer-pampa/hero.jpg');
  background-size: cover;
  background-attachment: scroll;
  background-repeat: no-repeat;
  /* background-position: 140px -120px; */
}
.bg-shapes {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>