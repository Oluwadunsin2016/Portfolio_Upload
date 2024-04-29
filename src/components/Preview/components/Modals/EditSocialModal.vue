<template>
<transition name="editSocialModal">
   <div class="fixed top-0 left-0 z-50 h-full w-full bg-gray-700 bg-opacity-90 transition-all ease-in-out flex justify-center items-center" v-if="isOpened">
   <transition name="editContainer">
   <div
        class="w-full sm:w-[80%] md:w-[60%] p-4 md:p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md mx-4"
      >
     
        <div class="my-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div>
              <label
                for="whatsapp_link"
                class="block text-gray-500 dark:text-gray-200"
                >WhatsApp Link</label
              >
              <input
                type="text"
                name="whatsapp_link"
                v-model="social_information.whatsapp"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
            <div>
              <label
                for="facebook_link"
                class="block text-gray-500 dark:text-gray-200"
                >Facebook Link</label
              >
              <input
                type="text"
                name="facebook_link"
                v-model="social_information.facebook"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div>
              <label
                for="instagram_link"
                class="block text-gray-500 dark:text-gray-200"
                >Instagram Link</label
              >
              <input
                type="text"
                name="instagram_link"
                v-model="social_information.instagram"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
            <div>
              <label
                for="twitter_link"
                class="block text-gray-500 dark:text-gray-200"
                >Twitter Link</label
              >
              <input
                type="text"
                name="twitter_link"
                v-model="social_information.twitter"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div>
              <label
                for="linkedIn_link"
                class="block text-gray-500 dark:text-gray-200"
                >LinkedIn Link</label
              >
              <input
                type="text"
                name="linkedIn_link"
                v-model="social_information.linkedin"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
            <div>
              <label
                for="telegram_link"
                class="block text-gray-500 dark:text-gray-200"
                >Telegram Link</label
              >
              <input
                type="text"
                name="telegram_link"
                v-model="social_information.telegram"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-4">
        <button class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150" @click="cancel">Cancel</button>
          <button
            class="flex items-center justify-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
            @click.prevent="updateSocialInformation"
          >
                         <p v-if="loading" class="flex items-center justify-center">
        <span>Updating</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Update</span>
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
import Alert from '../Alert.vue'
export default {
  components: {
    Alert
  },
data(){
return{
isOpened:false,
isPasswordShown:false,
social_information:{},
 showAlert:false,
        alertType:'',
        message:'',
        language:'',
        loading:false,
}
},
created(){

window.emitter.on('showEditSocialModal',(result)=>{
this.isOpened=result.status
console.log(result.information);
this.social_information = result.information
})
},
methods:{
cancel(){
this.isOpened=false
},


 updateSocialInformation(){
 this.loading=true
  axios
              .post(`${baseURL}updateSocialInformation`, this.social_information, config)
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
                this.social_information={}
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
.editSocialModal-enter-from,.editSocialModal-leave-to{
opacity:0;
transform:scale(0.1)
}

.editSocialModal-enter-active,.editSocialModal-leave-active{
transition:all 0.3s ease
}
.editContainer-enter-from,.editContainer-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.editContainer-enter-active,.editContainer-leave-active{
  transition: all 0.2s ease 1s;
}
</style>