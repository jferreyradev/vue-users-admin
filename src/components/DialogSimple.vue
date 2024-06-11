<script setup>

import { ref } from 'vue';
const props = defineProps(['show', 'title', 'message'])

const dialog = ref(props.show)

</script>

<template>
  <div class="text-center pa-4">
    <!-- <v-btn @click="dialog = true">
      Open Dialog
    </v-btn> -->

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        :text= props.message
        :title= props.title
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
