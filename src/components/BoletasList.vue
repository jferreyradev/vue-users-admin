<script setup>
import { storeToRefs } from 'pinia';
import { useBoletasStore } from '@/stores/boletasStore';

const boletasStore = useBoletasStore()

const { loading, error, success, boletas } = storeToRefs(boletasStore)

const URL_API = 'https://midliq-api-7g0abd0mn8x4.deno.dev/api'

const getVto = (vto) => {
    if (vto) {
        const d = vto.split('-')
        return `${d[1]}/${d[0]}`
    }
    return null
}

function getNumberFormat(n) {
    return Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}

async function handleConforme(item) {
    console.log('Conforme')
    console.log(item.LIQUIDACIONID)
    const body = {
        'IdLiq': item.LIQUIDACIONID,
        'IdEstado': 1
    }
    try {
        await boletasStore.setBoleta(body)
        item.ESTADO = 1
    } catch (error) {
        console.log(error)
    }
}
async function handleNoConforme(item) {
    console.log('No conforme')
    console.log(item.LIQUIDACIONID)
    const body = {
        'IdLiq': item.LIQUIDACIONID,
        'IdEstado': 2
    }
    try {
        await boletasStore.setBoleta(body)
        item.ESTADO = 2
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title class="ma-5">Boletas disponibles</v-toolbar-title>
            <v-card-subtitle>
                <div>
                    {{ boletas[0].APELLIDO }} -
                    {{ boletas[0].NOMBRE }} -
                    DNI
                    {{ boletas[0].DOCUMENTO }}
                </div>
                <div>
                    Nro. Repartición {{ boletas[0].REPARTICIONID }}
                </div>
                <div>
                    Orden {{ boletas[0].ORDEN }}
                </div>
            </v-card-subtitle>

        </v-toolbar>
        <v-progress-linear color="primary" height="6" indeterminate rounded :active="loading"></v-progress-linear>
        <v-card-text>
            <v-table :height="300" :fixed-header="true" :hover="true">
                <thead>
                    <tr>
                        <th class="text-left">Periodo</th>
                        <th class="text-left">Devengado</th>
                        <th class="text-left">Descripcion</th>
                        <th class="text-left">Nro. Adicional</th>
                        <th class="text-left">Neto</th>
                        <th>
                            Conformidad
                        </th>
                        <th class="text-left">Enlace de descarga</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in boletas" :key="item.LIQUIDACIONID">
                        <td>{{ getVto(item.PERIODO) }}</td>
                        <td>{{ getVto(item.FECHADEV) }}</td>
                        <td>{{ item.TIPOLIQUIDACIONDESCRIPCION }}</td>
                        <td>{{ item.GRUPOADICIONALID }}</td>
                        <td>{{ getNumberFormat(item.NETO) }}</td>
                        <td>
                            <div v-if="item.ESTADO === 0">
                                <h4>Indefinido</h4>

                                <div>
                                    <v-btn size="x-small" color="primary" class="m-5"
                                        @click="handleConforme(item)">Conforme</v-btn>
                                    <v-btn size="x-small" color="primary" class="m-5"
                                        @click="handleNoConforme(item)">Disconforme</v-btn>
                                </div>
                            </div>
                            <div v-else-if="item.ESTADO === 1">
                                <h4>Conforme</h4>
                            </div>
                            <div v-else>
                                <h4>No Conforme</h4>
                            </div>
                        </td>
                        <td>
                            <a :href="URL_API + '/boleta?IdLiq=' + item.LIQUIDACIONID">
                                <v-btn block class="m-5"> Descargar </v-btn>
                            </a>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <span>Cantidad de boletas: {{ boletas.length }}</span>
                    </tr>

                </tfoot>
            </v-table>
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
    </v-card>
</template>

<style>
thead {
    background-color: #0e4b7c;
    font-size: medium;
    font-weight: bold;
}
</style>