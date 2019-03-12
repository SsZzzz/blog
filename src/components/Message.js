import Vue from 'vue';
import Message from './Message.vue';

const messageConstructor = Vue.extend(Message);
let seed = 1;

const message = (options) => {
  const messageInstance = new messageConstructor({
    data: options
  });
  messageInstance.vm = messageInstance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
  messageInstance.dom = messageInstance.vm.$el;
  document.body.appendChild(messageInstance.dom);
  messageInstance.dom.style.zIndex = seed++ + 1000; // 后插入的message组件z-index加一，保证能盖在之前的上面
  messageInstance.vm.visible = true;
  return messageInstance.vm;
}

export default {
  install: Vue => {
    Vue.prototype.$message = message; // 将message组件暴露出去，并挂载在Vue的prototype上
  }
}