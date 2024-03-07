<template>
  <apexchart
    width="500"
    type="pie"
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
    (candidato) => candidato.lgbttiq == "Sí"
  );
  let no = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.lgbttiq == "No"
  );
  let prefiero_No_Contestar = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.lgbttiq == "Prefiero no contestar"
  );

  series.value.push(si.length, no.length, prefiero_No_Contestar.length);
};

const chartOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  colors: ["#af7ead", "#e4c0ed", "#dcbadb"],
  labels: ["Sí", "No", "Prefiero no contestar"],
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
