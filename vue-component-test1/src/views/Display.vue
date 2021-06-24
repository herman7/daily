<template>
  <div>
    <h3>动态渲染</h3>
    <mx-display :code="code"></mx-display>
  </div>
</template>
<script>
import Display from '../components/display/Display.vue';
import defaultCode from './default-code.js';

export default {
  components: {
    [Display.name]: Display
  },
  data () {
    return {
      code: defaultCode
    }
  }
}
</script>