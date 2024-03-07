<template>
  <div>
    <h1>Google API Example</h1>
    <p>Response: {{ apiResponse }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";

export default {
  setup() {
    const apiResponse = ref("");

    onMounted(async () => {
      try {
        // Configurar el cliente de autenticación de Google
        const auth = new GoogleAuth({
          keyFile: `{"web":{"client_id":"270756909640-o28gf1vmrnsda6ct0qhfm55uuckp04ks.apps.googleusercontent.com","project_id":"conoceles-416000","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:8080"],"javascript_origins":["http://localhost:8080"]}}`,
          scopes: ["https://www.googleapis.com/auth/analytics.readonly"], // ajusta los scopes según tus necesidades
        });

        // Obtener las credenciales
        const client = await auth.getClient();

        // Realizar una solicitud HTTP utilizando axios y las credenciales de autenticación
        const response = await axios.post(
          "https://content-analyticsdata.googleapis.com/v1beta/properties/429912171:runReport?alt=json",
          {
            metrics: [{ name: "active7DayUsers" }],
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          },
          {
            headers: {
              Authorization: `Bearer ${client.credentials.access_token}`,
            },
          }
        );

        // Mostrar la respuesta en el componente
        apiResponse.value = JSON.stringify(response.data, null, 2);
      } catch (error) {
        console.error("Error:", error);
        apiResponse.value = "Error al realizar la solicitud";
      }
    });

    return { apiResponse };
  },
};
</script>

<style>
/* Estilos opcionales */
</style>
