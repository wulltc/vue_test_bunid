<template>
    <div class="sm:px-6 w-full">

        <div class="px-4 md:px-10 py-4 md:py-7 lg:px-7">
            <div class="flex items-center justify-between">
                <p tabindex="0"
                    class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                    Rechercher un livre</p>
                <a class="rounded focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                    href=" javascript:void(0)">
                    <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded">
                        <p class="uppercase">TCHENDO Ulysse</p>
                    </div>
                </a>
            </div>
        </div>
        <!-- barre de recherche -->
        <form>
            <div class="flex rounded-md overflow-hidden w-full px-7">
                <input type="text" v-model="mocle" @input="handleInput"
                    class="w-full rounded-md rounded-r-none px-5 border-green-500 border-solid border-2" />

                <button class="bg-green-500 hover:bg-black text-white px-6 text-lg font-semibold py-4 rounded-r-md">
                    Vider
                </button>

            </div>
        </form>
        <!-- debut du tableau -->
        <section class="container mx-auto p-6 font-mono">
            <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-auto">
                    <table class="w-full">
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
                            <tr class="text-gray-700" v-for="item in sortedItems()">
                                <td class="px-4 py-3 border">
                                    <div class="flex items-center text-sm">
                                        <div class="relative w-8 h-8 mr-3 md:block">
                                            <img class="object-cover w-full h-full"
                                                v-bind:src="item?.volumeInfo?.imageLinks?.thumbnail" alt=""
                                                loading="lazy" />
                                            <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true">
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td class="px-4 py-3 text-ms font-semibold border">{{ item?.volumeInfo?.title }}</td>
                                <td class="px-4 py-3 text-xs border">
                                    <span
                                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                        {{ item?.volumeInfo?.authors }} </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">{{item?.saleInfo?.listPrice?.amount}}</td>
                                <td class="px-4 py-3 text-sm border">
                                    <a v-bind:href="item?.saleInfo?.buyLink" target="_blank"
                                        class="px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex">

                                        <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px"
                                            viewBox="0 0 32 32" xml:space="preserve" fill="white">
                                            <path class="sharpcorners_een" d="M10,27h4c0,1.105-0.895,2-2,2S10,28.105,10,27z M23,29c1.105,0,2-0.895,2-2h-4
        	C21,28.105,21.895,29,23,29z M30,9H6.819l-1-5H2v2h2.181l4,20H26v-2H9.819l-0.6-3H26L30,9z" />
                                        </svg>

                                        <span class="ml-2 uppercase">{{item.saleInfo.saleability === "FOR_SALE"? "Acheter" : "épuisé"}}</span>
                                    </a>
                                </td>
                            </tr>


                        </tbody>
                        <!-- Fin du corps de notre tableau -->
                    </table>
                    <div class="flex flex-col lg:flex-row justify-between">
                        <div class="flex flex-col lg:flex-row items-center space-x-2 text-xs">
                            <select value="10 Lignes"
                                class="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
                                <option value="10">10 Lignes</option>
                            </select>

                            <p class="text-gray-500 mt-4 lg:mt-0"> <span class="text-blue-500 font-bold">
                                    Pages: <span class="text-green-500">{{ currentPage }}</span> </span> ET Total ligne:
                                <span class="text-green-500">{{ totalItems }}</span>
                            </p>
                        </div>

                        <nav aria-label="Pagination" class="flex justify-center items-center text-gray-600 mt-8 lg:mt-0">

                            <button @click="prevPage" class="p-2 mr-4 rounded hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>


                            <button @click="nextPage" class="p-2 ml-4 rounded hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                        </nav>
                    </div>
                </div>
            </div>
        </section>
        <!-- Fin du tableau -->
    </div>
</template>

<script>
import { ref } from 'vue';
const itemRef = ref()
const totalItems = ref()

itemRef.value = []
export default {
    data() {
        return {
            mocle: '',
            items: itemRef,
            totalItems: totalItems,
            currentSort: 'titre',
            currentSortDir: 'asc',
            pageSize: 10,
            currentPage: 1
        };
    },

    methods: {

        sortedItems: function () {
            return this.items.filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        },

        handleInput() {
            const realLink = "https://www.googleapis.com/books/v1/volumes"
            const localLink = "http://localhost:5000/books/v1/volumes"
            // console.log(event.target.value);
            console.log(this.mocle);
            const value = this.mocle
            const startIndex = (this.currentPage - 1) * 10
            console.log("num page", this.currentPage)
            async function getBooks() {
                const response = await fetch(`${localLink}?q=${value}&startIndex=${startIndex}&maxResults=10&key=AIzaSyC9lWKYlBfe3OAre6bGpgdB8SCf3O0RnQk`);
                const Books = await response.json();
                itemRef.value = Books.items
                totalItems.value = Books.totalItems
            }
            getBooks()
        },

        nextPage: function () {
            if ((this.currentPage * this.pageSize) < this.totalItems) {
                this.currentPage++
            };
            this.handleInput()
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage -= 1;
            this.handleInput()
        },


    },


};
</script>