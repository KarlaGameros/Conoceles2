<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
            <q-breadcrumbs-el icon="live_help" label="Preguntas frecuentes" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <preguntasComp />
  </q-page>
</template>

<script setup>
import preguntasComp from "../components/preguntasComp.vue";
//---------------------------------------------------------------------------------
</script>

<style></style>
