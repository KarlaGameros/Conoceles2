<template>
  <q-layout :view="$q.screen.xs ? 'hHh lpR lff' : 'hHh LpR fFf'">
    <q-header elevated class="bg-pink-ieen" height-hint="98">
      <div class="row bg-grey-3">
        <div class="col-lg-1 col-md-2 col-sm-3 col-xs-3 q-pl-xl q-pt-md">
          <a href="https://ieenayarit.org/" target="_black">
            <q-img v-if="!$q.screen.xs" src="../assets/IEEN300.png"></q-img>
          </a>
        </div>
        <div
          :class="
            !$q.screen.xs
              ? 'col-lg-9 col-md-8 col-sm-6 col-xs-6 q-pr-xl q-pt-md'
              : 'col-12'
          "
        >
          <div class="text-h5 text-center text-bold text-grey-8">
            Candidatas y Candidatos,
            <b class="text-pink-conoceles">Conóceles</b>
          </div>
          <div class="text-h6 text-center text-grey-8 text-bold">
            Proceso Electoral Local Ordinario
            <b class="text-pink-conoceles">2024</b>
          </div>
        </div>
        <div
          v-if="!$q.screen.xs"
          class="col-lg-2 col-md-2 col-sm-3 col-xs-3 q-pr-xl"
        >
          <q-img src="../assets/Conoceles2@300x.png"></q-img>
        </div>
      </div>
      <q-toolbar>
        <div class="row">
          <q-btn
            v-if="isHomePage || $q.screen.xs"
            dense
            class="absolute-left"
            flat
            round
            icon="menu"
            @click="toggleLeftDrawer"
          />
          <!---------------------------HEADER TABS--------------------------->
          <div
            v-if="!$q.screen.xs"
            class="absolute-center col-lg-8 col-md-8 col-sm-8 col-xs-9"
          >
            <q-tabs v-model="tab">
              <q-route-tab :to="{ name: 'inicio' }" name="inicio" icon="home" />

              <q-tab
                v-model="tab"
                v-for="eleccion in list_Tipos_Elecciones"
                :key="eleccion.siglas"
                :name="eleccion.siglas"
                :label="eleccion.nombre"
                @click="isTabSelected(eleccion.siglas, eleccion.id)"
              />
            </q-tabs>
          </div>
          <!---------------------------HEADER ISSMALLSREEN--------------------------->
          <div class="absolute-center" v-else>
            <strong>{{
              tab == "DIP"
                ? "DIPUTACIONES"
                : tab == "PYS"
                ? "PRESIDENCIA Y SINDICATURA"
                : tab == "REG"
                ? "REGIDURIAS"
                : "INICIO"
            }}</strong>
          </div>
          <div
            v-if="$q.screen.xs || $q.screen.sm"
            class="absolute-right q-pa-xs"
          >
            <q-btn flat @click="exportarBD()">
              <i class="fa-solid fa-database fa-2xl" style="color: #ffffff"></i>
              <q-tooltip>Exportar base de datos</q-tooltip>
            </q-btn>
          </div>
          <div
            v-if="!$q.screen.xs && !$q.screen.sm"
            class="absolute-right q-pa-xs"
          >
            Exportar base de datos

            <q-btn @click="exportarBD()" flat>
              <i class="fa-solid fa-database fa-2xl" style="color: #ffffff"></i>
              <q-tooltip>Exportar base de datos</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-if="isHomePage || $q.screen.xs"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :class="{
        'bg-grey-3': $q.screen.xs,
      }"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); border-right: 1px solid #ddd"
      >
        <!---------------------------DRAWER NORMAL--------------------------->
        <q-list v-if="!$q.screen.xs">
          <q-item>
            <q-item-section class="bg-grey-3" style="border-radius: 10px">
              <q-item-label
                class="text-h5 label-title text-bold q-pa-xs"
                style="color: gray"
                >Consulta
              </q-item-label>
              <div class="text-subtitle2 q-pa-xs" style="color: grey">
                Selecciona el reporte que deseas consultar:
              </div>
              <q-btn
                rounded
                @click="activaNumeralia(tab)"
                :to="{
                  name: `${tab}`,
                  params: { eleccion_Id: tab_Id },
                }"
                label="Numeralia"
                :class="buttons == false ? 'bg-pink-ieen' : 'bg-pink-ieen-3'"
              />
              <div class="q-pb-xs"></div>
              <q-btn
                rounded
                :to="{
                  name: `${tab}cards`,
                  params: { eleccion_Id: tab_Id },
                }"
                label="Candidatas y candidatos"
                :class="buttons ? 'bg-pink-ieen' : 'bg-pink-ieen-3'"
                @click="activaCandidatos(tab)"
              />
            </q-item-section>
          </q-item>
          <!---------------FILTERS--------------->
          <q-item v-if="tab != 'PYS'">
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold">
                Cargo
              </q-item-label>
              <q-select
                dense
                color="purple"
                rounded
                outlined
                bg-color="grey-3"
                v-model="cargo_Id"
                :options="list_Cargos"
              />
            </q-item-section>
          </q-item>
          <q-item
            v-if="tab === 'DIP'"
            :content-inset-level="2"
            :header-inset-level="2"
          >
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold"
                >Distrito</q-item-label
              >
              <q-select
                :disable="cargo_Id.value == 0 || cargo_Id.cargo == 'RP'"
                dense
                color="purple"
                rounded
                outlined
                bg-color="grey-3"
                v-model="distrito_Id"
                :options="list_Distritos"
              />
            </q-item-section>
          </q-item>
          <q-item
            v-if="tab === 'PYS' || tab === 'REG'"
            :content-inset-level="2"
            :header-inset-level="2"
          >
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold"
                >Municipio</q-item-label
              >
              <q-select
                :disable="cargo_Id.value == 0"
                dense
                color="purple"
                outlined
                rounded
                bg-color="grey-3"
                v-model="municipio_Id"
                :options="list_Municipios"
              />
            </q-item-section>
          </q-item>
          <q-item
            v-if="tab === 'REG'"
            :content-inset-level="2"
            :header-inset-level="2"
          >
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold"
                >Demarcación</q-item-label
              >
              <q-select
                :disable="cargo_Id.value == 0 || cargo_Id.cargo == 'RP'"
                dense
                color="purple"
                outlined
                bg-color="grey-3"
                rounded
                v-model="demarcacion_Id"
                :options="list_Demarcaciones"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold"
                >Partido político o Coalición</q-item-label
              >
              <q-select
                :disable="cargo_Id.value == 0"
                dense
                color="purple"
                rounded
                outlined
                bg-color="grey-3"
                v-model="actor_politico_Id"
                :options="list_Partidos_Politicos"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar v-if="scope.opt.logo != null">
                      <q-img :src="scope.opt.logo" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold"
                >Grado académico</q-item-label
              >
              <q-select
                :disable="cargo_Id.value == 0"
                dense
                color="purple"
                rounded
                outlined
                bg-color="grey-3"
                v-model="grado_Academica_Id"
                :options="list_Grado_Academico"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold"
                >Rango de edad</q-item-label
              >
              <q-select
                :disable="cargo_Id.value == 0"
                dense
                color="purple"
                rounded
                outlined
                bg-color="grey-3"
                v-model="rango_edad_Id"
                :options="list_Edades"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-purple-ieen label-title text-bold"
                >Género</q-item-label
              >
              <q-select
                :disable="cargo_Id.value == 0"
                dense
                color="purple"
                rounded
                outlined
                bg-color="grey-3"
                v-model="sexo_Id"
                :options="list_Sexo"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <!---------------------------DRAWER ISSMALLSCREEN--------------------------->
        <q-list v-else class="absolute">
          <div class="text-center q-pa-md">
            <q-img src="../assets/Conoceles2@300x.png"></q-img>
          </div>
          <q-item clickable v-ripple>
            <q-btn
              @click="isTabSelected('INICIO')"
              rounded
              name="inicio"
              icon="home"
              to="/inicio"
              label="Inicio"
              class="bg-pink-ieen-3"
            />
          </q-item>
          <q-item
            v-for="eleccion in list_Tipos_Elecciones"
            :key="eleccion"
            clickable
            v-ripple
          >
            <q-btn
              v-model="tab"
              @click="isTabSelected(eleccion.siglas, eleccion.id)"
              rounded
              :to="{
                name: eleccion.siglas,
              }"
              :label="eleccion.label"
              class="bg-pink-ieen-3"
            />
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-page-sticky v-if="!$q.screen.xs" :offset="[18, 18]">
        <div class="row justify-center">
          <div class="q-pr-sm">
            <q-btn dense @click="limpiarFiltros" outline style="color: #d1308a">
              <div class="row items-center no-wrap">
                <q-icon left name="cleaning_services" size="xs" />
                <div class="text-center">Limpiar campos</div>
              </div>
            </q-btn>
          </div>
          <div>
            <q-btn dense @click="botonConsultar" push class="bg-pink-ieen">
              <div class="row items-center no-wrap">
                <q-icon name="search" size="xs"></q-icon>
                <div class="text-center">Consultar</div>
              </div>
            </q-btn>
          </div>
        </div>
      </q-page-sticky>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!---------------------------FOOTER--------------------------->
    <q-footer elevated class="bg-pink-ieen text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row">
            <div
              :class="
                $q.screen.xs
                  ? 'col-12 text-subtitle2 text-center'
                  : 'col-lg-3 col-md-3 col-sm-12 col-xs-12 text-subtitle1'
              "
            >
              &#169; 2024 Instituto Estatal Electoral de Nayarit
            </div>
            <div
              class="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center text-caption"
            >
              <div><q-icon name="home" color="white" />Domicilio</div>
              Av. Country Club 13, Colonia Versalles, 63138, Tepic, Nayarit
            </div>
            <div
              class="text-caption col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center"
            >
              <div><q-icon name="phone" color="white" />Teléfono</div>
              (311) - 210 - 3235 /36 /47
            </div>
            <div
              class="text-caption col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center"
            >
              Preguntas frecuentes
              <q-btn flat round dense :to="{ name: 'preguntasFrecuentes' }">
                <q-icon name="live_help" />
              </q-btn>
            </div>

            <div v-if="!$q.screen.xs" class="absolute-right q-pa-xs">
              <q-btn
                flat
                round
                dense
                href="https://www.facebook.com/IEENayarit?mibextid=sCpJLy"
                target="_blank"
              >
                <i
                  class="fa-brands fa-square-facebook fa-2xl"
                  style="color: #ffffff"
                ></i>
              </q-btn>
              <q-btn
                flat
                round
                dense
                href="https://www.youtube.com/@IEENayarit"
                target="_blank"
              >
                <i
                  class="fa-brands fa-youtube fa-2xl"
                  style="color: #ffffff"
                ></i>
              </q-btn>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerCube } from "quasar";
