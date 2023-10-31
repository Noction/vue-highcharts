import {reactive, provide, inject, type InjectionKey} from 'vue';


type ProvidedChartType = {
    chartInstance: Highcharts.Chart
    updateChartOptions: (value: Highcharts.Options) => void
}
const HighchartsContextSymbol = Symbol('HighchartsContext') as InjectionKey<ProvidedChartType>;

export function useHighchartsContext() {
    // Check if this is called within a component that has provided this context
    const context = inject(HighchartsContextSymbol, null);
    if (!context) {
        throw new Error('useHighchartsContext must be used within a NocHighcharts component.');
    }
    return context;
}

export function provideHighchartsContext(chartInstanceRef: Highcharts.Chart) {
    const chartOptions = reactive({
        // initial options
    });

    function updateChartOptions(newOptions: Highcharts.Options) {
        Object.assign(chartOptions, newOptions);
        if (chartInstanceRef) {
            chartInstanceRef.update(chartOptions, true);
        }
    }

    const context = {
        chartInstance:  chartInstanceRef,
        updateChartOptions,
    };

    provide(HighchartsContextSymbol, context);
}
