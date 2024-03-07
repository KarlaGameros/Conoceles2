import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useConfiguracionStore = defineStore("configuracion", {
  state: () => ({
    list_Tipos_Elecciones: [],
    list_Distritos: [],
    list_Partidos_Politicos: [],
    list_Municipios: [],
    list_Demarcaciones: [],
    list_Edades: [],
    list_Sexo: [],
    metrica: {
      metrics: [{ name: "active7DayUsers" }],
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
    },
    consultas: null,
    info: {
      latitud: null,
      longitud: null,
      marca: null,
      modelo: null,
      sistema_Operativo: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    async infoDeviceConoceles(device) {
      try {
        const resp = null;
        resp = await api.post("/Candidatos/RegistroPeticiones", device);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    async loadVisitas() {
      try {
        let resp = await api.get("/Candidatos/Consultas");
        if (resp.status == 200) {
          let { data } = resp;
          this.consultas = data.data;
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //TIPO DE ELECCIONES
    async loadTipoElecciones() {
      try {
        let resp = await api.get("/Tipos_Elecciones");
        let { data } = resp.data;
        let listActivo = [];
        listActivo = data.filter((x) => x.activo == true);
        let listTipoElecciones = listActivo.map((tipo) => {
          return {
            id: tipo.id,
            nombre: tipo.nombre,
            label: tipo.nombre,
            to: tipo.siglas,
            siglas: tipo.siglas,
            activo: tipo.activo,
            propietario_1: tipo.propietario_1,
            propietario_2: tipo.propietario_2,
            suplente_1: tipo.suplente_1,
            suplente_2: tipo.suplente_2,
            fecha_Registro: tipo.fecha_Registro,
          };
        });

        this.list_Tipos_Elecciones = listTipoElecciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //DISTRITOS
    async loadDistritos() {
      try {
        let resp = await api.get("/Distritos");
        let { data } = resp.data;
        let listDistritos = data.map((distrito) => {
          return {
            id: distrito.id,
            no_Distrito: distrito.no_Distrito,
            nombre: distrito.nombre,
            integracion: distrito.integracion,
            value: distrito.id,
            label: `${distrito.no_Distrito} - ${distrito.nombre}`,
          };
        });

        listDistritos.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Distritos = listDistritos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //PARTIDOS POLITICOS
    async loadPartidosPoliticos(
      tipo,
      municipio_Id,
      distrito_Id,
      demarcacion_Id
    ) {
      try {
        let resp = null;
        if (tipo == "Municipios") {
          resp = await api.get(
            `/Tipos_Elecciones/Coaliciones_Partidos_Municipios/${municipio_Id}`
          );
        } else if (tipo == "GeneralMunicipios") {
          resp = await api.get(
            "/Tipos_Elecciones/Todos_Coaliciones_Partidos_Municipios"
          );
        } else if (tipo == "Distritos") {
          resp = await api.get(
            `/Tipos_Elecciones/Coaliciones_Partidos_Distritos/${distrito_Id}`
          );
        } else if (tipo == "GeneralDistritos") {
          resp = await api.get(
            "/Tipos_Elecciones/Todos_Coaliciones_Partidos_Distritos"
          );
        } else if (tipo == "MunicipioDemarcacion") {
          resp = await api.get(
            `/Tipos_Elecciones/Coaliciones_Partidos_Demarcacion?DemarcacionId=${demarcacion_Id}&MunicipioId=${municipio_Id}`
          );
        } else if (tipo == "GeneralDemarcacion") {
          resp = await api.get(
            "/Tipos_Elecciones/Todos_Coaliciones_Partidos_Demarcacion"
          );
        }

        let { data } = resp.data;
        let listPartidosPoliticos = data.map((item) => {
          return {
            partido_Id: item.partido_Id,
            partido: item.partido,
            logo_URL_Partido: item.logo_URL_Partido,
            is_Coalicion: item.is_Coalicion,
            coalicion_Id: item.coalicion_Id,
            coalicion: item.coalicion,
            logo_URL_Coalicion: item.logo_URL_Coalicion,
            logo:
              item.is_Coalicion == true
                ? item.logo_URL_Coalicion
                : item.logo_URL_Partido,
            label: item.partido == null ? item.coalicion : item.partido,
            value:
              item.partido_Id == null ? item.coalicion_Id : item.partido_Id,
          };
        });
        listPartidosPoliticos.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Partidos_Politicos = listPartidosPoliticos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticosDistritosRP() {
      try {
        let resp = null;
        resp = await api.get(
          "/Tipos_Elecciones/Todos_RP_Coaliciones_Partidos_Distritos"
        );

        let { data } = resp.data;
        let listPartidosPoliticos = data.map((item) => {
          return {
            partido_Id: item.partido_Id,
            partido: item.partido,
            logo_URL_Partido: item.logo_URL_Partido,
            is_Coalicion: item.is_Coalicion,
            coalicion_Id: item.coalicion_Id,
            coalicion: item.coalicion,
            logo_URL_Coalicion: item.logo_URL_Coalicion,
            logo:
              item.is_Coalicion == true
                ? item.logo_URL_Coalicion
                : item.logo_URL_Partido,
            label: item.partido,
            value: item.partido_Id,
          };
        });
        listPartidosPoliticos.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Partidos_Politicos = listPartidosPoliticos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticosDemarcacionesRP(id) {
      try {
        let resp = null;
        resp = await api.get(
          `/Tipos_Elecciones/Todos_RP_Coaliciones_Partidos_Demarcacion_Municipios/${id}`
        );

        let { data } = resp.data;
        let listPartidosPoliticos = data.map((item) => {
          return {
            partido_Id: item.partido_Id,
            partido: item.partido,
            logo_URL_Partido: item.logo_URL_Partido,
            is_Coalicion: item.is_Coalicion,
            coalicion_Id: item.coalicion_Id,
            coalicion: item.coalicion,
            logo_URL_Coalicion: item.logo_URL_Coalicion,
            logo:
              item.is_Coalicion == true
                ? item.logo_URL_Coalicion
                : item.logo_URL_Partido,
            label: item.partido == null ? item.coalicion : item.partido,
            value:
              item.partido_Id == null ? item.coalicion_Id : item.partido_Id,
          };
        });
        listPartidosPoliticos.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Partidos_Politicos = listPartidosPoliticos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //MUNICIPIOS
    async loadMunicipios() {
      try {
        let resp = await api.get("/Municipios/MunicipiosNayarit");
        let { data } = resp.data;
        let listMunicipios = data.map((municipio) => {
          return {
            id: municipio.id,
            estado_Id: municipio.estado_Id,
            estado: municipio.estado,
            clave: municipio.clave,
            nombre: municipio.nombre,
            fecha_Registro: municipio.fecha_Registro,
            value: municipio.id,
            label: municipio.nombre,
          };
        });
        listMunicipios.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Municipios = listMunicipios;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //DEMARCACIONES
    async loadDemarcaciones(id) {
      try {
        let resp = await api.get(`/Demarcaciones/ByMunicipio/${id}`);
        let { data } = resp.data;
        let listDemarcaciones = data.map((demarcacion) => {
          return {
            id: demarcacion.id,
            municipio_Id: demarcacion.no_Distrito,
            municipio: demarcacion.municipio,
            nombre: demarcacion.nombre,
            no_Demarcacion: demarcacion.no_Demarcacion,
            indigena: demarcacion.indigena,
            label: demarcacion.nombre,
            value: demarcacion.id,
          };
        });
        listDemarcaciones.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Demarcaciones = listDemarcaciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //EDADES
    async loadEdades() {
      const data = [
        { id: 1, edades: "Todos" },
        { id: 2, edades: "18-24" },
        { id: 3, edades: "25-29" },
        { id: 4, edades: "30-39" },
        { id: 5, edades: "40-49" },
        { id: 6, edades: "50-59" },
        { id: 7, edades: "60 o más" },
      ];
      this.list_Edades = data.map((edad) => {
        return {
          label: edad.edades,
          value: edad.id,
        };
      });
    },

    //----------------------------------------------------------------------
    //GENERO
    async loadGenero() {
      const data = [
        { id: "", sexo: "Todos" },
        { id: 1, sexo: "Mujer" },
        { id: 2, sexo: "Hombre" },
        { id: 3, sexo: "No binario" },
      ];
      this.list_Sexo = data.map((sexo) => {
        return {
          label: sexo.sexo,
          value: sexo.id,
        };
      });
    },
  },
});