import { useCardsStore } from "src/stores/cards-store";
import { onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useGraficasStore } from "src/stores/graficas-store";
import { getCurrentLocation, getDataDevice } from "../helpers/CurrentLocation";
import Filtrar from "src/helpers/Filtrar";
import FiltrarCandidatos from "src/helpers/FiltrarCandidatos";

//---------------------------------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const graficasStore = useGraficasStore();
const router = useRouter();
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const cardsStore = useCardsStore();
const { isHomePage, buttons, list_Candidatos_By_Eleccion, cargo } =
  storeToRefs(cardsStore);
const {
  list_Tipos_Elecciones,
  list_Distritos,
  list_Partidos_Politicos,
  list_Municipios,
  list_Demarcaciones,
  list_Edades,
  list_Sexo,
  info,
} = storeToRefs(configuracionStore);
const {
  list_Graficas_By_Eleccion,
  list_Graficas_Filtrado,
  list_Graficas_Genero_Edad,
  cargoGrafica,
} = storeToRefs(graficasStore);
const distrito_Id = ref(null);
const actor_politico_Id = ref(null);
const rango_edad_Id = ref(null);
const sexo_Id = ref(null);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const tab = ref("");
const tab_Id = ref(null);
const grado_Academica_Id = ref(null);
const list_Grado_Academico = ref([
  { value: 0, label: "Todos" },
  { value: 1, label: "Sin estudios" },
  { value: 2, label: "Primaria" },
  { value: 3, label: "Secundaria" },
  { value: 4, label: "Técnica" },
  { value: 5, label: "Preparatoria" },
  { value: 6, label: "Licenciatura" },
  { value: 7, label: "Especialidad" },
  { value: 8, label: "Maestría" },
  { value: 9, label: "Doctorado" },
  { value: 10, label: "Postdoctorado" },
]);
const cargo_Id = ref(null);
const list_Cargos = ref([]);

