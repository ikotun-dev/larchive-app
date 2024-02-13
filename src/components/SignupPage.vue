
import { RouterLink } from 'vue-router';
<template>
  <div class="bg-black-darkest h-screen">
    <div class="flex flex-col items-center p-8 space-y-20 ">
      <h3 class="font-encode text-white mt-12">
        Larchive
      </h3>
      
      <div class="border-2 h-64 mt-36 lg:mt-64 p-4 flex flex-col justify-center w-72 lg:w-76   border-black-darker ">
        <h4 class="font-encode text-white p-1 ">Signup</h4>
       <input type="text" class="font-encode text-sm outline-none my-2 text-white p-2 bg-black-darkest border border-black-darker focus:border-white" placeholder="username">
       <input type="password" class="font-encode text-sm outline-none my-2 text-white p-2 bg-black-darkest border border-black-darker focus:border-white focus:bg-black-darkest" placeholder="password">
       <button type="submit" class="bg-white text-black-darkest p-2 font-encode text-sm my-2 hover:bg-black hover:text-white focus:outline-none">Signup</button>
       <RouterLink to="/">
       <p class="cursor-pointer text-white font-encode text-xs py-2 no-underline">Have an account? Login</p>
       </RouterLink> 
      </div>
    </div>
  </div>
</template>