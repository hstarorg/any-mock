<style lang="stylus">
  .page-layout{
    .title-item{
      width: 180px !important;
      cursor: pointer;

    }
    .navbar-label{
      color: rgba(255, 255, 255, .2) !important;
      border-top: 1px solid rgba(255, 255, 255, .15) !important;
      height: 40px !important;
    }
    .userinfo{
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      img{
        height: 36px;
        width: 36px;
        border-radius: 50%;
      }
    }
    .left-navbar{
      width: 180px !important;
      top: 40px !important;
    }
  }
</style>
<template>
  <div class="page-layout">
    <div class="ui inverted menu fixed">
      <div class="header item title-item"><i class="cubes icon"></i>ANY MOCK</div>
      <div class="active item">Home</div>
      <div class="ui simple dropdown item">
        Dropdown
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item">Action</div>
          <div class="item">Another Action</div>
          <div class="item">Something else here</div>
          <div class="divider"></div>
          <div class="item">Separated Link</div>
          <div class="divider"></div>
          <div class="item">One more separated link</div>
        </div>
      </div>
      <div class="right menu">
        <div class="item">
          <div class="ui transparent inverted icon input">
            <i class="search icon"></i>
            <input type="text" placeholder="Search">
          </div>
        </div>
        <a class="item">Feedback</a>
        <div class="ui simple dropdown item userinfo">
          <img alt="User Profile Picture" class="dojo-user-picture" src="https://avatars2.githubusercontent.com/u/4043284?v=3">
          Jay.M.Hu
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item">Sign out</a>
          </div>
        </div>
      </div>
    </div>
    <div class="ui visible inverted left vertical sidebar menu left-navbar">
      <!--<div class="ui icon input">
        <input type="text" placeholder="Search...">
        <i class="search icon"></i>
      </div>-->
      <div class="item header navbar-label">
        MAIN NAVIGATION
      </div>
      <div class="ui inverted">
        <a class="item menu">
          <i class="dashboard icon"></i>
          <span>Dashboard</span>
        </a>
        <a class="item menu active">
          <i class="object group icon"></i>
          <span>Teams</span>
        </a>
        <a class="item menu">
          <i class="cubes icon"></i>
          <span>Projects</span>
        </a>
        <a class="item menu">
          <i class="cogs icon"></i>
          <span>Settings</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script src="./LayoutPage.controller.js"></script>
