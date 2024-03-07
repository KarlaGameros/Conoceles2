import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const PdfCandidato = async () => {
  try {
    let img = new Image();

    img.src = require("../assets/IEEN300.png");
    let totalPagesExp = "{total_pages_count_string}";
    const doc = new jsPDF({ orientation: "portrait", format: "letter" });
    doc.addImage(img, "png", 10, 5, 35, 21);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(
      "INSTITUTO ESTATAL ELECTORAL DEL ESTADO DE NAYARIT \n",
      110,
      15,
      null,
      null,
      "center"
    );

    //--------------------------------------------------------------------------//
    var rows = [["Nombre: Karla Jazmin Gameros Lopez"]];
    var header = [[{ content: "DATOS GENERALES" }]];

    //--------------------------------------------------------------------------//

    jsPDF.autoTableSetDefaults({
      headStyles: { fillColor: [233, 126, 189], halign: "center" },
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
    });
    autoTable(doc, {
      theme: "grid",
      startY: 90,
      margin: { left: 10, rigth: 10 },
      head: header,
      body: [...rows],
      bodyStyles: { fontSize: 10, textColor: [0, 0, 0] },
      tableLineColor: [0, 0, 0],
    });
    //--------------------------------------------------------------------------//
    var rows2 = [
      [
        "Nombre: Karla Jazmin Gameros Lopez",
        "Nombre: Karla Jazmin Gameros Lopez",
      ],
    ];
    var header2 = [
      [{ content: "MEDIOS DE COMUNICACIÓN" }, { content: "REDES SOCIALES" }],
    ];

    //--------------------------------------------------------------------------//

    jsPDF.autoTableSetDefaults({
      headStyles: { fillColor: [233, 126, 189], halign: "center" },
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
    });
    autoTable(doc, {
      theme: "grid",
      startY: 105.2,
      margin: { left: 10, rigth: 10 },
      head: header2,
      body: [...rows2],
      bodyStyles: { fontSize: 10, textColor: [0, 0, 0] },
      tableLineColor: [0, 0, 0],
    });

    //---------------------------------------------
    // Dibujar un "círculo" utilizando curvas de Bézier
    var centerX = 100; // Coordenada X del centro del "círculo"
    var centerY = 50; // Coordenada Y del centro del "círculo"
    var radius = 20; // Radio del "círculo"

    doc.circle(centerX, centerY, radius, "FD");

    // Agregar una imagen dentro del "círculo"
    var imgData = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Reemplaza con la ruta de tu imagen
    var imgWidth = 50; // Ancho de la imagen
    var imgHeight = 50; // Alto de la imagen

    // Calcular las coordenadas para centrar la imagen en el círculo
    var imgX = centerX - imgWidth / 2;
    var imgY = centerY - imgHeight / 2;

    // Agregar la imagen al documento
    doc.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);
    //---------------------------------------------
    doc.setFillColor(209, 48, 138);
    doc.rect(10, 130, 191.8, 7, "FD");
    doc.setTextColor(255, 255, 255);
    doc.setDrawColor(209, 48, 138);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("¿Por qué quiero ocupar un cargo público?", 10, 135);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Por que tengo la experiencia y capacidad para hacer por el bien de la ciudadanía del Distrito Conozco el Distrito así como",
      10,
      140
    );
    doc.text(
      "necesidades en los cargos que me he desempeñado lo he hecho con honestidad y verdadera vocación de servicio.  ",
      10,
      145
    );
    //---------------------------------------------
    doc.setFillColor(209, 48, 138);
    doc.rect(10, 150, 191.8, 7, "FD");
    doc.setTextColor(255, 255, 255);
    doc.setDrawColor(209, 48, 138);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Propuesta 1", 10, 155);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Por que tengo la experiencia y capacidad para hacer por el bien de la ciudadanía del Distrito Conozco el Distrito así como",
      10,
      160
    );
    doc.text(
      "necesidades en los cargos que me he desempeñado lo he hecho con honestidad y verdadera vocación de servicio.  ",
      10,
      165
    );
    //---------------------------------------------
    doc.setFillColor(209, 48, 138);
    doc.rect(10, 175, 191.8, 7, "FD");
    doc.setTextColor(255, 255, 255);
    doc.setDrawColor(209, 48, 138);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Propuesta 1", 10, 180);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Por que tengo la experiencia y capacidad para hacer por el bien de la ciudadanía del Distrito Conozco el Distrito así como",
      10,
      185
    );
    doc.text(
      "necesidades en los cargos que me he desempeñado lo he hecho con honestidad y verdadera vocación de servicio.  ",
      10,
      190
    );
    //---------------------------------------------
    doc.save("Candidato" + ".pdf");
    return {
      success: true,
      msj: "Recibo generado con éxito",
    };
  } catch (error) {
    return {
      success: false,
      data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
    };
  }
};
export default PdfCandidato;
