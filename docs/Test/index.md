// docs/.vuepress/vue/README.md
<template>
 <div class="test-demo">
  {{ msg }}
  <my-hello></my-hello>
  <el-button>button</el-button>
 </div>
</template>

<script>
export default {
 data () {
  return {
   msg: 'Hello VuePress!'
  }
 }
}
</script>