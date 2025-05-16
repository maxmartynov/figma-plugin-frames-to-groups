<template>
  <div class="about-component">
    <div class="logo-wrapper">
      <img class="logo" src="../../../img/icon.png" />
    </div>

    <h3 class="text-center" style="color: #000">Frames to Groups</h3>

    <p class="text-center">Convert Frames to Groups with a single click</p>

    <div class="text-center" style="padding-top: 18px">
      <h3>Credits</h3>

      <div style="display: inline-block; width: 49%; vertical-align: middle">
        Idea & artwork
        <br />
        <a href="https://www.protogeridis.com" target="_blank">
          Filippos Protogeridis
        </a>
      </div>

      <div style="display: inline-block; width: 49%; vertical-align: middle">
        Developer
        <br />
        <a href="https://maxmartynov.com/" target="_blank"> Max Martynov </a>
      </div>
    </div>

    <div class="text-center" style="padding-top: 18px">
      <h3>Support</h3>

      <div>
        Plugin creation fueled by coffee
        <br />
        <a
          href="https://github.com/maxmartynov/figma-plugin-frames-to-groups#support"
          target="_blank"
        >
          Buy me a cuppa ☕
        </a>
      </div>
      <br />
      <div>
        Do you have an idea or found a bug?
        <br />
        <a :href="supportLink" target="_blank"> Let me know </a>
      </div>
    </div>

    <div class="footer">
      <a
        href="#settings"
        @click.prevent="openSettings()"
        style="
          display: inline-block;
          width: 49%;
          padding-left: 5px;
          box-sizing: border-box;
        "
      >
        Settings
      </a>

      <span class="version" style="width: 49%">v{{ version }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import packageJSON from '../../../package.json'

export default Vue.extend({
  name: 'AboutComponent',
  data() {
    return {
      version: packageJSON.version,
      supportLink: packageJSON.bugs.url,
    }
  },
  methods: {
    openSettings() {
      this.$emit('view:settings')
    },
  },
})
</script>

<style>
.about-component {
  text-align: left;
  display: inline-block;
  padding: 12px 16px;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.about-component .logo-wrapper {
  text-align: center;
}
.about-component .logo-wrapper .logo {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 15px 0;
}

.about-component .footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--footer-height);
  z-index: 7;
  box-sizing: border-box;
  padding: 0 5px;
}
.about-component .footer .version {
  display: inline-block;
  font-weight: 500;
  font-size: 10px;
  line-height: var(--footer-height);
  text-align: right;
}
</style>
