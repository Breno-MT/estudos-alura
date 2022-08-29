<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name: 'Box',

    data() {
        return {
            estilos: {
                background: '#f8eab2'
            }
        }
    },
})

</script>

<template>
    <div class="box has-text-weight-bold" :style="estilos">
        <slot></slot>
    </div>

</template>