import { Directive, type DirectiveBinding } from 'vue'

export const focus: Directive = {
  mounted(el: HTMLElement, bingding: DirectiveBinding) {
    return el.focus()
  }
}
