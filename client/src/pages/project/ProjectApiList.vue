<style lang="stylus">
  .page-project-api-list{
    .btn-add-api{
      position: absolute;
      right: 5px;
    }
  }
</style>
<template>
  <div class="page-project-api-list">
    <div class="ui secondary pointing menu">
      <a class="item active"> API List </a>
      <button class="ui icon button green btn-add-api" @click.prevent="$router.push(pathForCreateApi)">
        <i class="plus icon"></i>Add Api
      </button>
    </div>
    <table class="ui sortable celled striped selectable black compact table">
      <thead>
        <tr>
          <th class="collapsing sorted descending"><i class="heartbeat icon"></i></th>
          <th>Name</th>
          <th>Method</th>
          <th>Path</th>
          <th>Is Enable</th>
          <th>Enable Proxy</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>fdasf</td>
          <td>fdasfas</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="collapsing align center">
            <div class="ui right pointing dropdown" tabindex="0">
              <div class="basic compact blue ui icon button">
                <i class="wrench icon"></i>
              </div>
              <div class="menu transition hidden" tabindex="-1">
                <a class="item"><i  class="green refresh icon"></i> Restart</a>
                <a class="item"><i  class="black stop icon"></i> Stop</a>
                <a class="item">
                  <i class="line chart icon"></i> Monitor
                </a>
                <a class="item">
                  <i class="text file outline icon"></i> Logs
                </a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script src="./ProjectApiList.controller.js"></script>
