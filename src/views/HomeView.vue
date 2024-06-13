<!-- 
<template>
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <div class="card-title">
        <span class="card-label">Sinh viên</span>
      </div>
      <div class="card-toolbar">
        <button >Thêm</button>
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



</template>
<script>

import SinhVienApi from "../api/SinhVienService";
import { getAllSinhVienMixin } from "@/mixins/getAllSinhVienMixin";
export default {
  name: 'HomeView',
  mixins: [getAllSinhVienMixin],
  data() {
    return {
      title: "Danh sách sinh viên",
      sinhviens: [],
      apiURL: 'https://localhost:44313/api/SinhVienManagement/getAllSinhVien',
      pageSize: 5,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      itemsPerPageOptions: [5, 10, 20, 40],
    };
  },
  components: {
  },
  computed: {
    displayedSinhViens() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.items.slice(start, end);
    },
    totalProducts() {
      return this.items.length;
    },
  },
  methods: {
    async fetchsinhviens() {
      try {
        const response = await SinhVienApi.getAllSinhVien();
        this.sinhviens = response.data;
        this.totalItems = this.sinhviens.length;
        this.calculateTotalPages();
        console.log("sinhvien", this.sinhviens);
      } catch (error) {
        console.error("Error fetching nhan viens:", error);
      }
    },
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    },
    paginate(direction) {
      if (direction === 'prev' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      this.fetchsinhviens();
    },
    
  },
  async mounted() {
      await this.fetchData(this.apiURL);
      await this.fetchsinhviens();
    },
}
</script>
<style scoped>
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

</style> -->


<template>
  <div>
    <StudentList :initialSinhViens="sinhviens" @add-student="handleAddStudent"/>
  </div>
</template>

<script>
import StudentList from "@/components/StudentList.vue";
import SinhVienApi from "../api/SinhVienService";

export default {
  name: 'HomeView',
  components: {
    StudentList
  },
  data() {
    return {
      sinhviens: [] 
    };
  },
  async mounted() {
    await this.fetchSinhViens(); 
  },
  methods: {
    async fetchSinhViens() {
      try {
        const response = await SinhVienApi.getAllSinhVien();
        this.sinhviens = response.data;
      } catch (error) {
        console.error("Error fetching sinh viens:", error);
      }
    },
    handleAddStudent(newStudent) {
      // Xử lý dữ liệu sinh viên mới ở đây
      console.log('New student added:', newStudent);
      // Thực hiện các thao tác cần thiết, ví dụ: gửi request API để lưu sinh viên mới vào cơ sở dữ liệu
    }
  }
};
</script>