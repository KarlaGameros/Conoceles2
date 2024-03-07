<template>
  <div v-if="$q.screen.xs" class="bg-grey-2" style="border-radius: 20px">
    <div class="text-h6 q-pl-md text-bold" style="color: grey">CONSULTA:</div>
    <div class="subtitule-2 q-pl-md" style="color: grey">
      Selecciona el reporte que deseas consultar:
    </div>
    <div class="text-center q-pb-md">
      <q-btn
        rounded
        @click="activaNumeralia"
        :to="{
          name: selectedTab,
        }"
        label="Numeralia"
        :class="buttons == false ? 'bg-pink-ieen' : 'bg-pink-ieen-3'"
      />
      <q-btn
        rounded
        :to="{
          name: `${selectedTab}cards`,
        }"
        label="Candidatas y candidatos"
        :class="buttons ? 'bg-pink-ieen' : 'bg-pink-ieen-3'"
        @click="activaCandidatos"
      />
    </div>

    <!--------------------FILTROS PARA SMALLSCREEN----------------------------->
    <q-list v-if="!isDetallePage" dark bordered class="rounded-borders">
      <q-expansion-item
        icon="manage_search"
        expand-icon-class="text-purple"
        label="Seleccionar filtros de consulta"
        header-class="text-purple"
      >
        <q-card class="bg-grey-5">
          <q-card-section>
            <q-item v-if="selectedTab != 'PYS'">
              <q-item-section>
                <q-item-label class="label-title text-bold">
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
              v-if="selectedTab === 'DIP'"
              :content-inset-level="2"
              :header-inset-level="2"
            >
              <q-item-section>
                <q-item-label class="label-title text-bold"
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
              v-if="selectedTab === 'PYS' || selectedTab === 'REG'"
              :content-inset-level="2"
              :header-inset-level="2"
            >
              <q-item-section>
                <q-item-label class="label-title text-bold"
                  >Municipio</q-item-label
                >
                <q-select
                  :disable="cargo_Id.value == 0 && selectedTab != 'PYS'"
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
              v-if="selectedTab === 'REG'"
              :content-inset-level="2"
              :header-inset-level="2"
            >
              <q-item-section>
                <q-item-label class="label-title text-bold"
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

            <q-item :content-inset-level="2" :header-inset-level="2">
              <q-item-section>
                <q-item-label class="label-title text-bold"
                  >Partido político o Coalición</q-item-label
                >
                <q-select
                  :disable="cargo_Id.value == 0 && selectedTab != 'PYS'"
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
                <q-item-label class="label-title text-bold"
                  >Grado académico</q-item-label
                >
                <q-select
                  :disable="cargo_Id.value == 0 && selectedTab != 'PYS'"
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

            <q-item :content-inset-level="2" :header-inset-level="2">
              <q-item-section>
                <q-item-label class="label-title text-bold"
                  >Rango de edad</q-item-label
                >
                <q-select
                  :disable="cargo_Id.value == 0 && selectedTab != 'PYS'"
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

            <q-item :content-inset-level="2" :header-inset-level="2">
              <q-item-section>
                <q-item-label class="label-title text-bold"
                  >Género</q-item-label
                >
                <q-select
                  :disable="cargo_Id.value == 0 && selectedTab != 'PYS'"
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
            <div class="flex-center row">
              <div class="q-pr-xs">
                <q-btn
                  icon="cleaning_services"
                  size="sm"
                  @click="limpiarFiltros"
                  outline
                  label="Limpiar campos"
                  style="color: #d1308a"
                />
              </div>
              <div class="q-pr-xs">
                <q-btn
                  size="sm"
                  icon="search"
                  @click="botonConsultar"
                  push
                  label="Consultar"
                  class="bg-pink-ieen"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useCardsStore } from "src/stores/cards-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useGraficasStore } from "src/stores/graficas-store";
import { getCurrentLocation, getDataDevice } from "../helpers/CurrentLocation";
import Filtrar from "src/helpers/Filtrar";
import FiltrarCandidatos from "src/helpers/FiltrarCandidatos";

//---------------------------------------------------------------------------------

