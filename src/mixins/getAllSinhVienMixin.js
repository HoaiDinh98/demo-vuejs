import axios from 'axios';
export const getAllSinhVienMixin = {
  data() {
    return {
      items: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData(url) {
      this.loading = true;
      try {
        const response = await axios.get(url);
        this.items = response.data;
        console.log('Fetched data:', this.items);
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchData(this.apiURL);
  },
};
