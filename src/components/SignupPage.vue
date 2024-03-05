<script setup>
import router from '@/router';
import axios from 'axios';
import { ref, computed } from 'vue';

let username = ref("")
let password = ref("")
let submit = ref(false)
let signupSuccess = ref(false)
let notClicked = ref(true)
let existingUsername = ref(false)

let credentialValidation = ref(true)
const signupUser = async () => {
  notClicked.value = false;
  if (username.value.length < 4 || password.value.length < 4) {
    console.log("okay:")
    credentialValidation.value = false;
    return setTimeout(() => { credentialValidation.value = true; }, 2000)

  } submit.value = true;
  const signupData = {
    "username": username.value,
    "password": password.value

  }
  try {
    const res = await axios.post("https://linklocker-cool-morning-7742.fly.dev/auth/signup", signupData, { headers: { 'Content-Type': 'application/json' } })
    console.log(res.status)
    if (res.data.statusCode == 201) {
      signupSuccess.value = true;
      notClicked.value = true
      console.log(res.data.accessToken)
      setTimeout(() => { router.push('/') }, 2500)

    } if (res.data.statusCode == 401) {
      existingUsername.value = true;
      notClicked.value = true
      setTimeout(() => { existingUsername.value = false; notClicked.value = true }, 3000)
    }
  } catch (err) {
    console.log(err)
  }
};

const isInputNotEmpty = computed(() => {
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
        <h4 class="font-encode text-white p-1 ">Signup</h4>
        <p v-if="signupSuccess" class="text-sm font-encode text-green p-1">Signup success</p>
        <p v-if="existingUsername" class="text-sm font-encode text-red p-1">Username already exists</p>
        <input type="text" v-model.trim="username" required
          class="font-encode text-sm outline-none my-2 text-white p-2 bg-black-darkest border border-black-darker focus:border-white"
          placeholder="username">
        <input type="password" v-model.trim="password" required
          class="font-encode text-sm outline-none my-2 text-white p-2 bg-black-darkest border border-black-darker focus:border-white focus:bg-black-darkest"
          placeholder="password">
        <button v-if="notClicked" type="submit" @click="signupUser" :disabled="!isInputNotEmpty"
          class="bg-white text-black-darkest p-2 font-encode text-sm my-2 hover:bg-black hover:text-white focus:outline-none">Signup</button>
        <button v-else type="submit"
          class="bg-white text-black-darkest p-2 font-encode text-sm my-2 flex justify-center focus:outline-none">
          <div
            class="rolling-element rounded-full border-b-4 border-l-4 border-t-4 w-6 h-6 border-black  border-opacity-100  ">
          </div>
        </button>
        <RouterLink style="text-decoration: none; color: inherit;" to="/login">
          <p class="cursor-pointer text-white font-encode text-xs py-2 no-underline">Have an account? Login</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>



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
