<template>
  <div id="about" class="px-6 lg:px-8 py-8 shadow bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850">
    <h1 class="text-3xl my-3 text-center font-bold">About Me</h1>
    <div class="px-10 md:grid grid-cols-8 gap-4">
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

        <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div class="col-span-1 p-8 rounded-lg bg-white dark:bg-gray-900 dark:shadow-gray-800 dark:shadow-md shadow cursor-pointer" v-for="(_,i) in [1,2,3,]" :key="i">
            <h1 class="text-lg font-bold">Product Design</h1>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
              cupiditate at accusantium quas molestiae quibusdam, ut, impedit
              porro totam fugit sunt, quasi mollitia quod eius a? Debitis vero
              quaerat officia!
            </p>
          </div>
        </div> -->
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
