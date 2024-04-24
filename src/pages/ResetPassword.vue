<template>
  <div
    class="h-[100vh] flex justify-center items-center"
  >
    <div
      class="relative overflow-hidden min-h-[15rem] sm:w-[60%] md:w-[40%] p-4 md:p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md mx-4"
    >
      <div v-if="isDone" class="bg-gray-400 dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-80 transition-all ease-in-out absolute top-0 left-0 w-full h-full flex p-4 items-center justify-center">
 <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" height="4rem" width="4rem" viewBox="0 0 200 200"><linearGradient id="a12"><stop offset="0" stop-color="#D3E3FD" stop-opacity="0"></stop><stop offset="1" stop-color="#D3E3FD"></stop></linearGradient><circle fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>

  <div v-else class="flex flex-col gap-2 items-center justify-center">
  <font-awesome-icon class="text-4xl" color="green" icon="circle-check" />
  <p class="text-medium">verified</p>
  </div>
    </div>
      <div v-else class="mb-4">
        <p class="my-1 text-center text-gray-600 dark:text-gray-400">
          Enter the 4 digits codes sent to your email
        </p>
        <div>
          <div class="flex items-center gap-4 justify-center my-4">
            <input
              :class="`no-spinner border text-center text-lg font-medium bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-4 shadow-sm`"
              v-for="(digit, i) in digits"
              :key="i"
      v-model="digits[i]"
      type="number"
      @input="handleInput(i)"
      :ref="'input' + i"
            />
          </div>
        </div>
        <button v-if="expired" class="cursor-pointer text-gray-600 dark:text-gray-400 underline">Send again</button>
        <p v-else>The code expires in {{countdown}}</p>
      </div>
    </div>
    <Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
  </div>
</template>

<script>
import axios from "axios";
import { baseURL, config } from "@/main";
import Alert from "../components/Alert.vue";
import router from '@/router'
export default {
  components: {
    Alert,
  },
  data() {
    return {
      isOpened: false,
      expired: false,
      loading: false,
      isDone:false,
      showAlert: false,
      alertType: "",
      message: "",
      digits: ["", "", "", ""],
      minutes: 5,
      seconds: 0,
      intervalId: null,
    };
  },
  computed: {
    countdown() {
      return `${this.minutes}:${this.seconds < 10 ? "0" : ""}${this.seconds}`;
    },

     allInputsFilled() {
      return this.digits.every(item => item !== '');
    }
  },
  mounted(){
    this.intervalId = setInterval(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        clearInterval(this.intervalId);
        this.expired=true
        console.log("finish");
        return;
      }

      if (this.seconds === 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    }, 1000);

  this.$refs['input' + 0][0].focus();
  },
  created() {
    window.emitter.on("showForgotPasswordModal", (status) => {
      this.isOpened = status;
    });
  },
  methods: {
  handleInput(index) {
      if (index < this.digits.length - 1 && this.digits[index] !== '') {
        this.$refs['input' + (index + 1)][0].focus();
      }

         if (this.digits[index] === '') {
        if (index > 0) {
          this.$refs['input' + (index - 1)][0].focus();
        }
      }

           if (this.allInputsFilled) {
        console.log({digits:[...this.digits].join('')});
        this.verify([...this.digits].join(''))
        clearInterval(this.intervalId);
        this.isDone = true;
      }
    },

    cancel() {
      this.isOpened = false;
    },

    verify(number) {
     this.loading = true;
       axios.post(`${baseURL}verifyCode`,{number}).then(res=>{
    if (!res.data.error) {
this.loading=false
      this.errorMessage=res.data.message
        this.alertType='success'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
router.push('/change-password')
      },2000)
    }else{
      this.errorMessage=res.data.message
      this.loading=false
        this.alertType='error'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
    }
    }).catch(err=>{

    console.log(err);
    if (err.response) {
      this.errorMessage=err.response.data.message
      this.loading=false
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

<style>
.no-spinner {
  /* Hide the spinner arrows */
  -moz-appearance: textfield;
  appearance: textfield;
}
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  /* Hide the spinner arrows for webkit browsers */
  -webkit-appearance: none;
  margin: 0;
}
</style>