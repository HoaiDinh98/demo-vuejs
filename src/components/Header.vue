<template>
    <header class="header">
      <div class="container">
        <h3>Lê Hoài Dinh</h3>
        <!-- <child-component message="Hello Dinh" /> -->
        <!-- <child-component @custom-event="receiveData"></child-component> -->

        <div>
          <ChildComponent>
          </ChildComponent>
        </div>
      </div>

    </header>
    <nav class="sidebar">
      
        <ul>
          <li><router-link to="/about">Home</router-link></li>
          <!-- <li><router-link to="/products">Product</router-link></li> -->
          <li><router-link to="/">Quản lý sinh viên</router-link></li>
          <li><router-link to="/xuatxus"><font-awesome-icon icon="globe" />Quản lý Lớp</router-link></li>
        </ul>
      </nav>
    <div v-if="showPopup" class="popup">
      {{ popupMessage }}
    </div>

  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faInfoCircle, faShoppingCart, faGlobe } from '@fortawesome/free-solid-svg-icons';
import ChildComponent from './HeaderChild.vue';
  export default {
    name: "componentsHeader",
    components: {
    FontAwesomeIcon,
    ChildComponent
  },
  data() {
    return {
      icons: [faHome, faInfoCircle, faShoppingCart, faGlobe],
      showPopup: false,
      popupMessage: ''
    };
  },
  methods: {
        receiveData(message) {
          this.popupMessage = message;
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
          }, 5000); // Hide after 5 seconds
        },
        handleClickOnce() {
          console.log('This button was clicked once');
          this.popupMessage = 'Button clicked once';
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
          }, 5000); // Hide after 5 seconds
        }
      }
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 20px; /* Set position to the top */
    right: 20px;
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .header {
    background-color: #fff; /* Nền trắng */
    color: #333; /* Chữ màu đen */
    height: 80px;
    text-align: center;
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 200px); /* Giảm bớt chiều rộng của sidebar */
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center; /* Căn giữa theo chiều dọc *//* Tạo khoảng cách đều giữa các phần tử */
  }
  .container h3,
.container child-component,
.container div {
  margin: 0 10px; /* Thêm khoảng cách giữa các phần tử */
}
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333; /* Chữ màu đen */
    text-decoration: none;
  }
  
  .sidebar {
    background-color: #333; /* Nền đen */
    color: #fff; /* Chữ màu trắng */
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px; /* Độ rộng của thanh menu bên trái */
    z-index: 999;
    padding-top: 70px; /* Đảm bảo nội dung menu không bị che khuất bởi header */
  }
  
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav li {
    margin: 1rem 0;
  }
  
  nav a {
    color: #fff;
    text-decoration: none;
    padding: 0.5rem;
    display: block;
    transition: color 0.3s ease;
  }
  
  nav a:hover {
    color: #ffd700;
  }
  </style>