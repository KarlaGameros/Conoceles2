<template>
  <!---------------------------BANNER--------------------------->
  <banner>
    <template v-slot:icono>
      <q-icon name="search" color="purple-ieen" />
    </template>
    <template v-slot:contenido>
      Consulte la información proporcionada de manera obligatoria por las
      candidaturas que participan en la contienda electoral local 2024. La
      información es responsabilidad de los partidos políticos. El Instituto
      únicamente apoya para su difusión.
    </template>
  </banner>
  <br />

  <!---------------------------CHARTS--------------------------->
  <div
    v-if="list_Graficas_Genero_Edad.length == 0"
    class="q-pa-md example-row-equal-width"
  >
    <div class="row">
      <q-spinner-cube color="pink" size="5.5em" />
    </div>
  </div>
  <div v-else class="q-pa-md example-row-equal-width">
    <div class="row">
      <div
        v-if="list_Graficas_Genero_Edad_Filtrado.length == 0"
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 flex-center"
      >
        <q-spinner-cube color="pink" size="5.5em" />
      </div>
      <div v-else class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-lg">
        <div class="text-h6 q-mb-md">Rango de edades</div>
        <chartRangoEdad />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="text-h6 q-mb-md">Género</div>
        <chartSexo class="flex flex-center" />
      </div>
    </div>
  </div>
  <br />
  <banner v-if="!$q.screen.xs && !$q.screen.sm && !$q.screen.md">
    <template v-slot:icono>
      <q-icon name="manage_search" color="purple-ieen" />
    </template>
    <template v-slot:contenido>Consulta más gráficas a continuación </template>
  </banner>
  <br />
  <div>
    <q-list
      v-if="$q.screen.xs || $q.screen.sm || $q.screen.md"
      dark
      padding
      bordered
      class="rounded-borders"
    >
      <q-expansion-item
        icon="manage_search"
        class="bg-grey-3 text-justify"
        style="border-radius: 20px"
        label="Consulta más gráficas a continuación "
        header-class="text-purple"
        expand-icon-class="text-purple"
        v-model="open_tab"
      >
        <q-tabs
          v-model="tab"
          vertical
          class="text-purple"
          active-bg-color="purple-3"
          active-color="white"
        >
          <q-tab
            @click="open_tab = !open_tab"
            name="grado_academico"
            label="Grado académico"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="nivel_ingresos"
            label="Nivel de ingresos"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="cand_indigenas"
            label="Candidaturas indígenas"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="cand_discapacidad"
            label="Candidaturas con discapacidad"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="cand_afromexicanas"
            label="Candidaturas afromexicanas"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="cand_div_sex"
            label="Candidaturas de la diversidad sexual"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="cand_mig"
            label="Candidaturas migrantes"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="cand_jov"
            label="Candidaturas de personas jóvenes"
          />
          <q-tab
            @click="open_tab = !open_tab"
            name="cand_mayores"
            label="Candidaturas de personas mayores"
          />
        </q-tabs>
      </q-expansion-item>
    </q-list>
    <div
      style="height: 500px"
      class="flex-center"
      v-if="list_Graficas_By_Eleccion.length == 0"
    >
      <q-spinner-cube color="pink" size="5.5em" />
    </div>
    <q-splitter v-else unit="px" style="height: 500px">
      <template
        v-if="!$q.screen.xs && !$q.screen.sm && !$q.screen.md"
        v-slot:before
      >
        <q-tabs
          v-model="tab"
          vertical
          class="text-purple"
          active-bg-color="purple-3"
          active-color="white"
        >
          <q-tab name="grado_academico" label="Grado académico" />
          <q-tab name="nivel_ingresos" label="Nivel de ingresos" />
          <q-tab name="cand_indigenas" label="Candidaturas indígenas" />
          <q-tab
            name="cand_discapacidad"
            label="Candidaturas con discapacidad"
          />
          <q-tab name="cand_afromexicanas" label="Candidaturas afromexicanas" />
          <q-tab
            name="cand_div_sex"
            label="Candidaturas de la diversidad sexual"
          />
          <q-tab name="cand_mig" label="Candidaturas migrantes" />
          <q-tab name="cand_jov" label="Candidaturas de personas jóvenes" />
          <q-tab name="cand_mayores" label="Candidaturas de personas mayores" />
        </q-tabs>
      </template>
      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel
            name="grado_academico"
            class="col-lg-4 col-md-6 col-sm-6 col-xs-12"
          >
            <div class="text-h6 q-mb-md">Grado académico</div>
            <chartGradoAcademico class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="nivel_ingresos">
            <div class="text-h6 q-mb-md">Nivel de ingresos</div>
            <chartNivelIngresos class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="cand_indigenas">
            <div class="text-h6 q-mb-md">Candidaturas Indígenas</div>
            <chartCandIndigenas class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="cand_discapacidad">
            <div class="text-h6 q-mb-md">Candidaturas con discapacidad</div>
            <chartCandDiscapacidad class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="cand_afromexicanas">
            <div class="text-h6 q-mb-md">Candidaturas Afromexicanas</div>
            <chartCandAfromexicanas class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="cand_div_sex">
            <div class="text-h6 q-mb-md">
              Candidaturas de la diversidad sexual
            </div>
            <chartCandDivSexual class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="cand_mig">
            <div class="text-h6 q-mb-md">Candidaturas migrantes</div>
            <chartCandMigrantes class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="cand_jov">
            <div class="text-h6 q-mb-md">Candidaturas de personas jóvenes</div>
            <chartCandJov class="flex flex-center" />
          </q-tab-panel>

          <q-tab-panel name="cand_mayores">
            <div class="text-h6 q-mb-md">Candidaturas de personas mayores</div>
            <chartCandMayores class="flex flex-center" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
  <banner>
    <template v-slot:icono>
      <q-icon name="error" color="purple-ieen" />
    </template>
    <template v-slot:contenido>
      Los datos aquí presentados corresponden al número de personas candidatas
      (propietarias y suplentes) que respondieron el "Cuestionario de
      Identidad", este contiene preguntas en ocho dimensiones relativas a la
      autoidentificación con algún grupo en situación de discriminación; lo que
      implica necesariamente que hayan sido registradas en el marco de una
      acción afirmativa.
    </template>
  </banner>
  <div class="text-h6 q-mb-md q-pt-lg">
    Registro curricular
    <div
      style="height: 500px"
      class="flex-center"
      v-if="list_Graficas_By_Eleccion.length == 0"
    >
      <q-spinner-cube color="pink" size="5.5em" />
    </div>
    <chartAvanceCurricular v-else />
  </div>

  <div class="q-pt-md text-right text-subtitle2">
    La presente sección se actualizará conforme a los plazos establecidos en el
    <a
      target="_blank"
      style="color: #e710b9"
      class="text-bold"
      href="https://repositoriodocumental.ine.mx/xmlui/handle/123456789/141976"
      >INE/CG616/2022.</a
    >
  </div>
