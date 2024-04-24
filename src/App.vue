
<template>
  <div class=" dark:bg-gray-900 dark:text-gray-200 min-h-[100vh] pb-6">
   <div v-if="showIcon" class="fixed top-16 right-10 cursor-pointer z-40" @click="setDarkMode">
     <font-awesome-icon v-if="!darkMode" :icon="['fas', 'moon']" class="text-gray-500 text-3xl" />
     <font-awesome-icon v-if="darkMode" :icon="['fas', 'sun']"  class="text-gray-500 text-3xl dark:text-gray-200" />
     </div>
  <Navbar v-if="isLoggedIn"/>
  <div @click="closeDropDown">
     <router-view/>
  </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { mapState } from 'vuex';

export default {
components:{
Navbar,
},
computed:{
...mapState(['isLoggedIn'])
},
data() {
    return {
        darkMode: false,
        isOpen: false,
        showIcon: true,
    }
},
mounted(){
if (localStorage.isInDarkMode) {
  const outcome=JSON.parse(localStorage.getItem('isInDarkMode'))
            this.darkMode=outcome
 if (outcome==true) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
}

},
  created() {
    this.$router.afterEach((to, from) => {
      // Update showIcon based on the current route
      this.showIcon = to.path !== '/preview';
    });
  },
methods: {
    setDarkMode() {
        if (this.darkMode==false) {
          localStorage.setItem('isInDarkMode',JSON.stringify(true))
     const outcome=JSON.parse(localStorage.getItem('isInDarkMode'))
            this.darkMode=outcome
            document.documentElement.classList.add('dark')
        } else {
          localStorage.setItem('isInDarkMode',JSON.stringify(false))
     const outcome=JSON.parse(localStorage.getItem('isInDarkMode'))
            this.darkMode=outcome
            document.documentElement.classList.remove('dark')
        }
    },

    closeDropDown(){
     window.emitter.emit("setDropDown", false);
    }
},
}
</script>
<!-- https://porfolio-server-production.up.railway.app/
https://porfolio-server-production.up.railway.app/api/testing -->
<style>
::-webkit-scrollbar{
width:5px;
background-color:#1F2937;
}
::-webkit-scrollbar-thumb{
width:5px;
background-color:#111827;
border-radius: 5px;
}
</style>

