<template>
  <div id="about" class="px-4 lg:px-8 py-8 shadow bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850">
    <h1 class="text-3xl my-3 text-center font-bold">About Me</h1>
    <div class="px-4 md:px-10 md:grid grid-cols-8 gap-4">
      <div class="col-span-2 flex items-center md:flex-col gap-5">
        <h1 class="text-9xl font-bold m-0">{{yearOfExperience}}</h1>
        <p class="text-xl font-bold m-0">
          Years <br />
          Working <br />
          Experience
        </p>
      </div>

      <div class="col-span-6">
        <p>
          {{user?.self_description}}
        </p>

        <p class="font-bold my-4"><a :href="`mailto:${user?.email}`">{{ user?.email }}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL, } from '@/main';
import axios from 'axios';


export default {
  name: "About",
  data() {
    return {
      yearOfExperience: '',
      user_token:''
    }
  },
 props: {
    user: Object,
  },
  mounted() {
  window.emitter.on('user_token',()=>{
  user_token=token
  })
   axios
      .get(`${baseURL}getExpertiseInformation/${this.user.info_token}`)
      .then((res) => {
        console.log(res.data);
        this.yearOfExperience= res?.data.year_of_experience
        window.emitter.emit('expertiseInformation',res.data)
        console.log(this.yearOfExperience);
      })
      .catch((err) => {
        console.log(err.message);
      });
  window.emitter.on('current_user',(user_info)=>{
  this.user=user_info
  })
  },
};
</script>

<style scope>
</style>
