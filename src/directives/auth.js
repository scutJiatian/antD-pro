import { check } from "../utils/auth";
//注册权限指令
//权限指令控制时  在第一次做判断 如果没权限就删除节点
//弊端就是不灵活 无法动态修改状态  删除的节点无法重新显示
//一般情况下权限状态不太会变动
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  });
}

export default { install };
