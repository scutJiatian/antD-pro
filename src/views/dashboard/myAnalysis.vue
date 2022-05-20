<template>
  <div>
    <my-chart :option="chartOption" style="height: 400px"></my-chart>
  </div>
</template>

<script>
//import random from "loadsh/random"; //生成随机函数
// import axios from "axios"; //用于模拟后端请求
import request from "../../utils/request";
import myChart from "@/components/myChart.vue";
export default {
  data() {
    return {
      chartOption: {},
    };
  },
  components: {
    myChart,
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 },
      }).then((res) => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          legend: {
            data: ["销量"],
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data,
            },
          ],
        };
      });
      // axios
      //   .get("/api/dashboard/chart", { param: { ID: 12345 } })
      //   .then((res) => {
      //     this.chartOption = {
      //       title: {
      //         text: "ECharts 入门示例",
      //       },
      //       tooltip: {},
      //       legend: {
      //         data: ["销量"],
      //       },
      //       xAxis: {
      //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      //       },
      //       yAxis: {},
      //       series: [
      //         {
      //           name: "销量",
      //           type: "bar",
      //           data: res.data,
      //         },
      //       ],
      //     };
      //   });
    },
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
