import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useGraficasStore = defineStore("useGraficasStore", {
  state: () => ({
    list_Graficas_By_Eleccion: [],
    list_Graficas_Genero_Edad: [],
    list_Graficas_Genero_Edad_Filtrado: [],
    list_Graficas_Filtrado: [],
    cargoGrafica: "Todos",
  }),

  actions: {
    async limpiarLista() {
      try {
        this.list_Graficas_Genero_Edad_Filtrado = [];
        return { success: true };
      } catch (error) {
        return {
          success: false,
        };
      }
    },
    //---------------------------------------------------------------------------------
    //GRAFICAS
    async loadGraficasGeneroEdad(id) {
      try {
        let resp = await api.get(
          `/Tipos_Elecciones/DataGraficasGralGeneroByTipoEleccion/${id}`
        );
        let { data } = resp.data;
        this.list_Graficas_Genero_Edad = data.map((item) => {
          return {
            tipo_Candidato: item.tipo_Candidato,
            candidato_Id: item.candidato_Id,
            tipo_Eleccion_Id: item.tipo_Eleccion_Id,
            puesto: item.puesto,
            sexo: item.sexo,
            edad: item.edad,
            partido_Id: item.partido_Id,
            municipio_Id: item.municipio_Id,
            distrito_Id: item.distrito_Id,
            demarcacion_Id: item.demarcacion_Id,
            is_Coalicion: item.is_Coalicion,
            coalicion_Id: item.coalicion_Id,
            grado_Maximo_Studio: item.grado_Maximo_Studio,
          };
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadGraficasByEleccion(id) {
      try {
        let resp = await api.get(
          `/Tipos_Elecciones/DataGraficasByTipoEleccion/${id}`
        );
        let { data } = resp.data;
        this.list_Graficas_By_Eleccion = data.map((item) => {
          return {
            candidato_Id: item.candidato_Id,
            tipo_Eleccion_Id: id,
            puesto: item.puesto,
            sexo: item.sexo,
            edad: item.edad,
            partido_Id: item.partido_Id,
            municipio_Id: item.municipio_Id,
            distrito_Id: item.distrito_Id,
            demarcacion_Id: item.demarcacion_Id,
            grado_Maximo_Studio: item.grado_Maximo_Studio,
            ingresos: item.ingresos,
            indigena: item.indigena,
            discapacidad: item.discapacidad,
            afromexicano: item.afroamericano,
            lgbttiq: item.lgbttiq,
            migrante: item.migrante,
            poblacion_Joven: item.poblacion_Joven,
            poblacion_Mayor: item.poblacion_Mayor,
            tipo_Candidato: item.tipo_Candidato,
            is_Coalicion: item.is_Coalicion,
            coalicion_Id: item.coalicion_Id,
            avance_Curricular: item.avance_Curricular,
          };
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
  },
});
