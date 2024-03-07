<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
            <q-breadcrumbs-el icon="bar_chart" label="Numeralia" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <filtros v-if="$q.screen.xs" class="q-mb-md" />
    <ChartsRegidurias />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useCardsStore } from "src/stores/cards-store";
import filtros from "../../../components/filtrosComp.vue";
import ChartsRegidurias from "../components/chartsRegidurias.vue";
//---------------------------------------------------------------------------------

const cardsStore = useCardsStore();

//---------------------------------------------------------------------------------

onMounted(() => {
  cardsStore.actualizarMenu(true);
});

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
</script>

<style></style>
