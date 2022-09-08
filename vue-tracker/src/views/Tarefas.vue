<script lang="ts">
import { computed, defineComponent } from 'vue';
import BarraLateral from '../components/BarraLateral.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue'
import { OBTER_TAREFAS } from '@/store/tipoAcoes';
import { useStore } from '@/store';
import type ITarefa from '@/interfaces/ITarefa';



export default defineComponent({
    name: 'App',

    components: {
        BarraLateral,
        Formulario,
        Tarefa,
        Box
    },

    computed: {
        semTarefas(): boolean {
            return this.tarefas.length === 0
        }
    },
    
    methods: {
        // salvarTarefa (tarefa: ITarefa): void {
        //     this.tarefas.push(tarefa)
        // }
    },
    
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }



})

</script>
    
<template>

    <Formulario />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="semTarefas">
            Você não está muito produtivo hoje! :(
        </Box>
    </div>

</template>
