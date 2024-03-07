<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
            <q-breadcrumbs-el
              icon="recent_actors"
              label="Candidatas y candidatos"
            />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <filtros v-if="$q.screen.xs" class="q-mb-md" />
    <CardsPresidenciaSindicauria :eleccion_Id="props.eleccion_Id" />
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { defineProps } from "vue";
import CardsPresidenciaSindicauria from "../components/cardsPresidenciaSindicaturia.vue";
import filtros from "../../../components/filtrosComp.vue";

//---------------------------------------------------------------------------------

const $q = useQuasar();
const props = defineProps({
  eleccion_Id: { type: String, required: true },
});

//---------------------------------------------------------------------------------
</script>

<style></style>
