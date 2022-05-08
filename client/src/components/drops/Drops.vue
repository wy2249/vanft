<template>
  <div className="flex justify-center items-center flex-col">
    <h1 className="text-4xl font-bold py-5 mt-20">Notable Drops</h1>
    <div className="flex justify-between items-center p-5">
      <div v-for="(drop, idx) in config" :key="idx">
        <div className="rounded-lg border m-2">
          <img v-bind:src="drop.img" className="h-full max-w-full" />
          <div className="p-5 flex justify-center items-center flex-col">
            <h1 className="text-lg mt-2 font-bold">{{ drop.title }}</h1>
            <p className="text-md mt-2">{{ drop.description }}</p>
            <ul className="mt-2">
              <li
                className="border hover:text-white hover:bg-black cursor-pointer rounded-xl px-10 py-2 border-black"
                v-for="(tag, tagIdx) in drop.tags"
                :key="tagIdx"
              >
                <h1>{{ tag }}</h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from './config';

export default {
  data: () => {
    return { config };
  },
};
</script>
