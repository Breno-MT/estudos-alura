<template>

  <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  <HelloWorld />

</template>

<script lang="ts">

import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  }
});

</script>
