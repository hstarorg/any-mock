<style lang="stylus">
  .sm-card{
  }
</style>
<template>
  <div class="sm-card ui card">
    <div class="image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="content">
      <a class="header">
        <template v-if="!$slots.header">
          {{header}}
        </template>
        <slot name="header"></slot>
      </a>
      <div class="meta" v-if="$slots.meta">
        <slot name="meta"></slot>
      </div>
      <div class="description">
        <slot></slot>
      </div>
    </div>
    <div class="extra content" v-if="$slots.extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script src="./sm-card.controller.js"></script>
