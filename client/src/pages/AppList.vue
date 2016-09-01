<style>

</style>

<template>
  <div class="app-app-list">
    <div class="panel panel-info">
      <!-- Default panel contents -->
      <div class="panel-heading">我的应用列表</div>
      <table class="table table-striped table-bordered table-hover">
        <tr>
          <th>应用名称</th>
          <th>应用ID</th>
          <th>操作</th>
        </tr>
        <tr v-for="a in arr">
          <td>AFDAFDAS</td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div class="panel-footer">
        <button class="btn btn-sm btn-danger"><i class="fa fa-plus"></i> 添加APP</button>
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-primary">1</button>
          <button type="button" class="btn btn-default">2</button>
          <button type="button" class="btn btn-default">3</button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        arr: [1,2,3,4,5]
      };
    }
  };
</script>