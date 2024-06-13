<script setup>

import { useUser } from '@/composables/useUser.js'
import { onMounted, ref } from 'vue';
import { useApiConfig } from '@/composables/useConfigApi'

const { baseUrl } = useApiConfig()

const { pers, user } =  useUser()

//const URL_API = 'https://midliq-api-mkre08nv6x2j.deno.dev'

const URL_API = 'https://midliq-api-7g0abd0mn8x4.deno.dev/api'


const data = ref('')
const isPending = ref('')
const error = ref('')

//console.log(`${URL_API}/view/boletas?Documento=${user.value?.DNI}`)

function getData() {

    fetch(`${baseUrl.value}/boletas/${user.value?.DNI}`)
      .then((res) => res.json())
      .then((_data) => {
        data.value = _data
        isPending.value = false
      })
      .catch((err) => {
        error.value = err
        isPending.value = false
      })

}

const getVto = (vto) => {
  if (vto) {
    const d = vto.split('-')
    return `${d[1]}/${d[0]}`
  }
  return null
}

onMounted(()=>{
  if (pers && user.value.DNI)
    getData()
})

function getNumberFormat(n) {
  return Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}

function handleConforme(item) {
    console.log(item)
}

</script>

<template>
  <v-container>
    <v-row class="d-flex align-center justify-center mb-5">
      <h2>Boletas disponibles</h2>
    </v-row>
    <v-row v-if="isPending" class="mb-5">
      <span>loading...</span>
    </v-row>
    <v-row v-else-if="pers && data" class="d-flex flex-column mb-6">
      <p>DNI: {{ data[0].DOCUMENTO }}</p>
      <p>Apellido y nombre: {{ pers.APELLIDO }} {{ pers.NOMBRE }}</p>
      <span>
        Rep: {{ data[0].REPARTICIONID }} Orden: {{ data[0].ORDEN }} Afiliado:{{ data[0].AFILIADO }}
      </span>
    </v-row>
    <v-row v-if="pers && data">
      <v-table :height="300" :fixed-header="true" :hover="true">
        <thead>
          <tr>
            <th class="text-left">PERIODO</th>
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
          <tr v-for="item in data" :key="item.LIQUIDACIONID">
            <td>{{ getVto(item.PERIODO) }}</td>
            <td>{{ getVto(item.FECHADEV) }}</td>
            <td>{{ item.TIPOLIQUIDACIONDESCRIPCION }}</td>
            <td>{{ item.GRUPOADICIONALID }}</td>
            <td>{{ getNumberFormat(item.NETO) }}</td>
            <td >
                <div v-if="item.ESTADO === 1">
                  <h4>Conforme</h4>
                </div>
                <div v-else>                  
                  <v-btn color="primary" block class="m-5" @click="handleConforme(item)">Conformar</v-btn>
                </div>
              </td>
            <td>
              
                <a :href="URL_API + '/boleta?IdLiq=' + item.LIQUIDACIONID" >
                  <v-btn  block class="m-5"> Descargar </v-btn>
                </a>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-row>
    <v-row v-if="error" class="d-flex align-center justify-center ma-10">
      <div>No se puede obtener los datos solicitados.</div>
    </v-row>
  </v-container>
</template>
