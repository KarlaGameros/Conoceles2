import { storeToRefs } from "pinia";
import { useCardsStore } from "src/stores/cards-store";

const cardsStore = useCardsStore();
const { listFiltroCards } = storeToRefs(cardsStore);

const FiltrarCandidatos = async (list_Candidatos_By_Eleccion, filtro) => {
  try {
    listFiltroCards.value = list_Candidatos_By_Eleccion.filter((item) => {
      let cumple = true;

      if (filtro.cargo !== undefined) {
        if (filtro.cargo.label == "Todos") {
          cumple = cumple && item.tipo_Candidato === item.tipo_Candidato;
        } else {
          cumple = cumple && item.tipo_Candidato === filtro.cargo.cargo;
        }
      }

      if (filtro.distrito !== undefined) {
        if (filtro.distrito == 0) {
          cumple = cumple && item.distrito_Id === item.distrito_Id;
        } else {
          if (item.distrito_Id === filtro.distrito) {
            item.selection = "prop";
          } else {
            cumple = false;
          }
        }
      }

      if (filtro.municipio !== undefined) {
        if (filtro.municipio == 0) {
          cumple = cumple && item.municipio_Id === item.municipio_Id;
        } else {
          if (item.municipio_Id === filtro.municipio) {
            item.selection = "prop";
          } else {
            cumple = false;
          }
        }
      }

      if (filtro.demarcacion !== undefined) {
        if (filtro.demarcacion == "") {
          cumple = cumple && item.demarcacion_Id === item.demarcacion_Id;
        } else {
          if (item.demarcacion_Id === filtro.demarcacion) {
            item.selection = "prop";
          } else {
            cumple = false;
          }
        }
      }

      if (filtro.actor_politico !== undefined) {
        if (filtro.actor_politico == 0) {
          cumple = cumple && item.partido_Id === item.partido_Id;
        } else {
          if (filtro.coalicion == true) {
            if (item.coalicion_Id === filtro.actor_politico) {
              item.selection = "prop";
            } else {
              cumple = false;
            }
          } else {
            if (item.is_Coalicion == false) {
              if (item.partido_Id === filtro.actor_politico) {
                item.selection = "prop";
              } else if (item.partido_Suplente_Id === filtro.actor_politico) {
                item.selection = "sup";
              } else if (
                item.partido_Propietario_2_Id === filtro.actor_politico
              ) {
                item.selection = "propSin";
              } else if (item.partido_Suplente_2_Id === filtro.actor_politico) {
                item.selection = "supSin";
              } else {
                cumple = false;
              }
            } else {
              cumple = false;
            }
          }
        }
      }

      if (filtro.sexo !== undefined) {
        if (filtro.sexo == "Todos") {
          cumple = cumple && item.sexo_Propietario === item.sexo_Propietario;
        } else {
          if (item.sexo_Propietario == filtro.sexo) {
            item.selection = "prop";
          } else if (item.sexo_Suplente == filtro.sexo) {
            item.selection = "sup";
          } else if (item.sexo_Propietario_2 == filtro.sexo) {
            item.selection = "propSin";
          } else if (item.sexo_Suplente_2 == filtro.sexo) {
            item.selection = "supSin";
          } else {
            cumple = false;
          }
        }
      }

      if (filtro.edad !== undefined) {
        if (filtro.edad == "Todos") {
          cumple = cumple && item.edad_Propietario > 0;
        } else {
          const rango = filtro.edad.split("-").map(Number);
          if (rango.length === 2) {
            if (filtro.sexo != "Todos") {
              if (
                item.edad_Propietario >= rango[0] &&
                item.edad_Propietario <= rango[1] &&
                item.sexo_Propietario == filtro.sexo
              ) {
                item.selection = "prop";
              } else if (
                item.edad_Suplente >= rango[0] &&
                item.edad_Suplente <= rango[1] &&
                item.sexo_Suplente == filtro.sexo
              ) {
                item.selection = "sup";
              } else if (
                item.edad_Propietario_2 >= rango[0] &&
                item.edad_Propietario_2 <= rango[1] &&
                item.sexo_Propietario_2 == filtro.sexo
              ) {
                item.selection = "propSin";
              } else if (
                item.edad_Suplente_2 >= rango[0] &&
                item.edad_Suplente_2 <= rango[1] &&
                item.sexo_Suplente_2 == filtro.sexo
              ) {
                item.selection = "supSin";
              } else {
                cumple = false;
              }
            } else {
              if (
                item.edad_Propietario >= rango[0] &&
                item.edad_Propietario <= rango[1]
              ) {
                item.selection = "prop";
              } else if (
                item.edad_Suplente >= rango[0] &&
                item.edad_Suplente <= rango[1]
              ) {
                item.selection = "sup";
              } else if (
                item.edad_Propietario_2 >= rango[0] &&
                item.edad_Propietario_2 <= rango[1]
              ) {
                item.selection = "propSin";
              } else if (
                item.edad_Suplente_2 >= rango[0] &&
                item.edad_Suplente_2 <= rango[1]
              ) {
                item.selection = "supSin";
              } else {
                cumple = false;
              }
            }
          } else if (rango.length === 1) {
            if (item.edad_Propietario >= 60) {
              item.selection = "prop";
            } else if (item.edad_Suplente >= 60) {
              item.selection = "sup";
            } else if (item.edad_Propietario_2 >= 60) {
              item.selection = "propSin";
            } else if (item.edad_Suplente_2 >= 60) {
              item.selection = "supSin";
            } else {
              cumple = false;
            }
          }
        }
      }

      if (filtro.academico != undefined) {
        if (filtro.academico == "Todos") {
          cumple =
            cumple &&
            item.grado_Academico_Propietario ===
              item.grado_Academico_Propietario;
        } else {
          if (item.grado_Academico_Propietario == filtro.academico) {
            item.selection = "prop";
          } else if (item.grado_Academico_Suplente == filtro.academico) {
            item.selection = "sup";
          } else if (item.grado_Academico_Propietario_2 == filtro.academico) {
            item.selection = "propSin";
          } else if (item.grado_Academico_Suplente_2 == filtro.academico) {
            item.selection = "supSin";
          } else {
            cumple = false;
          }
        }
      }

      return cumple;
    });
  } catch (error) {
    return {
      success: false,
      data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
    };
  }
};
export default FiltrarCandidatos;
