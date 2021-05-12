<template>
  <div class="video-container">
    <video
      data-object-fit="true"
      id="video_first_3"
      class="video-my"
      data-autoplay="true"
      muted
      loop
      autoplay
      src="../assets/miui.mp4"
      type="video/mp4">
      抱歉，你的浏览器不支持内嵌视频
    </video>
  </div>
</template>

<script>
export default {
  name: "BackgroudVideo",
  data: function() {
    return {
      bgs: {
        kuaiVideo: '//static.yximgs.com/udata/pkg/fe/kwai_video.a7616d99.mp4',
        littleBookVideo: 'https://dc.xhscdn.com/9379abe0-7ad8-11e9-8794-9320f6c9d557/%E8%83%8C%E6%99%AF%E8%A7%86%E9%A2%91.mp4',
        miuiVideo: '../assets/miui.mp4'
      }
    }
  }
};
</script>

<style scoped>
.video-container{
    position: absolute;
    z-index: -1;
    padding: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
.video-my{
    position: absolute;
    width:100%;
    height: 100%;
    object-fit: cover;
    left: 0;
    top:0;
}
</style>