<script lang='ts'>
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';

export default defineComponent({
    name: "Temporizador",

    emits: ['aoTemporizadorFinalizado'],

    components: { Cronometro, Botao },

    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        };
    },

    methods: {

        iniciar() {
            // Começar Contagem
            this.cronometroRodando = true;
            this.cronometro = window.setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000);
            console.log("Iniciando");
        },

        finalizar() {
            // Finalizar contagem
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    }
})

</script>

<template>
    <section class="is-flex is-align-items-center is-justify-content-space-between">
      <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
      <Botao @clicado="iniciar" icone="fas fa-play" texto="Play" :desabilitado="cronometroRodando" />
      <Botao @clicado="finalizar" icone="fas fa-stop" texto="Stop" :desabilitado="!cronometroRodando" />
    </section>
</template>