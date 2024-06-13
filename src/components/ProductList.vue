<template>
  <center>
    <h1>{{ message }}</h1>
  </center>

  <div class="product-page">
    
    <table class="product-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td><img src="@/assets/2.jpg" alt="Product Image" style="height: 50px;width: 50px;"></td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button @click="editProduct(product)">Edit</button>
            <button @click="deleteProduct(product)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  data() {
    return {
      message: 'list product pages',
      products: [
        { id: 1, image: '@/assets/2.jpg', name: 'Áo Khoác Không Nón Vải Dù', price: 499000 },
        { id: 2, image: '@/assets/2.jpg', name: 'Áo Khoác Không Nón Vải Dù', price: 499000 },
        { id: 3, image: '@/assets/2.jpg', name: 'Áo Khoác Không Nón Vải Dù', price: 499000 },
        // Add more product data here
      ],
    };
  },
  methods: {
    editProduct(product) {
      // Implement product editing logic here
      console.log('Edit product:', product);
    },
    deleteProduct(product) {
      // Implement product deletion logic here
      console.log('Delete product:', product);
    },
  },

};
</script>

<style scoped>
.product-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.product-table button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  margin: 0 5px;
}

.product-table button:hover {
  background-color: #45a049;
}
</style>
