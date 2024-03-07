<template>
  <banner>
    <template v-slot:icono>
      <q-icon name="live_help" color="purple-ieen" />
    </template>
    <template v-slot:contenido
      ><div class="text-bold text-h6 text-grey-7">Preguntas frecuentes.</div>
    </template>
  </banner>
  <div class="q-pt-md">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="pregunta in preguntas"
        :key="pregunta"
        expand-separator
        :label="`${pregunta.num}. ${pregunta.pregunta}`"
        class="text-weight-medium text-grey-8"
        default-opened
      >
        <q-card>
          <q-card-section class="text-black">
            {{ pregunta.respuesta }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import banner from "../../../components/bannerComp.vue";

const preguntas = [
  {
    num: 1,
    pregunta:
      "¿Qué objetivo tiene el sistema Candidatas y Candidatos, Conóceles?",
    respuesta:
      "Que la ciudadanía conozca información general de la vida política, laboral y pública de las personas candidatas del estado de Nayarit que participarán en la Jornada Electoral del 02 de junio de 2024,con la finalidad de que cuenten con la información suficiente al momento de emitir su voto.",
  },
  {
    num: 2,
    pregunta:
      "¿Quiénes proporcionan la información del Cuestionario curricular de cada persona candidata?",
    respuesta:
      "La información es proporcionada por las personas candidatas contendientes.",
  },
  {
    num: 3,
    pregunta:
      "¿Puedo compartir la información de las personas candidatas en redes sociales?",
    respuesta:
      "Sí. Busca el nombre de la personas candidata, elige la red social que deseas usar, y comparte. La información que se encuentra en el sistema es pública y puede ser compartida.",
  },
  {
    num: 4,
    pregunta:
      "¿Es una obligación de la Unidad Técnica de Transparencia y Protección de Datos Personales (UTTyPDP), del IEEN, publicar el Cuestionario curricular de una personas candidata?",
    respuesta:
      "No. Esta obligación corresponde a las personas candidatas y el Instituto Nacional Electoral, a través de la Unidad Técnica de Transparencia y Protección de Datos Personales le corresponde la supervisión y verificación de la captura de contenidos del cuestionario curricular.",
  },
  {
    num: 5,
    pregunta:
      "¿Cuál es el Aviso de Privacidad de la Información que proporcionan las personas candidatas?",
    respuesta:
      "Puedes consultar el Aviso de Privacidad Integral y Simplificado del sistema Candidatas y Candidatos, Conóceles 2023",
  },
  {
    num: 6,
    pregunta:
      "¿A qué cargos se están postulando las personas candidatas a nivel estatal?",
    respuesta:
      "Diputaciones, Presidencias y Sindicaturas, y Regidurias por el principio de mayoria relativa y representación propporcional",
  },
];
</script>
