import { TipoNotificacao, type INotificacao } from "@/interfaces/INotificacao";
import type IProjeto from "@/interfaces/IProjeto";
import type ITarefa from "@/interfaces/ITarefa";
import type { InjectionKey } from "vue";
import { createStore, useStore as vuexUseStore, Store } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipoMutacoes";
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, REMOVE_TAREFA } from "./tipoMutacoes";

interface State {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: [
            {
                id: 1,
                texto: "Uma notificação de sucesso",
                titulo: 'Sucesso',
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                texto: "Uma notificação de atencao",
                titulo: 'Atenção',
                tipo: TipoNotificacao.ATENCAO
            },
            {
                id: 3,
                texto: "Uma notificação de falha",
                titulo: 'Falha',
                tipo: TipoNotificacao.FALHA
            },
        ]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto

            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)

        },
        [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[indice] = tarefa
        },
        [REMOVE_TAREFA] (state, id: string) {
            state.projetos = state.projetos.filter(p => p.id != id)
        },
    }
});


export function useStore(): Store<State> {
    return vuexUseStore(key)
}