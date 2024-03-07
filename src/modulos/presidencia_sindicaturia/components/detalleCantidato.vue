<template>
  <!---------------------------BANNER--------------------------->
  <banner>
    <template v-slot:icono>
      <q-icon name="error" color="purple-ieen" />
    </template>
    <template v-slot:contenido>
      La información es proporcionada por las personas candidatas a las
      Presidencias y Sindicaturas del Estado de Nayarit, por lo que su contenido
      es responsabilidad de los actores políticos. El Instituto Estatal
      Electoral de Nayarit únicamente apoya para su difusión.
    </template>
  </banner>
  <br />
  <!---------------------------BUTTON BACK AND PDF--------------------------->
  <div class="row">
    <div
      class="col-lg-10 col-md-10 col-sm-10 col-xs-12 text-subtitle1 text-bold"
    >
      <q-btn
        outline
        style="color: #673e84"
        label="Regresar"
        :to="{ name: 'PYScards', params: { eleccion_Id: props.eleccion_Id } }"
        icon="reply"
      />
      Municipio de {{ candidato.municipio }}
    </div>
    <q-btn
      @click="
        pdf(
          props.id,
          candidato.selection == 'prop'
            ? 0
            : candidato.selection == 'sup'
            ? 1
            : candidato.selection == 'propSin'
            ? 2
            : 3
        )
      "
      :disable="activar_pdf == true"
      flat
      icon="picture_as_pdf"
      class="text-purple-ieen"
      >Descargar</q-btn
    >
  </div>
  <!---------------------------CANDIDATE DETAIL--------------------------->
  <div class="row">
    <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 q-pa-md">
      <div class="shadow-7" style="border-radius: 20px">
        <div class="row">
          <div class="col-12 q-pa-md" align="center">
            <q-avatar size="600%" v-if="candidato.validado == true">
              <q-img :src="candidato.url_Foto" />
            </q-avatar>
            <q-avatar size="600%" v-else>
              <q-img
                v-if="candidato.sexo == 'Mujer'"
                src="../../../assets/avatarmujer.jpg"
              />
              <q-img
                v-else-if="candidato.sexo == 'Hombre'"
                src="../../../assets/avatarHombre.jpg"
              />
            </q-avatar>
          </div>
          <div class="col-12 q-pb-md" align="center">
            <q-avatar style="width: auto; height: 35px" square>
              <img
                :src="
                  candidato.is_Coalicion == true
                    ? candidato.url_Logo_Coalicion
                    : candidato.logo_Partido
                "
                alt=""
              />
            </q-avatar>

            <div class="text-subtitle1 text-bold text-grey-9 q-pa-xs">
              {{ candidato.nombre_Completo }}
            </div>

            <div class="text-subtitle2 text-center text-grey-9 q-pb-lg">
              {{
                candidato.is_Coalicion == true
                  ? candidato.coalicion
                  : candidato.partido
              }}
            </div>
            <q-btn-dropdown
              color="purple-ieen"
              :label="
                candidato.selection == 'prop'
                  ? 'Presidencia propietaria'
                  : candidato.selection == 'sup'
                  ? 'Presidencia suplente'
                  : candidato.selection == 'propSin'
                  ? 'Sindicatura propietaria'
                  : 'Sindicatura suplente' || dropdownOptions[0].label
              "
            >
              <q-list>
                <q-item
                  v-for="option in dropdownOptions"
                  :key="option.value"
                  clickable
                  @click="selectOption(candidato, option, candidato.selection)"
                  v-close-popup
                >
                  <q-item-section>
                    <q-item-label>{{ option.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
      <q-list v-if="$q.screen.xs" dark padding bordered class="rounded-borders">
        <q-expansion-item
          icon="manage_search"
          class="bg-grey-3 text-justify"
          style="border-radius: 20px"
          :label="tab"
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
              v-for="tab in tabs"
              :key="tab"
              :name="tab"
              :label="tab"
              @click="open_tab = !open_tab"
            />
          </q-tabs>
        </q-expansion-item>
      </q-list>
      <div class="q-pa-xs">
        <div class="q-gutter-y-md">
          <q-card>
            <q-tabs
              v-if="!$q.screen.xs"
              v-model="tab"
              dense
              class="text-grey"
              active-color="purple-ieen"
              indicator-color="purple-ieen"
              align="justify"
              narrow-indicator
            >
              <q-tab
                v-for="tab in tabs"
                :key="tab"
                :name="tab"
                :label="tab"
                @click="open_tab = !open_tab"
              />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="DATOS GENERALES">
                <div class="row">
                  <div
                    class="col-lg-3 col-md-12 col-sm-12 col-xs-12 q-pb-md"
                    align="center"
                  >
                    <q-avatar size="180px" v-if="candidato.validado == true">
                      <q-img :src="candidato.url_Foto" />
                    </q-avatar>
                    <q-avatar size="180px" v-else>
                      <q-img
                        v-if="candidato.sexo == 'Mujer'"
                        src="../../../assets/avatarmujer.jpg"
                      />
                      <q-img
                        v-else-if="candidato.sexo == 'Hombre'"
                        src="../../../assets/avatarHombre.jpg"
                      />
                    </q-avatar>
                    <div class="text-subtitle2 text-center text-grey-9 q-pb-lg">
                      {{
                        candidato.is_Coalicion == true
                          ? candidato.coalicion
                          : candidato.partido
                      }}
                    </div>
                  </div>
                  <div
                    :class="
                      $q.screen.xs
                        ? 'text-center col-lg-4 col-md-6 col-sm-12 col-xs-12'
                        : 'col-lg-4 col-md-6 col-sm-12 col-xs-12'
                    "
                  >
                    <div class="text-h6 text-grey-9">
                      Nombre (propietaria/o):
                    </div>
                    <div class="text-subtitle1">
                      {{ candidato.nombre_Completo }}
                    </div>
                    <div class="text-h6 text-grey-9">Edad:</div>
                    <div class="text-subtitle1">
                      {{ candidato.edad }}
                    </div>
                    <div class="text-h6 text-grey-9">Sexo:</div>
                    <div class="text-subtitle1">
                      {{ candidato.sexo }}
                    </div>
                  </div>
                  <div
                    :class="
                      $q.screen.xs
                        ? 'text-center col-lg-4 col-md-6 col-sm-12 col-xs-12'
                        : 'col-lg-4 col-md-6 col-sm-12 col-xs-12'
                    "
                  >
                    <div class="text-h6 text-grey-9">Tipo de elección:</div>
                    <div class="text-subtitle1">
                      {{ candidato.tipo_Eleccion }} -
                      {{ candidato.tipo_Candidato }}
                    </div>
                    <div class="text-h6 text-grey-9">Cargo:</div>
                    <div class="text-subtitle1">
                      {{
                        candidato.selection == "prop"
                          ? "Propietario"
                          : candidato.selection == "sup"
                          ? "Suplente"
                          : candidato.selection == "propSin"
                          ? "Propietario sindico"
                          : "Suplente sindico"
                      }}
                    </div>
                    <div class="text-h6 text-grey-9">Estado:</div>
                    <div class="text-subtitle1 text-grey-9">Nayarit</div>
                    <div class="text-h6 text-grey-9">Número de fórmula:</div>
                    <div class="text-subtitle1">{{ candidato.id }}</div>
                    <br />
                    <div class="text-grey-9">
                      <q-icon name="location_on" />{{
                        datos_Generales.domicilio
                      }}
                      <br />
                      <q-icon name="call" /> {{ datos_Generales.telefono }}
                      <br />
                      <q-icon name="email" /> {{ datos_Generales.email }}
                    </div>
                    <br />
                    <div>
                      <q-btn flat round dense>
                        <i
                          class="fa-brands fa-facebook fa-2xl"
                          style="color: #673e84"
                        >
                          <q-tooltip>{{ datos_Generales.facebook }}</q-tooltip>
                        </i>
                      </q-btn>
                      <q-btn flat round dense>
                        <i
                          class="fa-brands fa-instagram fa-2xl"
                          style="color: #673e84"
                        >
                          <q-tooltip>{{
                            datos_Generales.instagram
                          }}</q-tooltip></i
                        >
                      </q-btn>
                      <q-btn flat round dense>
                        <i
                          class="fa-brands fa-twitter fa-2xl"
                          style="color: #673e84"
                        >
                          <q-tooltip>{{ datos_Generales.twitter }}</q-tooltip>
                        </i>
                      </q-btn>
                      <q-btn flat round dense>
                        <i
                          class="fa-brands fa-tiktok fa-2xl"
                          style="color: #673e84"
                        >
                          <q-tooltip>{{ datos_Generales.tik_Tok }}</q-tooltip>
                        </i>
                      </q-btn>
                    </div>
                  </div>
                </div>
                <div v-if="candidato.consentimiento_URL != null">
                  <div
                    v-if="candidato.indigena == 'Sí'"
                    class="col-12 bg-grey-5"
                    style="border-radius: 5px; color: white"
                  >
                    <div class="text-subtitle2" align="center">
                      <q-icon name="check_circle" color="pink" /> Candidatura
                      con autoadscripción indígena
                    </div>
                  </div>
                  <div class="q-pb-xs"></div>
                  <div
                    v-if="candidato.discapacidad == 'Sí'"
                    class="col-12 bg-grey-5"
                    style="border-radius: 5px; color: white"
                  >
                    <div class="text-subtitle2" align="center">
                      <q-icon name="check_circle" color="pink" /> Candidatura
                      con discapacidad
                    </div>
                  </div>
                  <div class="q-pb-xs"></div>
                  <div
                    v-if="candidato.afromexicano == 'Sí'"
                    class="col-12 bg-grey-5"
                    style="border-radius: 5px; color: white"
                  >
                    <div class="text-subtitle2" align="center">
                      <q-icon name="check_circle" color="pink" /> Candidatura
                      afromexicana
                    </div>
                  </div>
                  <div class="q-pb-xs"></div>
                  <div
                    v-if="candidato.lgbttiq == 'Sí'"
                    class="col-12 bg-grey-5"
                    style="border-radius: 5px; color: white"
                  >
                    <div class="text-subtitle2" align="center">
                      <q-icon name="check_circle" color="pink" /> Candidatura
                      perteneciente a la comunidad LGBTTTIQ+
                    </div>
                  </div>
                  <div class="q-pb-xs"></div>
                  <div
                    v-if="candidato.poblacion_Joven == 'Sí'"
                    class="col-12 bg-grey-5"
                    style="border-radius: 5px; color: white"
                  >
                    <div class="text-subtitle2" align="center">
                      <q-icon name="check_circle" color="pink" /> Candidatura
                      perteneciente a la población de personas jóvenes
                    </div>
                  </div>
                  <div class="q-pb-xs"></div>
                  <div
                    v-if="candidato.poblacion_Mayor == 'Sí'"
                    class="col-12 bg-grey-5"
                    style="border-radius: 5px; color: white"
                  >
                    <div class="text-subtitle2" align="center">
                      <q-icon name="check_circle" color="pink" /> Candidatura
                      perteneciente a la población de personas mayores
                    </div>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="HISTORIA PROFESIONAL Y/O LABORAL">
                <div v-if="candidato.validado == false">
                  Aquí se mostrará la información capturada por la candidatura.
                </div>
                <div v-else>
                  <hr color="purple" />
                  <div class="text-subtitle2 text-purple-3" align="center">
                    <q-icon name="school" /> ESTUDIOS
                  </div>
                  <hr color="purple" />
                  <div class="row q-pa-sm">
                    <div class="col">
                      <div class="text-h6">Grado maximo de estudios:</div>
                      <div class="text-subtitle1">
                        {{ datos_Generales.grado_Maximo_Estudios }}
                      </div>
                    </div>
                    <div class="col">
                      <div class="text-h6">Estatus:</div>
                      <div class="text-subtitle1">
                        {{ datos_Generales.estatus_Grado_Estudios }}
                      </div>
                    </div>
                  </div>
                  <br />
                  <hr color="purple" />
                  <div class="text-subtitle2 text-purple-3" align="center">
                    <q-icon name="import_contacts" /> CURSOS
                  </div>
                  <hr color="purple" />
                  <div class="q-pa-sm text-subtitle1 text-justify">
                    {{
                      formacion.formacion == null
                        ? "En este apartado se mostrará la información academica que el candidato registro en el cuestionario curricular"
                        : formacion.formacion
                    }}
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="TRAYECTORIA POLÍTICA Y/O PARTICIPACIÓN SOCIAL">
                <div v-if="candidato.validado == false">
                  Aquí se mostrará la información capturada por la candidatura.
                </div>
                <div v-else class="text-subtitle1 text-justify">
                  {{
                    datos_Generales.trayectoria == null
                      ? "En este apartado se mostrará los motivos de ocupar un cargo público que el candidato registro en el cuestionario curricular"
                      : datos_Generales.trayectoria
                  }}
                </div>
              </q-tab-panel>
              <q-tab-panel name="¿POR QUÉ QUIERO OCUPAR UN CARGO PÚBLICO?">
                <div v-if="candidato.validado == false">
                  Aquí se mostrará la información capturada por la candidatura.
                </div>
                <div v-else class="text-subtitle1 text-justify">
                  {{
                    datos_Generales.motivo_Cargo_Publico == null
                      ? "En este apartado se mostrará los motivos de ocupar un cargo público que el candidato registro en el cuestionario curricular"
                      : datos_Generales.motivo_Cargo_Publico
                  }}
                </div>
              </q-tab-panel>
              <q-tab-panel name="¿POR QUÉ QUIERO OCUPAR UN CARGO PÚBLICO?">
                <div v-if="candidato.validado == false">
                  Aquí se mostrará la información capturada por la candidatura.
                </div>
                <div v-else class="text-subtitle1 text-justify">
                  {{
                    datos_Generales.motivo_Cargo_Publico == null
                      ? "En este apartado se mostrará los motivos de ocupar un cargo público que el candidato registro en el cuestionario curricular"
                      : datos_Generales.motivo_Cargo_Publico
                  }}
                </div>
              </q-tab-panel>
              <q-tab-panel name="PROPUESTAS">
                <div v-if="candidato.validado == false">
                  Aquí se mostrará la información capturada por la candidatura.
                </div>
                <div v-else>
                  <div class="text-subtitle1 text-center text-bold q-pb-md">
                    PRINCIPALES PROPUESTAS
                  </div>
                  <hr color="purple" />
                  <div class="text-subtitle2 text-purple-3" align="center">
                    <q-icon name="import_contacts" /> PROPUESTA 1
                  </div>
                  <hr color="purple" />
                  <div class="q-pa-sm text-subtitle1 text-justify">
                    {{
                      list_Propuestas.length != 0
                        ? list_Propuestas[0].propuesta
                        : "En este apartado se mostrará la propuesta 1 por la candidatura en el cuestionario curricular"
                    }}
                  </div>
                  <hr color="purple" />
                  <div class="text-subtitle2 text-purple-3" align="center">
                    <q-icon name="import_contacts" /> PROPUESTA 2
                  </div>
                  <hr color="purple" />
                  <div class="q-pa-sm text-subtitle1 text-justify">
                    {{
                      list_Propuestas.length != 0
                        ? list_Propuestas[1].propuesta
                        : "En este apartado se mostrará la propuesta 2 por la candidatura en el cuestionario curricular"
                    }}
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="PROPUESTA EN MATERIA DE GÉNERO">
                <div v-if="candidato.validado == false">
                  Aquí se mostrará la información capturada por la candidatura.
                </div>
                <div v-else>
                  <hr color="purple" />
                  <div class="text-subtitle2 text-purple-3" align="center">
                    <q-icon name="import_contacts" /> PROPUESTA EN MATERIA DE
                    GÉNERO O, EN SU CASO, DEL GRUPO EN SITUACIÓN DE
                    DISCRIMINACIÓN QUE REPRESENTO
                  </div>
                  <hr color="purple" />
                  <div class="q-pa-sm text-subtitle1 text-justify">
                    {{
                      datos_Generales.propuesta_Genero == null
                        ? "En este apartado se mostrará la propuesta en materia de género que el candidato registro en el cuestionario curricular"
                        : datos_Generales.propuesta_Genero
                    }}
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar, QSpinnerCube } from "quasar";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCardsStore } from "src/stores/cards-store";
import banner from "../../../components/bannerComp.vue";
import ReporteConoceles01 from "src/helpers/Conoceles-01";

