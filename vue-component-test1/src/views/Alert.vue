<template>
  <div>
    <button @click="onAlert">Alert</button>
  </div>
</template>
<script>
export default {
  methods: {
    onAlert() {
      this.$Alert.info({
        duration: 100,
        content: '啦啦啦啦'
      });
    }
  }
}
</script>