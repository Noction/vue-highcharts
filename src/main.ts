import { Chart } from 'highcharts'
import type { Component } from 'vue'
import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const warn = (message: string) => {
  console.warn(`@noction/vue-highcharts: ${message}`)
}

/**
 * Creates Highcharts component
 * @returns {Component}
 */
function createChart (): Component {
  return defineComponent({
    name: 'Highcharts',
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    render: () => h('div', { ref: 'highchartsRef' }),
    setup (props) {
      const highchartsRef = ref<HTMLDivElement | null>(null)

      onMounted(() => {
        if (highchartsRef.value === null) {
          warn('You don\'t have an HTML element to mount the chart')

          return
        }

        const chart = ref(new Chart(highchartsRef.value, props.options))

        watch(() => props.options, newOptions => {
          chart.value.update(newOptions, true, true)
        }, {
          deep: true
        })

        onBeforeUnmount(() => {
          chart.value.destroy()
        })
      })

      return {
        highchartsRef
      }
    }
  })
}

export default createChart()
