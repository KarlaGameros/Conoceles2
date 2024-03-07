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
  let ingreso_1 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "Menos de $11,000"
  );
  let ingreso_2 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "De $11,001 a $25,000"
  );
  let ingreso_3 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "De $25,001 a $50,000"
  );
  let ingreso_4 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "De $50,001 a $75,000"
  );
  let ingreso_5 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "De $75,001 a $112,000"
  );
  let ingreso_6 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "Más de $112,000"
  );
  let ingreso_7 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "No recibe ingresos"
  );
  let ingreso_8 = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.ingresos == "Prefiero no contestar"
  );

  series.value.push(
    ingreso_1.length,
    ingreso_2.length,
    ingreso_3.length,
    ingreso_4.length,
    ingreso_5.length,
    ingreso_6.length,
    ingreso_7.length,
    ingreso_8.length
  );
};

const chartOptions = {
  chart: {
    width: 500,
    type: "donut",
  },
  labels: [
    "Menos de $11,000",
    "De $11,001 a $25,000",
    "De $25,001 a $50,000",
    "De $50,001 a $75,000",
    "De $75,001 a $112,000",
    "Más de $112,000",
    "No recibe ingresos",
    "Prefiero no contestar",
  ],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "gradient",
  },
  colors: [
    "#c675ff",
    "#af7ead",
    "#b988b8",
    "#dcbadb",
    "#f3e0f4",
    "#e7c7e9",
    "#dbaede",
    "#cf95d3",
  ],
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
