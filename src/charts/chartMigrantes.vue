<template>
  <apexchart
    width="600"
    type="donut"
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
    (candidato) => candidato.migrante == "Sí"
  );
  let no = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.migrante == "No"
  );
  let prefiero_No_Contestar = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.migrante == "Prefiero no contestar"
  );

  series.value.push(si.length, no.length, prefiero_No_Contestar.length);
};

const chartOptions = {
  chart: {
    type: "donut",
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
    },
  },
  labels: ["Sí", "No", "Prefiero no contestar"],
  grid: {
    padding: {
      bottom: -80,
    },
  },
  colors: ["#af7ead", "#c88edb", "#e4c0ed"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 400,
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
