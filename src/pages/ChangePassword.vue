<template>
   <div class="h-screen w-full bg-gray-700 bg-opacity-90 transition-all ease-in-out flex justify-center items-center">
   <div
        class="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] p-4 md:p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md mx-4"
      >
      <p class="my-1 text-gray-600 dark:text-gray-400">
          Enter your new password
        </p>
         <div class="flex flex-col gap-4 my-4">
          <div class="relative cursor-pointer">
            <div class="absolute right-4 top-[34px] text-gray-500" @click="show">
            <font-awesome-icon v-if="isShown" icon="eye" />
            <font-awesome-icon v-if="!isShown" icon="eye-slash" />
          </div>
            <label for="password" class="block text-gray-500 dark:text-gray-200">Password</label>
                        <input type="password" id="passWord" v-model="personal_info.password" @blur="validatePassword" name="password"  :class="`border bg-transparent dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${
              error.password ? 'border-red-500':'dark:border-gray-700'
            }`" autocomplete="new-password" />
            <small class="text-xs text-red-500">{{ errorMessage.password }}</small>
          </div>
          <div class="relative cursor-pointer">
            <div class="absolute right-4 top-[34px] text-gray-500" @click="showConfirm">
            <font-awesome-icon v-if="isConfirmShown" icon="eye" />
            <font-awesome-icon v-if="!isConfirmShown" icon="eye-slash" />
          </div>
            <label for="confirmPassword" class="block text-gray-500 dark:text-gray-200">Confirm Password</label>
                       <input type="password" v-model="personal_info.confirmPassword" @blur="validateConfirmPassword" id="confirmPassWord" name="comfirmPassword"  :class="`border bg-transparent dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm ${
              error.confirmPassword ? 'border-red-500':'dark:border-gray-700'
            }`" autocomplete="new-password"  />
            <small class="text-xs text-red-500">{{ errorMessage.confirmPassword }}</small>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-4">
          <button
            class="flex items-center justify-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
            @click.prevent="updatePassword"
          >
                       <p v-if="loading" class="flex items-center justify-center">
        <span>Updating</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Update</span>
          </button>
          </div>
      </div>
      <Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
   </div>
</template>

<script>
import axios from "axios";
import { baseURL, config} from "@/main";
import Alert from '../components/Alert.vue'
export default {
  components: {
    Alert
  },
data(){
return{
 showAlert:false,
        alertType:'',
        message:'',
        loading:false,
        isShown: false,
        isConfirmShown: false,
          personal_info:{
        password:'',
        confirmPassword:'',
        },
        errorMessage:{
        password:'',
        confirmPassword:'',
        },
        error:{
        password:false,
        confirmPassword:false,
        },
         regex:{
        password: /^(?=.*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\]\[:;<>,.?~\\-]).{8,}$/,
        }
}
},
created(){
// window.emitter.on('showEditLanguageModal',(result)=>{
// this.isOpened=result.status
// console.log(result.language);
// this.language = result.language
// })
},
methods:{
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


 updatePassword(){
 if (Object.values(this.error).every(value=>value==false)) { 
    this.loading=true
    console.log(this.personal_info);
    axios.post(`${baseURL}getNewPassword`,{password:this.personal_info.password}).then(res=>{
    console.log(res);
    if (!res.data.error) {
      this.loading=false
      this.showAlert=true;
      this.alertType='success'
      this.alertMessage= res.data.message;
      setTimeout(()=>{
      this.showAlert=false
      location.replace('/')
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
    }
}
}
</script>

<style scoped>
</style>