import { Chart } from 'highcharts'
import Highcharts from '../src/main1'
import { mount } from '@vue/test-utils'

// Options taken from highcharts demo
const options = {
  accessibility: {
    enabled: false
  },
  title: {
    text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
    align: 'left'
  },
  subtitle: {
    text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
    align: 'left'
  },
  yAxis: {
    title: {
      text: 'Number of Employees'
    }
  },
  xAxis: {
    accessibility: {
      rangeDescription: 'Range: 2010 to 2020'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },
  series: [{
    name: 'Installation & Developers',
    data: [43934, 48656, 65165, 81827, 112143, 142383,
      171533, 165174, 155157, 161454, 154610]
  }, {
    name: 'Manufacturing',
    data: [24916, 37941, 29742, 29851, 32490, 30282,
      38121, 36885, 33726, 34243, 31050]
  }, {
    name: 'Sales & Distribution',
    data: [11744, 30000, 16005, 19771, 20185, 24377,
      32147, 30912, 29243, 29213, 25663]
  }, {
    name: 'Operations & Maintenance',
    data: [null, null, null, null, null, null, null,
      null, 11164, 11218, 10077]
  }, {
    name: 'Other',
    data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
      17300, 13053, 11906, 10073]
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
}

describe('src `main`', () => {
  describe('Highcharts', () => {
    beforeAll(() => {
      console.warn = vi.fn()
    })
    describe('highchartsRef exists', ()  => {
      it('Should render the chart inside wrapper element', async () => {
        const wrapper = mount(Highcharts, { props: { options } })

        expect(wrapper.element.children).not.toHaveLength(0)
      })
      it('Should destroy the chart when unmounted', () => {
        const wrapper = mount(Highcharts, { props: { options } })

        wrapper.unmount()

        expect(wrapper.element.children).toHaveLength(0)
      })
      it('Should return Chart instance', () => {
        const wrapper = mount(Highcharts, { props: { options } })

        expect(wrapper.vm.chart).toBeInstanceOf(Chart)
      })
    })
    describe('highchartsRef doesn\'t exist', () => {
      it('Should get a warning because there is no element to mount on', () => {
        const warnSpy = vi.spyOn(console, 'warn')

        const highcharts = Highcharts as { render: () => void }

        highcharts.render = () => null

        mount(highcharts, { props: { options } })

        expect(warnSpy).toHaveBeenCalledWith('@noction/vue-highcharts: You don\'t have an HTML element to mount the chart')
      })
      it('Should return chart as null', () => {
        const highcharts = Highcharts as { render: () => void }

        highcharts.render = () => null

        const wrapper = mount(highcharts, { props: { options } })

        expect(wrapper.vm.chart).toBeNull()
      })
    })
  })
})
