<template>
  <div>
    <label v-if="label" :class="{ 'mx-form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateStatus === 'error'" class="mx-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import Emitter from '../../mixins/emitter.js';

export default {
  name: 'mx-form-item',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data () {
    return {
      isRequired: false,
      validateStatus: '',
      validateMessage: ''
    };
  },
  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    } 
  },
  methods: {
    getRules () {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    getFilteredRules (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1); // 无trigger 或者 有trigger且trigger等于参数
    },
    validate(trigger, callback = function () {}) {
      let rules = this.getFilteredRules(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }
      this.validateStatus = 'validating';

      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);

      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.validateStatus = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage);
      })
    },
    setRules () {
      let rules = this.getRules();
      if (rules.length) {
        rules.some((rule) => {
          return this.isRequired = rule.required;
        })
      }
      console.log('啦啦啦', rules, this.isRequired);
      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    resetField () {
      this.validateStatus = '';
      this.validateMessage = '';
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur (value) {
      console.info('event: FormItem onFieldBlur');
      this.validate('blur');
    },
    onFieldChange (value) {
      console.info('event: FormItem onFieldChange');
      this.validate('change');
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('mx-form', 'on-form-item-add', this);
      this.initialValue = this.fieldValue; // 仅设置一次初始值
      this.setRules();
    }
  },
  beforeDestroy () {
    this.dispatch('mx-form', 'on-form-item-remove', this)
  }
}
</script>
<style lang="less" scoped>
.mx-form-item-label-required:before {
  content: '*';
  color: red;
}
.mx-form-item-message {
  color: red;
}
</style>