const $q = useQuasar();
const cardsStore = useCardsStore();
const configuracionStore = useConfiguracionStore();
const graficasStore = useGraficasStore();
const {
  isDetallePage,
  listFiltroCards,
  buttons,
  list_Candidatos_By_Eleccion,
  cargo,
} = storeToRefs(cardsStore);
const {
  list_Graficas_Filtrado,
  list_Graficas_By_Eleccion,
  list_Graficas_Genero_Edad_Filtrado,
  list_Graficas_Genero_Edad,
  cargoGrafica,
} = storeToRefs(graficasStore);
const {
  list_Distritos,
  list_Partidos_Politicos,
  list_Municipios,
  list_Demarcaciones,
  list_Edades,
  list_Sexo,
} = storeToRefs(configuracionStore);
const distrito_Id = ref(null);
const actor_politico_Id = ref(null);
const rango_edad_Id = ref(null);
const sexo_Id = ref(null);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const selectedTab = ref(null);
const grado_Academica_Id = ref(null);
const list_Grado_Academico = ref([
  { value: 0, label: "Todos" },
  { value: 1, label: "Primaria" },
  { value: 2, label: "Secundaria" },
  { value: 3, label: "Técnica" },
  { value: 4, label: "Preparatoria" },
  { value: 5, label: "Licenciatura" },
  { value: 6, label: "Especialidad" },
  { value: 7, label: "Maestría" },
  { value: 8, label: "Doctorado" },
  { value: 9, label: "Postdoctorado" },
]);
const cargo_Id = ref({
  value: 0,
  label: "Todos",
});
const list_Cargos = ref([
  {
    value: 0,
    cargo: "Todos",
    label: "Todos",
  },
  {
    value: 1,
    cargo: "MR",
    label: `${
      selectedTab.value == "DIP" ? "Diputación" : "Regiduría"
    } mayoría relativa`,
  },
  {
    value: 2,
    cargo: "RP",
    label: `${
      selectedTab.value == "DIP" ? "Diputación" : "Regiduría"
    } representación proporcional`,
  },
]);

//---------------------------------------------------------------------------------

onMounted(() => {
  if (selectedTab.value == "") {
    selectedTab.value = "inicio";
  } else {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      selectedTab.value = savedTab;
    }
  }

  //consultar();
  limpiarFiltros();
});

//---------------------------------------------------------------------------------
watch(cargo_Id, (val) => {
  if (val != null) {
    cargoGrafica.value = val.cargo;
    cargo.value = val.cargo;
    distrito_Id.value = { value: 0, label: "Todos" };
    if (selectedTab.value == "DIP") {
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
  if (selectedTab.value == "DIP") {
    list_Partidos_Politicos.value = [];
    if (cargo_Id.value.cargo != "RP" && val.value == 0) {
      configuracionStore.loadPartidosPoliticos("GeneralDistritos", 0, 0, 0);
    } else if (val.value != 0 && cargo_Id.value.cargo != "RP") {
      configuracionStore.loadPartidosPoliticos("Distritos", 0, val.value, 0);
    }
  }
});

watch(municipio_Id, (val) => {
  if (selectedTab.value == "PYS" || selectedTab.value == "REG") {
    demarcacion_Id.value = { value: 0, label: "Todos" };
    if (val.value == 0 && selectedTab.value == "PYS") {
      configuracionStore.loadPartidosPoliticos("GeneralMunicipios", 0, 0, 0);
    } else if (val.value != 0) {
      configuracionStore.loadPartidosPoliticos("Municipios", val.value, 0, 0);
      configuracionStore.loadDemarcaciones(val.value);
    }
  }
});

watch(demarcacion_Id, (val) => {
  if (selectedTab.value == "REG") {
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

//---------------------------------------------------------------------------------

const activaNumeralia = () => {
  cardsStore.actualizarButtonColor(false);
  limpiarFiltros();
};

const activaCandidatos = () => {
  cardsStore.actualizarButtonColor(true);
  limpiarFiltros();
};

const limpiarFiltros = () => {
  cargo_Id.value = { value: 0, label: "Todos" };
  grado_Academica_Id.value = { value: 0, label: "Todos" };
  distrito_Id.value = { value: 0, label: "Todos" };
  rango_edad_Id.value = { value: 0, label: "Todos" };
  actor_politico_Id.value = { value: 0, label: "Todos" };
  sexo_Id.value = { value: 0, label: "Todos" };
  municipio_Id.value = { value: 0, label: "Todos" };
  demarcacion_Id.value = { value: 0, label: "Todos" };
  consultar();
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

const consultar = () => {
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
    filtrar(
      list_Candidatos_By_Eleccion.value,
      list_Graficas_By_Eleccion.value,
      filtro
    );
  }
};

const filtrarGeneroEdad = async (list_Grafica, filtro) => {
  Filtrar(list_Grafica, filtro);
};

const filtrar = (
  list_Candidatos_By_Eleccion,
  list_Graficas_By_Eleccion,
  filtro
) => {
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
      } else if (filtro.distrito == 99) {
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
      } else if (filtro.demarcacion == 99) {
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

  FiltrarCandidatos(list_Candidatos_By_Eleccion, filtro);
};
</script>

<style></style>
