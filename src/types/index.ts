import { Component } from 'vue/types'
import { DirectiveBinding } from 'vue/types/options'
import { CombinedVueInstance } from 'vue/types/vue'

export enum TooltipPosition {
  Top = 'top',
  right = 'right',
  bottom = 'bottom',
  Left = 'left',
}

export interface PluginConfig {
  component: Component
}

export type VueInstance = CombinedVueInstance<any, any, any, any, any>

export interface DirectiveConfig {
  content: string
  position?: TooltipPosition
}

export interface CustomDirectiveBinding extends DirectiveBinding {
  value: string | DirectiveConfig
  arg?: TooltipPosition
}