<template>
  <input
    type="text"
    :value="currentValue"
    @input="onInput"
    @blur="onBlur"
  />
</template>
<script>
import Emitter from '../../mixins/emitter.js';
export default {
  name: 'mx-input',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    }
  },
  methods: {
    onInput (event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('mx-form-item', 'on-form-change', value);
    },
    onBlur () {
      this.dispatch('mx-form-item', 'on-form-blur', this.currentValue);
    }
  }
}
</script>