<script setup>
import router from '@/router';
import axios from 'axios';
import { ref, computed } from 'vue';

let username = ref("")
let password = ref("")
let submit = ref(false)
let invalidCredentials = ref(false)

let credentialValidation = ref(true)
const loginUser = async () => {
  if (username.value.length < 4 || password.value.length < 4) {
    console.log("okay:")
  // credentialValidation.value = false;
   //return setTimeout(() => { credentialValidation.value = true; } , 2000)
    
  }submit.value = true;
   const loginData = { 
    "username" : username.value,
    "password" : password.value
  } 
  console.log("here now ")
  const res =  await axios.post("http://localhost:3000/auth/login", loginData, { headers : { 'Content-Type' : 'application/json'}})
  console.log(res) 
  if (res.data.statusCode == 200){
    console.log("lmoaooo")
    localStorage.setItem('token', res.data.accessToken);
    router.push('/dashboard')
  }
  if(res.data.statusCode === 401 || res.data.statusCode === 404){
    invalidCredentials.value = true;
    username.value = ""
    password.value = ""
    submit.value = false;
  }


  console.log(`error : ${res.status}`)
}

const isInputNotEmpty = computed(() =>  {
    return username.value.length > 4 && password.value.length > 4
})



</script>

<template>
  <div class="bg-black-darkest h-screen">
    <div class="flex flex-col items-center p-8 space-y-20 ">
      <h3 class="font-encode text-white mt-12">
        Larchive
      </h3>

      <div class="border-2 h-64 mt-36 lg:mt-64 p-4 flex flex-col justify-center w-72 lg:w-76   border-black-darker ">
        <h4 class="font-encode text-white p-1 ">Login</h4>
        <p v-if="!credentialValidation" class="text-sm font-encode text-red p-1">Characters must longer than 4</p>
        <p v-if="invalidCredentials" class="text-sm font-encode text-red p-1">Invalid Credentials</p>
        <input type="text" v-model="username"
        :class="{ 'border-red-500': notClicked && !isInputNotEmpty }"
          class=" font-encode text-sm outline-none my-2 text-white p-2 bg-black-darkest border border-black-darker focus:border-white focus:bg-black-darkest"
          placeholder="username">
        <input type="password" v-model="password"
          class="font-encode text-sm outline-none my-2 text-white p-2 bg-black-darkest border border-black-darker focus:border-white focus:bg-black-darkest"
          placeholder="password">
        <button v-if="!submit" @click="loginUser" type="submit" :disabled="!isInputNotEmpty"
          class="bg-white text-black-darkest p-2 font-encode text-sm my-2 hover:bg-black hover:text-white focus:outline-none">

          Login</button>
        <button v-else type="submit"  class="bg-white text-black-darkest p-2 font-encode text-sm my-2 flex justify-center focus:outline-none">
          <div class="rolling-element rounded-full  border-b-4 border-l-4 border-t-4 w-6 h-6 border-black  border-opacity-100  ">
          </div>
        </button>

        <RouterLink to="/signup">
          <p class="cursor-pointer text-white font-encode text-xs py-2 no-underline">Don't have an account? Signup</p>
      </RouterLink>
    </div>
  </div>
</div></template>

<style scoped>
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