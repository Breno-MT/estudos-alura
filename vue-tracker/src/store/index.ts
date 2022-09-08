import type { INotificacao } from "@/interfaces/INotificacao";
import type IProjeto from "@/interfaces/IProjeto";
import type ITarefa from "@/interfaces/ITarefa";
import type { InjectionKey } from "vue";
import { createStore, useStore as vuexUseStore, Store } from "vuex";
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipoAcoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, DEFINIR_TAREFA, EXCLUIR_PROJETO, NOTIFICAR } from "./tipoMutacoes";
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
            state.tarefas.push(tarefa)
        },
        [ATUALIZA_TAREFA] (state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[indice] = tarefa
        },
        [REMOVE_TAREFA] (state, id: string) {
            state.projetos = state.projetos.filter(p => p.id != id)
        },
        [DEFINIR_TAREFA] (state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
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
        },
        [CADASTRAR_PROJETOS] (context, nomeDoProjeto: string) {
            return http.post('/projetos', {
                "nome": nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO] (context, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO] ({ commit }, id: string){
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS] ({commit}) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFA,resposta.data))
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
    }
});


export function useStore(): Store<State> {
    return vuexUseStore(key)
}