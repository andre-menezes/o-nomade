// src/plugins/maskaPlugin.ts
import { App, DirectiveBinding } from "vue";
import { MaskInput } from "maska";

const maskaDirective = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    new MaskInput(el, { mask: binding.value });
  },
  updated(el: HTMLInputElement, binding: DirectiveBinding) {
    new MaskInput(el, { mask: binding.value });
  },
};

const MaskaPlugin = {
  install(app: App) {
    app.directive("maska", maskaDirective);
  },
};

export default MaskaPlugin;
