<template lang="">
  <main>
    <router-view />
  </main>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: $secondary-bg;
}
</style>