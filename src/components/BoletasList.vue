<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBoletasStore } from '@/stores/boletasStore';
import { useApiConfig } from '@/composables/useConfigApi';

const boletasStore = useBoletasStore()
const { getBoletasHeaders } = useApiConfig()

const { loading, boletas } = storeToRefs(boletasStore)
const descargando = ref(new Set())

const URL_API = 'https://dno-mid-api-22.jferreyradev.deno.net/api'

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

async function descargarBoleta(item) {
    const url = `${URL_API}/boleta?IdLiq=${item.LIQUIDACIONID}`
    descargando.value = new Set([...descargando.value, item.LIQUIDACIONID])
    try {
        const response = await fetch(url, { method: 'GET', headers: getBoletasHeaders() })
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        const disposition = response.headers.get('content-disposition')
        let filename = `boleta_${item.LIQUIDACIONID}.pdf`
        if (disposition) {
            const match = disposition.match(/filename="?([^"]+)"?/)
            if (match?.[1]) filename = match[1]
        }
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
        console.error('Error descargando boleta:', err)
    } finally {
        const s = new Set(descargando.value)
        s.delete(item.LIQUIDACIONID)
        descargando.value = s
    }
}

</script>

<template>
    <v-card class="elevation-12 mx-auto" max-width="900">
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
                            <v-btn block class="m-5" @click="descargarBoleta(item)"
                                :loading="descargando.has(item.LIQUIDACIONID)"> Descargar </v-btn>
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