//---------------------------------------------------------------------------------

const $q = useQuasar();
const candidatosStore = useCardsStore();
const { candidato, formacion, datos_Generales, list_Propuestas } =
  storeToRefs(candidatosStore);
const tab = ref("DATOS GENERALES");
const tabs = ref([
  "DATOS GENERALES",
  "HISTORIA PROFESIONAL Y/O LABORAL",
  "TRAYECTORIA POLÍTICA Y/O PARTICIPACIÓN SOCIAL",
  "¿POR QUÉ QUIERO OCUPAR UN CARGO PÚBLICO?",
  "PROPUESTAS",
  "PROPUESTA EN MATERIA DE GÉNERO",
]);
const dropdownOptions = [
  { label: "Presidencia propietaria", value: "prop" },
  { label: "Presidencia suplente", value: "sup" },
  { label: "Sindicatura propietaria", value: "propSin" },
  { label: "Sindicatura suplente", value: "supSin" },
];
const open_tab = ref(false);
const activar_pdf = ref(false);
const props = defineProps({
  id: { type: String, required: true },
  puesto: { type: String, required: true },
  eleccion_Id: { type: String, required: true },
});

//---------------------------------------------------------------------------------

onMounted(() => {
  candidatosStore.actualizarButtonColor(true);
});

