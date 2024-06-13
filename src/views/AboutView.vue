<!-- <template>
  <div class="about">
    <p v-html="rawHtml"></p>
    <homelist></homelist>
    <button @click="currentComponent = 'ComponentA'">Show Component A</button>
    <button @click="currentComponent = 'ComponentB'">Show Component B</button>
    
    <component :is="currentComponent"></component>
  </div>
</template>
<script>
import homelist from '@/components/Home.vue';
import ComponentA from '@/components/ComponentA.vue'
import ComponentB from '@/components/ComponentB.vue'
export default {
  components: { 
    homelist,
    ComponentA,
    ComponentB,
   },
  name: 'AboutView',
  data() {
    return {
      currentComponent: 'ComponentA',
      rawHtml: '<span style="color: red">This is red</span>'
    };
  },
  methods: {
    changeMessage: function() {
      this.message = 'Dữ liệu đã được thay đổi';
    }
  }
}
</script> -->


<!-- <template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { watch, ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    function increment() {
     
      count.value++;
    }
    watch(count, (newValue, oldValue) => {
      console.log('Count thay đổi từ:'+oldValue+' sang '+newValue);
    });

    return {
      count,
      increment
    };
  }
};
</script>

<style scoped>

</style> -->


<!-- <template>
  <div>
    <p>Đếm: {{ state.count }}</p>
    <p>Tin nhắn: {{ state.message }}</p>
    <button @click="increment">Tăng</button>
    <button @click="updateMessage">Cập Nhật Tin Nhắn</button>
  </div>
</template>
<script>
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      count: 0,
      message: 'Xin chào'
    });
    function increment() {
      state.count++;
    }
    function updateMessage() {
      state.message = 'Tin nhắn đã được cập nhật!';
    }
    return {
      state,
      increment,
      updateMessage
    };
  }
};
</script>
<style scoped>
/* Thêm một số kiểu dáng ở đây nếu cần */
</style> -->



<template>
  <div>
    <input type="text" v-model="firstName" placeholder="First Name">
    <input type="text" v-model="lastName" placeholder="Last Name">
    <p>Full Name: {{ fullName }}</p>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
export default {
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const fullName = computed(() => {
      return `${firstName.value} ${lastName.value}`;
    });

    return {
      firstName,
      lastName,
      fullName,
    };
  }
};
</script>

<style scoped>

</style>