//---------------------------------------------------------------------------------

onBeforeMount(() => {
  if (tab.value == "") {
    tab.value = "inicio";
    router.push({
      name: "inicio",
    });
  } else {
    const savedTab = localStorage.getItem("selectedTab");

    if (savedTab) {
      tab.value = savedTab;
    }
  }
  limpiarFiltros();
  cargarData();
});

//---------------------------------------------------------------------------------

watch(cargo_Id, (val) => {
  if (val != null) {
    cargoGrafica.value = val.cargo;
    cargo.value = val.cargo;
    distrito_Id.value = { value: 0, label: "Todos" };
    if (tab.value == "DIP") {
      list_Partidos_Politicos.value = [];
      if (val.cargo == "RP") {
        configuracionStore.loadPartidosPoliticosDistritosRP();
      } else if (val.cargo == "MR") {
        configuracionStore.loadPartidosPoliticos("GeneralDistritos", 0, 0, 0);
      }
    }
  }
});

watch(distrito_Id, (val) => {
  if (tab.value == "DIP") {
    list_Partidos_Politicos.value = [];
    if (cargo_Id.value.cargo != "RP" && val.value == 0) {
      configuracionStore.loadPartidosPoliticos("GeneralDistritos", 0, 0, 0);
    } else if (val.value != 0 && cargo_Id.value.cargo != "RP") {
      configuracionStore.loadPartidosPoliticos("Distritos", 0, val.value, 0);
    }
  }
});

