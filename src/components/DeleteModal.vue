<template>
   <div class="fixed top-0 left-0 h-full w-full bg-gray-700 bg-opacity-80 transition-all ease-in-out flex justify-center items-center" v-if="isOpened">
   <div
        class="md:w-[50%] lg:w-[60%] p-4 md:p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md mx-4"
      >
   
    <div class="mb-4">
    <h1 class="text-lg">Are you sure you want to delete your account?</h1>
        <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
        </p>
    </div>
        <div class="relative cursor-pointer">
            <div class="absolute right-4 top-2 text-gray-500" @click="showPassword">
            <font-awesome-icon v-if="isPasswordShown" icon="eye" />
            <font-awesome-icon v-if="!isPasswordShown" icon="eye-slash" />
          </div>
                        <input type="password" id="password" v-model="password" name="password" :class="{'border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm':true,'inputError':error.password,'border-gray-300':!error.password}" autocomplete="new-password" />
            <small class="text-xs errorMessage">{{ errorMessage.password }}</small>
          </div>
        <div class="mt-4 flex justify-end gap-4">
        <button class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150" @click="cancel">Cancel</button>
            <button
              class=" px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 flex items-center justify-center"
             @click="deleteAccount" 
            >
             <p v-if="loading" class="flex items-center justify-center">
        <span>Deleting</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#FFF" stroke="#FFF" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFF" stroke="#FFF" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFF" stroke="#FFF" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Delete Account</span>
            </button>
          </div>
      </div>
      <Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
   </div>
</template>

<script>
import axios from "axios";
import { baseURL, config} from "@/main";
import Alert from './Alert.vue'
import { mapActions } from "vuex";
export default {
  components: {
    Alert
  },
data(){
return{
isOpened:false,
isPasswordShown:false,
loading:false,
 showAlert:false,
        alertType:'',
        message:'',
password:'',
errorMessage:{
        password:'',
        },
        error:{
        password:false,
        },
}
},
created(){
window.emitter.on('showDeleteModal',(status)=>{
this.isOpened=status
})
},
methods:{
  showPassword() {
      if (this.isPasswordShown) {
        this.isPasswordShown = false;
        document.getElementById("password").type = "password";
      } else {
        this.isPasswordShown = true;
        document.getElementById("password").type = "text";
      }
    },
cancel(){
this.isOpened=false
this.password=''
},


 deleteAccount(){
if(this.password!=''){
console.log(this.password)
this.loading=true
  axios
          .post(
            `${baseURL}deleteAccount`,
            {password:this.password},
            config
          )
          .then((res) => {
          this.loading=false
            console.log(res.data);
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
        this.password=''
      setTimeout(()=>{
      this.showAlert=false
      },2000)
        this.$store.dispatch('logout')
    }
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
}
 },
}
}
</script>

<style>

</style>