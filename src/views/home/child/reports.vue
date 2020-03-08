<template>
  <div>
    <navmenus first="数据统计" second="数据报表"></navmenus>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <el-card>
      <div id="main" ref="wrapper" style="width: 800px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        // echarts的设置
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        // 顶部内容
        legend: {
          data: []
        },
        // 希望开启的功能
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // 布局的尺寸
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      }
    };
  },
  mounted() {
    let myChart = echarts.init(this.$refs.wrapper);
    myChart.setOption(this.options);
  }
};
</script>
<style lang="scss" scoped></style>
