<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>
          欢迎，{{ name }} 使用优社管理系统 &nbsp
          <span style="font-size: 12px; font-weight: 200"
            >您的用户角色 roles:<span v-for="role in roles" :key="role"
              >{{ role }}
            </span></span
          >
        </h2>
      </div>
      <div class="a" style="width: 600px; height: 300px"></div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      // time:new Date(),
      // timeString:""
    };
  },
  mounted() {
    this.initChart();
  },
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  watch: {},
  created() {},
  methods: {
    initChart() {
      console.log(this.$echarts);
      let mychart = this.$echarts.init(document.querySelector(".a"));
      mychart.setOption({
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
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
