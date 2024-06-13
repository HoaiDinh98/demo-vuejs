<template>
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <div class="card-title">
        <span v-html="htmlXuatXu" class="card-label"></span>
      </div>
      <div class="r">
        <button @click="showAddPopup">Thêm</button>
      </div>
    </div>
    <!-- Popup thêm xuất xứ -->
    <div v-if="showAddpopup" class="delete-popup">
      <div class="popup-content">
        <p>Nhập tên xuất xứ mới:</p>
        <input v-model.trim="newXuatXu" type="text" class="form-control" />
        <div class="button-group">
          <button @click="confirmAdd" class="confirm-button">Xác nhận</button>
          <button @click="cancelAdd" class="cancel-button">Hủy</button>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="kt-form">
        <div class="kt-form__filtration">
          <div class="row align-items-center">
            <div class="col-md-3 kt-margin-bottom-10-mobile">
              <input v-model.trim="searchTerm" @input="search"  type="text" placeholder="Tìm kiếm" class="form-control" />
              <small  class="form-text text-muted">Tìm kiếm <strong>tất cả dữ liệu</strong></small>
              <p>Số lượng sản phẩm: {{ totalProducts }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="table-responsive angular-bootstrap-table">
        <table class="table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th style="padding-right: 20px; width: 20px;">
                <input type="checkbox" />
              </th>
              <th class="green-text">
                <span>STT</span>
              </th>
              <th class="green-text">
                <span>Tên xuất xứ</span>
              </th>
              <th class="green-text">
                <span>Thao tác</span>
              </th>
            </tr>
          </thead>
          <transition-group name="fade" tag="tbody">
            <tr v-for="(row, index) in filteredItems" :key="index" >
              <template  v-if="row.isdel === 0">
                  <td style="padding-right: 20px; width: 20px;">
                      <input type="checkbox" v-model="selection" :value="row" />
                  </td>
                  <td>{{ index + 1 }}</td>
                  <td :style="{ color: row.Modified ? 'red' : 'inherit' }">{{ row.TenXuatXu }}</td>
                  <td >
                      <span class="icon-wrapper" style="cursor: pointer; color: #1BC5BD; font-size: 16px;">
                          <i class="fas fa-edit edit-icon"></i>
                      </span>
                      <span class="icon-wrapper" style="cursor: pointer; color: #f52020; font-size: 16px;" @click="showDeletePopup">
                          <i class="fas fa-trash delete-icon"></i>
                      </span>
                          <div v-show="showPopup" class="delete-popup"  @keydown.enter="confirmDelete">
                              <div class="popup-content">
                                  <p>Bạn có chắc chắn muốn xóa không?</p>
                                  <div class="button-group">
                                  <button @click="confirmDelete" class="confirm-button">Xác nhận</button>
                                  <button @click="cancelDelete" class="cancel-button">Hủy</button>
                                  </div>
                              </div>
                          </div>
                          <div v-if="showPopupdelete" class="popup">
                              {{ popupMessage }}
                            </div>
                  </td>
              </template >
            </tr>
          </transition-group>
        </table>
      </div>
  </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      newXuatXu: '', 
      showAddpopup: false,
      isNewButtonHighlighted: false,
      htmlXuatXu: '<p>XUẤT XỨ</p>',
      searchTerm: '',
      previousSearchTerm: '',
      selectAll: false,
      selection: [],
      items: [
        { TenXuatXu: 'Xuất xứ A' },
        { TenXuatXu: 'Xuất xứ B', isdel: 0, Modified: true },
        { TenXuatXu: 'Xuất xứ C', isdel: 0, Modified: false },
        { TenXuatXu: 'Xuất xứ D', isdel: 1, Modified: false },
        { TenXuatXu: 'Xuất xứ E', isdel: 0, Modified: false },
        { TenXuatXu: 'Xuất xứ F', isdel: 0, Modified: false },
        { TenXuatXu: 'Xuất xứ G', isdel: 1, Modified: false },
        { TenXuatXu: 'Xuất xứ H', isdel: 0, Modified: false },
      ],
      filteredItems: [],
      paginator: {
        totalPages: 10,
        currentPage: 1,
        perPage: 5,
      },
      isLoading: false,
      showPopup: false,
      showPopupdelete: false,
      popupMessage: '',
    };
  },
  computed: {
    totalProducts() {
      return this.items.filter(item => item.isdel === 0).length;
    },
    isAllSelected() {
      return this.selection.length === this.filteredItems.length;
    },
    currentPageItems() {
      const start = (this.paginator.currentPage - 1) * this.paginator.perPage;
      const end = start + this.paginator.perPage;
      return this.filteredItems.slice(start, end);
    }
  },
  watch: {
  },
  methods: {
    showAddPopup() {
      this.showAddpopup = true;
    },
    confirmAdd() {
      if (this.newXuatXu.trim() !== '') {
        this.items.push({ TenXuatXu: this.newXuatXu, isdel: 0, Modified: false });
        this.showAddpopup = false;
        this.newXuatXu = '';
        this.search();
      }
    },
    cancelAdd() {
      this.showAddpopup = false;
      this.newXuatXu = '';
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selection = this.filteredItems.slice();
      } else {
        this.selection = [];
      }
    },
    loadData() {
      this.search();
    },
    search() {
      if (this.searchTerm.trim() !== '') {
        this.filteredItems = this.items.filter(item => {
          return item.TenXuatXu.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      } else {
        this.filteredItems = this.items;
      }
    },
    showDeletePopup() {
      this.showPopup = true;
    },
    confirmDelete() {
      this.showPopup = false;
      this.popupMessage = 'Đã xóa thành công';
      this.showPopupdelete = true;
      setTimeout(() => {
        this.showPopupdelete = false;
      }, 5000);
      this.selection.forEach(item => {
        const index = this.items.indexOf(item);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      });
      
      this.selection = [];

    },
    cancelDelete() {
      this.showPopup = false;
    },
    confirmDeleteOnEnter(event) {
      if (this.showPopup && event.key === 'Enter') {
        this.confirmDelete();
      }
    }
  },
  mounted() {
    this.loadData();
    window.addEventListener('keydown', this.confirmDeleteOnEnter);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.confirmDeleteOnEnter);
  }
}
</script>

<style scoped>
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
  top: 20px;
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

.fade-enter-active, .fade-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>