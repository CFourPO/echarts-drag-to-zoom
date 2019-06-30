<template>
    <div @mousedown="handleMouseOver($event)" @mousemove="handleMouseMove($event)" @mouseup="handleMouseUp($event)" class="echarts-container">
        <v-chart :options="options" class="echarts" ref="echart" v-on="$listeners"></v-chart>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import echarts, * as Echarts from 'echarts';
  import ECharts = echarts.ECharts;

  @Component
  export default class EchartsContainer extends Vue {
    public graphic = {
      type: 'rect',
      style: {
        fill: 'rgba(50, 50, 50, .5)',
      },
      shape: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
      },
      invisible: true,
    };

    public options = {
      grid: {
        id: 'mainGrid',
        tooltip: {
          trigger: 'axis',
          axisPointer: 'cross',
        },
      },
      xAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
      },
      graphic: this.graphic,
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
            [5.0, 5.68],
          ],
          type: 'scatter',
        },
      ],
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

    public handleMouseMove(event: any) {
      let width = 0;
      let height = 0;

      if (this.isMouseDown) {
        this.graphic.invisible = false;
        this.updateChartOptions();
        width = event.offsetX - this.xi;
        height = event.offsetY - this.yi;
        this.updateGraphic(width, height);
      }
    }

    public updateGraphic(width: number, height: number) {
      this.graphic.shape.width = width;
      this.graphic.shape.height = height;
    }

    public handleMouseOver(event: any) {

      this.isMouseDown = true;
      this.xi = event.offsetX;
      this.yi = event.offsetY;

      this.graphic.shape.x = this.xi;
      this.graphic.shape.y = this.yi;

    }

    public handleMouseUp(event: any) {
      this.isMouseDown = false;
      this.xf = event.offsetX;
      this.yf = event.offsetY;

      this.graphic.invisible = true;
      this.setChartWindow(this.xi, this.xf, this.yi, this.yf);

    }

    public setChartWindow(x1: number, x2: number, y1: number, y2: number) {
      this.chart = echarts.getInstanceByDom(this.$el as HTMLDivElement);
      const xyi = this.chart.convertFromPixel({ gridId: 'mainGrid' }, [x1, y1]);
      const xyf = this.chart.convertFromPixel({ gridId: 'mainGrid' }, [x2, y2]);

      this.options.xAxis = {
        ...this.options.xAxis,
        min: xyi[0],
        max: xyf[0],
      };

      this.options.yAxis = {
        ...this.options.yAxis,
        min: xyi[1],
        max: xyf[1],
      };

      this.updateChartOptions();
    }

    private updateChartOptions() {
      if (!this.chart) {
        this.chart = echarts.getInstanceByDom(this.$el as HTMLDivElement);
      }
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