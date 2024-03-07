import { boot } from "quasar/wrappers";
import VueGtag from "vue-gtag";

export default boot(({ app }) => {
  app.use(VueGtag, {
    config: { id: "G-TM054D6G54" },
    appName: "Nombre de tu aplicación",
    pageTrackerScreenviewEnabled: true,
  });
});