watch(municipio_Id, (val) => {
  if (tab.value == "PYS" || tab.value == "REG") {
    demarcacion_Id.value = { value: 0, label: "Todos" };
    if (val.value == 0 && tab.value == "PYS") {
      configuracionStore.loadPartidosPoliticos("GeneralMunicipios", 0, 0, 0);
    } else if (val.value != 0) {
      configuracionStore.loadPartidosPoliticos("Municipios", val.value, 0, 0);
      configuracionStore.loadDemarcaciones(val.value);
    }
  }
});

watch(demarcacion_Id, (val) => {
  if (tab.value == "REG") {
    if (val.value == 0) {
      configuracionStore.loadPartidosPoliticos("GeneralDemarcacion", 0, 0, 0);
    } else if (val.value != 0 && cargo_Id.value.cargo != "RP") {
      configuracionStore.loadPartidosPoliticos(
        "MunicipioDemarcacion",
        municipio_Id.value.value,
        0,
        val.value
      );
    } else if (cargo_Id.value.cargo == "RP") {
      configuracionStore.loadPartidosPoliticosDemarcacionesRP(
        municipio_Id.value.value
      );
    }
  }
});

watch(list_Graficas_By_Eleccion, (val) => {
  if (val[0] != undefined) {
    if (val[0].tipo_Eleccion_Id == tab_Id.value) {
      consultar();
    }
  }
});

