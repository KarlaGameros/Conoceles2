<template>
  <apexchart
    type="pie"
    width="450"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGraficasStore } from "src/stores/graficas-store";
import { onMounted, ref, watch } from "vue";

const graficasStore = useGraficasStore();
const { list_Graficas_Genero_Edad_Filtrado } = storeToRefs(graficasStore);
const series = ref([]);

onMounted(() => {
  rellenar_grafica();
});

watch(list_Graficas_Genero_Edad_Filtrado, (val) => {
  series.value = [];
  if (val != null) {
    rellenar_grafica();
  }
});

const rellenar_grafica = () => {
  const mujeres = list_Graficas_Genero_Edad_Filtrado.value.filter(
    (candidato) => candidato.sexo === "Mujer"
  );
  const hombres = list_Graficas_Genero_Edad_Filtrado.value.filter(
    (candidato) => candidato.sexo === "Hombre"
  );
  const noBinario = list_Graficas_Genero_Edad_Filtrado.value.filter(
    (candidato) => candidato.sexo === "No binario"
  );

  series.value.push(mujeres.length, hombres.length, noBinario.length);
};

const colors = ["#dcbadb", "#af7ead", "#a46aba"];

const chartOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  colors: colors,

  style: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  labels: ["Mujer", "Hombre", "No binario"],
  plotOptions: {
    bar: {
      columnWidth: "45%",
      distributed: true,
    },
  },
  legend: {
    show: true,
  },
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

onMounted(() => {
  setTimeout(() => {
    let spans = document.querySelectorAll(".apexcharts-legend-text");
    for (let span of spans) {
      span.style.fontSize = "18px";
    }
  }, 1000);
});
</script>

<style scoped>
.apexcharts-legend-text {
  font-size: 20px !important;
}
</style>
