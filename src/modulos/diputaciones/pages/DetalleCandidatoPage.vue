<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
            <q-breadcrumbs-el
              icon="recent_actors"
              label="Candidatas y candidatos"
              :to="{ name: 'DIPcards' }"
            />
            <q-breadcrumbs-el label="Ficha candidatura" icon="library_books" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <filtros v-if="$q.screen.xs" class="q-mb-md" />
    <DetalleCantidato
      :id="props.id"
      :puesto="props.puesto"
      :eleccion_Id="props.eleccion_Id"
    />
  </q-page>
</template>

<script setup>
import { onMounted, defineProps } from "vue";
import { useCardsStore } from "src/stores/cards-store";
import DetalleCantidato from "../components/detalleCantidato.vue";
import filtros from "../../../components/filtrosComp.vue";

//---------------------------------------------------------------------------------

const cardsStore = useCardsStore();
const props = defineProps({
  id: { type: Number, required: true },
  puesto: { type: Number, required: true },
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
