<template>
      <transition name="deleteLanguageModal">
   <div class="fixed top-0 left-0 h-full w-full z-50 bg-gray-700 bg-opacity-90 transition-all ease-in-out flex justify-center items-center" v-if="isOpened">
   <transition name="deleteContainer">
   <div
        class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md mx-4"
      >
   
    <div class="mb-4">
    <h1 class="text-lg">Are you sure you want to delete this language?</h1>
    </div>
        <div class="mt-4 flex justify-end gap-4">
        <button class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150" @click="cancel">No</button>
            <button
              class=" px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 flex items-center justify-center"
             @click="deleteLanguage" 
            >
               <p v-if="loading" class="flex items-center justify-center">
        <span>Deleting</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#FFF" stroke="#FFF" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFF" stroke="#FFF" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFF" stroke="#FFF" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Yes</span>
            </button>
          </div>
      </div>
   </transition>
      <Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
   </div>
</transition>
</template>

<script>
import axios from "axios";
import { baseURL, config} from "@/main";
import Alert from '../../../Alert.vue'
export default {
  components: {
    Alert
  },
data(){
return{
isOpened:false,
isPasswordShown:false,
 showAlert:false,
        alertType:'',
        message:'',
        language:{},
        loading:false,
}
},
created(){
window.emitter.on('showDeleteLanguageModal',(result)=>{
this.isOpened=result.status
console.log(result.language);
this.language = result.language
})
},
methods:{
cancel(){
this.isOpened=false
},


 deleteLanguage(){
 this.loading=true
  axios
          .delete(
            `${baseURL}deleteLanguage/${this.language?.id}`,config
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
      setTimeout(()=>{
      this.showAlert=false
      },2000)
this.isOpened=false
    }
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
 },
}
}
</script>

<style scoped>
.deleteLanguageModal-enter-from,.deleteLanguageModal-leave-to{
opacity:0;
transform:scale(0.1)
}

.deleteLanguageModal-enter-active,.deleteLanguageModal-leave-active{
transition:all 0.3s ease
}
.deleteContainer-enter-from,.deleteContainer-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.deleteContainer-enter-active,.deleteContainer-leave-active{
  transition: all 0.2s ease 1s;
}
</style>