watch(list_Graficas_Genero_Edad, (val) => {
  if (val[0] != undefined) {
    if (val[0].tipo_Eleccion_Id == tab_Id.value) {
      consultar();
    }
  }
});

watch(list_Candidatos_By_Eleccion, (val) => {
  if (val != null) {
    consultar();
  }
});

//---------------------------------------------------------------------------------

const cargarData = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento por favor...",
    messageColor: "black",
  });
  await configuracionStore.loadTipoElecciones();
  await configuracionStore.loadDistritos();
  await configuracionStore.loadPartidosPoliticos("GeneralDistritos", 0, 0, 0);
  await configuracionStore.loadEdades();
  await configuracionStore.loadGenero();
  await configuracionStore.loadMunicipios();

  $q.loading.hide();
};

const cargar = async (val, tab) => {
  graficasStore.loadGraficasGeneroEdad(val);
  list_Graficas_By_Eleccion.value = [];
  list_Partidos_Politicos.value = [];
  if (tab != "inicio") {
    graficasStore.loadGraficasByEleccion(val);
  }
};

const isTabSelected = async (nombre, id) => {
  list_Cargos.value = [
    {
      value: 0,
      cargo: "Todos",
      label: "Todos",
    },
    {
      value: 1,
      cargo: "MR",
      label: `${
        tab.value == "DIP" ? "Diputaciones" : "Regidurías"
      } mayoría relativa`,
    },
    {
      value: 2,
      cargo: "RP",
      label: `${
        tab.value == "DIP" ? "Diputaciones" : "Regidurías"
      } representación proporcional`,
    },
  ];
  limpiarFiltros();
  localStorage.setItem("selectedTab", nombre);
  tab.value = nombre;
  tab_Id.value = id;

  if (nombre == "PYS") {
    cargo_Id.value = {
      value: 1,
      cargo: "MR",
    };
  }
  await cargar(id, tab.value);
  router.push({
    name: nombre,
    params: { eleccion_Id: id },
  });
};

const activaNumeralia = (tab) => {
  limpiarFiltros();
  if (tab == "PYS") {
    cargo_Id.value = {
      value: 1,
      cargo: "MR",
    };
  }
  cardsStore.actualizarButtonColor(false);
  router.push({
    name: tab,
    params: { eleccion_Id: tab_Id.value },
  });
  consultar();
};

const activaCandidatos = async (tab) => {
  limpiarFiltros();
  if (tab == "PYS") {
    cargo_Id.value = {
      value: 1,
      cargo: "MR",
    };
  }
  cardsStore.actualizarButtonColor(true);
  router.push({
    name: `${tab}cards`,
    params: { eleccion_Id: tab_Id.value },
  });
};

const limpiarFiltros = async () => {
  cargo_Id.value = { value: 0, label: "Todos" };
  grado_Academica_Id.value = { value: 0, label: "Todos" };
  distrito_Id.value = { value: 0, label: "Todos" };
  rango_edad_Id.value = { value: 0, label: "Todos" };
  actor_politico_Id.value = { value: 0, label: "Todos" };
  sexo_Id.value = { value: 0, label: "Todos" };
  municipio_Id.value = { value: 0, label: "Todos" };
  demarcacion_Id.value = { value: 0, label: "Todos" };
  list_Partidos_Politicos.value = [];
  consultar();
};

const obtenerNombre = () => {
  var fechaHora = new Date();
  var anio = fechaHora.getFullYear();
  var mes = fechaHora.getMonth() + 1;
  var dia = fechaHora.getDate();
  var horas = fechaHora.getHours();
  var minutos = fechaHora.getMinutes();
  var segundos = fechaHora.getSeconds();
  return `Conoceles${anio}${mes}${dia}${horas}${minutos}${segundos}`;
};

