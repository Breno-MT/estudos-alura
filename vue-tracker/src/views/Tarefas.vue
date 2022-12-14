<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import BarraLateral from '../components/BarraLateral.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipoAcoes';
import { useStore } from '@/store';
import type ITarefa from '@/interfaces/ITarefa';
import Modal from '../components/Modal.vue';



export default defineComponent({
    name: 'App',

    components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box,
    Modal
},

    data () {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    
    computed: {
        semTarefas(): boolean {
            return this.tarefas.length === 0
        }
    },
    
    methods: {
        salvarTarefa (tarefa: ITarefa): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa (tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        alterarTarefa () {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        },
        fecharModal () {
            this.tarefaSelecionada = null
        }
    },

    setup() {

        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const filtro = ref("")

        // const tarefas = computed(() => store.state.tarefa.tarefas.filter( (t) => !filtro.value || t.descricao.includes(filtro.value)));

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        };
    },



})

</script>
    
<template>

    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <Box v-if="semTarefas">
            Você não está muito produtivo hoje! :(
        </Box>
        <div class="field">
            <p class="control has-icons-left">
                <input type="text" 
                class="input" 
                placeholder="Digite para filtrar"
                v-model="filtro"
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" 
        @ao-tarefa-clicada="selecionarTarefa"
        />
        <Modal :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho>
                    <p class="modal-card-title">Editar Tarefa</p>
                    <button @click="fecharModal" class="delete" aria-label="close"></button>
            </template>
                <template v-slot:corpo>
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input 
                        type="text" 
                        class="input" 
                        v-model="tarefaSelecionada.descricao"
                        id="descricaoDaTarefa"
                        >
                    </div>
                </template>

                <template v-slot:rodape>
                    <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
                    <button @click="fecharModal" class="button">Cancelar</button>
                </template>
        </Modal>
    </div>

</template>
