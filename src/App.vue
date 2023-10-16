<script setup lang="ts">
import { reactive } from "vue";
import { NocHighcharts, NocSeries, NocXAxis, NocYAxis, NocPlotLine } from "./components";

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

// const seriesOptions = reactive({
//   type: 'bar',
//   id:'inserted',
//   data: [1, 3, 2, 4],
//   visible: true
// });

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

</script>

<template>
  <header>
    <!--    <img-->
    <!--      alt="Vue logo"-->
    <!--      class="logo"-->
    <!--      src="./assets/logo.svg"-->
    <!--      width="125"-->
    <!--      height="125"-->
    <!--    >-->

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

<style>
/* color palette from <https://github.com/vuejs/theme> */
:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition:
      color 0.5s,
      background-color 0.5s;
  line-height: 1.6;
  font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}

</style>

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
