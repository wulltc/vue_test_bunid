<template>
  <div class="sm:px-6 w-full">
    <Header />
    <!-- Debut Barre de recherche -->
    <SearchBar :path="SEARCH" :startIndex="startIndex" :search="search" />
    <!-- Fin Barre de recherche -->
    <!-- debut du tableau -->
    <section class="w-full p-6 font-mono">
      <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto">
          <table class="w-full" v-if="items.length > 0">

            <!--Debut de Entete de notre tableau -->
            <thead>
              <tr
                class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th scope="col" class="px-4 py-3">Image</th>
                <th scope="col" class="px-4 py-3">Titre</th>
                <th scope="col" class="px-4 py-3">Auteur</th>
                <th scope="col" class="px-4 py-3">Prix</th>
                <th scope="col" class="px-4 py-3">Lien d'achat</th>
              </tr>
            </thead>
            <!--Fin de l'Entete de notre tableau -->

            <!-- debut du corps de notre tableau -->
            <tbody class="bg-white">
              <tr class="text-gray-700" v-for="item in items">
                <td class="px-4 py-3 border">
                  <div class="flex items-center text-sm">
                    <div class="relative w-8 h-8 mr-3 md:block">
                      <img v-if="item?.volumeInfo?.imageLinks?.thumbnail" class="object-cover w-full h-full"
                        v-bind:src="item.volumeInfo.imageLinks.thumbnail" alt="" />
                      <span v-else class="text-red-300 font-bold text-center flex">
                        No image
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-ms font-semibold border">{{ item?.volumeInfo?.title }}</td>
                <td class="px-4 py-3 text-xs border">
                  <span v-if="item?.volumeInfo?.authors"
                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {{ item.volumeInfo.authors.join(" & ") }} </span>
                  <span v-else class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                    No author </span>
                </td>
                <td v-if="item?.saleInfo?.listPrice?.amount" class="px-4 py-3 text-sm border">{{
                  item.saleInfo.listPrice.amount
                }}
                </td>

                <td v-else class="px-4 py-3 text-sm border text-red-300 font-bold text-center flex">No prix
                </td>
                <td class="px-4 py-3 text-sm border">
                  <a v-bind:href="item?.saleInfo?.buyLink" target="_blank"
                    class="px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex">

                    <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 32 32"
                      xml:space="preserve" fill="white">
                      <path class="sharpcorners_een"
                        d="M10,27h4c0,1.105-0.895,2-2,2S10,28.105,10,27z M23,29c1.105,0,2-0.895,2-2h-4
                                      	C21,28.105,21.895,29,23,29z M30,9H6.819l-1-5H2v2h2.181l4,20H26v-2H9.819l-0.6-3H26L30,9z" />
                    </svg>
                    <span class="ml-2 uppercase">{{
                      item.saleInfo.saleability === "FOR_SALE" ? "Acheter"
                      :
                      "épuisé"
                    }}</span>
                  </a>
                </td>
              </tr>
            </tbody>
            <!-- Fin du corps de notre tableau -->
          </table>
          <div class="flex flex-col lg:flex-row justify-between" v-if="items.length > 0">
            <div class="flex flex-col lg:flex-row items-center space-x-2 text-xs">
              <select name="lignsel" v-bind:value="pageSize"
                class="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
                <option value="10">{{ pageSize }} Lignes</option>
              </select>

              <p class="text-gray-500 mt-4 lg:mt-0"> <span class="text-blue-500 font-bold">
                  Pages: <span class="text-green-500">{{ currentPage }}</span> </span> ET Total ligne:
                <span class="text-green-500">{{ totalItems }}</span>
              </p>
            </div>

            <nav aria-label="Pagination" class="flex justify-center items-center text-gray-600 mt-8 lg:mt-0">
              <router-link v-bind:to="{ path: SEARCH, query: { q: text, startIndex } }">
                <button @click="prevPage" class="p-2 mr-4 rounded hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </router-link>

              <router-link v-bind:to="{ path: SEARCH, query: { q: text, startIndex } }">
                <button @click="nextPage" class="p-2 ml-4 rounded hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </router-link>

            </nav>
          </div>
        </div>
      </div>
    </section>
    <!-- Fin du tableau -->
  </div>
</template>

<script>
// importation de vue et du composant de recherche
import Header from '@/components/header.vue';
import SearchBar from '@/components/search_bar.vue';
import { ROUTES } from '@/util/constant'
import { finalizeUrl } from "@/util";

const { SEARCH } = ROUTES;

export default {

  data() {
    return {
      text: "",
      items: [],
      totalItems: 0,
      pageSize: 10,
      currentPage: 1,
      startIndex: 0,
      SEARCH
    };
  },

  methods: {
    retrieveParams() {
      const { startIndex, q } = this.$route.query
      this.startIndex = startIndex;
      this.text = q;
      this.currentPage = startIndex ? (startIndex / 10) + 1 : 1
      if (q) {
        this.getBooks()
      }
    },
    search(text) {
      this.text = text;
      this.startIndex = 0;
      this.getBooks()
    },
    async getBooks() {
      const response = await fetch(finalizeUrl(this.text, this.startIndex));
      const Books = await response.json();
      this.items = Books.items
      this.totalItems = Books.totalItems;
    },
    nextPage: function () {
      if ((this.currentPage * this.pageSize) < this.totalItems) {
        this.currentPage++;
        this.startIndex = (this.currentPage - 1) * 10
        this.getBooks();
      }
    },
    prevPage: function () {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.startIndex -= 10;
        this.getBooks();
      }
    },
  },
  beforeMount() {
    this.retrieveParams()
  },
  components: { Header, SearchBar }
};
</script>