const exportarBD = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento por favor...",
    messageColor: "black",
  });
  await cardsStore.loadExcel();
  const link = document.createElement("a");
  link.href = cardsStore.documentoExcel;
  link.setAttribute("download", obtenerNombre());
  document.body.appendChild(link);
  link.click();
  $q.loading.hide();
};

const botonConsultar = async () => {
  // let { latitude, longitude } = await getCurrentLocation();
  // let { brand, model, os } = getDataDevice();
  // info.value.latitud = latitude;
  // info.value.longitud = longitude;
  // info.value.marca = brand;
  // info.value.modelo = model;
  // info.value.sistema_Operativo = os;
  // await configuracionStore.infoDeviceConoceles(info.value);
  // await configuracionStore.loadVisitas();
  consultar();
};

const consultar = async () => {
  const filtro = {};
  if (grado_Academica_Id.value != null)
    filtro.academico = grado_Academica_Id.value.label;
  if (cargo_Id.value != null) filtro.cargo = cargo_Id.value;
  if (distrito_Id.value != null) filtro.distrito = distrito_Id.value.value;
  if (actor_politico_Id.value != null) {
    filtro.actor_politico = actor_politico_Id.value.value;
    if (actor_politico_Id.value.is_Coalicion == true) {
      filtro.coalicion = true;
    } else {
      filtro.coalicion = false;
    }
  }
  if (rango_edad_Id.value != null) filtro.edad = rango_edad_Id.value.label;
  if (sexo_Id.value != null) filtro.sexo = sexo_Id.value.label;
  if (municipio_Id.value != null) filtro.municipio = municipio_Id.value.value;
  if (demarcacion_Id.value != null)
    filtro.demarcacion = demarcacion_Id.value.value;

  if (list_Graficas_Genero_Edad.value.length > 0) {
    filtrarGeneroEdad(list_Graficas_Genero_Edad.value, filtro);
  }
  if (list_Graficas_By_Eleccion.value.length > 0) {
    filtarGraficasIdentidad(list_Graficas_By_Eleccion.value, filtro);
  }
  if (list_Candidatos_By_Eleccion.value.length > 0) {
    filtrarCards(list_Candidatos_By_Eleccion.value, filtro);
  }
};

const filtrarGeneroEdad = async (list_Grafica, filtro) => {
  Filtrar(list_Grafica, filtro);
};

