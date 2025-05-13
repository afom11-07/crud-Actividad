<template>
  <div class="usuarios">
    <div class="usuarios-panel">
      <ButtonPrime label="Nuevo" icon="pi pi-plus" @click="nuevoUsuario" class="mb-3" />

     
      <DialogModal
        v-model:visible="activarModalNuevo"
        maximizable
        modal
        :header="accion + ' Usuario'"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div class="p-fluid">
          <InputText class="mb-2" v-model="usuario.cedula" placeholder="Digite cédula" />
          <InputText class="mb-2" v-model="usuario.nombre" placeholder="Digite nombre" />
          <InputText class="mb-2" v-model="usuario.usuario" placeholder="Digite usuario" />
          <Password class="mb-2" v-model="usuario.clave" toggleMask placeholder="Digite clave" />
          <Password
            class="mb-2"
            v-model="usuario.repetirClave"
            toggleMask
            placeholder="Repita clave"
          />
          <Dropdown
            class="mb-2"
            v-model="usuario.genero"
            :options="generos"
            optionLabel="label"
            optionValue="value"
            placeholder="Seleccione género"
          />
          <InputText class="mb-2" v-model="usuario.programa" placeholder="Digite programa" />
          <ButtonPrime
            @click="accion === 'Guardar' ? guardarUsuario() : updateUsuario()"
            :label="accion"
            severity="success"
            icon="pi pi-save"
          />
        </div>
      </DialogModal>

      <DataTable
        :value="usuarios"
        tableStyle="min-width: 50rem"
        stripedRows
        responsiveLayout="scroll"
      >
        <ColumnPrime field="cedula" header="N° Documento" />
        <ColumnPrime field="nombre" header="Nombre" />
        <ColumnPrime field="usuario" header="Usuario" />
        <ColumnPrime field="programa" header="Inscrito a" />
        <ColumnPrime header="Acción">
          <template #body="slotProps">
            <div class="flex gap-2 justify-content-center">
              <ButtonPrime icon="pi pi-eye" severity="info" @click="ver(slotProps.data)" />
              <ButtonPrime
                icon="pi pi-trash"
                severity="danger"
                @click="confirmarEliminacion(slotProps.data)"
              />
            </div>
          </template>
        </ColumnPrime>
      </DataTable>

     
      <ConfirmDialog />
    </div>
  </div>
</template>


<script>
import { ConfirmDialog } from "primevue/confirmdialog";

export default {
  components: {
    ConfirmDialog
  },

  data() {
    return {
      usuarios: [],
      usuario: {
        cedula: 0,
        nombre: "",
        usuario: "",
        clave: "",
        repetirClave: "",
        genero: "",
        programa: ""
      },
      activarModalNuevo: false,
      accion: "Guardar",
      generos: [
        { label: "Masculino", value: "Masculino" },
        { label: "Femenino", value: "Femenino" },
        { label: "Otro", value: "Otro" }
      ]
    };
  },

  methods: {
  
    getAllUsuarios: async function() {
      const url =
        "https://cobuses.com.co/APIV2/model/usuarios.php?dato=getallusuarios";
      try {
        const response = await this.axios.get(url);
        this.usuarios = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    
    guardarUsuario: async function() {
      if (this.usuario.clave !== this.usuario.repetirClave) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      const url =
        "https://cobuses.com.co/APIV2/model/usuarios.php?dato=insertusuario";
      const datosEnviar = { ...this.usuario };

      try {
        const response = await this.axios.post(
          url,
          JSON.stringify(datosEnviar)
        );
        if (response.status === 200) {
          alert("Usuario guardado exitosamente");
          this.activarModalNuevo = false;
          this.resetFormulario();
          this.getAllUsuarios();
        }
      } catch (error) {
        console.log(error);
      }
    },

    
    updateUsuario: async function() {
      if (this.usuario.clave !== this.usuario.repetirClave) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      const url =
        "https://cobuses.com.co/APIV2/model/usuarios.php?dato=updateusuario";
      const datosEnviar = { ...this.usuario };

      try {
        const response = await this.axios.post(
          url,
          JSON.stringify(datosEnviar)
        );
        if (response.status === 200) {
          alert("Usuario actualizado exitosamente");
          this.activarModalNuevo = false;
          this.resetFormulario();
          this.getAllUsuarios();
        }
      } catch (error) {
        console.log(error);
      }
    },

    
    eliminarUsuario: async function(cedula) {
      const url =
        "https://cobuses.com.co/APIV2/model/usuarios.php?dato=deleteusuario";
      try {
        await this.axios.post(url, JSON.stringify({ cedula }));
        alert("Usuario eliminado exitosamente");
        this.getAllUsuarios();
      } catch (error) {
        console.log(error);
      }
    },

  
    confirmarEliminacion(usuario) {
      this.$confirm.require({
        message: `¿Está seguro que desea eliminar a ${usuario.nombre}?`,
        header: "Confirmar eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          this.eliminarUsuario(usuario.cedula);
        },
        reject: () => {
          console.log("Eliminación cancelada");
        }
      });
    },

    ver(usuario) {
      this.usuario = { ...usuario };
      this.activarModalNuevo = true;
      this.accion = "Actualizar";
    },

    
    nuevoUsuario() {
      this.resetFormulario();
      this.activarModalNuevo = true;
      this.accion = "Guardar";
    },

    
    resetFormulario() {
      this.usuario = {
        cedula: 0,
        nombre: "",
        usuario: "",
        clave: "",
        repetirClave: "",
        genero: "",
        programa: ""
      };
    }
  },

  created() {
    this.getAllUsuarios();
  }
};
</script>


<style scoped>
.usuarios {
  background-color: #f4f4f4;
  padding: 2rem 0;
}

.usuarios-panel {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

.p-fluid > * {
  margin-bottom: 1rem;
}

.flex {
  display: flex;
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
