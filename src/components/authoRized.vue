<script>
/*函数式组件声明权限组件 
  函数式权限组件可以充分灵活控制权限  就是
*/
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      require: true,
    },
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
</script>

<style></style>
