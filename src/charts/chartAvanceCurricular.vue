<template>
  <div class="col-12">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useGraficasStore } from "src/stores/graficas-store";
import { storeToRefs } from "pinia";
import Highcharts, { chart } from "highcharts";
import drilldown from "highcharts/modules/drilldown";
import accessibility from "highcharts/modules/accessibility";
import exporting from "highcharts/modules/exporting";

drilldown(Highcharts);
accessibility(Highcharts);
exporting(Highcharts);
const graficasStore = useGraficasStore();
const { list_Graficas_Filtrado, cargoGrafica } = storeToRefs(graficasStore);

export default {
  data() {
    const priPorcentaje = ref(null);
    const priSeries = ref([]);
    const panPorcentaje = ref(null);
    const panSeries = ref([]);
    const prdPorcentaje = ref(null);
    const prdSeries = ref([]);
    const shhnPorcentaje = ref(null);
    const shhnSeries = ref([]);
    const fycnPorcentaje = ref(null);
    const fycnSeries = ref([]);
    const ptPorcentaje = ref(null);
    const ptSeries = ref([]);
    const pvemPorcentaje = ref(null);
    const pvemSeries = ref([]);
    const mcPorcentaje = ref(null);
    const mcSeries = ref([]);
    const morenaPorcentaje = ref(null);
    const morenaSeries = ref([]);
    const nanPorcentaje = ref(null);
    const nanSeries = ref([]);
    const mlnPorcentaje = ref(null);
    const mlnSeries = ref([]);
    const fxmnPorcentaje = ref(null);
    const fxmnSeries = ref([]);
    const rspnPorcentaje = ref(null);
    const rspnSeries = ref([]);
    const totalShhn = ref(null);
    const shhn = ref(null);
    const totalFycn = ref(null);
    const fycn = ref(null);
    const totalPt = ref(null);
    const pt = ref(null);
    const totalPvem = ref(null);
    const pvem = ref(null);
    const totalMc = ref(null);
    const mc = ref(null);
    const totalMorena = ref(null);
    const morena = ref(null);
    const totalNan = ref(null);
    const nan = ref(null);
    const totalMln = ref(null);
    const mln = ref(null);
    const totalFxmn = ref(null);
    const fxmn = ref(null);
    const totalRspn = ref(null);
    const rspn = ref(null);
    const totalPri = ref(null);
    const pri = ref(null);
    const totalPan = ref(null);
    const pan = ref(null);
    const totalPrd = ref(null);
    const prd = ref(null);
    const data = ref([]);
    const series = ref([]);

    const rellenarGrafica = () => {
      shhnPorcentaje.value = null;
      shhnSeries.value = [];
      fycnPorcentaje.value = null;
      fycnSeries.value = [];
      ptPorcentaje.value = null;
      ptSeries.value = [];
      pvemPorcentaje.value = null;
      pvemSeries.value = [];
      mcPorcentaje.value = null;
      mcSeries.value = [];
      morenaPorcentaje.value = null;
      morenaSeries.value = [];
      nanPorcentaje.value = null;
      nanSeries.value = [];
      mlnPorcentaje.value = null;
      mlnSeries.value = [];
      fxmnPorcentaje.value = null;
      fxmnSeries.value = [];
      rspnPorcentaje.value = null;
      rspnSeries.value = [];
      totalShhn.value = null;
      shhn.value = null;
      totalFycn.value = null;
      fycn.value = null;
      totalPt.value = null;
      pt.value = null;
      totalPvem.value = null;
      pvem.value = null;
      totalMc.value = null;
      mc.value = null;
      totalMorena.value = null;
      morena.value = null;
      totalNan.value = null;
      nan.value = null;
      totalMln.value = null;
      mln.value = null;
      totalFxmn.value = null;
      fxmn.value = null;
      totalRspn.value = null;
      rspn.value = null;

      //-----------------------------------------------------
      totalPan.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 8 && candidato.is_Coalicion == false
      );
      pan.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.is_Coalicion == false &&
          candidato.partido_Id == 8 &&
          candidato.avance_Curricular == 100
      );
      panPorcentaje.value = parseInt(
        (pan.value.length * 100) / totalPan.value.length
      );
      if (pan.value.length > 0) {
        let mujeres = pan.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = pan.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = pan.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        panSeries.value.push(
          ["Mujer", parseInt((mujeres.length * 100) / pan.value.length)],
          ["Hombre", parseInt((hombres.length * 100) / pan.value.length)],
          ["No binario", parseInt((noBinario.length * 100) / pan.value.length)]
        );
      }

      //-----------------------------------------------------
      totalPri.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 9 && candidato.is_Coalicion == false
      );
      pri.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.is_Coalicion == true &&
          candidato.partido_Id == 9 &&
          candidato.avance_Curricular == 100
      );
      priPorcentaje.value = parseInt(
        (pri.value.length * 100) / totalPri.value.length
      );
      if (pri.value.length > 0) {
        let mujeres = pri.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = pri.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = pri.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        priSeries.value.push(
          ["Mujer", parseInt((mujeres.length * 100) / pri.value.length)],
          ["Hombre", parseInt((hombres.length * 100) / pri.value.length)],
          ["No binario", parseInt((noBinario.length * 100) / pri.value.length)]
        );
      }
      //-----------------------------------------------------
      totalPrd.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 10 && candidato.is_Coalicion == false
      );
      prd.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.is_Coalicion == true &&
          candidato.partido_Id == 10 &&
          candidato.avance_Curricular == 100
      );
      prdPorcentaje.value = parseInt(
        (prd.value.length * 100) / totalPrd.value.length
      );
      if (prd.value.length > 0) {
        let mujeres = prd.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = prd.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = prd.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        prdSeries.value.push(
          ["Mujer", parseInt((mujeres.length * 100) / prd.value.length)],
          ["Hombre", parseInt((hombres.length * 100) / prd.value.length)],
          ["No binario", parseInt((noBinario.length * 100) / prd.value.length)]
        );
      }
      //-----------------------------------------------------
      totalShhn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.is_Coalicion == true && candidato.coalicion_Id == 1007
      );
      shhn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.is_Coalicion == true &&
          candidato.coalicion_Id == 1007 &&
          candidato.avance_Curricular == 100
      );
      shhnPorcentaje.value = parseInt(
        (shhn.value.length * 100) / totalShhn.value.length
      );
      if (shhn.value.length > 0) {
        let mujeres = shhn.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = shhn.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = shhn.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        shhnSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / shhn.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / shhn.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / shhn.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalFycn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.is_Coalicion == true && candidato.coalicion_Id == 1008
      );
      fycn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.is_Coalicion == true &&
          candidato.coalicion_Id == 1008 &&
          candidato.avance_Curricular == 100
      );
      fycnPorcentaje.value = parseInt(
        (fycn.value.length * 100) / totalFycn.value.length
      );
      if (fycn.value.length > 0) {
        let mujeres = fycn.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = fycn.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = fycn.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        fycnSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / fycn.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / fycn.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / fycn.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalPt.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 11 && candidato.is_Coalicion == false
      );
      pt.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 11 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      ptPorcentaje.value = parseInt(
        (pt.value.length * 100) / totalPt.value.length
      );
      if (pt.value.length > 0) {
        let mujeres = pt.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = pt.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = pt.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        ptSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / pt.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / pt.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / pt.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalPvem.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 12 && candidato.is_Coalicion == false
      );
      pvem.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 12 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      pvemPorcentaje.value = parseInt(
        (pvem.value.length * 100) / totalPvem.value.length
      );
      if (pvem.value.length > 0) {
        let mujeres = pvem.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = pvem.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = pvem.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );

        pvemSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / pvem.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / pvem.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / pvem.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalMc.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 13 && candidato.is_Coalicion == false
      );
      mc.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 13 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      mcPorcentaje.value = parseInt(
        (mc.value.length * 100) / totalMc.value.length
      );
      if (mc.value.length > 0) {
        let mujeres = mc.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = mc.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = mc.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        mcSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / mc.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / mc.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / mc.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalMorena.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 14 && candidato.is_Coalicion == false
      );
      morena.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 14 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      morenaPorcentaje.value = parseInt(
        (morena.value.length * 100) / totalMorena.value.length
      );
      if (morena.value.length > 0) {
        let mujeres = morena.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = morena.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = morena.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        morenaSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / morena.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            ,
            parseInt((hombres.length * 100) / morena.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / morena.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalNan.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 15 && candidato.is_Coalicion == false
      );
      nan.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 15 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      nanPorcentaje.value = parseInt(
        (nan.value.length * 100) / totalNan.value.length
      );
      if (nan.value.length > 0) {
        let mujeres = nan.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = nan.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = nan.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        nanSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / nan.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / nan.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / nan.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalMln.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 16 && candidato.is_Coalicion == false
      );
      mln.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 16 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      mlnPorcentaje.value = parseInt(
        (mln.value.length * 100) / totalMln.value.length
      );
      if (mln.value.length > 0) {
        let mujeres = mln.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = mln.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = mln.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );

        mlnSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            ,
            parseInt((mujeres.length * 100) / mln.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / mln.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / mln.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalFxmn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 17 && candidato.is_Coalicion == false
      );
      fxmn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 17 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      fxmnPorcentaje.value = parseInt(
        (fxmn.value.length * 100) / totalFxmn.value.length
      );
      if (fxmn.value.length > 0) {
        let mujeres = fxmn.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = fxmn.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = fxmn.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );
        fxmnSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / fxmn.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / fxmn.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / fxmn.value.length),
          ]
        );
      }
      //-----------------------------------------------------
      totalRspn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 18 && candidato.is_Coalicion == false
      );
      rspn.value = list_Graficas_Filtrado.value.filter(
        (candidato) =>
          candidato.partido_Id == 18 &&
          candidato.avance_Curricular == 100 &&
          candidato.is_Coalicion == false
      );
      rspnPorcentaje.value = parseInt(
        (rspn.value.length * 100) / totalRspn.value.length
      );
      if (rspn.value.length > 0) {
        let mujeres = rspn.value.filter(
          (candidato) => candidato.sexo === "Mujer"
        );
        let hombres = rspn.value.filter(
          (candidato) => candidato.sexo === "Hombre"
        );
        let noBinario = rspn.value.filter(
          (candidato) => candidato.sexo === "No binario"
        );

        rspnSeries.value.push(
          [
            `Mujer: ${mujeres.length}`,
            parseInt((mujeres.length * 100) / rspn.value.length),
          ],
          [
            `Hombre: ${hombres.length}`,
            parseInt((hombres.length * 100) / rspn.value.length),
          ],
          [
            `No binario: ${noBinario.length}`,
            parseInt((noBinario.length * 100) / rspn.value.length),
          ]
        );
      }

      data.value =
        cargoGrafica.value == "RP"
          ? [
              {
                name: `PAN: ${pan.value.length}/${totalPan.value.length}`,
                y: panPorcentaje.value,
                drilldown: "PAN",
              },
              {
                name: `PRI: ${pri.value.length}/${totalPri.value.length}`,
                y: priPorcentaje.value,
                drilldown: "PRI",
              },
              {
                name: `PRD: ${prd.value.length}/${totalPrd.value.length}`,
                y: prdPorcentaje.value,
                drilldown: "PRD",
              },
              {
                name: `PT: ${pt.value.length}/${totalPt.value.length}`,
                y: ptPorcentaje.value,
                drilldown: "PT",
              },
              {
                name: `PVEM: ${pvem.value.length}/${totalPvem.value.length}`,
                y: pvemPorcentaje.value,
                drilldown: "PVEM",
              },
              {
                name: `MC: ${mc.value.length}/${totalMc.value.length}`,
                y: mcPorcentaje.value,
                drilldown: "MC",
              },
              {
                name: `MORENA: ${morena.value.length}/${totalMorena.value.length}`,
                y: morenaPorcentaje.value,
                drilldown: "MORENA",
              },
              {
                name: `NAN: ${nan.value.length}/${totalNan.value.length}`,
                y: nanPorcentaje.value,
                drilldown: "NAN",
              },
              {
                name: `MLN: ${mln.value.length}/${totalMln.value.length}`,
                y: mlnPorcentaje.value,
                drilldown: "MLN",
              },
              {
                name: `FXMN: ${fxmn.value.length}/${totalFxmn.value.length}`,
                y: fxmnPorcentaje.value,
                drilldown: "FXMN",
              },
              {
                name: `RSPN: ${rspn.value.length}/${totalRspn.value.length}`,
                y: rspnPorcentaje.value,
                drilldown: "RSPN",
              },
            ]
          : cargoGrafica.value == "MR"
          ? [
              {
                name: `SHHN: ${shhn.value.length}/${totalShhn.value.length}`,
                y: shhnPorcentaje.value,
                drilldown: "SHHN",
              },
              {
                name: `FYCN: ${fycn.value.length}/${totalFycn.value.length}`,
                y: fycnPorcentaje.value,
                drilldown: "FYCN",
              },
              {
                name: `PT: ${pt.value.length}/${totalPt.value.length}`,
                y: ptPorcentaje.value,
                drilldown: "PT",
              },
              {
                name: `PVEM: ${pvem.value.length}/${totalPvem.value.length}`,
                y: pvemPorcentaje.value,
                drilldown: "PVEM",
              },
              {
                name: `MC: ${mc.value.length}/${totalMc.value.length}`,
                y: mcPorcentaje.value,
                drilldown: "MC",
              },
              {
                name: `MORENA: ${morena.value.length}/${totalMorena.value.length}`,
                y: morenaPorcentaje.value,
                drilldown: "MORENA",
              },
              {
                name: `NAN: ${nan.value.length}/${totalNan.value.length}`,
                y: nanPorcentaje.value,
                drilldown: "NAN",
              },
              {
                name: `MLN: ${mln.value.length}/${totalMln.value.length}`,
                y: mlnPorcentaje.value,
                drilldown: "MLN",
              },
              {
                name: `FXMN: ${fxmn.value.length}/${totalFxmn.value.length}`,
                y: fxmnPorcentaje.value,
                drilldown: "FXMN",
              },
              {
                name: `RSPN: ${rspn.value.length}/${totalRspn.value.length}`,
                y: rspnPorcentaje.value,
                drilldown: "RSPN",
              },
            ]
          : [
              {
                name: `SHHN: ${shhn.value.length}/${totalShhn.value.length}`,
                y: shhnPorcentaje.value,
                drilldown: "SHHN",
              },
              {
                name: `FYCN: ${fycn.value.length}/${totalFycn.value.length}`,
                y: fycnPorcentaje.value,
                drilldown: "FYCN",
              },
              {
                name: `PAN: ${pan.value.length}/${totalPan.value.length}`,
                y: panPorcentaje.value,
                drilldown: "PAN",
              },
              {
                name: `PRI: ${pri.value.length}/${totalPri.value.length}`,
                y: priPorcentaje.value,
                drilldown: "PRI",
              },
              {
                name: `PRD: ${prd.value.length}/${totalPrd.value.length}`,
                y: prdPorcentaje.value,
                drilldown: "PRD",
              },
              {
                name: `PT: ${pt.value.length}/${totalPt.value.length}`,
                y: ptPorcentaje.value,
                drilldown: "PT",
              },
              {
                name: `PVEM: ${pvem.value.length}/${totalPvem.value.length}`,
                y: pvemPorcentaje.value,
                drilldown: "PVEM",
              },
              {
                name: `MC: ${mc.value.length}/${totalMc.value.length}`,
                y: mcPorcentaje.value,
                drilldown: "MC",
              },
              {
                name: `MORENA: ${morena.value.length}/${totalMorena.value.length}`,
                y: morenaPorcentaje.value,
                drilldown: "MORENA",
              },
              {
                name: `NAN: ${nan.value.length}/${totalNan.value.length}`,
                y: nanPorcentaje.value,
                drilldown: "NAN",
              },
              {
                name: `MLN: ${mln.value.length}/${totalMln.value.length}`,
                y: mlnPorcentaje.value,
                drilldown: "MLN",
              },
              {
                name: `FXMN: ${fxmn.value.length}/${totalFxmn.value.length}`,
                y: fxmnPorcentaje.value,
                drilldown: "FXMN",
              },
              {
                name: `RSPN: ${rspn.value.length}/${totalRspn.value.length}`,
                y: rspnPorcentaje.value,
                drilldown: "RSPN",
              },
            ];

      series.value =
        cargoGrafica.value == "RP"
          ? [
              {
                id: "PAN",
                data: panSeries.value,
              },
              {
                id: "PRI",
                data: priSeries.value,
              },
              {
                id: "PRD",
                data: prdSeries.value,
              },
              {
                id: "PT",
                data: ptSeries.value,
              },
              {
                id: "PVEM",
                data: pvemSeries.value,
              },
              {
                id: "MC",
                data: mcSeries.value,
              },
              {
                id: "MORENA",
                data: morenaSeries.value,
              },
              {
                id: "NAN",
                data: nanSeries.value,
              },
              {
                id: "MLN",
                data: mlnSeries.value,
              },
              {
                id: "FXMN",
                data: fxmnSeries.value,
              },
              {
                id: "RSPN",
                data: rspnSeries.value,
              },
            ]
          : cargoGrafica.value == "MR"
          ? [
              {
                id: "SHHN",
                data: shhnSeries.value,
              },
              {
                id: "FYCN",
                data: fycnSeries.value,
              },
              {
                id: "PT",
                data: ptSeries.value,
              },
              {
                id: "PVEM",
                data: pvemSeries.value,
              },
              {
                id: "MC",
                data: mcSeries.value,
              },
              {
                id: "MORENA",
                data: morenaSeries.value,
              },
              {
                id: "NAN",
                data: nanSeries.value,
              },
              {
                id: "MLN",
                data: mlnSeries.value,
              },
              {
                id: "FXMN",
                data: fxmnSeries.value,
              },
              {
                id: "RSPN",
                data: rspnSeries.value,
              },
            ]
          : [
              {
                id: "SHHN",
                data: shhnSeries.value,
              },
              {
                id: "FYCN",
                data: fycnSeries.value,
              },
              {
                id: "PAN",
                data: panSeries.value,
              },
              {
                id: "PRI",
                data: priSeries.value,
              },
              {
                id: "PRD",
                data: prdSeries.value,
              },
              {
                id: "PT",
                data: ptSeries.value,
              },
              {
                id: "PVEM",
                data: pvemSeries.value,
              },
              {
                id: "MC",
                data: mcSeries.value,
              },
              {
                id: "MORENA",
                data: morenaSeries.value,
              },
              {
                id: "NAN",
                data: nanSeries.value,
              },
              {
                id: "MLN",
                data: mlnSeries.value,
              },
              {
                id: "FXMN",
                data: fxmnSeries.value,
              },
              {
                id: "RSPN",
                data: rspnSeries.value,
              },
            ];
    };

    watch(list_Graficas_Filtrado, (val) => {
      if (val != null) {
        actualizarGrafica();
      }
    });

    const actualizarGrafica = () => {
      rellenarGrafica();

      this.chartOptions.series[0].data =
        cargoGrafica.value == "RP"
          ? [
              {
                name: `PAN: ${pan.value.length}/${totalPan.value.length}`,
                y: panPorcentaje.value,
                drilldown: "PAN",
              },
              {
                name: `PRI: ${pri.value.length}/${totalPri.value.length}`,
                y: priPorcentaje.value,
                drilldown: "PRI",
              },
              {
                name: `PRD: ${prd.value.length}/${totalPrd.value.length}`,
                y: prdPorcentaje.value,
                drilldown: "PRD",
              },
              {
                name: `PT: ${pt.value.length}/${totalPt.value.length}`,
                y: ptPorcentaje.value,
                drilldown: "PT",
              },
              {
                name: `PVEM: ${pvem.value.length}/${totalPvem.value.length}`,
                y: pvemPorcentaje.value,
                drilldown: "PVEM",
              },
              {
                name: `MC: ${mc.value.length}/${totalMc.value.length}`,
                y: mcPorcentaje.value,
                drilldown: "MC",
              },
              {
                name: `MORENA: ${morena.value.length}/${totalMorena.value.length}`,
                y: morenaPorcentaje.value,
                drilldown: "MORENA",
              },
              {
                name: `NAN: ${nan.value.length}/${totalNan.value.length}`,
                y: nanPorcentaje.value,
                drilldown: "NAN",
              },
              {
                name: `MLN: ${mln.value.length}/${totalMln.value.length}`,
                y: mlnPorcentaje.value,
                drilldown: "MLN",
              },
              {
                name: `FXMN: ${fxmn.value.length}/${totalFxmn.value.length}`,
                y: fxmnPorcentaje.value,
                drilldown: "FXMN",
              },
              {
                name: `RSPN: ${rspn.value.length}/${totalRspn.value.length}`,
                y: rspnPorcentaje.value,
                drilldown: "RSPN",
              },
            ]
          : cargoGrafica.value == "MR"
          ? [
              {
                name: `SHHN: ${shhn.value.length}/${totalShhn.value.length}`,
                y: shhnPorcentaje.value,
                drilldown: "SHHN",
              },
              {
                name: `FYCN: ${fycn.value.length}/${totalFycn.value.length}`,
                y: fycnPorcentaje.value,
                drilldown: "FYCN",
              },
              {
                name: `PT: ${pt.value.length}/${totalPt.value.length}`,
                y: ptPorcentaje.value,
                drilldown: "PT",
              },
              {
                name: `PVEM: ${pvem.value.length}/${totalPvem.value.length}`,
                y: pvemPorcentaje.value,
                drilldown: "PVEM",
              },
              {
                name: `MC: ${mc.value.length}/${totalMc.value.length}`,
                y: mcPorcentaje.value,
                drilldown: "MC",
              },
              {
                name: `MORENA: ${morena.value.length}/${totalMorena.value.length}`,
                y: morenaPorcentaje.value,
                drilldown: "MORENA",
              },
              {
                name: `NAN: ${nan.value.length}/${totalNan.value.length}`,
                y: nanPorcentaje.value,
                drilldown: "NAN",
              },
              {
                name: `MLN: ${mln.value.length}/${totalMln.value.length}`,
                y: mlnPorcentaje.value,
                drilldown: "MLN",
              },
              {
                name: `FXMN: ${fxmn.value.length}/${totalFxmn.value.length}`,
                y: fxmnPorcentaje.value,
                drilldown: "FXMN",
              },
              {
                name: `RSPN: ${rspn.value.length}/${totalRspn.value.length}`,
                y: rspnPorcentaje.value,
                drilldown: "RSPN",
              },
            ]
          : [
              {
                name: `SHHN: ${shhn.value.length}/${totalShhn.value.length}`,
                y: shhnPorcentaje.value,
                drilldown: "SHHN",
              },
              {
                name: `FYCN: ${fycn.value.length}/${totalFycn.value.length}`,
                y: fycnPorcentaje.value,
                drilldown: "FYCN",
              },
              {
                name: `PAN: ${pan.value.length}/${totalPan.value.length}`,
                y: panPorcentaje.value,
                drilldown: "PAN",
              },
              {
                name: `PRI: ${pri.value.length}/${totalPri.value.length}`,
                y: priPorcentaje.value,
                drilldown: "PRI",
              },
              {
                name: `PRD: ${prd.value.length}/${totalPrd.value.length}`,
                y: prdPorcentaje.value,
                drilldown: "PRD",
              },
              {
                name: `PT: ${pt.value.length}/${totalPt.value.length}`,
                y: ptPorcentaje.value,
                drilldown: "PT",
              },
              {
                name: `PVEM: ${pvem.value.length}/${totalPvem.value.length}`,
                y: pvemPorcentaje.value,
                drilldown: "PVEM",
              },
              {
                name: `MC: ${mc.value.length}/${totalMc.value.length}`,
                y: mcPorcentaje.value,
                drilldown: "MC",
              },
              {
                name: `MORENA: ${morena.value.length}/${totalMorena.value.length}`,
                y: morenaPorcentaje.value,
                drilldown: "MORENA",
              },
              {
                name: `NAN: ${nan.value.length}/${totalNan.value.length}`,
                y: nanPorcentaje.value,
                drilldown: "NAN",
              },
              {
                name: `MLN: ${mln.value.length}/${totalMln.value.length}`,
                y: mlnPorcentaje.value,
                drilldown: "MLN",
              },
              {
                name: `FXMN: ${fxmn.value.length}/${totalFxmn.value.length}`,
                y: fxmnPorcentaje.value,
                drilldown: "FXMN",
              },
              {
                name: `RSPN: ${rspn.value.length}/${totalRspn.value.length}`,
                y: rspnPorcentaje.value,
                drilldown: "RSPN",
              },
            ];

      this.chartOptions.drilldown.series =
        cargoGrafica.value == "RP"
          ? [
              { id: "PAN", data: panSeries.value },
              { id: "PRI", data: priSeries.value },
              { id: "PRD", data: prdSeries.value },
              { id: "PT", data: ptSeries.value },
              { id: "PVEM", data: pvemSeries.value },
              { id: "MC", data: mcSeries.value },
              { id: "MORENA", data: morenaSeries.value },
              { id: "NAN", data: nanSeries.value },
              { id: "MLN", data: mlnSeries.value },
              { id: "FXMN", data: fxmnSeries.value },
              { id: "RSPN", data: rspnSeries.value },
            ]
          : cargoGrafica.value == "MR"
          ? [
              { id: "SHHN", data: shhnSeries.value },
              { id: "FYCN", data: fycnSeries.value },
              { id: "PT", data: ptSeries.value },
              { id: "PVEM", data: pvemSeries.value },
              { id: "MC", data: mcSeries.value },
              { id: "MORENA", data: morenaSeries.value },
              { id: "NAN", data: nanSeries.value },
              { id: "MLN", data: mlnSeries.value },
              { id: "FXMN", data: fxmnSeries.value },
              { id: "RSPN", data: rspnSeries.value },
            ]
          : [
              { id: "SHHN", data: shhnSeries.value },
              { id: "FYCN", data: fycnSeries.value },
              { id: "PAN", data: panSeries.value },
              { id: "PRI", data: priSeries.value },
              { id: "PRD", data: prdSeries.value },
              { id: "PT", data: ptSeries.value },
              { id: "PVEM", data: pvemSeries.value },
              { id: "MC", data: mcSeries.value },
              { id: "MORENA", data: morenaSeries.value },
              { id: "NAN", data: nanSeries.value },
              { id: "MLN", data: mlnSeries.value },
              { id: "FXMN", data: fxmnSeries.value },
              { id: "RSPN", data: rspnSeries.value },
            ];
    };

    rellenarGrafica();
    return {
      chartOptions: {
        colors: ["#af7ead", "#b988b8", "#dcbadb"],
        chart: {
          type: "column",
        },
        title: {
          text: "",
        },
        align: "center",
        xAxis: {
          type: "category",
        },
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        yAxis: {
          title: "",
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "<b>{point.y} %<br/>",
          shared: true,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              pointFormat: "<b>{point.y} %<br/>",
            },
          },
        },
        series: [
          {
            name: "Avance",
            colorByPoint: true,
            data: data.value,
          },
        ],
        drilldown: {
          dataLabels: {
            enabled: false,
          },
          breadcrumbs: {
            position: {
              align: "right",
            },
          },
          series: series.value,
        },
      },
    };
  },
};
</script>
