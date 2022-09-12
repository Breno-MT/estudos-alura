import http from "@/http";
import type ITarefa from "@/interfaces/ITarefa";
import type { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipoAcoes";
import { DEFINIR_TAREFA, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/tipoMutacoes";
import type { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [DEFINIR_TAREFA](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas'

      if (filtro) {
        url += '?descricao=' + filtro
      }
      http.get(url)
        .then(response => commit(DEFINIR_TAREFA, response.data))
    },
    async [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      const resposta = await http.post('/tarefas', tarefa);
        return commit(ADICIONA_TAREFA, resposta.data);
    },
    async [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      await http.put(`/tarefas/${tarefa.id}`, tarefa);
        return commit(ALTERA_TAREFA, tarefa);

    },
  }
}