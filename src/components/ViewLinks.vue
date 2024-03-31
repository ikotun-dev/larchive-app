<script setup>
import router from '@/router';
import axios from 'axios';
import { ref, onMounted, computed, } from 'vue';
let showDeleteModalVisible = ref(false);
let showAddLinkModalVisible = ref(false);
let submitLink = ref(false);
let searchParam = ref("");
let linkIdToDelete = ref(null);
let linkInput = ref("");
let linkTitle = ref("");
let deleteLoader = ref(false);

let links = ref([])

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push('/login')
    console.log("log")
  }
  try {
    const res = await axios.get("https://larchive.fly.dev/link", { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });

    if (res.status == 200) {
      console.log(res.data.data)

      if (res.data.data == []) {
        links.value = []
      }
      const dataset = res.data.data.reverse();
      links.value = dataset;
      console.log(links.value);
    } else {
      router.push('/login')

    }
  } catch (e) {
    router.push('/login')
  }
})

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  return `${formattedDate} ${formattedTime}`;
}


const AddNewLink = async () => {
  submitLink.value = true
  const token = localStorage.getItem("token");

  const linkData = {
    url: linkInput.value,
    title: linkTitle.value,
  }

  const res = await axios.post("https://larchive.fly.dev/link", linkData, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });

  if (res.status == 201) {
    // console.log(res.data.data)
    console.log(res.data.data)
    // const dataset =  res.data.data.reverse()
    links.value.unshift(res.data.data);


  } linkInput.value = ""

  submitLink.value = false;
  setTimeout(() => { showAddLinkModalVisible.value = false; }, 1000)
}



