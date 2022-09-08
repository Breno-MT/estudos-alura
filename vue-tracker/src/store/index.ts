import type { INotificacao } from "@/interfaces/INotificacao";
import type IProjeto from "@/interfaces/IProjeto";
import type ITarefa from "@/interfaces/ITarefa";
import type { InjectionKey } from "vue";
import { createStore, useStore as vuexUseStore, Store } from "vuex";
import { OBTER_PROJETOS } from "./tipoAcoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipoMutacoes";
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, REMOVE_TAREFA } from "./tipoMutacoes";
import http from "@/http"


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
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO] (state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto

            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO] (state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO] (state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)

        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]){
            state.projetos = projetos
        },
        [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ATUALIZA_TAREFA] (state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[indice] = tarefa
        },
        [REMOVE_TAREFA] (state, id: string) {
            state.projetos = state.projetos.filter(p => p.id != id)
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notif => notif.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_PROJETOS] ({commit}) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETO,resposta.data))
        }
    }
});


export function useStore(): Store<State> {
    return vuexUseStore(key)
}