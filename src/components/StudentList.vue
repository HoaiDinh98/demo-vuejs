
<template>
    <div class="card card-custom gutter-b">
      <div class="card-header">
        <div class="card-title">
          <span class="card-label">Sinh viên</span>
        </div>
        <div class="card-toolbar">
          <button ref="addButton">Thêm</button>
        </div>
      </div>
      <div class="table-container">
      <div class="card-body">
        <div class="kt-form">
          <div class="kt-form__filtration">
            <div class="row align-items-center">
              <div class="col-md-3 kt-margin-bottom-10-mobile">
                <input  type="text" placeholder="Tìm kiếm" class="form-control" />
                <small  class="form-text text-muted">Tìm kiếm <strong>tất cả dữ liệu</strong></small>
                <p>Số lượng sinh viên: {{ totalProducts }} </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="table-responsive angular-bootstrap-table" style="height: 300px">
          <transition-group name="fade" tag="table" class="table table-head-custom table-vertical-center overflow-hidden">
            <thead>
              <tr>
                <th class="green-text">
                  <span>STT</span>
                </th>
                <th class="green-text">
                  <span>Tên sinh viên</span>
                </th>
                <th class="green-text">
                  <span>Ngày Sinh</span>
                </th>
                <th class="green-text">
                  <span>Mã lớp</span>
                </th>
                <th class="green-text">
                  <span>Thao tác</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sinhvien, index) in displayedSinhViens" :key="index" >
                
                    <td>{{ index + 1 }}</td>
                    <td >{{ sinhvien.hoTen }}</td>
                    <td >{{ sinhvien.ngaySinh }}</td>
                    <td >{{ sinhvien.maLop }}</td>
                    <td >
                        <span class="icon-wrapper" style="cursor: pointer; color: #1BC5BD; font-size: 16px;">
                            <i class="fas fa-edit edit-icon"></i>
                        </span>
                        <span class="icon-wrapper" style="cursor: pointer; color: #f52020; font-size: 16px;" >
                            <i class="fas fa-trash delete-icon"></i>
                        </span>
  
                    </td>
              </tr>
            </tbody>
          </transition-group>
  
        </div>
        <div class="pagination">
            <button @click="paginate('prev')">Prev</button>
            <span>{{ currentPage }}</span>
            <button @click="paginate('next')">Next</button>
          </div>
          </div>
    </div>


    </div>
  
    <div v-if="showAddPopup" class="popup2">
      <div class="popup-content2">
        <h2>Thêm sinh viên</h2>
        <label for="hoTen">Họ tên:</label>
        <input type="text" id="hoTen" v-model="newStudent.hoTen">
        <label for="ngaySinh">Ngày sinh:</label>
        <input type="date" id="ngaySinh" v-model="newStudent.ngaySinh">
        <label for="maLop">Mã lớp:</label>
        <input type="text" id="maLop" v-model="newStudent.maLop">
        <div class="button-group2">
          <button  @click="addStudent">Thêm</button>
          <button @click="cancelAdd">Hủy</button>
        </div>
      </div>
    </div>
  
  </template>
  <script>
  
  import SinhVienApi from "../api/SinhVienService";
import { ref,computed,onMounted,defineComponent,isRef } from 'vue';

export default defineComponent ({
  name: 'StudenList',
  props: {
    initialSinhViens: {
      type: Array,
      default: () => []
    }
  },
  setup(props,{ emit }) {
    const sinhviens = ref(props.initialSinhViens);
    const pageSize = 5;
    const currentPage = ref(1);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const itemsPerPageOptions = [5, 10, 20, 40];
    const showAddPopup = ref(false);
    const newStudent = ref({
      hoTen: '',
      ngaySinh: '',
      maLop: ''
    });
    
    const addButton = ref(null);

    console.log('isRef có giá trị: ',isRef(addButton));

    onMounted(() => {
        addButton.value.addEventListener('click', () => {
        showAddPopup.value = true;
      });
    });
    const addStudent = () => {
        emit('add-student', newStudent.value);
      showAddPopup.value = false;
      newStudent.value = { hoTen: '', ngaySinh: '', maLop: '' };
    };

    const cancelAdd = () => {
      showAddPopup.value = false;
      newStudent.value = { hoTen: '', ngaySinh: '', maLop: '' };
    };


    const displayedSinhViens = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return sinhviens.value.slice(start, end);
    });
    const totalProducts = computed(() => {
      return sinhviens.value.length;
    });
    const fetchsinhviens = async () => {
      try {
        const response = await SinhVienApi.getAllSinhVien();
        sinhviens.value = response.data;
        totalItems.value = sinhviens.value.length;
        calculateTotalPages();
        console.log("sinhvien", sinhviens.value);
      } catch (error) {
        console.error("Error fetching nhan viens:", error);
      }
    };
    const calculateTotalPages = () => {
      totalPages.value = Math.ceil(totalItems.value / pageSize);
    };
    const paginate = (direction) => {
      if (direction === 'prev' && currentPage.value > 1) {
        currentPage.value--;
      } else if (direction === 'next' && currentPage.value < totalPages.value) {
        currentPage.value++;
      }
      fetchsinhviens();
    };
    fetchsinhviens();
    return {
        showAddPopup,
      newStudent,
      addStudent,
      cancelAdd,
      addButton,
      sinhviens,
      pageSize,
      currentPage,
      totalItems,
      totalPages,
      itemsPerPageOptions,
      fetchsinhviens,
      displayedSinhViens,
      totalProducts,
      paginate
    };
  }
});
  </script>
  <style scoped>
  /* CSS cho popup */
  .popup2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 400px; /* Điều chỉnh kích thước của popup */
}

.popup-content2 {
  text-align: center;
}

.popup-content2 h2 {
  margin-bottom: 20px;
  color: #333333;
}

.popup-content2 label {
  display: block;
  margin-bottom: 10px;
}

.popup-content2 input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.button-group2 {
  margin-top: 20px;
  text-align: right;
}

.button-group2 button {
  margin-left: 10px;
}
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateY(20px);
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
  
  .pagination button {
    margin: 0 5px;
    cursor: pointer;
  }
  .new-button {
    background-color: blue;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .new-button:hover {
    background-color: darkblue;
  }
  
  .highlight {
    background-color: yellow;
    color: black;
  }
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
  .delete-popup {
  
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .popup-content {
      border-radius: 5px solid black;
    background-color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  .button-group {
    margin-top: 20px;
  }
  
  .confirm-button,
  .cancel-button {
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .confirm-button {
    background-color: #f52020;
    color: #fff;
  }
  
  .cancel-button {
    background-color: #ccc;
    color: #000;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-toolbar button {
    background-color: #1BC5BD;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .card-toolbar button:hover {
    background-color: #15a99b;
  }
  
  .table-responsive {
    margin-top: 20px;
  }
  
  .table th,
  .table td {
    vertical-align: middle;
  }
  
  .icon-wrapper {
    display: inline-block;
    margin-right: 10px;
  }
  .green-text {
    color: #05821e;
  }
  
  </style>