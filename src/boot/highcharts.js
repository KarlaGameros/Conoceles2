import VueApexCharts from "vue3-apexcharts";
import { boot } from "quasar/wrappers";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
export default boot(({ app }) => {
  app.use(HighchartsVue, { highcharts: Highcharts });
});
