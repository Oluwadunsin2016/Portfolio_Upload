<template>
  <div
    class="my-10 px-4 mt-12 lg:px-8 py-[3rem] md:flex flex-row-reverse shadow bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850"
    id="home"
  >
  <ProfileImage :profilePicture="user?.profileImage??defaultImg" />
    <div class="w-full md:w-[80%] lg:w-[60%] mt-4 md:mx-10 px-5">
      <p class="font-semibold text-2xl">
        Hi, I'm <span class="text-blue-500">{{user?.lastName}}</span>
      </p>
      <h1 id="writer" class="text-3xl font-bold my-2"></h1>
      <p class="my-4 text-lg">
        I have a great passion for working with wonderful team in creating beautiful, intuitive, and accessible experiences. Find some of my projects below.
      </p>

      <div class="flex gap-10 mt-10">
      <a href="https://meet.google.com/" class="bg-blue-500 rounded text-white py-2 px-4 hover:bg-blue-700">Book a Meeting</a>
      <button @click="downloadCV" class="border-2 border-blue-700 rounded py-2 px-4 hover:bg-blue-700 hover:text-white">Download CV</button>
      </div>   
    </div>
  </div>
  <Loader/>
   <Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
</template>

<script>

import Typewriter from 'typewriter-effect/dist/core';
import ProfileImage from './ProfileImage.vue';
import defaultImg from '../../../assets/images/defaultImg.jpg'
import Alert from './Alert.vue'
import axios from 'axios';
import Loader from "./Loader.vue";
import { watch } from 'vue';
import { baseURL } from '@/main';
export default {
  name: "Hero",
  props: {
    user: Object,
  },
  components:{
  ProfileImage,
      Loader,
      Alert
  },
  data() {
    return {
      defaultImg,
        showAlert:false,
        alertType:'',
        message:'',
      specializations:[],
      currentUser: {},
      user_token:'',
    };
  },
  mounted(){
     console.log(this.user);
   window.emitter.emit("changeLoaderStatus", true);
     watch(this.specializations,()=>{
     console.log(this.user);
const write=document.getElementById('writer')
new Typewriter(write, {
  strings: this.specializations,
  autoStart: true,
  loop: true,
});
  })
     console.log(this.user);

    window.emitter.on('user_token',(token)=>{
  this.user_token=token
  })

// Getting area of specializations
    axios
      .get(`${baseURL}getWorkInformation/${this.user.info_token}`)
      .then((res) => {
      window.emitter.emit('work_information',res.data)
      console.log(res.data);
      window.emitter.emit('specializations',res.data)
res.data.forEach(specialization => {
  this.specializations.push(specialization.professional)
});
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  computed: {
  },

  methods: {
    downloadCV() {
    axios.get(`${baseURL}download-pdf/${this.user.info_token}`).then(res=>{
    if (res.data.error) {
            this.message=res.data.message
      this.alertType='error'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
    }
    })
    },
  },
};
</script>

<style scoped>

</style>
