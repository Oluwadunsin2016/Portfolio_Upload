<template>
  <section class="lg:py-20">
<div class="lg:grid lg:grid-cols-12 lg:w-[70%] lg:mx-auto md:shadow-md md:bg-slate-100 md:dark:bg-gray-800 md:dark:shadow-gray-850 md:rounded-md">
<aside class="lg:col-span-5 lg:order-last">
  <img
        alt="Portfolio"
        src="https://www.cosasdeeducacion.es/wp-content/uploads/sites/6/2021/11/portfolio.jpg"
        class=" w-full object-cover h-[12rem] opacity-80 lg:h-full"
      />
    
</aside>
<!-- form -->
  <form class="m-4 bg-slate-100 dark:bg-gray-800 md:bg-transparent md:dark:transparent px-4 py-6 rounded-md md:px-0 md:m-10 lg:col-span-7 shadow-md md:shadow-none" @submit.prevent="submitForm">
     <p class="text-lg mb-4">Login here to create or update your <strong>web developer portfolio</strong></p>
          <div class="my-5">
            <label for="email" class="block text-gray-500 dark:text-gray-200">Email Address</label>
            <input type="email" name="email" :class="`border bg-transparent dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${
              error.email ? 'border-red-500':'dark:border-gray-700'
            }`" v-model="loginDetails.email" />
            <small class="text-xs text-red-500">{{ errorMessage.email }}</small>
          </div>
          <div class="my-5 relative cursor-pointer">
          <div class="absolute right-4 top-[34px] text-gray-500" @click="show">
            <font-awesome-icon v-if="isShown" icon="eye" />
            <font-awesome-icon v-if="!isShown" icon="eye-slash" />
          </div>
             <label for="password" class="block text-gray-500 dark:text-gray-200">Password</label>
            <input type="password" id="passWord" name="password" :class="`border bg-transparent dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${
              error.password ? 'border-red-500':'dark:border-gray-700'
            }`" v-model="loginDetails.password" />
            <small class="text-xs text-red-500">{{ errorMessage.password }}</small>
          </div>
       
       
        <div class="flex flex-col gap-2 sm:flex-row sm:justify-between mb-4">
         <p class=" text-gray-500 dark:text-gray-200">
              No account?
              <a href="/signup" class="text-gray-700 dark:text-gray-400 underline">Sign up</a>.
            </p>
            <div type="button" class="text-blue-600 cursor-pointer flex gap-1 items-center md:flex-row-reverse">
            <span @click="forgot">Forgotten password?</span>
            <svg v-if="resetLoading" xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#e5e7eb"></stop><stop offset=".3" stop-color="#e5e7eb" stop-opacity=".9"></stop><stop offset=".6" stop-color="#e5e7eb" stop-opacity=".6"></stop><stop offset=".8" stop-color="#e5e7eb" stop-opacity=".3"></stop><stop offset="1" stop-color="#e5e7eb" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#e5e7eb" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg> 
            </div>
        </div>
        <button type="submit" class="bg-gray-800 dark:bg-gray-200 font-semibold border border-transparent hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 px-4 text-white dark:text-gray-800 shadow w-full py-2 flex items-center justify-center">
        
                         <p v-if="loading" class="flex items-center justify-center">
        <span>Loging in</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Login</span>
        </button>
      </form>
</div>
<Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
</section>
</template>

<script>
import axios from 'axios'
import { baseURL } from '@/main'
import Alert from '../components/Alert.vue'
import router from '@/router'

export default {
name:'SignIn',
components:{
Alert,
},
data() {
    return {
        isShown: false,
        showAlert:false,
        alertType:'',
        message:'',
        loading:false,
        resetLoading:false,
      loginDetails:{
        email:'',
        password:'',
        },
      errorMessage: {
        email: "",
        password: "",
      },
      error: {
        email: false,
        password: false,
      },
    }
},
methods: {
    show() {
        if (this.isShown) {
            this.isShown=false
            document.getElementById('passWord').type='password'
        } else {
            this.isShown=true  
            document.getElementById('passWord').type='text'
        }
    },

        validateEmail() {
      if (this.loginDetails.email == "") {
        this.error.email = true;
        this.errorMessage.email = "Email is required";
      }else{
        this.error.email = false;
        this.errorMessage.email = "";
      }
    },

        validatePassword() {
      if (this.loginDetails.password == "") {
        this.error.password = true;
        this.errorMessage.password = "Password is required";
      }else{
        this.error.password = false;
        this.errorMessage.password = "";
      }
    },

    forgot(){
    this.validateEmail()
if (this.error.email==false) {
this.resetLoading=true
  axios.post(`${baseURL}forgottenPassword`,{email:this.loginDetails.email}).then(res=>{
console.log(res)
this.resetLoading=false
if (res.data.error) {
      this.message=res.data.message
      this.alertType='error'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
    }else{
       this.message=res.data.message
      this.alertType='success'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
    window.emitter.emit('email',this.loginDetails.email)
    router.push('/reset-password')
      },2000)
    }

}).catch(err=>{
    this.message=err.response.data.message
      this.resetLoading=false
        this.alertType='error'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
})
}
    },

    submitForm(){
    this.validateEmail()
      this.validatePassword()
    if (Object.values(this.error).every(value=>value==false)) { 
    this.loading=true
    axios.post(`${baseURL}login`,{...this.loginDetails}).then(res=>{
    if (res.data.token) {
      sessionStorage.setItem('token',res.data.token)
this.loading=false
    this.$store.commit('LOGIN')
    location.replace('/')
    }
    }).catch(err=>{

    console.log(err);
    if (err.response) {
      this.message=err.response.data.message
      this.loading=false
        this.alertType='error'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
    }
    })
    }
    }

},
}
</script>

<style>

</style>