import { createApp } from "vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import PrimeVue from "primevue/config";
import 'primeflex/primeflex.css';
import Aura from "@primevue/themes/aura";
import App from "./App.vue";

// PrimeVue Components
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog'; // ✅ componente visual
import ConfirmationService from 'primevue/confirmationservice'; // ✅ servicio lógico

const app = createApp(App);

// Registrar componentes globales
app.component("InputText", InputText);
app.component("PassWord", Password);
app.component("DialogModal", Dialog);
app.component("ButtonPrime", Button);
app.component("DataTable", DataTable);
app.component("ColumnPrime", Column);
app.component("ConfirmDialog", ConfirmDialog); // ✅ componente visual registrado

// Usar servicios
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router);
app.use(VueAxios, axios);
app.use(ConfirmationService); // ✅ servicio de confirmación registrado

// Montar la app
app.mount("#app");

export { app };
