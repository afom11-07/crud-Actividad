<template>
    <div class="usuarios">
        <div class="usuarios-panel">

            <ButtonPrime label="Nuevo" @click="nuevoUsuario()" />

            <DialogModal v-model:visible="activarModalNuevo" maximizable modal header="Nuevo Usuario"
                :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

                <div>
                    <InputText class="w-full mb-2" type="text" v-model="usuario.cedula" placeholder="Digite cédula" />
                    <InputText class="w-full mb-2" type="text" v-model="usuario.nombre" placeholder="Digite Nombre" />
                    <InputText class="w-full mb-2" type="text" v-model="usuario.usuario" placeholder="Digite usuario" />
                    <InputText class="w-full mb-2" type="password" v-model="usuario.clave" placeholder="Digite clave" />
                    <InputText class="w-full mb-2" type="password" v-model="usuario.repetirClave"
                        placeholder="Repita clave" />
                    <InputText class="w-full mb-2" type="text" v-model="usuario.genero" placeholder="Digite genero" />
                    <InputText class="w-full mb-2" type="text" v-model="usuario.programa"
                        placeholder="Digite programa" />
                    <ButtonPrime @click="guardarUsuario()"  label="Guardar" severity="success">{{ accion }}</ButtonPrime>
                </div>

            </DialogModal>

            <DataTable :value="usuarios" tableStyle="min-width: 50rem">
                <ColumnPrime field="cedula" header="N° Documento"></ColumnPrime>
                <ColumnPrime field="nombre" header="Nombre"></ColumnPrime>
                <ColumnPrime field="usuario" header="Usuario"></ColumnPrime>
                <ColumnPrime field="programa" header="Inscrito ha:"></ColumnPrime>
                <ColumnPrime header="Acción:">
                    <template #body="slotProps">
                        <ButtonPrime @click="ver(slotProps.data)" label="Ver" severity="success" />
                    </template>
                </ColumnPrime>
            </DataTable>
        </div>

    </div>
</template>

<script>
export default {
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
        }
    },

    methods: {
        getAllUsuarios: async function () {
            let url =
                "https://cobuses.com.co/APIV2/model/usuarios.php?dato=getallusuarios";
            let vue = this;
            await this.axios
                .get(url)
                .then(function (response) {
                    //vue.pokemones = response.data;
                    // console.log("RESPUESTA");
                    // console.log(response.data);
                    vue.usuarios = response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log("Proceso terminado");
                });
        },

        guardarUsuario: async function () {

            let datosEnviar = {
                cedula: this.usuario.cedula,
                nombre: this.usuario.nombre,
                usuario: this.usuario.usuario,
                clave: this.usuario.clave,
                genero: this.usuario.genero,
                programa: this.usuario.programa
            }
            let url =
                "https://cobuses.com.co/APIV2/model/usuarios.php?dato=insertusuario";
            let vue = this;
            await this.axios
                .post(url, JSON.stringify(datosEnviar))
                .then(function (response) {
                    if (response.status == 200) {
                        alert("Usuario Guardado Exitosamente");
                        vue.activarModalNuevo = false;
                        vue.usuario = {
                            cedula: 0,
                            nombre: "",
                            usuario: "",
                            clave: "",
                            repetirClave: "",
                            genero: "",
                            programa: ""
                        };

                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log("Proceso terminado");
                });
        },

        updateUsuario: async function () {

            let datosEnviar = {
                cedula: this.usuario.cedula,
                nombre: this.usuario.nombre,
                usuario: this.usuario.usuario,
                clave: this.usuario.clave,
                genero: this.usuario.genero,
                programa: this.usuario.programa
            }
            let url =
                "https://cobuses.com.co/APIV2/model/usuarios.php?dato=updateusuario";
            let vue = this;
            await this.axios
                .post(url, JSON.stringify(datosEnviar))
                .then(function (response) {
                    if (response.status == 200) {
                        alert("Usuario Guardado Exitosamente");
                        vue.activarModalNuevo = false;
                        vue.usuario = {
                            cedula: 0,
                            nombre: "",
                            usuario: "",
                            clave: "",
                            repetirClave: "",
                            genero: "",
                            programa: ""
                        };

                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log("Proceso terminado");
                });
        },

        ver: function (usuario) {
            this.activarModalNuevo = true;
            this.accion = "Editar";
            this.usuario = {
                cedula: usuario.cedula,
                nombre: usuario.nombre,
                usuario: usuario.usuario,
                clave: "",
                repetirClave: "",
                genero: usuario.genero,
                programa: usuario.programa
            };
        },

        guardar: function () {
            console.log(this.usuario);
        },

        nuevoUsuario: function () {
            this.activarModalNuevo = true;
            this.accion = "Guardar";

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

    created: function () {
        this.getAllUsuarios();
    }
}
</script>

<style scoped>
.usuarios {
    background-color: #F4F4F4;
}

.usuarios-panel {
    width: 70%;
    margin: 0 auto;
    text-align: center;
}
</style>