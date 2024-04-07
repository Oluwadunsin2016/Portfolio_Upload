<template>
  <ul
    class="shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 flex justify-between px-6 py-4 relative"
  >
    <a href="/">Dashboard</a>
    <button class="flex items-center justify-end w-[40%] gap-6" @click="handleDropDown">
      <span class="capitalize overflow-hidden whitespace-nowrap text-ellipsis" id="ProfileName"
        >{{currentUser?.firstName&&subStringProfileName}}</span>
      <font-awesome-icon :icon="['fas', 'caret-down']" />
    </button>

    <div
      :class="`absolute w-[10rem] divide-y dropdown top-12 py-2 divide-gray-100 rounded-md border-gray-100 bg-slate-100 dark:bg-gray-700  shadow-md right-4 z-[999] ${!isOpen&&'hidden'}`"
      role="menu"
    >
      <ul className="px-2 leading-8">
        <li
          class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 px-2 rounded"
        >
          <a href="/profile">profile</a>
        </li>
        <li
          class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 px-2 rounded"
        >
          <a href="/preview">Preview</a>
        </li>
        <li
          class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 px-2 rounded"
          @click="logout"
        >
          Logout
        </li>
      </ul>
   
    </div>
  </ul>
<Loader/>
</template>

<script>
import { baseURL, config } from "@/main";
import axios from "axios";
import { mapActions } from "vuex";
import router from "@/router";
import Loader from "./Loader.vue";

export default {
components:{
Loader
},
  data() {
    return {
      isOpen: false,
      currentUser: {},
      testingEmitter:{
      name:'John Adeoye',
      age:20,
      profession:'Web development',
      }
    };
  },
  created(){
window.emitter.on('setDropDown',(status)=>{
this.isOpen=status
})
},
  mounted() {
  window.emitter.emit("changeLoaderStatus", true);
setTimeout(()=>{
    axios
      .get(`${baseURL}getUser`, config)
      .then((res) => {
        this.currentUser = res.data;
        window.emitter.emit("changeLoaderStatus", false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message == "Unauthenticated.") {
         this.$store.dispatch('logout')
        }
      });
},2000)
  },
  computed: {
    subStringProfileName() {
    const name=`${this.currentUser?.firstName} ${ this.currentUser?.lastName }`;
    const container=document.getElementById('ProfileName')
      if (container.scrollWidth > container.clientWidth) {
    return name.substring(0, name.length - 3) + '...';
  } else {
    return name;
  }
    },
  },
  methods: {
    handleDropDown() {
        this.isOpen = !this.isOpen;
    // if (this.isOpen) {
    // console.log("I'm seen");
    //     document.removeEventListener("click", this.closeDropdownOutside);
    // } else {
    // console.log("I'm not seen"); 
    //     document.addEventListener("click", this.closeDropdownOutside);
    // }
    },

    // closeDropdownOutside(event) {
    //   if (!this.$el.contains(event.target)) {
    //     this.handleDropDown();
    //   }
    // },

    ...mapActions(["logout"]),
  },
};
</script>

<style scoped>
.dropdown {
  animation: slideDown 0.3s ease-in-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    top: 0;
  }
  to {
    opacity: 1;
    top: 3rem;
  }
}
</style>
