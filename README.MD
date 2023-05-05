# vue-highcharts

[![NPM version](https://img.shields.io/npm/v/@noction/vue-highcharts.svg?style=flat)](https://npmjs.com/package/@noction/vue-highcharts)
[![NPM downloads](https://img.shields.io/npm/dm/@noction/vue-highcharts.svg?style=flat)](https://npmjs.com/package/@noction/vue-highcharts)
[![codecov](https://codecov.io/gh/Noction/vue-highcharts/branch/main/graph/badge.svg?token=C5NGW1BC2N)](https://codecov.io/gh/Noction/vue-highcharts)

Wrapper for [`Highcharts`](https://www.highcharts.com/) in Vue. *Currently supporting only vue3.*

## Install

***npm***

```bash
npm i @noction/vue-highcharts
```

***yarn***

```bash
yarn add @noction/vue-highcharts
```

***pnpm***

```bash
pnpm add @noction/vue-highcharts
```

## Usage

```vue
<template>
  <highcharts
      :options="options"
  />
</template>

<script setup lang="ts">
import { Highcharts } from '@noction/vue-highcharts'
import { reactive } from "vue";

const options = reactive({
  series: [{
    data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
  }]
})

</script>
```

## Typings

```ts

type ChartName = 'Highcharts'

```

### Props

| Name          | Type                             | Description                 | Required |                                                                      
|---------------|----------------------------------|-----------------------------|----------|
| options       | Object                           | The chart options structure | true     |                                                           


### Supporting

1. [`Highcharts.Chart`]('https://api.highcharts.com/class-reference/Highcharts.Chart')
2. ⛔ **WIP**[`Highcharts.MapChart`]('https://api.highcharts.com/class-reference/Highcharts.MapChart') ⛔
3. ⛔ **WIP**[`Highcharts.StockChart`]('https://api.highcharts.com/class-reference/Highcharts.StockChart') ⛔
4. ⛔ **WIP**[`Highcharts.GanttChart`]('https://api.highcharts.com/class-reference/Highcharts.GanttChart') ⛔