</template>

<script setup>
import { useCardsStore } from "src/stores/cards-store";
import { useGraficasStore } from "src/stores/graficas-store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import chartRangoEdad from "../../../charts/chartRangoEdad.vue";
import chartGradoAcademico from "../../../charts/chartGradoAcademico.vue";
import chartSexo from "../../../charts/chartSexo.vue";
import chartNivelIngresos from "../../../charts/chartNivelIngresos.vue";
import chartCandIndigenas from "../../../charts/chartCandidaturaIndigenas.vue";
import chartCandDiscapacidad from "../../../charts/chartCandDiscapacidad.vue";
import chartCandAfromexicanas from "../../../charts/chartCandAfromexicacas.vue";
import chartCandDivSexual from "../../../charts/chartCandDivSexual.vue";
import chartCandMigrantes from "../../../charts/chartMigrantes.vue";
import chartCandJov from "../../../charts/chartCandJovenes.vue";
import chartCandMayores from "../../../charts/chartCandMayores.vue";
import banner from "../../../components/bannerComp.vue";
import chartAvanceCurricular from "src/charts/chartAvanceCurricular.vue";

//---------------------------------------------------------------------------------

const $q = useQuasar();
const useCards = useCardsStore();
const tab = ref("grado_academico");
const open_tab = ref(false);
const graficasStore = useGraficasStore();
const {
  list_Graficas_By_Eleccion,
  list_Graficas_Genero_Edad,
  list_Graficas_Genero_Edad_Filtrado,
} = storeToRefs(graficasStore);

//---------------------------------------------------------------------------------

onMounted(() => {
  useCards.actualizarButtonColor(false);
});

//---------------------------------------------------------------------------------
</script>

<style></style>
