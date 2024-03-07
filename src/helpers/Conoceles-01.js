import { jsPDF } from "jspdf";
import { useVerificacionVacante } from "../stores/verificacion_store";

const verificacionVacanteStore = useVerificacionVacante();

const ReporteConoceles01 = async (id, puesto) => {
  let candidato = await verificacionVacanteStore.loadCandidato(id, puesto);

  let datosGenerales =
    await verificacionVacanteStore.loadCandidatoDatosGenerales(id, puesto);
  let formacionAcademica =
    await verificacionVacanteStore.loadCandidatoFormacionAcademica(id, puesto);
  let propuestasCandidato =
    await verificacionVacanteStore.loadCandidatoPropuestas(id, puesto);

  await new Promise((resolveOuter) => {
    resolveOuter(
      new Promise((resolveInner) => {
        setTimeout(resolveInner, 1000);
      })
    );
  });
  try {
    const doc = new jsPDF();
    function createHeader() {
      doc.setLineWidth(1.5);
      doc.setDrawColor(209, 48, 138);
      doc.line(43, 15, 79, 15);
      doc.line(130, 15, 159, 15);
      doc.setFillColor(209, 48, 138);
      doc.rect(43, 13, 4, 4, "F");
      doc.rect(155, 13, 4, 4, "F");
      doc.addImage(conoceles, "jpg", 80, 5, 50, 20);
      doc.addImage(logo, "jpg", 10, 5, 32, 20);
      doc.addImage(pelo, "jpg", 160, 13, 45, 6);
    }

    function figuraPregunta(y) {
      doc.setDrawColor(209, 48, 138);
      doc.line(60, y + 2, 75, y + 2);
      doc.setFillColor(209, 48, 138);
      doc.rect(60, y, 4, 4, "F");
    }
    function textoPregunta() {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
    }
    function textoRespuesta() {
      doc.setFont("times", "normal");
      doc.setFontSize(11);
    }
    function textoLateral() {
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
    }
    function textoLateralAlternativo() {
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
    }

    function createLateral(valor, pagina) {
      let y = 0;
      if (valor == true) {
        y = 30;
      }
      doc.setPage(pagina);
      doc.setFillColor(209, 48, 138);
      doc.rect(0, y, 60, 310, "F");
      if (valor == false) {
        doc.setFillColor(255, 255, 255);
        doc.rect(8, 138, 44, 16, "F");
        doc.addImage(conoceles, "jpg", 10, 140, 40, 12);
      }
    }
    function lineaDivision(puntoY) {
      doc.setFillColor(255, 255, 255);
      doc.rect(2, puntoY, 56, 1, "F");
    }

    let logo = new Image();
    logo.src = require("../assets/IEEN300.png");
    let pelo = new Image();
    pelo.src = require("../assets/Pelo2024-250.png");
    let conoceles = new Image();
    conoceles.src = require("../assets/Conoceles.png");
    let usuario = new Image();
    usuario.src =
      `${candidato.foto}` + "?r=" + Math.floor(Math.random() * 100000);
    let partido = new Image();
    partido.src =
      `${candidato.logo_Partido}` + "?r=" + Math.floor(Math.random() * 100000);
    let coalicion = new Image();
    coalicion.src =
      `${candidato.logo_Coalicion}` +
      "?r=" +
      Math.floor(Math.random() * 100000);
    let pc = new Image();
    pc.src = require("../assets/pc.png");
    let correo = new Image();
    correo.src = require("../assets/correo.png");
    let telefono = new Image();
    telefono.src = require("../assets/telefono.png");
    let ubicacion = new Image();
    ubicacion.src = require("../assets/ubicacion.png");
    let facebook = new Image();
    facebook.src = require("../assets/facebook.png");
    let twitter = new Image();
    twitter.src = require("../assets/twitter.png");
    let instagram = new Image();
    instagram.src = require("../assets/instagram.png");
    let youtube = new Image();
    youtube.src = require("../assets/youtube.png");
    let tiktok = new Image();
    tiktok.src = require("../assets/tiktok.png");

    createHeader();
    let puntoY = 40;
    figuraPregunta(puntoY);
    textoPregunta();
    doc.text("Grado máximo de estudios", 76, puntoY + 3);
    textoRespuesta();
    doc.text(
      datosGenerales.grado_Maximo_Estudios +
        " - " +
        datosGenerales.estatus_Grado_Estudios,
      65,
      puntoY + 7
    );

    //-----------------------------------------------------------//
    puntoY = puntoY + 15;
    figuraPregunta(puntoY);
    textoPregunta();
    doc.text("Información académica", 76, puntoY + 3);
    textoRespuesta();
    var linesinformacion = doc.splitTextToSize(
      formacionAcademica.formacion,
      136
    ); // 80 is the maximum width of line (you can change it according to your needs)
    puntoY = puntoY + 7;
    doc.text(formacionAcademica.formacion, 65, puntoY, {
      align: "justify",
      lineHeightFactor: 1,
      maxWidth: 135,
    });

    //------------------------------------------------------------------//
    puntoY = puntoY + 5 * linesinformacion.length;
    if (puntoY >= 275) {
      doc.addPage();
      puntoY = 20;
    }
    figuraPregunta(puntoY);
    textoPregunta();
    doc.text("Historia profesional y/o laboral", 76, puntoY + 3);
    textoRespuesta();
    var linesHistoria = doc.splitTextToSize(
      datosGenerales.historia_Laboral,
      135
    );
    puntoY = puntoY + 7;
    var puntoInicial = puntoY;
    let arregloTexto = [];
    let textoCadena = "";
    var paginaActual = doc.internal.getNumberOfPages();
    for (var i = 0; i < linesHistoria.length; i++) {
      textoCadena = textoCadena.concat(" ", linesHistoria[i]);
      puntoY = puntoY + 4;
      if (puntoY >= 275) {
        doc.addPage();
        arregloTexto.push([textoCadena]);
        textoCadena = "";
        puntoY = 20;
      }
    }

    arregloTexto.push([textoCadena]);
    doc.setPage(paginaActual);
    if (arregloTexto.length > 1) {
      for (var i = 0; i < arregloTexto.length; i++) {
        doc.text(arregloTexto[i], 65, puntoInicial, {
          align: "justify",
          lineHeightFactor: 1,
          maxWidth: 135,
        });
        puntoInicial = 20;
        paginaActual = paginaActual + 1;
        doc.setPage(paginaActual);
      }
    } else {
      doc.text(arregloTexto[0], 65, puntoInicial, {
        align: "justify",
        lineHeightFactor: 1,
        maxWidth: 135,
      });
    }

    //---------------------------------------------------------------------------------------------//

    puntoY = puntoY + 2;
    if (puntoY >= 275) {
      doc.addPage();
      puntoY = 20;
    }
    figuraPregunta(puntoY);
    textoPregunta();
    doc.text("Trayectoria política y/o participación social", 76, puntoY + 3);
    textoRespuesta();
    var linesTrayectoria = doc.splitTextToSize(datosGenerales.trayectoria, 135);
    puntoY = puntoY + 7;
    var puntoInicialTrayectoria = puntoY;
    let arregloTextoTrayectoria = [];
    let textoCadenaTrayectoria = "";
    var paginaActualTrayectoria = doc.internal.getNumberOfPages();
    for (var i = 0; i < linesTrayectoria.length; i++) {
      textoCadenaTrayectoria = textoCadenaTrayectoria.concat(
        " ",
        linesTrayectoria[i]
      );
      puntoY = puntoY + 4;
      if (puntoY >= 275) {
        doc.addPage();
        arregloTextoTrayectoria.push([textoCadenaTrayectoria]);
        textoCadenaTrayectoria = "";
        puntoY = 20;
      }
    }
    arregloTextoTrayectoria.push([textoCadenaTrayectoria]);
    doc.setPage(paginaActualTrayectoria);
    if (arregloTextoTrayectoria.length > 1) {
      for (var i = 0; i < arregloTextoTrayectoria.length; i++) {
        doc.text(arregloTextoTrayectoria[i], 65, puntoInicialTrayectoria, {
          align: "justify",
          lineHeightFactor: 1,
          maxWidth: 135,
        });
        puntoInicialTrayectoria = 20;
        paginaActualTrayectoria = paginaActualTrayectoria + 1;
        doc.setPage(paginaActualTrayectoria);
      }
    } else {
      doc.text(arregloTextoTrayectoria[0], 65, puntoInicialTrayectoria, {
        align: "justify",
        lineHeightFactor: 1,
        maxWidth: 135,
      });
    }

    //-----------------------------------------------------------------------------------------------//

    puntoY = puntoY + 2;
    if (puntoY >= 275) {
      doc.addPage();
      puntoY = 20;
    }
    figuraPregunta(puntoY);
    textoPregunta();
    doc.text("¿Por qué quiere ocupar un cargo público?", 76, puntoY + 3);
    textoRespuesta();
    var linesCargo = doc.splitTextToSize(
      datosGenerales.motivo_Cargo_Publico,
      135
    );
    puntoY = puntoY + 7;
    var puntoInicialCargo = puntoY;
    let arregloTextoCargo = [];
    let textoCadenaCargo = "";
    var paginaActualCargo = doc.internal.getNumberOfPages();
    for (var i = 0; i < linesCargo.length; i++) {
      textoCadenaCargo = textoCadenaCargo.concat(" ", linesCargo[i]);
      puntoY = puntoY + 4;
      if (puntoY >= 275) {
        doc.addPage();
        arregloTextoCargo.push([textoCadenaCargo]);
        textoCadenaCargo = "";
        puntoY = 20;
      }
    }
    arregloTextoCargo.push([textoCadenaCargo]);
    doc.setPage(paginaActualCargo);
    if (arregloTextoCargo.length > 1) {
      for (var i = 0; i < arregloTextoCargo.length; i++) {
        doc.text(arregloTextoCargo[i], 65, puntoInicialCargo, {
          align: "justify",
          lineHeightFactor: 1,
          maxWidth: 135,
        });
        puntoInicialCargo = 20;
        paginaActualCargo = paginaActualCargo + 1;
        doc.setPage(paginaActualCargo);
      }
    } else {
      doc.text(arregloTextoCargo[0], 65, puntoInicialCargo, {
        align: "justify",
        lineHeightFactor: 1,
        maxWidth: 135,
      });
    }
    //-----------------------------------------------------------------------------------------------//

    puntoY = puntoY + 2;
    if (puntoY >= 275) {
      doc.addPage();
      puntoY = 20;
    }
    figuraPregunta(puntoY);
    textoPregunta();
    doc.text("¿Cuáles son mis dos principales propuestas? ", 76, puntoY + 3);
    doc.text("Propuesta 1 ", 65, puntoY + 8);
    textoRespuesta();
    var linesPropuesta = doc.splitTextToSize(
      propuestasCandidato[0].propuesta,
      135
    );
    puntoY = puntoY + 12;
    var puntoInicialPropuesta = puntoY;
    let arregloTextoPropuesta = [];
    let textoCadenaPropuesta = "";
    var paginaActualPropuesta = doc.internal.getNumberOfPages();
    for (var i = 0; i < linesPropuesta.length; i++) {
      textoCadenaPropuesta = textoCadenaPropuesta.concat(
        " ",
        linesPropuesta[i]
      );
      puntoY = puntoY + 4;
      if (puntoY >= 275) {
        doc.addPage();
        arregloTextoPropuesta.push([textoCadenaPropuesta]);
        textoCadenaPropuesta = "";
        puntoY = 20;
      }
    }
    arregloTextoPropuesta.push([textoCadenaPropuesta]);
    doc.setPage(paginaActualPropuesta);
    if (arregloTextoPropuesta.length > 1) {
      for (var i = 0; i < arregloTextoPropuesta.length; i++) {
        doc.text(arregloTextoPropuesta[i], 65, puntoInicialPropuesta, {
          align: "justify",
          lineHeightFactor: 1,
          maxWidth: 135,
        });
        puntoInicialPropuesta = 20;
        paginaActualPropuesta = paginaActualPropuesta + 1;
        doc.setPage(paginaActualPropuesta);
      }
    } else {
      doc.text(arregloTextoPropuesta[0], 65, puntoInicialPropuesta, {
        align: "justify",
        lineHeightFactor: 1,
        maxWidth: 135,
      });
    }
    //-----------------------------------------------------------------------------------------------//

    puntoY = puntoY + 2;
    if (puntoY >= 275) {
      doc.addPage();
      puntoY = 20;
    }
    textoPregunta();
    doc.text("Propuesta 2 ", 65, puntoY + 3);
    textoRespuesta();
    var linesPropuesta2 = doc.splitTextToSize(
      propuestasCandidato[1].propuesta,
      135
    );
    puntoY = puntoY + 7;
    var puntoInicialPropuesta2 = puntoY;
    let arregloTextoPropuesta2 = [];
    let textoCadenaPropuesta2 = "";
    var paginaActualPropuesta2 = doc.internal.getNumberOfPages();
    for (var i = 0; i < linesPropuesta2.length; i++) {
      textoCadenaPropuesta2 = textoCadenaPropuesta2.concat(
        " ",
        linesPropuesta2[i]
      );
      puntoY = puntoY + 4;
      if (puntoY >= 275) {
        doc.addPage();
        arregloTextoPropuesta2.push([textoCadenaPropuesta2]);
        textoCadenaPropuesta2 = "";
        puntoY = 20;
      }
    }
    arregloTextoPropuesta2.push([textoCadenaPropuesta2]);
    doc.setPage(paginaActualPropuesta2);
    if (arregloTextoPropuesta2.length > 1) {
      for (var i = 0; i < arregloTextoPropuesta2.length; i++) {
        doc.text(arregloTextoPropuesta2[i], 65, puntoInicialPropuesta2, {
          align: "justify",
          lineHeightFactor: 1,
          maxWidth: 135,
        });
        puntoInicialPropuesta2 = 20;
        paginaActualPropuesta2 = paginaActualPropuesta2 + 1;
        doc.setPage(paginaActualPropuesta2);
      }
    } else {
      doc.text(arregloTextoPropuesta2[0], 65, puntoInicialPropuesta2, {
        align: "justify",
        lineHeightFactor: 1,
        maxWidth: 135,
      });
    }
    //-----------------------------------------------------------------------------------------------//

    puntoY = puntoY + 2;
    if (puntoY >= 275) {
      doc.addPage();
      puntoY = 20;
    }
    figuraPregunta(puntoY);
    textoPregunta();
    doc.text(
      "Propuestas en materia de género, o en su caso,\n del grupo en situación de discriminación que representa",
      76,
      puntoY + 3
    );
    textoRespuesta();
    var linesGenero = doc.splitTextToSize(datosGenerales.propuesta_Genero, 135);
    puntoY = puntoY + 14;
    var puntoInicialGenero = puntoY;
    let arregloTextoGenero = [];
    let textoCadenaGenero = "";
    var paginaActualGenero = doc.internal.getNumberOfPages();
    for (var i = 0; i < linesGenero.length; i++) {
      textoCadenaGenero = textoCadenaGenero.concat(" ", linesGenero[i]);
      puntoY = puntoY + 4;
      if (puntoY >= 275) {
        doc.addPage();
        arregloTextoGenero.push([textoCadenaGenero]);
        textoCadenaGenero = "";
        puntoY = 20;
      }
    }
    arregloTextoGenero.push([textoCadenaGenero]);
    doc.setPage(paginaActualGenero);
    if (arregloTextoGenero.length > 1) {
      for (var i = 0; i < arregloTextoGenero.length; i++) {
        doc.text(arregloTextoGenero[i], 65, puntoInicialGenero, {
          align: "justify",
          lineHeightFactor: 1,
          maxWidth: 135,
        });
        puntoInicialGenero = 20;
        paginaActualGenero = paginaActualGenero + 1;
        doc.setPage(paginaActualGenero);
      }
    } else {
      doc.text("visibility" + arregloTextoGenero[0], 65, puntoInicialGenero, {
        align: "justify",
        lineHeightFactor: 1,
        maxWidth: 135,
      });
    }
    /*for (var i = 0; i < linesPropuesta.length; i++) {
      doc.text(65, puntoY, linesPropuesta[i], {
        align: "justify",
      });
      puntoY = puntoY + 5;
      if (puntoY >= 275) {
        doc.addPage();
        puntoY = 20;
      }
    }*/
    //-----------------------------------------------------------------------------------------------//

    var pageCount = doc.internal.getNumberOfPages();
    for (let i = 0; i < pageCount; i++) {
      let pagina = i + 1;
      let valor = false;
      if (pagina == 1) {
        valor = true;
      }
      createLateral(valor, pagina);
    }

    //-------------------------------------------------------------------------//
    doc.setPage(1);
    doc.addImage(usuario, "jpg", 10, 35, 40, 40);
    textoLateral();
    let puntoLateralY = 80;
    var linesCandidato = doc.splitTextToSize(candidato.nombre, 50);
    doc.text(candidato.nombre, 30, puntoLateralY, {
      align: "center",
      lineHeightFactor: 1,
      maxWidth: 50,
    });
    puntoLateralY = puntoLateralY + 4 + 4 * linesCandidato.length;

    if (candidato.is_Coalicion == true) {
      doc.addImage(coalicion, "jpg", 5, puntoLateralY, 50, 10);
      textoLateral();
      puntoLateralY = puntoLateralY + 24;
      var linesCoalicion = doc.splitTextToSize(candidato.coalicion, 50);
      doc.text(candidato.coalicion, 30, puntoLateralY, {
        align: "center",
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 * linesCoalicion.length;
    } else {
      doc.addImage(partido, "jpg", 25, puntoLateralY, 10, 10);
      textoLateral();
      puntoLateralY = puntoLateralY + 24;
      var linesCoalicion = doc.splitTextToSize(candidato.partido, 50);
      doc.text(candidato.partido, 30, puntoLateralY, {
        align: "center",
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 * linesCoalicion.length;
    }

    lineaDivision(puntoLateralY);
    puntoLateralY = puntoLateralY + 8;

    textoLateralAlternativo();
    var linesEleccion = doc.splitTextToSize(
      "Candidatura: " + candidato.candidatura,
      50
    );
    doc.text("Candidatura: " + candidato.candidatura, 5, puntoLateralY, {
      align: "justify",
      lineHeightFactor: 1,
      maxWidth: 50,
    });
    puntoLateralY = puntoLateralY + 4 + 4 * linesEleccion.length;

    var linesCargo = doc.splitTextToSize("Cargo: " + candidato.cargo, 50);
    doc.text("Cargo: " + candidato.cargo, 5, puntoLateralY, {
      align: "justify",
      lineHeightFactor: 1,
      maxWidth: 50,
    });
    puntoLateralY = puntoLateralY + 4 + 4 * linesCargo.length;

    var linesGenero = doc.splitTextToSize("Genero: " + candidato.sexo, 50);
    doc.text("Genero: " + candidato.sexo, 5, puntoLateralY, {
      align: "justify",
      lineHeightFactor: 1,
      maxWidth: 50,
    });
    puntoLateralY = puntoLateralY + 4 + 4 * linesGenero.length;

    var linesEdad = doc.splitTextToSize(
      "Edad: " + candidato.edad + " años",
      50
    );
    doc.text("Edad: " + candidato.edad + " años", 5, puntoLateralY, {
      align: "justify",
      lineHeightFactor: 1,
      maxWidth: 50,
    });
    puntoLateralY = puntoLateralY + 4 * linesEdad.length;
    lineaDivision(puntoLateralY);
    puntoLateralY = puntoLateralY + 8;

    if (datosGenerales.pagina_Web != null) {
      doc.addImage(pc, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesSitio = doc.splitTextToSize(
        "Página Web: " + datosGenerales.pagina_Web,
        50
      );
      doc.text("Página Web: " + datosGenerales.pagina_Web, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesSitio.length;
    }
    if (datosGenerales.email != null) {
      doc.addImage(correo, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesEmail = doc.splitTextToSize(
        "Correo: " + datosGenerales.email,
        50
      );
      doc.text("Correo: " + datosGenerales.email, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesEmail.length;
    }
    if (datosGenerales.telefono != null) {
      doc.addImage(telefono, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesTel = doc.splitTextToSize(
        "Teléfono: " + datosGenerales.telefono,
        50
      );
      doc.text("Teléfono: " + datosGenerales.telefono, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesTel.length;
    }
    if (datosGenerales.direccion != null) {
      doc.addImage(ubicacion, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesDireccion = doc.splitTextToSize(
        "Dirección: " + datosGenerales.direccion,
        50
      );
      doc.text("Dirección: " + datosGenerales.direccion, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesDireccion.length;
    }
    lineaDivision(puntoLateralY);
    puntoLateralY = puntoLateralY + 8;
    if (datosGenerales.facebook != null) {
      doc.addImage(facebook, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesFacebook = doc.splitTextToSize(datosGenerales.facebook, 50);
      doc.text(datosGenerales.facebook, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesFacebook.length;
    }
    if (datosGenerales.twitter != null) {
      doc.addImage(twitter, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesTwitter = doc.splitTextToSize(datosGenerales.twitter, 50);
      doc.text(datosGenerales.twitter, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesTwitter.length;
    }
    if (datosGenerales.instagram) {
      doc.addImage(instagram, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesInstagram = doc.splitTextToSize(datosGenerales.instagram, 50);
      doc.text(datosGenerales.instagram, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesInstagram.length;
    }
    if (datosGenerales.tik_Tok) {
      doc.addImage(tiktok, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesTiktok = doc.splitTextToSize(datosGenerales.tik_Tok, 50);
      doc.text(datosGenerales.tik_Tok, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
      puntoLateralY = puntoLateralY + 4 + 4 * linesTiktok.length;
    }
    if (datosGenerales.youtube) {
      doc.addImage(youtube, "jpg", 2, puntoLateralY - 3, 4, 4);
      var linesYoutube = doc.splitTextToSize(datosGenerales.youtube, 50);
      doc.text(datosGenerales.youtube, 7, puntoLateralY, {
        lineHeightFactor: 1,
        maxWidth: 50,
      });
    }
    doc.save(candidato.nombre + ".pdf");
  } catch (error) {
    return {
      success: false,
      data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
    };
  }
};
export default ReporteConoceles01;
