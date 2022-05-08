<template>
  <div>
    <input type="text" :value="model" @input="$emit(`update:${this.model}`)" />
  </div>
</template>

<script>
export default {
  props: ['model'],
  methods: {
    log: (...args) => {
      console.log(args);
    },
  },
};
</script>
