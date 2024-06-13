import axiosInstance from "./axios";

const Api = "";
export default {
    getAllSinhVien() {
    console.log(Api + "getAllSinhVien");
    return axiosInstance.get(Api + `getAllSinhVien`);
  },
  CreateSinhVien(data) {
    console.log(Api + "CreateSinhVien");
    return axiosInstance.post(Api + `CreateSinhVien`,data);
  },

};
