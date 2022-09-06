<script lang="ts">
import type ITarefa from '@/interfaces/ITarefa';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';

export default defineComponent ({
    name: 'Tarefa',

    components: {
        Cronometro,
        Box
    },
    
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
                required: true
        }
    }

})


</script>

<template>
    <Box>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>

            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>

        </div>

        <div class="column">
            <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos"/>
        </div>
    </Box>

</template>

<style scoped>
</style>