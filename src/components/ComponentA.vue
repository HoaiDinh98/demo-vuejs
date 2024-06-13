<template>
  <div>
    <button @click="addItem">Add Item</button>
    <button @click="removeItem">Remove Item</button>
    <ul>
      <li v-for="(item, index) in items" :key="index" class="fade-animation">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3']
    };
  },
  methods: {
    addItem() {
      this.items.push(`Item ${this.items.length + 1}`);
    },
    removeItem() {
      this.items.pop();
    }
  }
};
</script>

<style scoped>
.fade-animation-enter-active, .fade-animation-leave-active {
  transition: opacity 0.5s;
}
.fade-animation-enter, .fade-animation-leave-to {
  opacity: 0;
}
</style>