<template>
  <div>
    <mx-form :model="formValidate" :rules="ruleValidate" ref="form">
      <mx-form-item label="用户名" prop="name">
        <mx-input v-model="formValidate.name"></mx-input>
      </mx-form-item>
      <mx-form-item label="邮箱" prop="email">
        <mx-input v-model="formValidate.email"></mx-input>
      </mx-form-item>
    </mx-form>
    <button @click="onSubmit">提交</button>
    <button @click="onReset">重置</button>
  </div>
</template>
<script>
import mxForm from '../components/form/Form.vue';
import mxFormItem from '../components/form/FormItem.vue';
import mxInput from '../components/input/Input.vue';

export default {
  components: { mxForm, mxFormItem, mxInput },
  data () {
    return {
      formValidate: {
        name: '',
        email: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('success');
        } else {
          window.alert('failure');
        }
      })
    },
    onReset() {
      this.$refs.form.resetFields();
    }
  }
}
</script>