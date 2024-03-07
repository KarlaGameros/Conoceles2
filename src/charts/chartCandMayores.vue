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
    (candidato) => candidato.indigena == "Sí"
  );
  let no = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.indigena == "No"
  );
  let prefiero_No_Contestar = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.indigena == "Prefiero no contestar"
  );

  series.value.push(si.length, no.length, prefiero_No_Contestar.length);
};

const chartOptions = {
  chart: {
    width: "100%",
    type: "pie",
  },

  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  labels: ["Sí", "No", "Prefiero no contestar"],
  colors: ["#af7ead", "#e4c0ed", "#f1d9f6"],
  states: {
    hover: {
      filter: "none",
    },
  },
  legend: {
    show: true,
  },
};
</script>

<style></style>
