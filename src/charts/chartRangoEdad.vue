<template>
  <div class="row">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useGraficasStore } from "src/stores/graficas-store";
import { storeToRefs } from "pinia";
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown";
import accessibility from "highcharts/modules/accessibility";
import exporting from "highcharts/modules/exporting";

drilldown(Highcharts);
accessibility(Highcharts);
exporting(Highcharts);

const graficasStore = useGraficasStore();
const { list_Graficas_Genero_Edad_Filtrado } = storeToRefs(graficasStore);

export default {
  data() {
    const edad_18_24 = ref(null);
    const edad_25_29 = ref(null);
    const edad_30_39 = ref(null);
    const edad_40_49 = ref(null);
    const edad_50_59 = ref(null);
    const edad_60 = ref(null);
    const series_Sexo_1 = ref([]);
    const series_Sexo_2 = ref([]);
    const series_Sexo_3 = ref([]);
    const series_Sexo_4 = ref([]);
    const series_Sexo_5 = ref([]);
    const series_Sexo_6 = ref([]);
    //---------------------------------------------------------------------------------

    const rellenar_grafica = () => {
      edad_18_24.value = null;
      edad_25_29.value = null;
      edad_30_39.value = null;
      edad_40_49.value = null;
      edad_50_59.value = null;
      edad_60.value = null;
      series_Sexo_1.value = [];
      series_Sexo_2.value = [];
      series_Sexo_3.value = [];
      series_Sexo_4.value = [];
      series_Sexo_5.value = [];
      series_Sexo_6.value = [];
      let edad_1 = list_Graficas_Genero_Edad_Filtrado.value.filter(
        (candidato) => candidato.edad >= 18 && candidato.edad <= 24
      );
      if (edad_1.length != 0) {
        let mujeres = edad_1.filter((candidato) => candidato.sexo === "Mujer");
        let hombres = edad_1.filter((candidato) => candidato.sexo === "Hombre");
        let noBinario = edad_1.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        series_Sexo_1.value.push(
          ["Mujer", mujeres.length],
          ["Hombre", hombres.length],
          ["No binario", noBinario.length]
        );
      }
      let edad_2 = list_Graficas_Genero_Edad_Filtrado.value.filter(
        (candidato) => candidato.edad >= 25 && candidato.edad <= 29
      );

      if (edad_2.length != 0) {
        let mujeres = edad_2.filter((candidato) => candidato.sexo === "Mujer");
        let hombres = edad_2.filter((candidato) => candidato.sexo === "Hombre");
        let noBinario = edad_2.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        series_Sexo_2.value.push(
          ["Mujer", mujeres.length],
          ["Hombre", hombres.length],
          ["No binario", noBinario.length]
        );
      }
      let edad_3 = list_Graficas_Genero_Edad_Filtrado.value.filter(
        (candidato) => candidato.edad >= 30 && candidato.edad <= 39
      );

      if (edad_3.length != 0) {
        let mujeres = edad_3.filter((candidato) => candidato.sexo === "Mujer");
        let hombres = edad_3.filter((candidato) => candidato.sexo === "Hombre");
        let noBinario = edad_3.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        series_Sexo_3.value.push(
          ["Mujer", mujeres.length],
          ["Hombre", hombres.length],
          ["No binario", noBinario.length]
        );
      }

      let edad_4 = list_Graficas_Genero_Edad_Filtrado.value.filter(
        (candidato) => candidato.edad >= 40 && candidato.edad <= 49
      );
      if (edad_4.length != 0) {
        let mujeres = edad_4.filter((candidato) => candidato.sexo === "Mujer");
        let hombres = edad_4.filter((candidato) => candidato.sexo === "Hombre");
        let noBinario = edad_4.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        series_Sexo_4.value.push(
          ["Mujer", mujeres.length],
          ["Hombre", hombres.length],
          ["No binario", noBinario.length]
        );
      }

      let edad_5 = list_Graficas_Genero_Edad_Filtrado.value.filter(
        (candidato) => candidato.edad >= 50 && candidato.edad <= 59
      );

      if (edad_5.length != 0) {
        let mujeres = edad_5.filter((candidato) => candidato.sexo === "Mujer");
        let hombres = edad_5.filter((candidato) => candidato.sexo === "Hombre");
        let noBinario = edad_5.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        series_Sexo_5.value.push(
          ["Mujer", mujeres.length],
          ["Hombre", hombres.length],
          ["No binario", noBinario.length]
        );
      }

      let edad_6 = list_Graficas_Genero_Edad_Filtrado.value.filter(
        (candidato) => candidato.edad >= 60
      );

      if (edad_6.length != 0) {
        let mujeres = edad_6.filter((candidato) => candidato.sexo === "Mujer");
        let hombres = edad_6.filter((candidato) => candidato.sexo === "Hombre");
        let noBinario = edad_6.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        series_Sexo_6.value.push(
          ["Mujer", mujeres.length],
          ["Hombre", hombres.length],
          ["No binario", noBinario.length]
        );
      }

      edad_18_24.value = edad_1.length;
      edad_25_29.value = edad_2.length;
      edad_30_39.value = edad_3.length;
      edad_40_49.value = edad_4.length;
      edad_50_59.value = edad_5.length;
      edad_60.value = edad_6.length;
    };

    watch(list_Graficas_Genero_Edad_Filtrado, (val) => {
      if (val != null) {
        actualizarGrafica();
      }
    });

    const actualizarGrafica = () => {
      rellenar_grafica();

      this.chartOptions.series[0].data = [
        { name: "18-24", y: edad_18_24.value, drilldown: "18-24" },
        { name: "25-29", y: edad_25_29.value, drilldown: "25-29" },
        { name: "30-39", y: edad_30_39.value, drilldown: "30-39" },
        { name: "40-49", y: edad_40_49.value, drilldown: "40-49" },
        { name: "50-59", y: edad_50_59.value, drilldown: "50-59" },
        { name: "60 o más", y: edad_60.value, drilldown: "60 o más" },
      ];

      this.chartOptions.drilldown.series = [
        { id: "18-24", data: series_Sexo_1.value },
        { id: "25-29", data: series_Sexo_2.value },
        { id: "30-39", data: series_Sexo_3.value },
        { id: "40-49", data: series_Sexo_4.value },
        { id: "50-59", data: series_Sexo_5.value },
        { id: "60 o más", data: series_Sexo_6.value },
      ];
    };

    rellenar_grafica();

    return {
      chartOptions: {
        colors: ["#af7ead", "#b988b8", "#dcbadb"],
        chart: {
          type: "column",
        },
        title: {
          text: "",
        },
        align: "center",
        xAxis: {
          type: "category",
        },
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        yAxis: {
          title: "",
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: "Edades",
            colorByPoint: true,
            data: [
              {
                name: "18-24",
                y: edad_18_24.value,
                drilldown: "18-24",
                dataLabels: {
                  color: "#444344",
                },
              },
              {
                name: "25-29",
                y: edad_25_29.value,
                drilldown: "25-29",
                dataLabels: {
                  color: "#444344",
                },
              },
              {
                name: "30-39",
                y: edad_30_39.value,
                drilldown: "30-39",
                dataLabels: {
                  color: "#444344",
                },
              },
              {
                name: "40-49",
                y: edad_40_49.value,
                drilldown: "40-49",
                dataLabels: {
                  color: "#444344",
                },
              },
              {
                name: "50-59",
                y: edad_50_59.value,
                drilldown: "50-59",
                dataLabels: {
                  color: "#444344",
                },
              },
              {
                name: "60 o más",
                y: edad_60.value,
                drilldown: "60 o más",
                dataLabels: {
                  color: "#444344",
                },
              },
            ],
          },
        ],
        drilldown: {
          breadcrumbs: {
            position: {
              align: "right",
            },
          },
          series: [
            {
              id: "18-24",
              data: series_Sexo_1.value,
            },
            {
              id: "25-29",
              data: series_Sexo_2.value,
            },
            {
              id: "30-39",
              data: series_Sexo_3.value,
            },
            {
              id: "40-49",
              data: series_Sexo_4.value,
            },
            {
              id: "50-59",
              data: series_Sexo_5.value,
            },
            {
              id: "60 o más",
              data: series_Sexo_6.value,
            },
          ],
        },
      },
    };
  },
};
</script>

<style scoped>
.chart {
  width: 650px;
  min-width: 310px;
  max-width: 800px;
}

@media screen and (max-width: 780px) {
  .chart {
    height: 300px;
    min-width: 310px;
    max-width: 800px;
  }
}
</style>
