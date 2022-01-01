# vue-tooltip-directive
[![https://img.shields.io/npm/v/vue-tooltip-directive](https://img.shields.io/npm/v/vue-tooltip-directive)](https://www.npmjs.com/package/vue-tooltip-directive)

A Vue 2 plugin that provides a custom directive allowing the usage of any tooltip component as a directive.

Currently built for Vuetify and depends on usage of their components' `activator` functionality, however I'm sure this could be adapted to handle others.

## Usage

1. Install the npm dependency:  
```npm install --save vue-tooltip-directive```
2. Create new or adapt a current component to handle displaying the tooltip, Vuetify example:
```vue
<template>
  <v-tooltip
    :top="position === 'top'"
    :right="position === 'right'"
    :bottom="position === 'bottom'"
    :left="position === 'left'"
    :activator="activator"
  >
    <span>{{ content }}</span>
  </v-tooltip>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MyCustomTooltip',
  props: {
    activator: { required: true },
    content: { type: String, required: false },
    position: { type: String, required: false }
  }
})
</script>
```
3. Include the plugin into your Vue app by adding a `Vue.use(..)` in the root file of your Vue project (usually `main.js/main.ts`), making sure to pass your custom tooltip component as the component key in the config object:
```typescript
import Vue from 'vue'
import VueTooltipDirective from 'vue-tooltip-directive'
import MyCustomTooltip from '@/components/MyCustomTooltip.vue'

Vue.use(VueTooltipDirective, {
  component: MyCustomTooltip
})
```
4. You should now be able to use the directive in your project on any display component:
```vue
<span v-tooltip="'A cool and helpful tooltip!'">
  Hover me!
</span>
```

## Configuration
The directive binding can be used in a few different ways:
- ```v-tooltip="'Basic explanatory tooltip'"```
- ```v-tooltip:left="'Left aligned tooltip'"```
- ```v-tooltip:[variable]="'Dynamically positioned tooltip'"```
- ```v-tooltip="{ content: 'Config object tooltip', position: 'right', anyExtraProps: 'here!' }"```

If no position is provided either via the directive argument or in the config object, it will default to `top`.  
Any extra values provided in the config object will also be passed to your custom component as props.

### Config options
| Field    | Values                                   |
|----------|------------------------------------------|
| content  | string                                   |
| position | `'top' \| 'right' \| 'bottom' \| 'left'` |

## Contributing
All contributions are welcome via PR.  
This is a hobby project and as such may feature bugs or performance issues, and you are welcome to help me diagnose or fix these.