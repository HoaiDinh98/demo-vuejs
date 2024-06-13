<template>
    <div>
        <!-- <button @click="sendData">Đăng xuất</button> -->
        <!-- <p>{{ message }}</p> -->

        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>

  </template>
  
  <script>

  
  export default {
    components: {
    },
    props: ['message'],
    methods: {
        sendData() {
          this.$emit('custom-event', 'Bạn đã đang xuất thành công');
        }
      }
  }
  </script>