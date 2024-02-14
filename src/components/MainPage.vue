<template>
    <div class="min-h-screen h-auto bg-black-darkest flex flex-col items-center pt-24 ">
        <div class="flex justify-center">
            <h3 class="font-encode text-white mr-2">Larchive.</h3>
            <a href="https://github.com/ikotun-dev/larchive"> <i class="fa-brands fa-github mb-3 text-2xl text-white"></i>
            </a>
        </div>

        <div class="flex flex-col items-center justify-center lg:justify-center md:justify-center md:flex md:flex-row lg:flex lg:flex-row">
            <div class="flex flex-col lg:mr-48 lg:mb-24">
                <p class="text-white font-encode py-12 text-sm font lg:text-4xl md:text-3xl">Quick Archive for your Links</p>
                <RouterLink style="text-decoration: none; color: inherit;" to="/login">
                    <h3
                        class="custom-link p-2 bg-white lg:w-64 text-black rounded-lg border text-sm text-center font-encode font-semibold hover:bg-grey-dark">
                        Launch</h3>
                </RouterLink>
            </div>
            <div class="lg:w-76 md:w-48">
                <img src="../assets/larchivemockup.png" />
            </div>
        </div>

        <div class="relative bottom-0 right-0 flex">
            <a style="text-decoration: none; color: inherit;" href="https://github.com/ikotun-dev" class="flex mb-3 ">
                <h4 class="text-white font-encode mr-1">Ikotun.</h4>
                <i class="fa-brands fa-github  text-2xl mb-2 text-white"></i>
            </a>

        </div>
    </div>
</template>

<style scoped>
.custom-link {
    text-decoration: none;

}
</style>