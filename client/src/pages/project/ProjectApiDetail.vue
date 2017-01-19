<style lang="stylus">
  .page-project-api-detail{
    .method-label{
      width: 100px;
    }
    .api-is-enable{
      margin-top: 8.5px;
    }
  }
</style>
<template>
  <div class="page-project-api-detail">
    <sm-segment type="stacked">
      <h3> Api Detail
        <button type="button" class="ui button float-right" @click="$router.push(pathForApiList)"><i class="reply icon"></i>Return API List</button>
        <button type="button" class="ui green button float-right" @click="gotoEdit()"><i class="pencil icon"></i>Edit API</button>
      </h3>
      <div class="ui secondary pointing menu">
        <a class="item active"> General </a>
      </div>
      <form class="ui small form">
        <div class="inline field">
          <label>Group Name:</label> {{groupName}}
        </div>
        <div class="inline field">
          <label>Api Name:</label>
          <div class="ui label">
            {{api.name}}
          </div>
        </div>
        <div class="inline field">
          <label>Api Method:</label>
          <div class="ui label">
            {{ api.method }}
          </div>
        </div>
        <div class="inline field">
          <label>Api URL:</label> {{finalAddress}}
        </div>
        <div class="inline field">
          <label>Response Status:</label> {{api.res.status}}
        </div>
        <div class="inline field">
          <label>Response Content Type:</label> {{api.res.contentType}}
        </div>
        <div class="ui secondary pointing menu">
          <a class="item active"> Response Headers </a>
        </div>
        <div class="field">
          <table class="ui celled very compact table">
            <tbody>
              <tr v-for="h in api.res.headers">
                <td class="collapsing">{{h.key}}</td>
                <td>{{h.value}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ui secondary pointing menu">
          <a class="item active"> Response Body </a>
        </div>
        <div class="field">
          <ace-editor v-model="api.res.body" :readonly="true" :mode="editorMode" :theme="'ambiance'"></ace-editor>
        </div>
        <div class="ui secondary pointing menu">
          <a class="item active"> Other </a>
        </div>
        <div class="inline field">
          <label>Is Enable:</label>
          <sm-checkbox class="api-is-enable" :disabled="true" v-model="api.isEnable">Enable</sm-checkbox>
        </div>
        <div class="inline field">
          <label>Second Proxy:</label>
          <sm-checkbox class="api-is-enable" :disabled="true" v-model="api.enableProxy">Enable</sm-checkbox>
        </div>
        <div class="inline field" v-if="api.enableProxy">
          <label>Second Proxy URL:</label> {{api.proxyUrl}}
        </div>
      </form>
    </sm-segment>
  </div>
</template>
<script src="./ProjectApiDetail.controller.js"></script>
