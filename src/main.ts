import { Chart } from 'highcharts'
import type { Component } from 'vue'
import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// BEGIN Types declaration

export type ChartName = 'Highcharts'

// END Types declaration

const constructors: Map<ChartName, typeof Chart> = new Map([['Highcharts', Chart]])

const warn = (message: string) => {
  console.warn(`@noction/vue-highcharts: ${message}`)
}

export const Highcharts = createComponent('Highcharts')

export function createComponent (name: ChartName): Component {
  const constructor = constructors.get(name) ?? Chart

  return defineComponent({
    name,
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    render: () => h('div', { ref: 'highchartsRef' }),
    setup (props) {
      const highchartsRef = ref<HTMLDivElement | null>(null)
      const chart = ref<Chart | null>(null)

      const redraw = (options: object) => {
        if (highchartsRef.value) {
          chart.value = new constructor(highchartsRef.value, options)
        } else {
          warn('You don\'t have a html element to mount the chart')
        }
      }

      onMounted(() => redraw(props.options))
      watch(() => props.options, redraw)

      onBeforeUnmount(() => {
        if (highchartsRef.value && chart.value) chart.value.destroy()
      })

      return {
        highchartsRef,
        chart
      }
    }
  })
}