//---------------------------------------------------------------------------------

const selectOption = async (candidato, option, val) => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento por favor...",
    messageColor: "black",
  });
  candidato.selection = option.value;
  candidato.label = option.label;
  candidatosStore.initDatosGenerales();
  await candidatosStore.loadCandidatoById(
    props.id,
    val == "prop" ? 1 : val == "sup" ? 2 : val == "propSin" ? 3 : 4
  );
  await candidatosStore.loadFormacionAcademicaById(
    props.id,
    val == "prop" ? 1 : val == "sup" ? 2 : val == "propSin" ? 3 : 4
  );
  await candidatosStore.loadDatosGeneralesById(
    props.id,
    val == "prop" ? 1 : val == "sup" ? 2 : val == "propSin" ? 3 : 4
  );
  await candidatosStore.loadPropuestasByCandidato(
    props.id,
    val == "prop" ? 1 : val == "sup" ? 2 : val == "propSin" ? 3 : 4
  );
  $q.loading.hide();
};

const pdf = async (id, puesto) => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento por favor...",
    messageColor: "black",
  });
  await ReporteConoceles01(id, puesto);
  activar_pdf.value = true;
  setTimeout(() => {
    activar_pdf.value = false;
  }, 5000);
  $q.loading.hide();
};

//---------------------------------------------------------------------------------
</script>
<style></style>
