<template>
  <div ref="chartContainer">
    <div ref="internalRenderer" />
  </div>
</template>

<script setup lang="ts">
import Highcharts from 'highcharts';
import {
  defineComponent,
  getCurrentInstance,
  h,
  onMounted, ref,
  render,
  App,
  Fragment,
  shallowRef,
  Ref, onUnmounted, watch,
} from 'vue';
import type { Options } from 'highcharts';
import {provideHighchartsContext} from "@/composables/useHighchartsContext";

const props = defineProps<{ options: Options }>();

const chartContainer = ref<HTMLElement | null>(null);
const internalRenderer = ref<HTMLElement | null>(null);

const chartInstanceRef: Ref<Highcharts.Chart | null> = shallowRef(null);

const slots = defineSlots<{
  default(): any
}>();

const appInstance = getCurrentInstance()?.appContext.app;

const createInternalComponent = (chartInstance: Highcharts.Chart) => defineComponent({
  setup() {
    const internalContext = getCurrentInstance()?.appContext;
    if (internalContext) internalContext.app = appInstance as App;

    provideHighchartsContext(chartInstance);

    return () => h(Fragment, null, slots.default ? slots.default() : []);
  }
});

const mountInternalRenderer = (chartInstance: Highcharts.Chart) => {
  const InternalComponent = createInternalComponent(chartInstance);
  render(h(InternalComponent), internalRenderer.value);
};

onMounted(() => {
  if (chartContainer.value) {
    const chartInstance = new Highcharts.Chart(chartContainer.value, props.options);
    chartInstanceRef.value = chartInstance;
    // provideHighchartsContext(chartInstanceRef); // Pass chartInstanceRef to context provider

    if (internalRenderer.value) {
      mountInternalRenderer(chartInstance);
    }
  }
});

onUnmounted(() => {
  // If the chart instance exists, destroy it
  if (chartInstanceRef.value) {
    chartInstanceRef.value.destroy();
    chartInstanceRef.value = null;
  }

  if (internalRenderer.value) {
    render(null, internalRenderer.value);
  }
});

watch(() => props.options, (newOptions) => {
  if (chartInstanceRef.value) {
    chartInstanceRef.value.update(newOptions, true); // true to redraw
  }
}), {deep: true};
</script>
