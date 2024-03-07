<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
            <q-breadcrumbs-el icon="bar_chart" label="Numeralia" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <filtros v-if="$q.screen.xs" class="q-mb-md" />
    <PresidenciaSindicatura />
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import PresidenciaSindicatura from "../components/presidenciaSindicaturiaCharts.vue";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCardsStore } from "src/stores/cards-store";
import filtros from "../../../components/filtrosComp.vue";

//---------------------------------------------------------------------------------

const cardsStore = useCardsStore();

//---------------------------------------------------------------------------------

onMounted(() => {
  cardsStore.actualizarMenu(true);
});

//---------------------------------------------------------------------------------
</script>
<style></style>