const filtarGraficasIdentidad = (list_Graficas_By_Eleccion, filtro) => {
  list_Graficas_Filtrado.value = list_Graficas_By_Eleccion.filter((item) => {
    let cumple = true;

    if (filtro.cargo.value !== undefined) {
      if (filtro.cargo.value == 0) {
        cumple = cumple && item.tipo_Candidato === item.tipo_Candidato;
      } else {
        cumple = cumple && item.tipo_Candidato === filtro.cargo.cargo;
      }
    }

    if (filtro.distrito !== undefined) {
      if (filtro.distrito == 0) {
        cumple = cumple && item.distrito_Id === item.distrito_Id;
      } else if (filtro.cargo.cargo == "RP") {
        if (item.tipo_Candidato === "RP") {
          cumple = true;
        } else {
          cumple = false;
        }
      } else {
        cumple = cumple && item.distrito_Id === filtro.distrito;
      }
    }

    if (filtro.municipio !== undefined) {
      if (filtro.municipio == 0) {
        cumple = cumple && item.municipio_Id === item.municipio_Id;
      } else {
        cumple = cumple && item.municipio_Id === filtro.municipio;
      }
    }

    if (filtro.demarcacion !== undefined) {
      if (filtro.demarcacion == 0) {
        cumple = cumple && item.demarcacion_Id === item.demarcacion_Id;
      } else if (filtro.cargo == "RP") {
        if (item.tipo_Candidato === "RP") {
          cumple = true;
        } else {
          cumple = false;
        }
      } else {
        if (item.demarcacion_Id === filtro.demarcacion) {
          cumple = true;
        } else {
          cumple = false;
        }
      }
    }

    if (filtro.sexo != undefined) {
      if (filtro.sexo == "Todos") {
        cumple = cumple && item.sexo === item.sexo;
      } else {
        cumple = cumple && item.sexo === filtro.sexo;
      }
    }

    if (filtro.edad != undefined) {
      if (filtro.edad == "Todos") {
        cumple = cumple && item.edad > 0;
      } else {
        const rango = filtro.edad.split("-").map(Number);

        if (rango.length === 2) {
          cumple = cumple && item.edad >= rango[0] && item.edad <= rango[1];
        } else if (filtro.edad == "60 o más") {
          cumple = cumple && item.edad >= 60;
        }
      }
    }

    if (filtro.actor_politico !== undefined) {
      if (filtro.actor_politico == 0) {
        cumple = cumple && item.partido_Id === item.partido_Id;
      } else {
        if (filtro.coalicion == true) {
          cumple = cumple && item.coalicion_Id === filtro.actor_politico;
        } else {
          cumple = cumple && item.partido_Id === filtro.actor_politico;
        }
      }
    }

    if (filtro.academico != undefined) {
      if (filtro.academico == "Todos") {
        cumple =
          cumple && item.grado_Maximo_Studio === item.grado_Maximo_Studio;
      } else {
        cumple = cumple && item.grado_Maximo_Studio === filtro.academico;
      }
    }

    return cumple;
  });
};

const filtrarCards = async (list_Candidatos_By_Eleccion, filtro) => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento por favor...",
    messageColor: "black",
  });
  await FiltrarCandidatos(list_Candidatos_By_Eleccion, filtro);
  $q.loading.hide();
};

//---------------------------------------------------------------------------------
</script>
<style lang="scss">
.text-purple-pink {
  color: #af7ead;
}
.bg-purple-pink {
  background-color: #af7ead;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-purple-ieen {
  color: #673e84 !important;
}
.bg-purple-ieen {
  background-color: #673e84 !important;
}
.bg-pink-ieen {
  color: white;
  background: #d1308a !important;
}
.bg-pink-ieen-2 {
  background: #e97ebd !important;
}
.text-pink-ieen {
  background: #d1308a !important;
}
.text-purple-ieen-1 {
  color: #863399 !important;
}
.bg-purple-ieen-1 {
  background: #863399 !important;
}
.text-purple-ieen-2 {
  color: #a25eb5 !important;
}
.bg-purple-ieen-2 {
  background: #a25eb5 !important;
}
.text-purple-ieen-3 {
  color: #bb83ca !important;
}
.bg-purple-ieen-3 {
  background: #bb83ca !important;
}
.text-pink-ieen-1 {
  color: #b32572 !important;
}
.bg-pink-ieen-1 {
  background: #b32572 !important;
}
.text-pink-ieen-2 {
  color: #cc5599 !important;
}
.bg-pink-ieen-2 {
  background: #cc5599 !important;
}
.text-pink-ieen-3 {
  color: #dd85ba !important;
}
.bg-pink-ieen-3 {
  color: white;
  background: #dd85ba !important;
}
.text-gray-ieen-1 {
  color: #76777a !important;
}
.bg-gray-ieen-1 {
  background: #76777a !important;
}
.text-gray-ieen-2 {
  color: #98989a !important;
}
.bg-gray-ieen-2 {
  background: #98989a !important;
}
.text-gray-ieen-3 {
  color: #b1b1b1 !important;
}
.bg-gray-ieen-3 {
  background: #b1b1b1 !important;
}
.text-pink-conoceles {
  color: #d1308a !important;
}

.sticky {
  position: sticky;
}
</style>
