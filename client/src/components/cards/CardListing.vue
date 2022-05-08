<template>
  <div>
    <div v-for="item in config" :key="item.id">
      <div>
        <CardItem item="item"/>
      </div>
    </div>
  </div>
</template>
