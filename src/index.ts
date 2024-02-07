import { v4 as uuid } from 'uuid'
import { CustomDirectiveBinding, DirectiveConfig, PluginConfig, TooltipPosition, VueInstance } from './types'
import defaultPluginConfig from './utils/defaultConfig'

const instanceCache: { [componentId: string]: VueInstance } = {}

function getBindingContent (binding: CustomDirectiveBinding): string | undefined {
  return typeof binding.value === 'object' ? binding.value.content : binding.value
}

function createTooltip (Vue: any, TooltipComponent: any, el: HTMLElement, binding: CustomDirectiveBinding): VueInstance {
  const content = getBindingContent(binding)
  const config: Partial<DirectiveConfig> = typeof binding.value === 'object' ? binding.value : {}
  const attachPosition: TooltipPosition | undefined = binding.arg ?? config.position

  if (!content) {
    // console.debug('Ignoring call to createTooltip with no content in binding.')
    return
  }

  const instance = new TooltipComponent({
    propsData: {
      position: attachPosition,
      ...config,
      content,
      activator: el
    }
  })
  instance.$mount()

  const componentId = uuid()
  el.dataset.tooltipId = componentId
  instanceCache[componentId] = instance
  return instance
}


export default {
  install (Vue: any, options: PluginConfig = defaultPluginConfig) {
    const component = options.component
    const TooltipComponent = Vue.extend(component)

    Vue.directive('tooltip', {
      inserted (el: HTMLElement, binding: CustomDirectiveBinding) {
        createTooltip(Vue, TooltipComponent, el, binding)
      },
      componentUpdated (el: HTMLElement, binding: CustomDirectiveBinding) {
        const componentId = el.dataset.tooltipId as string

        if (!instanceCache[componentId]) {
          // If el is missing from cache it was probably ignored in the inserted call due to null content, so we'll create it now.
          createTooltip(Vue, TooltipComponent, el, binding)
          return
        }
        const content = getBindingContent(binding)
        const config: Partial<DirectiveConfig> = typeof binding.value === 'object' ? binding.value : {}
        const attachPosition: TooltipPosition | undefined = binding.arg ?? config.position
        if (instanceCache[componentId].content !== content) {
          instanceCache[componentId].content = content
        }
        if (instanceCache[componentId].position !== attachPosition) {
          instanceCache[componentId].position = attachPosition
        }
      },
      unbind (el: HTMLElement) {
        const componentId = el.dataset.tooltipId as string

        if (!instanceCache[componentId]) {
          // Probably not an error as the tooltip may have just never been inserted due to null content.
          // console.warn('Failed to unbind tooltip due to element missing from cache.')
          return
        }
        instanceCache[componentId].$destroy(true)
        instanceCache[componentId] = undefined
      }
    })
  }
}
