<template>
   <div class="fixed top-0 left-0 z-50 h-full w-full bg-gray-700 bg-opacity-90 transition-all ease-in-out flex justify-center items-center" v-if="isOpened">
   <div
        class="w-full sm:w-[80%] md:w-[60%] mt-4 p-4 md:p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md mx-4"
      >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <label for="title" class="block text-gray-500 dark:text-gray-200"
              >Title</label
            >
            <input
              type="text"
              name="title"
              v-model="project.title"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            />
          </div>
          <div>
            <label for="category" class="block text-gray-500 dark:text-gray-200"
              >Category</label
            >
            
            <select
              name="category"
              id=""
              v-model="project.category"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            >
              <option value=""></option>
              <option
                :value="specialization.profession"
                v-for="(
                  specialization, index
                ) in specializations"
                :key="index"
              >
                {{ specialization.profession }}
              </option>
            </select>
          </div>
        </div>
        <div class="my-4">
          <label for="image" class="block text-gray-500 dark:text-gray-200"
            >Display Image</label
          >
          <input
            type="file"
            name="image"
            ref="file"
            @change="selectedFile"
            class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <label for="web_link" class="block text-gray-500 dark:text-gray-200"
              >Web Link</label
            >
            <input
              type="text"
              name="web_link"
              v-model="project.web_link"
              :disabled="project.category=='Graphic Design'"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              for="github_link"
              class="block text-gray-500 dark:text-gray-200"
              >GitHub Link</label
            >
            <input
              type="text"
              name="github_link"
              v-model="project.github_link"
              :disabled="project.category=='Graphic Design'"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            />
          </div>
        </div>
        <div class="my-4">
          <label
            for="description"
            class="block text-gray-500 dark:text-gray-200"
            >Discription</label
          >
          <textarea
            name="description"
            id=""
            rows="4"
            :disabled="project.category=='Graphic Design'"
            v-model="project.description"
            class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm"
          ></textarea>
        </div>
        <div class="mt-4 flex justify-end gap-4">
        <button class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150" @click="cancel">Cancel</button>
          <button
            class="flex items-center justify-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
            @click.prevent="updateProject"
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
 specializations: [],
        alertType:'',
        message:'',
project:'',
loading:false,
}
},
created(){
window.emitter.on('showEditProjectModal',(result)=>{
this.isOpened=result.status
this.project = result.project
})

 window.emitter.on("specializations", (specializations) => {
      this.specializations = specializations;
     
    });
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
},

 selectedFile(e) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.project.image = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    },

 updateProject(){
 const formData = new FormData();
 formData.append('project', JSON.stringify(this.project))
 console.log(this.project);
 this.loading=true
  axios
              .post(`${baseURL}updateProject`, formData, config)
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
    }
                this.projects=[]
                this.project={}
                this.isOpened=false
              })
              .catch((err) => {
              this.loading=false
                console.log(err.message);
              });
 },
 deleteAccount(){
if(this.password!=''){
console.log(this.password)
  axios
          .post(
            `${baseURL}deleteAccount`,
            {password:this.password},
            config
          )
          .then((res) => {
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
            console.log(err.message);
          });
}
 },
}
}
</script>

<style>

</style>