<template>
  <!-- This the verify page -->
  <div class="h-screen w-full p-4 bg-gray-400 dark:bg-gray-700 bg-opacity-90 transition-all ease-in-out flex justify-center items-center">
  <!-- <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" height="20rem" width="20rem" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#e5e7eb"></stop><stop offset=".3" stop-color="#e5e7eb" stop-opacity=".9"></stop><stop offset=".6" stop-color="#e5e7eb" stop-opacity=".6"></stop><stop offset=".8" stop-color="#e5e7eb" stop-opacity=".3"></stop><stop offset="1" stop-color="#e5e7eb" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#e5e7eb" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg> -->


  <div v-if="loading" class="md:w-[40%] bg-white shadow-md flex flex-col gap-2 p-4 items-center justify-center">
 <svg xmlns="http://www.w3.org/2000/svg" height="10rem" width="10rem" viewBox="0 0 200 200"><linearGradient id="a12"><stop offset="0" stop-color="#D3E3FD" stop-opacity="0"></stop><stop offset="1" stop-color="#D3E3FD"></stop></linearGradient><circle fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>
  </div>
  <div v-else class="md:w-[40%] bg-white shadow-md flex flex-col gap-2 p-4 items-center justify-center">
  <font-awesome-icon class="text-5xl" :color="color" :icon="icon" />
  <p class="text-medium text-gray-700">{{message}}</p>
  </div>
  </div>
</template>

<script>
import { baseURL } from '@/main';
import axios from 'axios';

export default {

data() {
  return {
    loading: true,
    message:'',
    color:'',
    icon:'',
  }
},

mounted(){
const token = this.$route.params.token;
console.log(token);
axios
        .post(`${baseURL}verifyEmail/${token}`,)
        .then((res) => {
          console.log(res.data);
             if(!res.data.error){
      this.message=res.data.message
      this.color='green'
      this.icon=['fas', 'circle-check']
      this.loading=false
      setTimeout(()=>{
this.$router.push('/login')
      },3000)
          }else{
      this.message=res.data.message
      this.color='red'
      this.icon=['fas', 'circle-exclamation']
      this.loading=false
           
      setTimeout(()=>{   
this.$router.push('/login')
      },3000)
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          if (err.response) {
            console.log("Error details:", err.response.data);
          }
        });
}
}
</script>

<style>

</style>