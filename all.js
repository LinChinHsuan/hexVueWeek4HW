import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js"
import productModal from './productModal.js';
import pagination from './pagination.js';

const url = "https://vue3-course-api.hexschool.io/"
const path = "linvueportfolio";
const productSample = {
    category: "",
    content: "",
    description: "",
    id: "",
    is_enabled: 1,
    origin_price: 0,
    price: 0,
    title: "",
    unit: "個",
    num: 0,
    imageUrl: "",
    imagesUrl: []
};

const app = createApp({
    data() {
        return {
            products: [],
            pagination: {},
            editingProduct: {
                data: {}
            },
            status:''
        }
    },
    components: {
        productModal,
        pagination
    },
    methods: {
        getProducts(page = 1) {
            axios.get(`${url}api/${path}/admin/products?page=${page}`)
                .then(res => {
                    if (res.data.success) {
                        this.products = res.data.products;
                        this.pagination = res.data.pagination;
                        this.editingProduct.data = {};
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        editProduct(item) {
            if (item) {
                this.status = "編輯";
                this.editingProduct = {
                    data: { ...item }
                };
            } else {
                this.status = "新增";
                this.editingProduct = {
                    data: { ...productSample }
                }
            }
        },
        delProduct() {
            axios.delete(`${url}api/${path}/admin/product/${this.editingProduct.data.id}`)
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        console.log('刪除成功');
                        this.getProducts();
                    } else {
                        console.log(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${url}api/user/check`)
                .then(res => {
                    console.log(res);
                    if (!res.data.success) {
                        window.location.href = 'login.html';
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
        this.checkLogin();
        this.getProducts();
    },
});

app.mount('#app');