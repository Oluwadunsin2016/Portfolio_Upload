<template>
  <div id="languages" class="px-6 lg:px-8 py-8">
   <DeleteLanguageModal />
    <EditLanguageModal />
    <h1 class="text-center text-3xl font-bold">Programming Languages</h1>
    <div class="flex justify-center items-center flex-wrap gap-6 mt-8 px-4 md:px-6">
     <div class="relative cursor-pointer group" v-for="(language,i) in languages" :key="i" :id="getLanguage(language?.name)?.id" @click="viewActions(language?.name)">
     <p :class="`bg-slate-200 absolute -top-8 dark:bg-gray-700 py-1 px-2 rounded-lg hidden group-hover:inline`">{{ language?.name }}</p>
<transition name="actions" mode="out-in" >
<div v-if="currentName==language?.name" class="absolute !-top-[6rem] bg-slate-200 dark:bg-gray-700 p-2 flex flex-col justify-center items-center gap-2 rounded">
<a :href="getLanguage(language?.name)?.url">
<Icon :title="'Website'" :color="'white'" :size="18" />
</a>
<button @click="editLanguage(language,$event)">
<Icon :title="'Edit'" :color="'#2196F3'" :size="25" />
</button>
<button @click="deleteLanguage(language,$event)">
<Icon :title="'Delete'" :color="'red'" :size="25"  />
</button>
</div>
</transition>
     <Icon :title="language?.name" :color="getLanguage(language?.name)?.color" :size="getLanguage(language?.name)?.size" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Icon from './Icon.vue'
import { baseURL, } from '@/main';
import DeleteLanguageModal from './Modals/DeleteLanguageModal.vue';
import EditLanguageModal from './Modals/EditLanguageModal.vue';
export default {
components:{
Icon,
DeleteLanguageModal,
EditLanguageModal
},
 props: {
    user: Object,
  },
data() {
  return {
    languages: [],
    currentName: '',
  }
},

computed:{

},

mounted(){

 axios
      .get(`${baseURL}getLanguages/${this.user.info_token}`)
      .then((res) => {
        console.log(res.data);
        this.languages= res?.data
        console.log(this.languages);
      })
      .catch((err) => {
        console.log(err.message);
      });
},
methods: {
getLanguage(name){
if(name=="HTML"){
return {id:name,url:"https://www.w3schools.com/html/html_intro.asp",color:'#E5532D', size:50}
}
else if(name=="CSS"){
return {id:name,url:"https://developer.mozilla.org/en-US/docs/Web/CSS",color:'#0852E9', size:50}
}
else if(name=="Sass"){
return {id:name,url:"https://sass-lang.com/",color:'#C76395', size:50}
}
else if(name=="BootStrap"){
return {id:name,url:"https://getbootstrap.com/",color:'#6F10F4', size:50}
}
else if(name=="TailwindCss"){
return {id:name,url:"https://tailwindcss.com/",color:'#0852E9', size:60}
}
else if(name=="JavaScript"){
return {id:name,url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript",color:'#E8D44D', size:50}
}
else if(name=="ReactJs"){
return {id:name,url:"https://react.dev/",size:50,color:'#00D1F7'}
}
else if(name=="Angular"){
return {id:name,url:"https://angular.io/docs",size:50,color:'#DE0837'}
}
else if(name=="NextJs"){
return {id:name,url:"https://nextjs.org/",size:50,color:'#000000'}
}
else if(name=="Flutter"){
return {id:name,url:"https://flutter.dev/",size:50,color:'#2EB2F3'}
}
else if(name=="VueJs"){
return {id:name,url:"https://vuejs.org/",size:50,color:'#47BA87'}
}
else if(name=="Java"){
return {id:name,url:"https://www.java.com/en/",size:50,color:'#37839F'}
}
else if(name=="Svelte"){
return {id:name,url:"https://svelte.dev/",size:50,color:'#F73B00'}
}
else if(name=="Golang"){
return {id:name,url:"https://go.dev/",size:50,color:'#00A6D0'}
}
else if(name=="Gin"){
return {id:name,url:"https://gin-gonic.com/",size:50,color:'#00A6D0'}
}
else if(name=="Firebase"){
return {id:name,url:"https://firebase.google.com/", size:50,color:'#F7C427'}
}
else if(name=="NodeJs"){
return {id:name,url:"https://expressjs.com/",size:50,color:'#5BA74C'}
}
else if(name=="PHP"){
return {id:name,url:"#",size:50,color:'#7277AD'}
}
else if(name=="Laravel"){
return {id:name,url:"https://laravel.com/",size:50,color:'#DE0837'}
}
else if(name=="Django"){
return {id:name,url:"https://www.djangoproject.com/",size:50,color:'#0A2D1F'}
}
else if(name=="Python"){
return {id:name,url:"https://www.python.org/",size:50,color:'#F7E06E'}
}
},

viewActions(name){
if (this.currentName==name) {
this.currentName=''
}else{
this.currentName=name
}
},

  deleteLanguage(language,event){
    event.stopPropagation()
    window.emitter.emit('showDeleteLanguageModal',{status:true,language})
this.currentName=''
    },

  editLanguage(language,event){
    event.stopPropagation()
    window.emitter.emit('showEditLanguageModal',{status:true,language})
this.currentName=''
    },
},
};
</script>

<style scoped>
.actions-enter-from,.actions-leave-to{
opacity: 0;
transform: translateY(5);
}
/* .actions-enter-to,.actions-leave-from{
transform: translateY(-80px);
} */

.actions-enter-active,.actions-leave-active{
transition: all 0.5s ease;
}
</style>
