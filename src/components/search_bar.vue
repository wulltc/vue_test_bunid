<template>
  <div class="flex rounded-md overflow-hidden w-full px-7">
    <input @keydown="keydown" type="text" name="textinp" v-model="text" placeholder="Faites votre recherche ici"
      class="w-full rounded-md rounded-r-none px-5 border-green-500 border-solid border-2 py-2" />
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
  },
  methods: {
    keydown(event) {
      if (event.key === "Enter") {
        this.$router.push(
          {
            path: this.path,
            query: {
              q: this.text,
              startIndex: 0
            }
          }
        )
        this.search(this.text)
      }
    }
  }
}
</script>