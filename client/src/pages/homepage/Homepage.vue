<template>
  <section class="flex justify-around">
    <div class="6/12 flex flex-col px-5 my-20">
    
      <h1
        class="w-12/12 py-5 text-left text-4xl py-2 font-bold tracking-wider	uppercase"
      >
        Discover, Collect and Sell 
      </h1>
      <h2
        class="w-8/12 py-5 text-left text-2xl py-2 font-medium tracking-wider	uppercase"
      >
        Version-enabled Art NFTs
      </h2>

      <div class="py-5 flex justify-between w-6/12">
        <div v-for="button in buttonsConfig" :key="button.title">
          <router-link :to="button.path">
            <button
              class="hover:bg-transparent hover:border-2 border-black hover:text-black dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-white dark:hover:text-white text-xl md:text-2xl px-5 py-5 my-6 text-white bg-black dark:bg-white dark:text-black button"
            >
              {{ button.title }}
            </button>
          </router-link>
        </div>
      </div>

    </div>

    <div class="w-6/12 my-5">
      <img
        src="https://lh3.googleusercontent.com/J734DD96jgdCHK95vKF1lb1sGn2qyxRIo2wF7pDYN3rEoQqZSBTHH2tRecaxgFCux-oIZcJAZSsVYY9xaGhSIZwpkQlh3R6YHf8w=s550"
      />
    </div>
  </section>


  <Drops />
</template>
