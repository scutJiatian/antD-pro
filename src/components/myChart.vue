<template>
  <div ref="chartDom" style="height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import debounce from "lodash/debounce";
//监听容器宽度变化 使chart图表自适应变化
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    option: {
      handler(val) {
        this.chart.setOption(val);
      },
    },
    //深度监听比较耗性能
    //这里采用更新数据之后手动设置的方式触发对象的整体变动
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true,
    // },
  },
  created() {
    //resize做防抖处理 提升性能
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  //在封装第三方库时经常需要定义额外参数或监听函数，
  //需要再销毁周期中清除，
  //在组件销毁时需要移除容器监听以及相关参数 防止内存泄漏
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.option);
    },
  },
};
</script>
