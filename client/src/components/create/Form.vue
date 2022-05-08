<template>
  <div className="w-full py-10 flex justify-center items-center">
    <div class="w-full max-w-4xl">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Media</label
          >
          <input
            @change="upload"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="name"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Description</label
          >
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="desc"
          />
        </div>
        <div class="py-2" v-for="(item, idx) in errors" :key="idx">
          <p class="text-red-600">*{{ item }}</p>
        </div>
        <button
          @click.prevent="submit"
          class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button
        </button>
      </form>
    </div>
  </div>
</template>
