<style lang="stylus">
  .page-about{
    padding-top: 5px;
    .info-title{
      justify-content: center;
    }
    img{
      width: 100%;
    }
    .project-about{
      p{
        text-indent: 30px;
      }
    }
  }
</style>
<template>
  <div class="page-about">
    <div class="ui container">
      <div class="ui secondary pointing menu info-title">
        <a class="item active"> 关于本项目 </a>
      </div>
      <div class="ui grid project-about">
        <div class="sixteen wide column">
          <p>
            本项目Web前端基于 <a href="https://vuejs.org/" target="_black">Vue2</a>, <a href="http://semantic-ui.com/" target="_black">Semantic-UI</a> 构建，后端API使用 Node + Rest-Express 进行构建。
          </p>
          <p>该项目主要用于前后端分离开发模式时，先行模拟后端API的响应。以达到不阻塞前端开发的目的，同时后端也可以按照该响应，进行对应的API实现。</p>
        </div>
      </div>
      <div class="ui secondary pointing menu info-title">
        <a class="item active"> 如果您觉得有帮助，可以捐赠我，将用于持续维护和提升服务器配置 </a>
      </div>
      <div class="ui grid">
        <div class="three wide column"></div>
        <div class="four wide column">
          <img src="../../assets/alipay.jpg" alt="">
        </div>
        <div class="two wide column"></div>
        <div class="four wide column">
          <img src="../../assets/wechat.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
