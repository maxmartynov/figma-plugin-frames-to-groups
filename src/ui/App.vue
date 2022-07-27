<template>
  <div class="app">
    <component
      v-if="contentComponent"
      :is="contentComponent"
      :settings="settings"
      @save:settings="onSaveSettings"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {PluginEvent} from '../types/PluginEvent'
import AboutComponent from './components/About.component.vue'
import SettingsComponent from './components/Settings.component.vue'
import {SettingsMap} from '../types/SettingsMap'

const postMessage = (event: PluginEvent) =>
  parent.postMessage({pluginMessage: event}, '*')

export default Vue.extend({
  name: 'App',
  components: {
    AboutComponent,
    SettingsComponent,
  },
  data(): {
    contentComponent?: Vue
    settings: SettingsMap | null
  } {
    return {
      contentComponent: null,
      settings: null,
    }
  },
  created(): void {
    window.onmessage = (windowEvent: MessageEvent): void => {
      const event: PluginEvent = windowEvent.data.pluginMessage

      switch (event.type) {
        case 'view:settings': {
          this.contentComponent = SettingsComponent
          this.settings = event.settings || {}
          break
        }
        case 'view:about': {
          this.contentComponent = AboutComponent
          break
        }
      }
    }
  },
  methods: {
    onSaveSettings(settings: SettingsMap) {
      postMessage({
        type: 'save:settings',
        settings,
      })
      postMessage({
        type: 'message',
        text: `Saved. File key: ${this.fileId}`,
      })
      this.close()
    },
    close() {
      postMessage({type: 'cancel'})
    },
  },
})
</script>

<style>
:root {
  --clr-primary: rgb(27, 27, 27);
  --clr-primary-darken1: #000000;
  --clr-primary-lighten1: #787878;
  --clr-primary-lighten2: #afafaf;
  --clr-primary-lighten3: #d4d4d4;
  --clr-primary-lighten4: #f1f1f1;
  --clr-primary-lighten5: #f8f8f8;
  --clr-secondary: #18a0fb;
  --clr-accent: #3aacfb;
  --clr-accent-darken1: #1794e7;
  --clr-accent-lighten2: #dce3e9;
  --clr-accent-secondary: #dc78a5;
  --clr-accent-secondary-darken1: #ad2863;

  --footer-height: 20px;
}

html,
body,
.app {
  height: 100%;
}

body {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--clr-primary-lighten1);
  font-size: 12px;
  line-height: 1.4em;
  margin: 0;
}

a {
  cursor: pointer;
  color: var(--clr-accent);
}
a:hover {
  color: var(--clr-accent-darken1);
  text-decoration: underline;
}

p {
  margin: 0;
  color: var(--clr-primary-lighten1);
}

.text-small {
  font-size: 0.84em;
  line-height: 1.4em;
}

.text-center {
  text-align: center;
}
</style>
