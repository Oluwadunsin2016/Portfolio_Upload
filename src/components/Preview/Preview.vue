<template>
 <div class="dark:bg-gray-900 bg-gray-50 dark:text-gray-200">
  <Navbar/>
  <div v-if="show" class="fixed top-[6rem] z-50 w-full text-center px-6">
    <div class="relative inline-block">
    <font-awesome-icon
              class="ms-4 text-xs cursor-pointer absolute -top-5 -right-5"
              icon="x"
              @click="hide"
            />
  <p class="border border-yellow-700 text-yellow-700 inline-block mx-auto p-2 rounded bg-yellow-200">The link to your portfolio has been sent to your email, feel free to share it to your employer</p>
    </div>
  </div>
  <Hero v-if="Object.keys(currentUser).length !== 0" :user="currentUser"/>
  <About v-if="Object.keys(currentUser).length !== 0" :user="currentUser"/>
  <Languages v-if="Object.keys(currentUser).length !== 0" :user="currentUser"/>
  <Services v-if="Object.keys(currentUser).length !== 0" :user="currentUser"/>
  <Projects v-if="Object.keys(currentUser).length !== 0" :user="currentUser"/>
  <Contact v-if="Object.keys(currentUser).length !== 0" :user="currentUser"/>
  <Footer v-if="Object.keys(currentUser).length !== 0" :user="currentUser"/>
 </div>
</template>

<script>
import axios from "axios";
import { baseURL, config, } from "@/main";
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import About from "./components/About.vue";
import Languages from "./components/Languages.vue";
import Services from "./components/Services.vue";
import Projects from "./components/Projects.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "Preview",
  data() {
    return {
      currentUser: '',
      show:true
    }
  },
  components: {
    Navbar,
    Hero,
    About,
    Languages,
    Services,
    Projects,
    Contact,
    Footer,
  },
  mounted(){
   axios
      .get(`${baseURL}getUser`, config)
      .then((res) => {
        this.currentUser = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  

  console.log(window.emitter)
  },
  methods: {
    hide() {
      this.show=false
    },
  },
};
</script>

<style>
*{
scroll-behavior: smooth !important;
}
</style>
