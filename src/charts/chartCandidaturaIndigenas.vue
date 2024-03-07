<template>
  <apexchart
    width="450"
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
  let filter = list_Graficas_Filtrado.value.filter(
    (candidato) =>
      candidato.partido_Id == 9 &&
      candidato.tipo_Candidato == "RP" &&
      candidato.sexo == "Hombre" &&
      candidato.avance_Curricular == 100
  );
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
  labels: ["Si", "No", "Prefiero no contestar"],
  colors: ["#af7ead", "#e4c0ed", "#dcbadb"],
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return [name, val.toFixed(1) + "%"];
    },
  },
  legend: {
    show: false,
  },
};
</script>

<style></style>
