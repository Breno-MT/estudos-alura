import type { INotificacao } from "@/interfaces/INotificacao";
import type IProjeto from "@/interfaces/IProjeto";
import type ITarefa from "@/interfaces/ITarefa";
import type { InjectionKey } from "vue";
import { createStore, useStore as vuexUseStore, Store } from "vuex";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETOS, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipoAcoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETO, DEFINIR_TAREFA, EXCLUIR_PROJETO, NOTIFICAR } from "./tipoMutacoes";
import { ADICIONA_TAREFA, REMOVE_TAREFA } from "./tipoMutacoes";
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
        [ALTERA_TAREFA] (state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
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
        [OBTER_PROJETOS] ({ commit }) {
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
        async [REMOVER_PROJETO] ({ commit }, id: string){
            await http.delete(`/projetos/${id}`);
            return commit(EXCLUIR_PROJETO, id);
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFA,resposta.data))
        },
        async [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            const resposta = await http.post('/tarefas', tarefa);
            return commit(ADICIONA_TAREFA, resposta.data);
        },
        async [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            await http.put(`/tarefas/${tarefa.id}`, tarefa);
            return commit(ALTERA_TAREFA, tarefa);
        },
    }
});


export function useStore(): Store<State> {
    return vuexUseStore(key)
}