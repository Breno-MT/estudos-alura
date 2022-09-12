<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from "@/store";
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from '@/store/tipoAcoes';
import { useRouter } from 'vue-router';


export default defineComponent({
    name: 'Formulario',

    props: {
        id: {
            type: String
        }
    },

    setup (props) {

        const router = useRouter()

        const store = useStore()
        const { notificar } = useNotificador()

        const nomeDoProjeto = ref("")
        
        if(props.id) {
            const projeto = store.state.projeto.projetos.find(
                (proj) => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || ''
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                })
                notificar(TipoNotificacao.ATENCAO, 'Editado!', 'Projeto foi editado!')
                router.push('/projetos')
            } else {
                store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
                .then(() => lidarComSucesso())
                    .catch(() => {
                        notificar(TipoNotificacao.FALHA, 'Falhou!', "Não foi possível realizar a ação! :(")
                    })
            }
            
        }
 
        const lidarComSucesso =  () => {
            nomeDoProjeto.value = '';
            notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'Projeto criado com sucesso!')
            router.push('/projetos')
        }

        return {
            salvar,
            nomeDoProjeto
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
