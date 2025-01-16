<template>
  <div class="settings-component">
    <h2 style="color: #444; margin-top: 0">Settings</h2>

    <!-- <p class="input-group">
      <label for="emptyFrames">Empty Frames:</label>
      <select
        id="emptyFrames"
        v-model="settings.emptyFrames"
        @change="onChange()"
      >
        <option
          v-for="value of EmptyFramesActions"
          :key="value"
          v-text="value"
        ></option>
      </select>
    </p> -->

    <p class="input-group">
      <label for="rootFrame">Root selected Frame:</label>
      <select id="rootFrame" v-model="settings.rootFrame" @change="onChange()">
        <option
          v-for="(label, id) of RootFrameActions"
          :key="id"
          :value="id"
          v-text="label"
        ></option>
      </select>
    </p>

    <p class="input-group">
      <label for="convertInnerFrames">Inner Frames:</label>
      <select
        id="convertInnerFrames"
        v-model="settings.convertInnerFrames"
        @change="onChange()"
      >
        <option
          v-for="(label, id) of ConvertInnerFramesActions"
          :key="id"
          :value="id"
          v-text="label"
        ></option>
      </select>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  EmptyFramesActions,
  RootFrameActions,
  SettingsMap,
  YesNo,
} from '../../types/SettingsMap'

export default Vue.extend({
  name: 'SettingsComponent',
  props: {
    settings: {
      type: Object as () => SettingsMap,
      required: true,
    },
  },
  data() {
    return {
      errorMsg: '',
      EmptyFramesActions: {
        [EmptyFramesActions.remove]: 'Remove (default)',
        [EmptyFramesActions.turnIntoRectangle]: 'Turn into rectangle',
      },
      RootFrameActions: {
        [RootFrameActions.leaveFrame]: 'Leave as Frame (default)',
        [RootFrameActions.turnIntoGroup]: 'Turn into Group',
      },
      ConvertInnerFramesActions: {
        [YesNo.yes]: 'Turn into Groups (default)',
        [YesNo.no]: 'Leave as Frames',
      },
    }
  },
  methods: {
    toggleInfo(): void {
      this.isInfoOpen = !this.isInfoOpen
    },
    onChange(): void {
      this.$emit('save:settings', this.settings as SettingsMap)
    },
  },
})
</script>

<style>
.settings-component {
  text-align: left;
  display: inline-block;
  padding: 12px 16px;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.input-group {
  text-align: left;
  margin-top: 1em;
}
.input-group label {
  float: left;
  font-size: 1em;
  line-height: 1em;
}
.input-group input,
.input-group select {
  outline: none;
  border: 1px solid var(--clr-primary-lighten3);
  border-radius: 0;
  padding: 5px 12px;
  margin-top: 2px;
  width: 100%;
  height: 33px;
  font-size: 1em;
  color: var(--clr-primary-darken1);
  background: none;
}
.input-group input::placeholder {
  color: var(--clr-primary-lighten1);
}
.input-group input:hover {
  border-color: var(--clr-primary-lighten2);
}
.input-group input:focus {
  border-color: var(--clr-accent);
  box-shadow: inset 0 0 0 1px var(--clr-accent);
}
.input-group input.error {
  border-color: var(--clr-accent-secondary);
}
.input-group .error-hint {
  display: block;
  color: var(--clr-accent-secondary-darken1);
  font-size: 0.85em;
  line-height: 1.3em;
  padding: 0;
  height: 0px;
  overflow: visible;
  text-align: right;
}
.info-block {
  transition: right 0.2s;
  position: fixed;
  right: -100%;
  left: auto;
  top: 10px;
  bottom: auto;
  width: 100%;
  height: calc(100% - var(--footer-height));
  box-sizing: border-box;
  margin: auto 0;
  background: #fff;
  z-index: 5;
  padding: 0 16px;
}
.info-block.open {
  right: 0;
}
.info-block .text {
  overflow: hidden;
}
.info-block .text b {
  font-weight: normal;
  color: #000;
}
.info-block .img-wrapper {
  margin: 16px -16px 0;
  padding: 16px;
  background: #eff1f5;
  text-align: center;
}
.info-block .img-wrapper img {
  display: inline-block;
  width: 100%;
  position: relative;
}
.buttons-block {
  width: 100%;
}
.buttons-block button {
  display: inline-block;
  background: var(--clr-secondary);
  color: #fff;
  border: none;
  border-radius: 0;
  font-size: 1em;
  padding: 8px;
  width: 96px;
  height: 33px;
  margin: 16px 0;
  outline: none;
  cursor: pointer;
  letter-spacing: 0.1px;
}
.buttons-block button:hover {
  background: var(--clr-accent);
}
.buttons-block button:focus {
  box-shadow: 0 0 0 1px var(--clr-primary-lighten1);
  background: var(--clr-accent);
}
.buttons-block button[disabled='disabled'] {
  opacity: 0.5;
  cursor: auto;
  pointer-events: none;
}
</style>
