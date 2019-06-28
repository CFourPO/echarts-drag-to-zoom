<template>
    <div @mousedown="handleMouseOver($event)" @mouseup="handleMouseUp($event)" class="echarts-container">
        <v-chart :options="option" class="echarts" ref="echart" v-on="$listeners"></v-chart>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import echarts, * as Echarts from 'echarts';
  import ECharts = echarts.ECharts;

  class EchartInstance {
    private instance: Echarts.ECharts;
    private options: echarts.EChartOption;

    constructor(instance: echarts.ECharts, options: echarts.EChartOption) {
      this.instance = instance;
      this.instance.setOption(options);
      this.options = options;
    }

  }

  @Component
  export default class EchartsContainer extends Vue {

    public options = {
      grid: {
        id: 'mainGrid',
        tooltip: {
          trigger: 'axis',
          axisPointer: 'cross'
        }
      },
      xAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax'
      },
      series: [
        {
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
          ],
          type: 'scatter'
        }
      ]
    };

    public chart: any = undefined;
    public isMouseDown = false;
    public xi = 0;
    public xf = 0;
    public yi = 0;
    public yf = 0;

    public mounted() {
      this.chart = echarts.init(this.$el as HTMLDivElement, undefined);
      this.chart.setOption(this.options);
    }

    public handleMouseOver(event: any) {
      console.log(event);
      this.isMouseDown = true;
      this.xi = event.offsetX;
      this.yi = event.offsetY;
      console.log(this.xi);
    }

    public handleMouseUp(event: any) {
      this.isMouseDown = false;
      this.xf = event.offsetX;
      this.yf = event.offsetY;

      this.setChartWindow(this.xi, this.xf, this.yi, this.yf);
    }

    public setChartWindow(x1: number, x2: number, y1: number, y2: number) {
      this.chart = echarts.getInstanceByDom(this.$el as HTMLDivElement);
      const xyi = this.chart.convertFromPixel({ gridId: 'mainGrid' }, [x1, x2]);
      const xyf = this.chart.convertFromPixel({ gridId: 'mainGrid' }, [y1, y2]);
      console.log('XYI', Math.min(xyi));
      this.options.xAxis = {
        ...this.options.xAxis,
        min: xyi[0],
        max: xyi[1]
      };

      this.options.yAxis = {
        ...this.options.yAxis,
        min: xyf[0],
        max: xyf[1]
      };

      this.chart.setOption(this.options);
    }

  }
</script>

<style scoped>

    .echarts-container {
        width: 100vw;
        height: 100vh;
    }

</style>