const deleteLink = async (id) => {
  // showDeleteModalVisible.value = false;
  console.log(id)
  deleteLoader = true;
  submitLink.value = true
  const token = localStorage.getItem("token");
  console.log(token)

  const res = await axios.delete(`https://larchive.fly.dev/link?linkId=${id}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
  if (res.status === 200) {
    console.log(res.data.data)
    links.value = links.value.filter(link => link._id !== id)

    // const dataset = res.data.data.reverse();
    // links.value = dataset;
    deleteLoader = false;
    setTimeout(() => { showDeleteModalVisible.value = false; }, 500)
  }


}


const isFilteringLinks = computed(() => {

  const searchTerm = searchParam.value.toLowerCase();
  return links.value.filter((link) => link.url && link.url.includes(searchTerm) || link.title.includes(searchTerm))

})




const isInputNotEmpty = computed(() => {
  return linkInput.value.length > 9

})

const showDeleteModal = (linkId) => {
  console.log(linkId)
  linkIdToDelete.value = linkId
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

        <span type="submit" v-if="deleteLoader"
          class="bg-white text-black-darkest p-2 font-encode text-sm my-2 flex justify-center focus:outline-none">
          <div
            class="rolling-element rounded-full  border-b-4 border-l-4 border-t-4 w-6 h-6 border-black  border-opacity-100  ">
          </div>
        </span>

        <div class="flex justify-between mb-4">
          <button class="bg-green text-white rounded-md font-encode p-2 outline-none hover:bg-green-darker"
            @click="deleteLink(linkIdToDelete)">Yes</button>
          <span class="w-4"></span>
          <button class="bg-red text-white rounded-md font-encode p-2 outline-none hover:bg-red-darker"
            @click="showDeleteModalVisible = false">Cancel</button>

        </div>
      </div>
    </div>


    <div v-if="showAddLinkModalVisible" class="overlay">
      <div class="delete-modal px-2 h-auto lg:w-76  w-64 bg-white flex flex-col items-center justify-between">
        <h4 class="font-encode text-sm mt-4">Add a Link</h4>

        <input type="text" class="my-2 p-2 outline-none border font-lato border-black-darker w-full text-xs"
          placeholder="title" v-model="linkTitle">

        <input type="text" class="my-2 p-2 outline-none border font-encode border-black-darker w-full text-xs"
          placeholder="url" v-model="linkInput">


        <div class="flex justify-center items-center w-full" v-if="linkInput.length > 6">
          <img class="w-full h-64 lg:h-76 " :src="`https://image.thum.io/get/${linkInput}`" />
        </div>
        <button v-if="!submitLink" @click="AddNewLink"
          class="bg-green text-white rounded-md font-encode p-2 my-2 outline-none w-full hover:bg-green-darker"
          :disabled="!isInputNotEmpty">Add
          Link</button>


        <button v-else type="submit"
          class="bg-green text-white  rounded-md font-encode p-2 my-2 outline-none w-full flex justify-center focus:outline-none">
          <div
            class="rolling-element rounded-full border-b-4 border-r-3 border-r-blue border-l-4 border-t-4 w-6 h-6 border-white bg  border-opacity-100  ">
          </div>

        </button>

        <button class="bg-red text-white rounded-md font-encode p-2 mb-2 outline-none w-full hover:bg-red-darker"
          @click="showAddLinkModalVisible = false">Close</button>
      </div>
    </div>


    <div class="bg-black-darkest min-h-screen h-auto pb-12">
      <div class="flex flex-col items-center p-6 space-y-20 ">
        <h3 class="font-encode text-white mt-12">
          Larchive
        </h3>
        <div class="flex w-full justify-center">
          <input type="text" v-model="searchParam"
            class="pl-3 py-2 w-full lg:w-1/2 text-xs text-white font-encode rounded-md outline-none bg-black-darkest border focus:border-grey-light border-black-darker mt-3"
            placeholder="search archive">
        </div>
        <div v-if="links.length > 0 && searchParam.length === 0" class="mt-4 w-full flex flex-col items-center">

          <div v-for="link in links" :key="link._id" @click="`window.location.href='${link.url}'`"
            class="flex items-center justify-between border-b w-72 lg:w-1/2 border-black-darker p-4 hover:bg-black-darker cursor-pointer">

            <div class="flex justify-center items-center mr-4">
              <a :href="link.url" target="_blank">
                <i class="fa-solid fa-up-right-from-square text-green-lighter text-xl"></i>

              </a>
            </div>


            <div class="flex flex-col w-full mt-2 ">
              <h3 class="text-white font-lato font-bold text-sm w-full ">{{ link.title }}</h3>
              <h3 class="text-blue-lighter font-encode font-light text-xs w-12 my-1">{{ link.url.slice(0, 20) }}....</h3>
              <p class="text-green-light font-lato  text-xs"> {{ formatTime(link.time) }} </p>
            </div>


            <div class="flex justify-center items-center">
              <img class="w-24 h-16 rounded-lg" :src="`https://image.thum.io/get/${link.url}`" />
            </div>

            <div class="flex justify-center items-center h-12 w-12 ml-4" @click="showDeleteModal(link._id)">
              <i class="fas fa-trash text-red-light text-xl"></i>
            </div>
          </div>


        </div>
        <div v-if="isFilteringLinks.length > 0 && searchParam.length > 0" class="mt-4 w-full flex flex-col items-center">

          <div v-for="link in isFilteringLinks" :key="link._id" @click="`window.location.href='${link.url}'`"
            class="flex items-center justify-between border-b w-72 lg:w-1/2 border-black-darker p-4 hover:bg-black-darker cursor-pointer">

            <div class="flex justify-center items-center mr-4">
              <a :href="link.url" target="_blank">
                <i class="fa-solid fa-up-right-from-square text-green-lightest text-xl"></i>
              </a>
            </div>


            <div class="flex flex-col w-full mt-2">
              <h3 class="text-green font-lato font-bold text-sm w-full ">{{ link.title }}</h3>
              <h3 class="text-blue-lighter font-encode font-light text-xs w-12 my-1">{{ link.url.slice(0, 20) }}....</h3>
              <p class="text-green-lighter font-lato  text-xs"> {{ formatTime(link.time) }} </p>
            </div>
            <div class="flex justify-center items-center">
              <img class="w-24 h-16 rounded-lg" :src="`https://image.thum.io/get/${link.url}`" />

            </div>


            <div class="flex justify-center items-center h-12 w-12 ml-4" @click="showDeleteModal(link._id)">
              <i class="fas fa-trash text-red-light text-xl"></i>
            </div>
          </div>
        </div>




        <div v-if="links.length == 0 || isFilteringLinks.length == 0" class=" justify-center h-76 pt-64">
          <img src="../assets/empty.png" />
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
}

@keyframes roll {
  to {
    transform: rotate(360deg);
  }
}

.rolling-element {
  /* Add other classes if needed */
  animation: roll 0.2s linear infinite;
}
</style>



