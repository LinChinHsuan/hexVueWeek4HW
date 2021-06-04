const url = "https://vue3-course-api.hexschool.io/"
const path = "LinVuePortfolio";
const app = {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
        login(){
            axios.post(`${url}admin/signin`,{
                username: this.username,
                password: this.password 
            })
                .then(res=>{
                    console.log(res);
                    if(res.data.success){
                        const [ token , expired ] = [ res.data.token , res.data.expired ];
                        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                        window.location.href = 'index.html';
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        checkLogin(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${url}api/user/check`)
                .then(res=>{
                    console.log(res);
                    if(res.data.success){
                        window.location.href = 'index.html';
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    },
    created() {
        this.checkLogin();
    },
  }

Vue.createApp(app).mount('#app');