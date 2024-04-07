<template>
  <section class="lg:py-10 relative">
<div class="lg:grid lg:grid-cols-12 lg:w-[90%] lg:mx-auto md:shadow-md md:bg-slate-100 md:dark:bg-gray-800 md:dark:shadow-gray-850 md:rounded-md">
<aside class="lg:col-span-5 lg:order-last">
  <img
        alt="Portfolio"
        src="https://www.cosasdeeducacion.es/wp-content/uploads/sites/6/2021/11/portfolio.jpg"
        class=" w-full object-cover h-[12rem] opacity-80 lg:h-full"
      />
    
</aside>
<!-- form -->
  <form class="m-4 bg-slate-100 dark:bg-gray-800 md:bg-transparent md:dark:transparent px-4 py-6 rounded-md md:px-0 md:m-10 lg:col-span-7 shadow-md md:shadow-none" @submit.prevent="handleSubmitForm">
     <p class="text-lg">Create an account and make your amazing <strong>web developer portfolio</strong> here without having to code</p>
          <div class="my-4">
            <label for="firstname" class="block text-gray-500 dark:text-gray-200">First Name</label>
            <input type="text" v-model="personal_info.firstName" @blur="validateFirstName" name="firstname" :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${error.firstName?'inputError':'border-gray-300'}`"  />
            <small class="text-xs errorMessage">{{ errorMessage.firstName }}</small>
          </div>
          <div class="my-4">
            <label for="lastname" class="block text-gray-500 dark:text-gray-200">Last Name</label>
                       <input type="text" v-model="personal_info.lastName" @blur="validateLastName" name="lastname" :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${error.lastName?'inputError':'border-gray-300'}`"  />
            <small class="text-xs errorMessage">{{ errorMessage.lastName }}</small>
          </div>
       
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <label for="email" class="block text-gray-500 dark:text-gray-200">Email Address</label>
                        <input type="email" v-model="personal_info.email" @blur="validateEmail" name="email" :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${error.email?'inputError':'border-gray-300'}`" />
            <small class="text-xs errorMessage">{{ errorMessage.email }}</small>
          </div>
          <div>
            <label for="phone_number" class="block text-gray-500 dark:text-gray-200">Phone Number</label>
                       <input type="tel" v-model="personal_info.phone_number" @blur="validatePhoneNumber" name="phone_number" :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${error.phone_number?'inputError':'border-gray-300'}`"  />
            <small class="text-xs errorMessage">{{ errorMessage.phone_number }}</small>
          </div>
        </div>
          <div class="my-4">
            <label
              for="address"
              class="block text-gray-500 dark:text-gray-200"
              >Address</label
            >
                      <input type="text" v-model="personal_info.address" @blur="validateAddress" name="address" :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${error.address?'inputError':'border-gray-300'}`"  />
            <small class="text-xs errorMessage">{{ errorMessage.address }}</small>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="relative cursor-pointer">
            <div class="absolute right-4 top-[34px] text-gray-500" @click="show">
            <font-awesome-icon v-if="isShown" icon="eye" />
            <font-awesome-icon v-if="!isShown" icon="eye-slash" />
          </div>
            <label for="password" class="block text-gray-500 dark:text-gray-200">Password</label>
                        <input type="password" id="passWord" v-model="personal_info.password" @blur="validatePassword" name="password" :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${error.password?'inputError':'border-gray-300'}`" autocomplete="new-password" />
            <small class="text-xs errorMessage">{{ errorMessage.password }}</small>
          </div>
          <div class="relative cursor-pointer">
            <div class="absolute right-4 top-[34px] text-gray-500" @click="showConfirm">
            <font-awesome-icon v-if="isConfirmShown" icon="eye" />
            <font-awesome-icon v-if="!isConfirmShown" icon="eye-slash" />
          </div>
            <label for="confirmPassword" class="block text-gray-500 dark:text-gray-200">Confirm Password</label>
                       <input type="password" v-model="personal_info.confirmPassword" @blur="validateConfirmPassword" id="confirmPassWord" name="comfirmPassword" :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${error.confirmPassword?'inputError':'border-gray-300'}`" autocomplete="new-password"  />
            <small class="text-xs errorMessage">{{ errorMessage.confirmPassword }}</small>
          </div>
        </div>
          <div class="my-8">
            <p class=" text-gray-500 dark:text-gray-200">
              By creating an account, you agree to our
              <a href="#" class="text-gray-700 dark:text-gray-400 underline"> terms and conditions </a>
              and
              <a href="#" class="text-gray-700 dark:text-gray-400 underline">privacy policy</a>.
            </p>
          </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
         <p class=" text-gray-500 dark:text-gray-200">
              Already have an account?
              <a href="/login" class="text-gray-700 dark:text-gray-400 underline">Log in</a>.
            </p>
        <button type="submit" class="bg-gray-800 dark:bg-gray-200 font-semibold border border-transparent hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 px-4 text-white dark:text-gray-800 shadow w-full py-2 flex items-center justify-center" :disabled="hasError">
                            <p v-if="loading" class="flex items-center justify-center">
        <span>Creating</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Create an Account</span>
        </button>
        </div>
      </form>
</div>

      <!-- <div v-if="showAlert" :class="{'fixed top-5 text-gray-200 right-5 bg-red-500 p-4 rounded':true,'slideIn':showAlert,'slideOut':!showAlert}"> -->
      <Alert :alertType="alertType" :showAlert="showAlert" :alertText="alertMessage" />
</section>
</template>

<script>
import axios from 'axios'
import { baseURL } from '@/main'
import Alert from '../components/Alert.vue'

export default {
name:'SignUp',
components:{
Alert
},
data() {
    return {
        isShown: false,
        isConfirmShown: false,
        showAlert:false,
        loading:false,
        alertMessage:'',
        alertType:'',
        personal_info:{
        firstName:'',
        lastName:'',
        email:'',
        phone_number:'',
        address:'',
        password:'',
        confirmPassword:'',
        },
        errorMessage:{
          firstName:'',
        lastName:'',
        email:'',
        phone_number:'',
        address:'',
        password:'',
        confirmPassword:'',
        },
        error:{
          firstName:false,
        lastName:false,
        email:false,
        phone_number:false,
        address:false,
        password:false,
        confirmPassword:false,
        },
        regex:{
        email:/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        phone_number:/^0[7-9]{1}[0-1]{1}[0-9]{8}$/,
        password: /^(?=.*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\]\[:;<>,.?~\\-]).{8,}$/,
        }
    }
},
computed:{
hasError(){
if (this.error.firstName||this.error.lastName||this.error.email||this.error.phone_number||this.error.address||this.error.password||this.error.confirmPassword||this.personal_info.firstName==''||this.personal_info.lastName==''||this.personal_info.email==''||this.personal_info.phone_number==''||this.personal_info.address==''||this.personal_info.password==''||this.personal_info.confirmPassword=='') {
  return true
}else{
return false
}
}
}
,
methods: {
//validate first name
validateFirstName(){
if (this.personal_info.firstName=='') {
this.error.firstName=true
  this.errorMessage.firstName= 'First name is required'
}
else if(this.personal_info.firstName.length<3){
this.error.firstName=true
  this.errorMessage.firstName= 'First name should be at least three characters'
  this.errorMessage.firstName= 'First name should be at least three characters'
}
else if(this.personal_info.firstName.length>15){
this.error.firstName=true
  this.errorMessage.firstName= 'First name should not be more fifteen characters'
}else{
this.error.firstName=false
  this.errorMessage.firstName= ''
}
},

//validate last name
validateLastName(){
if (this.personal_info.lastName=='') {
this.error.lastName=true
  this.errorMessage.lastName= 'Last name is required'
}
else if(this.personal_info.lastName.length<3){
this.error.lastName=true
  this.errorMessage.lastName= 'Last name should be at least three characters'
  this.errorMessage.lastName= 'Last name should be at least three characters'
}
else if(this.personal_info.lastName.length>15){
this.error.lastName=true
  this.errorMessage.lastName= 'Last name should not be more fifteen characters'
}else{
this.error.lastName=false
  this.errorMessage.lastName= ''
}
},
//validate email
validateEmail(){
if (this.personal_info.email=='') {
this.error.email=true
  this.errorMessage.email= 'Email is required'
}
else if(!this.regex.email.test(this.personal_info.email)){
this.error.email=true
  this.errorMessage.email= 'Email should follow this format: test@gmail.com'
}else{
this.error.email=false
  this.errorMessage.email= ''
}
},
//validate phone_number
validatePhoneNumber(){
if (this.personal_info.phone_number=='') {
this.error.phone_number=true
  this.errorMessage.phone_number= 'Phone number is required'
}
else if(!this.regex.phone_number.test(this.personal_info.phone_number)){
this.error.phone_number=true
  this.errorMessage.phone_number= 'Phone number should follow this format: 08043786543'
}else{
this.error.phone_number=false
  this.errorMessage.phone_number= ''
}
},
//validate address
validateAddress(){
if (this.personal_info.address=='') {
this.error.address=true
  this.errorMessage.address= 'Address is required'
}else{
this.error.address=false
  this.errorMessage.address= ''
}
},
//validate password
validatePassword(){
if (this.personal_info.password=='') {
this.error.password=true
  this.errorMessage.password= 'Password is required'
}
else if(!this.regex.password.test(this.personal_info.password)){
this.error.password=true
  this.errorMessage.password= 'Password should include at least one upper case, two lower case, one special character,one digit and must be at least eight characters long'
}else{
this.error.password=false
  this.errorMessage.password= ''
}
},
//validate confirm password
validateConfirmPassword(){
if (this.personal_info.confirmPassword!==this.personal_info.password) {
this.error.confirmPassword=true
  this.errorMessage.confirmPassword= "password doesn't match"
}else{
this.error.confirmPassword=false
  this.errorMessage.confirmPassword= ''
}
},


    show() {
        if (this.isShown) {
            this.isShown=false
            document.getElementById('passWord').type='password'
        } else {
            this.isShown=true  
            document.getElementById('passWord').type='text'
        }
    },
    showConfirm() {
        if (this.isConfirmShown) {
            this.isConfirmShown=false
            document.getElementById('confirmPassWord').type='password'
        } else {
            this.isConfirmShown=true  
            document.getElementById('confirmPassWord').type='text'
        }
    },

    handleSubmitForm(){
    this.loading=true
    console.log(this.personal_info);
    axios.post(`${baseURL}register`,this.personal_info).then(res=>{
    console.log(res);
    if (!res.data.error) {
      this.loading=false
      this.showAlert=true;
      this.alertType='success'
      this.alertMessage= res.data.message;
      setTimeout(()=>{
      this.showAlert=false
      },2000)
    } else {
    this.loading=false
      this.showAlert=true;
      this.alertType='error'
      this.alertMessage= res.data.message;
      setTimeout(()=>{
      this.showAlert=false
      },2000)
    }
    this.personal_info={
        firstName:'',
        lastName:'',
        email:'',
        phone_number:'',
        address:'',
        password:'',
        confirmPassword:'',
        }
    }).catch(err=>{
    console.log("Error:",err);
    if (err.response) {
    console.log("Error details:",err.response.data);
    }
    })
    }
},

}
</script>

<style scoped>
.errorMessage{
color: rgb(236, 7, 7);
}
.inputError{
border-color: rgb(236, 7, 7);
}


/* .slideOut {
  animation: slideOut 0.2s ease-in-out;
}

@keyframes slideOut {
  from {
    opacity: 1;
    right: 1.25rem;
  }
  to {
    opacity: 0;
    right: -5rem;
  }
} */

</style>