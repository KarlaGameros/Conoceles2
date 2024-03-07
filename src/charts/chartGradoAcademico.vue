<template>
  <apexchart
    type="pie"
    width="550"
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
  let sinEstudios = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Sin estudios"
  );
  let primaria = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Primaria"
  );
  let secundaria = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Secundaria"
  );
  let preparatoria = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Preparatoria"
  );
  let tecnica = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Técnica"
  );
  let licenciatura = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Licenciatura"
  );
  let maestria = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Maestría"
  );
  let doctorado = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Doctorado"
  );
  let especialidad = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Especialidad"
  );
  let postdoctorado = list_Graficas_Filtrado.value.filter(
    (candidato) => candidato.grado_Maximo_Studio == "Postdoctorado"
  );

  series.value.push(
    sinEstudios.length,
    primaria.length,
    secundaria.length,
    preparatoria.length,
    tecnica.length,
    licenciatura.length,
    maestria.length,
    doctorado.length,
    especialidad.length,
    postdoctorado.length
  );
};

const colors = [
  "#af7ead",
  "#d1b3ef",
  "#dcbadb",
  "#f3e0f4",
  "#e7c7e9",
  "#dbaede",
  "#e8a9d4",
  "#e8ccf7",
  "#fbc9fb",
];

const chartOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  colors: colors,
  labels: [
    "Sin estudios",
    "Primaria",
    "Secundaria",
    "Preparatoria",
    "Técnica",
    "Licenciatura",
    "Maestría",
    "Doctorado",
    "Especialidad",
    "Postdoctorado",
  ],
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
</script>

<style></style>
