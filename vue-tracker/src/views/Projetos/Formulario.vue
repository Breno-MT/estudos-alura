<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from "@/store";
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from '@/store/tipoAcoes';


export default defineComponent({
    name: 'Formulario',

    props: {
        id: {
            type: String
        }
    },

    mounted () {
        if(this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },

    data () {
        return {
            nomeDoProjeto: ''
        }
    },

    methods: {
        salvar () {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
                this.notificar(TipoNotificacao.ATENCAO, 'Editado!', 'Projeto foi editado!')
                this.$router.push('/projetos')
            } else {
                this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
                .then(() => this.lidarComSucesso())
                    .catch(() => {
                        this.notificar(TipoNotificacao.FALHA, 'Falhou!', "Não foi possível realizar a ação! :(")
                    })
            }
            
        },
        lidarComSucesso () {
            this.nomeDoProjeto = '';
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'Projeto criado com sucesso!')
            this.$router.push('/projetos')
        }

    },

    setup () {
        const store = useStore()
        const { notificar } = useNotificador()
        
        return {
            store,
            notificar
        }
    }
})

</script>

<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input 
                type="text" 
                class="input" 
                v-model="nomeDoProjeto"
                id="nomeDoProjeto"
                >
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>
