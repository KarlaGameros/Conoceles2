<template>
  <apexchart
    type="donut"
    width="500"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGraficasStore } from "src/stores/graficas-store";
import { onMounted, ref, watch } from "vue";

const graficasStore = useGraficasStore();
const { list_Graficas_Filtrado } = storeToRefs(graficasStore);
const series = ref([]);

onMounted(() => {
  rellenarGrafica();
});

watch(list_Graficas_Filtrado, (val) => {
  series.value = [];
  if (val != null) {
    rellenarGrafica();
  }
});

const rellenarGrafica = () => {
  let si = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.discapacidad == "Sí"
  );
  let no = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.discapacidad == "No"
  );
  let prefiero_No_Contestar = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.discapacidad == "Prefiero no contestar"
  );

  series.value.push(si.length, no.length, prefiero_No_Contestar.length);
};

const chartOptions = {
  chart: {
    width: 380,
    type: "donut",
    dropShadow: {
      enabled: true,
      color: "#111",
      top: -1,
      left: 3,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
          },
        },
      },
    },
  },
  labels: ["Sí", "No", "Prefiero no contestar"],
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
  },
  fill: {
    type: "pattern",
    opacity: 1,
    pattern: {
      enabled: true,
      style: [
        "verticalLines",
        "squares",
        "horizontalLines",
        "circles",
        "slantedLines",
      ],
    },
  },
  states: {
    hover: {
      filter: "none",
    },
  },
  theme: {
    palette: "palette2",
  },
  colors: ["#af7ead", "#b988b8", "#dcbadb"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 380,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
</script>

<style></style>
