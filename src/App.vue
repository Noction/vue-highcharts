<script setup lang="ts">
import { reactive } from "vue";
import { NocHighcharts, NocSeries, NocXAxis, NocYAxis, NocPlotLine } from "./components";
import NocPlotBand from "@/components/NocPlotBand.vue";
import type Highcharts from 'highcharts'

const chartOptions: Highcharts.Options = {
  accessibility: { enabled: false },
  title: {
    text: 'My chart'
  },
  xAxis: [{
    id: 'my-x-axis',
    title: {
      text: 'Sample X-Axis'
    },
    min: 0, // Ensure minimum value
    max: 10, // Ensure maximum value
  }],
  yAxis: [{
    id: 'my-y-axis',
    title: {
      text: 'Sample Y-Axis'
    },
    min: 0, // Ensure minimum value
    max: 10, // Ensure maximum value
  }],
  series: [{
    type: 'area',
    data: [1, 3, 2, 4]
  }]
};

const xAxisOptions = reactive({
  id: 'my-x-axis',
  title: {
    text: 'Initial X-Axis'
  }
});

const yAxisOptions = reactive({
  id: 'my-y-axis',
  title: {
    text: 'Initial Y-Axis'
  }
});

const plotLineOptionsX = reactive({
  value: 2,
  color: 'blue',
  width: 2
});

const plotLineOptionsY = reactive({
  value: 3,
  color: 'red',
  width: 2,
});

const seriesList = reactive([
  {
    type: 'bar',
    id: 'inserted',
    data: [1, 3, 2, 4]
  }
]);

function addSeries() {
  seriesList.push({
    type: 'spline',
    id: `series-${seriesList.length}`,
    data: Array.from({length: 10}, () => Math.floor(Math.random() * 10))
  });
}

function removeSeries(id: string) {
  const index = seriesList.findIndex(s => s.id === id);
  if(index !== -1) {
    seriesList.splice(index, 1);
  }
}

function changeSeriesType(type) {
  seriesList[0].type = type;
}

function toggleXAxisTitle() {
  xAxisOptions.title.text = xAxisOptions.title.text === 'Initial X-Axis' ? 'Updated X-Axis' : 'Initial X-Axis';
}

function toggleYAxisTitle() {
  yAxisOptions.title.text = yAxisOptions.title.text === 'Initial Y-Axis' ? 'Updated Y-Axis' : 'Initial Y-Axis';
}

function toggleSeriesVisibility() {
  seriesList[0].visible = !seriesList[0].visible;
}

function changePlotLineColorX() {
  plotLineOptionsX.color = plotLineOptionsX.color === 'blue' ? 'green' : 'blue';
  plotLineOptionsX.value = plotLineOptionsX.value === 2 ? 3 : 2
}

function changePlotLineColorY() {
  plotLineOptionsY.color = plotLineOptionsY.color === 'red' ? 'purple' : 'red';
  plotLineOptionsY.value = plotLineOptionsY.value === 3 ? 5 : 3
}

function addRandomDataToSeries() {
  seriesList[0].data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10))
}

function toggleLegend() {
  if (!chartOptions.legend) {
    chartOptions.legend = {};
  }
  chartOptions.legend.enabled = !chartOptions.legend.enabled;
}

// ... [the rest of your imports and initial setup]

const plotBandOptionsY = reactive({
  from: 1,
  to: 3,
  color: 'rgba(68, 170, 213, 0.1)',
  id: 'my-plot-band'
});

function togglePlotBand() {
  if (plotBandOptionsY.from !== null && plotBandOptionsY.to !== null) {
    plotBandOptionsY.from = null;
    plotBandOptionsY.to = null;
  } else {
    plotBandOptionsY.from = 1;
    plotBandOptionsY.to = 3;
  }
}

function changePlotBandRange(fromValue, toValue) {
  plotBandOptionsY.from = fromValue;
  plotBandOptionsY.to = toValue;
}

function changePlotBandColor(color) {
  plotBandOptionsY.color = color;
}

// ... [the rest of your methods and reactive objects]


</script>

<template>
  <header>
    <div class="controls">
      <button @click="toggleLegend">
        Toggle Legend
      </button>

      <button @click="toggleSeriesVisibility">
        Toggle Series Visibility
      </button>
      <button @click="toggleXAxisTitle">
        Toggle X-Axis Title
      </button>
      <button @click="toggleYAxisTitle">
        Toggle Y-Axis Title
      </button>
      <button @click="changePlotLineColorX">
        Change X PlotLine Color
      </button>
      <button @click="changePlotLineColorY">
        Change Y PlotLine Color
      </button>
      <button @click="addRandomDataToSeries">
        Add Random Data to Series
      </button>
      <button @click="changeSeriesType('line')">
        Change to Line
      </button>
      <button @click="changeSeriesType('bar')">
        Change to Bar
      </button>
      <button @click="addSeries">
        Add Series
      </button>
      <button @click="removeSeries('inserted')">
        Remove Series 'inserted'
      </button>

      <button @click="togglePlotBand">
        Toggle Y PlotBand
      </button>

      <button @click="changePlotBandRange(2, 4)">
        Set Y PlotBand Range (2-4)
      </button>

      <button @click="changePlotBandColor('rgba(255, 0, 0, 0.1')">
        Change Y PlotBand Color to Red
      </button>
    </div>
  </header>

  <main>
    <NocHighcharts :options="chartOptions">
      <noc-x-axis
        :id="xAxisOptions.id"
        :options="xAxisOptions"
      >
        <noc-plot-line :options="plotLineOptionsX" />
      </noc-x-axis>

      <noc-y-axis
        :id="yAxisOptions.id"
        :options="yAxisOptions"
      >
        <noc-plot-band :options="plotBandOptionsY" />
        <noc-plot-line :options="plotLineOptionsY" />
      </noc-y-axis>

      <NocSeries
        v-for="tipa in seriesList"
        id="inserted"
        :key="tipa.id"
        :options="tipa"
      />
    </NocHighcharts>
  </main>
</template>

<style scoped>
  header {
    line-height: 1.5;
  }
  .controls {
    display: flex;
    flex-direction: column;
  }

main { width: 600px; }

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
