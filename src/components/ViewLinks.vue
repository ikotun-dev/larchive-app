<script setup>
import { ref } from 'vue';
let showDeleteModalVisible = ref(false);
let showAddLinkModalVisible = ref(false);

let linkInput = ref("");

let links = ref([{
    "id": 2,
    "url": "https://usedropit.xyz",
},
{
    "id": 3,
    "url": "https://genaga.vercel.app",
}])


const showDeleteModal = (linkId) => {
    console.log(linkId)
    showDeleteModalVisible.value = true;
}

const showAddLinkModal = () => {
    showAddLinkModalVisible.value = true;
}



</script>

<template>
    <main>
        <div v-if="showDeleteModalVisible" class="overlay">
            <div class="delete-modal h-32 w-64 bg-white flex flex-col items-center justify-between s">
                <h4 class="font-encode text-sm mt-4">Do you want to delete this link?</h4>
                <div class="flex justify-between mb-4">
                    <button
                        class="bg-green text-white rounded-md font-encode p-2 outline-none hover:bg-green-darker">Yes</button>
                    <span class="w-4"></span>
                    <button class="bg-red text-white rounded-md font-encode p-2 outline-none hover:bg-red-darker"
                        @click="showDeleteModalVisible = false">Cancel</button>

                </div>
            </div>
        </div>


        <div v-if="showAddLinkModalVisible" class="overlay">
            <div class="delete-modal px-2 h-auto lg:w-76  w-64 bg-white flex flex-col items-center justify-between">
                <h4 class="font-encode text-sm mt-4">Add a Link</h4>


                <input type="text" class="my-2 p-2 outline-none border font-encode border-black-darker w-full text-xs"
                    placeholder="url" v-model="linkInput">

                <div class="flex justify-center items-center w-full" v-if="linkInput.length > 6">
                    <img class="w-full h-64 lg:h-76 " :src="`https://image.thum.io/get/${linkInput}`" />
                </div>


                <button class="bg-green text-white rounded-md font-encode p-2 my-2 outline-none w-full hover:bg-green-darker">Add
                    Link</button>
                    <button class="bg-red text-white rounded-md font-encode p-2 mb-2 outline-none w-full hover:bg-red-darker" @click="showAddLinkModalVisible = false" >Close</button>

            </div>
        </div>

        <div class="bg-black-darkest h-screen">
            <div class="flex flex-col items-center p-6 space-y-20 ">
                <h3 class="font-encode text-white mt-12">
                    Larchive
                </h3>
                <div class="flex w-full justify-center">
                    <input type="text"
                        class="pl-3 py-2 w-full lg:w-1/2 text-xs text-white font-encode rounded-md outline-none bg-black-darkest border focus:border-grey-light border-black-darker mt-3"
                        placeholder="search archive">
                </div>

                <div class="mt-4 w-full flex flex-col items-center">

                    <div v-for="link in links" :key="link" @click="`window.location.href='${link.url}'`"
                        class="flex items-center justify-between border-b w-72 lg:w-1/2 border-black-darker p-4 hover:bg-black-darker cursor-pointer">

                        <div class="flex justify-center items-center mr-4">
                            <a :href="link.url" target="_blank">
                                <i class="fa-solid fa-up-right-from-square text-green-lightest text-xl"></i>

                            </a>
                        </div>

                        <div class="flex flex-col w-full">
                            <h4 class="text-white font-encode  text-sm">{{ }}</h4>
                            <h3 class="text-white font-encode  text-xs  ">{{ link.url }}</h3>
                            <p class="text-white font-encode  text-xs"> May 13 2023 </p>
                        </div>
                        <div class="flex justify-center items-center">
                            <img class="w-24 h-16 rounded-lg" :src="`https://image.thum.io/get/${link.url}`" />

                        </div>


                        <div class="flex justify-center items-center h-12 w-12 ml-4" @click="showDeleteModal(link.id)">
                            <i class="fas fa-trash text-red-light text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="absolutex flex justify-between">
                    <div class="w-[80vh]"></div>
                    <div class="border border-white h-16 p-2 rounded-full" @click="showAddLinkModal">
                        <i
                            class="add-link fa-solid  fa-link font-extrabold px-2 py-3  h-12 w-12  bg-white rounded-full  text-2xl"></i>
                    </div>

                </div>
            </div>
        </div>

    </main>
</template>


<style scoped>
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.77);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-link {

    background-color: rgb(207, 200, 200);
    transition: transform 0.4s ease-in-out;

}

.add-link:hover {
    transform: scale(1.3);
    /* Add a scale effect on hover */
}

div.absolutex {
    position: fixed;
    bottom: 10px;
    width: 50%;
    height: 100px;
}

@media only screen and (max-width: 600px) {
    div.absolutex {
        width: 80%;
        /* Change width to 100% for small screens */
        height: 50px;
        /* Adjust height for small screens */
        bottom: 50px;
        /* Adjust bottom position for small screens */
    }
}

div.absolutex .add-link {
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}


div.absolutex .add-link:hover {
    transform: scale(1.4);
    /* Add a scale effect on hover */
}</style>



