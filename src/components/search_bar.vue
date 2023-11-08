<template>
  <div class="flex rounded-md overflow-hidden w-full px-7">
    <input type="text" name="textinp" v-model="text" placeholder="Faites votre recherche ici"
           class="w-full rounded-md rounded-r-none px-5 border-green-500 border-solid border-2 py-2"/>
    <div v-if="text">
      <router-link v-bind:to="{ path, query: { q: text, startIndex } }">
        <button type="button" @click="search(text)"
                class="bg-green-500 hover:bg-black text-white px-6 text-lg font-semibold py-2 rounded-r-md">
          Rechercher
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ['path', 'startIndex', 'search'],
  data() {
    return {
      text: ""
    }
  }
}
</script>