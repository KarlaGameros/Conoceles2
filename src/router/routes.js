const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/inicio",
        name: "inicio",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/diputaciones/:eleccion_Id",
        name: "DIP",
        props: true,
        component: () => import("../modulos/diputaciones/pages/IndexPage"),
      },
      {
        path: "/diputacionesCards/:eleccion_Id",
        name: "DIPcards",
        props: true,
        component: () => import("../modulos/diputaciones/pages/CardsPage"),
      },
      {
        path: "/diputacionesDetalle/:id/:puesto/:eleccion_Id",
        name: "diputacionesDetalle",
        props: true,
        component: () =>
          import("../modulos/diputaciones/pages/DetalleCandidatoPage"),
      },
      {
        path: "/presidenciaSindicatura/:eleccion_Id",
        name: "PYS",
        props: true,
        component: () =>
          import("../modulos/presidencia_sindicaturia/pages/IndexPage"),
      },
      {
        path: "/cardsPresidenciaSindicatura/:eleccion_Id",
        name: "PYScards",
        props: true,
        component: () =>
          import(
            "../modulos/presidencia_sindicaturia/pages/CardsPresidenciaPage"
          ),
      },
      {
        path: "/detallePresidenciaSindicatura/:id/:puesto/:eleccion_Id",
        name: "detallePresidenciaSindicatura",
        props: true,
        component: () =>
          import(
            "../modulos/presidencia_sindicaturia/pages/DetallePresidenciaSindicaturaPage"
          ),
      },
      {
        path: "/regidurias/:eleccion_Id",
        name: "REG",
        props: true,
        component: () => import("../modulos/regidurias/pages/IndexPage"),
      },
      {
        path: "/cardsRegidurias/:eleccion_Id",
        name: "REGcards",
        props: true,
        component: () =>
          import("../modulos/regidurias/pages/CardsRegiduriasPage"),
      },
      {
        path: "/detalleRegidurias/:id/:puesto/:eleccion_Id",
        name: "detalleRegidurias",
        props: true,
        component: () =>
          import("../modulos/regidurias/pages/DetalleRegiduriasPage"),
      },
      {
        path: "/preguntasFrecuentes",
        name: "preguntasFrecuentes",
        component: () =>
          import("../modulos/preguntasFrecuentes/pages/IndexPage"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
