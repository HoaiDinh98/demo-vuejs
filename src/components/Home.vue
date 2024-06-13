<template>
    <div class="example">
      <p>Đây là một component với SASS styles</p>
    </div>
  </template>
  



  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'HomeComponent',
    setup() {
      // Sử dụng hàm ref để tạo một biến reactive
      const message = ref('Đây là một component với SASS styles');
  
      // Trả về các biến hoặc hàm mà bạn muốn sử dụng trong template
      return {
        message,
      };
    },
  };
  </script>
  
  <style lang="scss">
    $primary-color: blue;
    .example {
        color: $primary-color;
    }
  

  </style>