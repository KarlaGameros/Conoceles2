import { storeToRefs } from "pinia";
import { useGraficasStore } from "src/stores/graficas-store";

const graficasStore = useGraficasStore();
const { list_Graficas_Genero_Edad_Filtrado } = storeToRefs(graficasStore);

const Filtrar = async (list_Grafica, filtro) => {
  try {
    let resp = await graficasStore.limpiarLista();
    if (resp.success == true) {
      list_Graficas_Genero_Edad_Filtrado.value = list_Grafica.filter((item) => {
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
          } else if (filtro.cargo == "RP") {
            if (
              item.tipo_Candidato === "RP" &&
              item.distrito_Id === filtro.distrito
            ) {
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
    }
  } catch (error) {
    return {
      success: false,
      data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
    };
  }
};
export default Filtrar;
