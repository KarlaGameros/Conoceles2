<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
            <q-breadcrumbs-el
              label="Candidatas y candidatos"
              icon="recent_actors"
              :to="{ name: 'REGcards' }"
            />
            <q-breadcrumbs-el label="Ficha candidatura" icon="library_books" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <filtros v-if="$q.screen.xs" class="q-mb-md" />
    <DetalleCandidatosRegidurias
      :id="props.id"
      :puesto="props.puesto"
      :eleccion_Id="props.eleccion_Id"
    />
  </q-page>
</template>

<script setup>
import { useCardsStore } from "src/stores/cards-store";
import { onMounted, ref, watch } from "vue";
import DetalleCandidatosRegidurias from "../components/detalleCandidatosRegidurias.vue";
import filtros from "../../../components/filtrosComp.vue";

//---------------------------------------------------------------------------------

const cardsStore = useCardsStore();
const props = defineProps({
  id: { type: String, required: true },
  puesto: { type: String, required: true },
  eleccion_Id: { type: String, required: true },
});

//---------------------------------------------------------------------------------

onMounted(() => {
  cargarData();
});

const cargarData = async () => {
  cardsStore.actualizarMenu(true);
  await cardsStore.loadCandidatoById(props.id, props.puesto);
  await cardsStore.loadFormacionAcademicaById(props.id, props.puesto);
  await cardsStore.loadDatosGeneralesById(props.id, props.puesto);
  await cardsStore.loadPropuestasByCandidato(props.id, props.puesto);
};
//---------------------------------------------------------------------------------
</script>

<style></style>
