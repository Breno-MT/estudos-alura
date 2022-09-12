import type IProjeto from "@/interfaces/IProjeto";
import type { Module } from "vuex";
import type { Estado } from "@/store"
import http from "@/http";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipoAcoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETO } from "@/store/tipoMutacoes";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
    }
}
