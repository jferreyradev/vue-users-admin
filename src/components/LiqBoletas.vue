<script setup>
//import { useFilterStore } from '@/stores/filterStore.js'
//import { useFetch } from '@/composables/useFetch.js'
import { usePersStore } from '@/stores/persStore'
import { onMounted, ref } from 'vue';
//import { useStatefulComposable } from '@/composables/stateful.js'
//import { defineProps } from 'vue'

//const { globalState } = useStatefulComposable()

//const props = defineProps(['dni'])

const URL_API = 'https://midliq-api-7g0abd0mn8x4.deno.dev/api'

const { pers } = usePersStore()

const data = ref('')
const isPending = ref('')
const error = ref('')

function getData() {

    fetch(`${URL_API}/view/boletas?Documento=${pers.DOCUMENTO}`)
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
    <v-row v-else-if="data" class="d-flex flex-column mb-6">
      <p>DNI: {{ data[0].DOCUMENTO }}</p>
      <p>Apellido y nombre: {{ pers.APELLIDO }} {{ pers.NOMBRE }}</p>
      <span>
        Rep: {{ data[0].REPARTICIONID }} Orden: {{ data[0].ORDEN }} Afiliado:{{ data[0].AFILIADO }}
      </span>
    </v-row>
    <v-row v-if="data">
      <v-table :height="300" :fixed-header="true" :hover="true">
        <thead>
          <tr>
            <th class="text-left">PERIODO</th>
            <th class="text-left">Devengado</th>
            <th class="text-left">Descripcion</th>
            <th class="text-left">Nro. Adicional</th>
            <th class="text-left">Neto</th>
            <!--  <th>
                Conformada
              </th> -->
            <th class="text-left">link descarga</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.LIQUIDACIONID">
            <td>{{ getVto(item.PERIODO) }}</td>
            <td>{{ getVto(item.FECHADEV) }}</td>
            <td>{{ item.TIPOLIQUIDACIONDESCRIPCION }}</td>
            <td>{{ item.GRUPOADICIONALID }}</td>
            <td>{{ getNumberFormat(item.NETO) }}</td>
            <td>
                <div v-if="item.ESTADO === 1">
                  <h4>Conforme</h4>
                </div>
                <div v-else>                  
                  <v-btn color="primary" block class="m-5" @click="handleConforme(item)">Conformar</v-btn>
                </div>
              </td>
            <td>
              <a :href="URL_API + '/boleta?IdLiq=' + item.LIQUIDACIONID">descargar</a>
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
