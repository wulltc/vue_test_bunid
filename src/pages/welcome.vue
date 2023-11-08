<template>
  <div class="bg-blue-400 p-28 rounded">
    <h1 class="font-extrabold text-5xl text-center text-white">Cliquer sur commencer pour demarer les recherches</h1>
    <div class="text-center flex justify-center pt-10">
      <router-link v-bind:to="SEARCH">
        <button type="button" class="bg-green-600 p-3 text-teal-50 rounded">
          Commencer
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>

import {ROUTES} from '@/util/constant'

export default {
  data() {
    return {
      SEARCH: ROUTES.SEARCH,
    };
  },
}

</script>