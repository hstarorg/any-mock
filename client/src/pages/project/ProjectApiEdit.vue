<style lang="stylus">
  .page-project-api-edit{
    .method-label{
      width: 100px;
    }
  }
</style>
<template>
  <div class="page-project-api-edit">
    <sm-segment type="stacked">
      <h3>Create New Api <button type="button" class="ui button float-right" @click="$router.push(pathForApiList)"><i class="reply icon"></i>Return API List</button></h3>
      <form class="ui small form" @submit.prevent="doSubmit()">
        <div class="field">
          <label>API Name</label>
          <input type="text" name="name" v-model="api.name">
        </div>
        <div class="field">
          <label>API Path</label>
          <div class="ui labeled left action input">
            <div class="ui green dropdown simple label method-label">
              <div class="text">{{api.method}}</div>
              <i class="dropdown icon"></i>
              <div class="menu">
                <div class="item" v-for="m in methods" @click="api.method = m">{{m}}</div>
              </div>
            </div>
            <div class="ui label no-radius">
              http://chat.hstar.org:8601/e2607fcaf7fe
            </div>
            <input type="text" placeholder="">
          </div>
          <br>
          <div class="ui message">Final Address: </div>
        </div>
        <div class="field">
          <label>Response Headers</label>
          <sm-segment>
            <div class="fields small" v-for="header in api.res.headers">
              <div class="six wide field">
                <input type="text" name="headerKey" maxlength="16" placeholder="key" v-model="header.key">
              </div>
              <div class="six wide field">
                <input type="text" name="headerValue" maxlength="3" placeholder="value" v-model="header.value">
              </div>
              <div class="four wide field">
                <button type="button" class="ui icon button" @click="removeResHeader(header)"><i class="minus icon"></i></button>
              </div>
            </div>
            <div class="fields small">
              <div class="twelve wide field">
              </div>
              <div class="four wide field">
                <button type="button" class="ui icon button" @click="addResHeader()"><i class="plus icon"></i></button>
              </div>
            </div>
          </sm-segment>
        </div>
        <div class="two fields">
          <div class="field">
            <label>Response Status</label>
            <select name="status" v-model="api.res.status">
              <option v-for="status in statusList" :value="status.value" >{{status.name}}</option>
            </select>
          </div>
          <div class="field">
            <label>Content-Type</label>
            <div class="ui left action input">
              <div class="ui floating dropdown simple green button">
                <div class="text">Choose</div>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <div class="item" v-for="con in contentTypeList">{{con}}</div>
                  <div class="divider"></div>
                  <div class="item" @click="disabledContentType = false">Custom</div>
                </div>
              </div>
              <input type="text" v-model="api.res.contentType" disabled="disabledContentType">
            </div>
          </div>
        </div>
        <div class="field">
          <label>Response Body</label>
          <ace-editor v-model="api.res.body" :mode="'json'" :theme="'ambiance'"></ace-editor>
        </div>
        <div class="ui buttons">
          <button class="ui button" @click.prevent="$router.push(pathForApiList)">Cancel</button>
          <div class="or"></div>
          <button class="ui positive button">Save API</button>
        </div>
      </form>
    </sm-segment>
  </div>
</template>
<script src="./ProjectApiEdit.controller.js"></script>
