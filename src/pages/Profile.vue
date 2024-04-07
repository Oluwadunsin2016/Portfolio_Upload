<template>
  <div class="lg:w-[70%] my-4 mx-4 lg:mx-auto">
    <div
      class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
    >
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-xl">Profile Information</h1>
          <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
            Update your profile information to your preferred one.
          </p>
        </div>
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          class="text-lg cursor-pointer"
          v-if="!profileEditMode"
          @click="profileEdit"
        />
      </div>
      <div
        class="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 my-4"
      >
        <div class="h-[12rem] w-[12rem] mx-4 md:mx-0 cursor-pointer relative rounded-lg group">
          <div
            class="absolute bg-black bg-opacity-50 top-0 left-0 h-full w-full rounded-lg hidden group-hover:inline-flex justify-center items-center transition-all"
            @click="handleSelectProfileImg"
          >
            <font-awesome-icon
              :icon="['fas', 'camera-retro']"
              class="text-2xl text-gray-200"
            />
          </div>
          <img
            :src="`${currentUser?.profileImage ? `${profileDir}${currentUser?.profileImage}`: profileImage}`"
            alt="profileImg"
            class="rounded-lg object-cover object-top w-full h-full z-0"
          />
          <input
            type="file"
            class="hidden"
            ref="selectProfile"
            @change="convertToBase64"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label
              for="firstname"
              class="block text-gray-500 dark:text-gray-200"
              >First Name</label
            >
            <input
              type="text"
              :disabled="!profileEditMode"
              v-model="currentUser.firstName"
              @blur="validateFirstName"
              name="firstname"
              :class="{
                'border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm': true,
                inputError: error.firstName,
                'border-gray-300': !error.firstName,
              }"
            />
            <small class="text-xs errorMessage">{{
              errorMessage.firstName
            }}</small>
          </div>
          <div>
            <label for="lastname" class="block text-gray-500 dark:text-gray-200"
              >Last Name</label
            >
            <input
              type="text"
              :disabled="!profileEditMode"
              v-model="currentUser.lastName"
              @blur="validateLastName"
              name="lastname"
              :class="{
                'border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm': true,
                inputError: error.lastName,
                'border-gray-300': !error.lastName,
              }"
            />
            <small class="text-xs errorMessage">{{
              errorMessage.lastName
            }}</small>
          </div>
          <div>
            <label for="email" class="block text-gray-500 dark:text-gray-200"
              >Email Address</label
            >
            <input
              type="email"
              :disabled="!profileEditMode"
              v-model="currentUser.email"
              @blur="validateEmail"
              name="email"
              :class="{
                'border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm': true,
                inputError: error.email,
                'border-gray-300': !error.email,
              }"
            />
            <small class="text-xs errorMessage">{{ errorMessage.email }}</small>
          </div>
          <div>
            <label
              for="phone_number"
              class="block text-gray-500 dark:text-gray-200"
              >Phone Number</label
            >
            <input
              type="tel"
              :disabled="!profileEditMode"
              v-model="currentUser.phone_number"
              @blur="validatePhoneNumber"
              name="phone_number"
              :class="{
                'border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm': true,
                inputError: error.phone_number,
                'border-gray-300': !error.phone_number,
              }"
            />
            <small class="text-xs errorMessage">{{
              errorMessage.phone_number
            }}</small>
          </div>
          <div class="md:col-span-2">
            <label for="address" class="block text-gray-500 dark:text-gray-200"
              >Address</label
            >
            <input
              type="text"
              :disabled="!profileEditMode"
              v-model="currentUser.address"
              @blur="validateAddress"
              name="address"
              :class="{
                'border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm': true,
                inputError: error.address,
                'border-gray-300': !error.address,
              }"
            />
            <small class="text-xs errorMessage">{{
              errorMessage.address
            }}</small>
          </div>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-4" v-if="profileEditMode">
      <button class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150" @click="cancelProfileEdit">Cancel</button>
        <button
          class="flex items-center justify-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disable"
          @click="saveProfileInfo"
          :disabled="hasError"
        >
                  <p v-if="profileSaving" class="flex items-center justify-center">
        <span>Saving</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Save</span>
        </button>
      </div>
    </div>

    <div
      class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
    >
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-xl">About Information</h1>
          <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
            Update information about yourself
          </p>
        </div>
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          class="text-lg cursor-pointer"
          v-if="!aboutEditMode"
          @click="aboutEdit"
        />
      </div>

      <div class="my-4">
        <textarea
          name="aboutMe"
          id=""
          rows="5"
          v-model="currentUser.self_description"
          :disabled="!aboutEditMode"
          class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm"
        ></textarea>
      </div>
      <div class="my-4">
        <label for="image" class="block text-gray-500 dark:text-gray-200"
          >Update your CV</label
        >
        <input
          type="file"
          name="image"
          id="file"
          ref="cvFile"
          @change="selectCV"
          :disabled="!aboutEditMode"
          class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
        />
      </div>
      <div class="mt-4 flex justify-end gap-4" v-if="aboutEditMode">
      <button class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150" @click="cancelAboutEdit">Cancel</button>
        <button
          class="flex items-center justify-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disable"
          @click="saveAboutInfo"
        >
          
                  <p v-if="aboutSaving" class="flex items-center justify-center">
        <span>Saving</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Save</span>
        </button>
      </div>
    </div>

    <div
      class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
    >
      <div class="mb-4">
        <h1 class="text-lg">Update Password</h1>
        <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div class="relative cursor-pointer md:col-span-2">
          <div
            class="absolute right-4 top-[34px] text-gray-500"
            @click="showCurrent"
          >
            <font-awesome-icon v-if="isCurrentShown" icon="eye" />
            <font-awesome-icon v-if="!isCurrentShown" icon="eye-slash" />
          </div>
          <label for="current" class="block text-gray-500 dark:text-gray-200"
            >Current Password</label
          >
          <input
            type="password"
            id="current"
            v-model="changePassword.current"
            name="current"
            class="border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            autocomplete="new-password"
          />
        </div>
        <div class="relative cursor-pointer">
          <div
            class="absolute right-4 top-[34px] text-gray-500"
            @click="showNew"
          >
            <font-awesome-icon v-if="isNewShown" icon="eye" />
            <font-awesome-icon v-if="!isNewShown" icon="eye-slash" />
          </div>
          <label for="new" class="block text-gray-500 dark:text-gray-200"
            >New Password</label
          >
          <input
            type="password"
            id="new"
            v-model="changePassword.password"
            @blur="validatePassword"
            name="password"
            :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm
              ${error.password?'inputError':'border-gray-300'}`"
            autocomplete="new-password"
          />
          <small class="text-xs errorMessage">{{
            errorMessage.password
          }}</small>
        </div>
        <div class="relative cursor-pointer">
          <div
            class="absolute right-4 top-[34px] text-gray-500"
            @click="showConfirm"
          >
            <font-awesome-icon v-if="isConfirmShown" icon="eye" />
            <font-awesome-icon v-if="!isConfirmShown" icon="eye-slash" />
          </div>
          <label
            for="confirmPassword"
            class="block text-gray-500 dark:text-gray-200"
            >Confirm Password</label
          >
          <input
            type="password"
            v-model="changePassword.confirmPassword"
            @blur="validateConfirmPassword"
            id="confirm"
            name="comfirmPassword"
            :class="`border bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm
              ${error.confirmPassword?'inputError':'border-gray-300'}`"
            autocomplete="new-password"
          />
          <small class="text-xs errorMessage">{{
            errorMessage.confirmPassword
          }}</small>
        </div>
      </div>

      <div class="mt-4 flex justify-end">
        <button
          class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disable"
          :disabled="passwordInfoHasError"
          @click="updatePassword"
        >
                     <p v-if="passwordSaving" class="flex items-center justify-center">
        <span>Saving</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Save</span>
        </button>
      </div>
    </div>
    <div
      class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
    >
      <div class="mb-4">
        <h1 class="text-lg">Delete Account</h1>
        <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
          @click="showDeleteModal"
        >
          Delete Account
        </button>
      </div>
    </div>
<Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
<transition name="deleteModal">
    <DeleteModal />
</transition>
  </div>
</template>

<script>
import axios from "axios";
import profileImage from "../assets/images/defaultImg.jpg";
import { baseURL, config,profileDir, userId } from "@/main";
import DeleteModal from "../components/DeleteModal.vue";
import Alert from '../components/Alert.vue'
export default {
  components: {
    DeleteModal,
    Alert,
  },
  data() {
    return {
    profileDir,
      profileEditMode: false,
      aboutEditMode: false,
      profileImage,
      isCurrentShown: false,
      isNewShown: false,
      isConfirmShown: false,
       showAlert:false,
       profileSaving:false,
       aboutSaving:false,
       passwordSaving:false,
        alertType:'',
        message:'',
      myCV: "",
       expertise: {
        },
      currentUser: {},
      changePassword: {
        current: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage: {
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        address: "",
        current: "",
        password: "",
        confirmPassword: "",
      },
      error: {
        firstName: false,
        lastName: false,
        email: false,
        phone_number: false,
        address: false,
        current: false,
        password: false,
        confirmPassword: false,
      },
      regex: {
        email: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        phone_number: /^0[7-9]{1}[0-1]{1}[0-9]{8}$/,
        password:
          /^(?=.*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\]\[:;<>,.?~\\-]).{8,}$/,
      },
    };
  },
  mounted() {
    axios
      .get(`${baseURL}getUser`, config)
      .then((res) => {
        this.currentUser = res.data;
        console.log(res.data.info_token);
        window.emitter.emit('user_token',res.data.info_token)
        window.user_token=res.data.info_token
      })
      .catch((err) => {
        console.log(err.message);
      });

         axios
      .get(`${baseURL}getExpertiseInformation/${userId}`)
      .then((res) => {
        console.log(res.data);
        this.expertise=res.data
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  computed: {
    currentUserInfoHasError() {
      if (
        this.error.firstName ||
        this.error.lastName ||
        this.error.email ||
        this.error.phone_number ||
        this.error.address||
        this.currentUser.firstName ==''||
        this.currentUser.lastName ==''||
        this.currentUser.email ==''||
        this.currentUser.phone_number ==''||
        this.currentUser.address==''
      ) {
        return true;
      } else {
        return false;
      }
    },
    passwordInfoHasError() {
      if (this.error.password || this.error.confirmPassword||this.changePassword.password==''||this.changePassword.confirmPassword=='') {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    showCurrent() {
      if (this.isCurrentShown) {
        this.isCurrentShown = false;
        document.getElementById("current").type = "password";
      } else {
        this.isCurrentShown = true;
        document.getElementById("current").type = "text";
      }
    },
    showNew() {
      if (this.isNewShown) {
        this.isNewShown = false;
        document.getElementById("new").type = "password";
      } else {
        this.isNewShown = true;
        document.getElementById("new").type = "text";
      }
    },
    showConfirm() {
      if (this.isConfirmShown) {
        this.isConfirmShown = false;
        document.getElementById("confirm").type = "password";
      } else {
        this.isConfirmShown = true;
        document.getElementById("confirm").type = "text";
      }
    },

    profileEdit() {
      this.profileEditMode = true;
      this.$refs.firstName.focus();
    },
    cancelProfileEdit() {
      this.profileEditMode = false;
    },
    aboutEdit() {
      this.aboutEditMode = true;
    },
    cancelAboutEdit() {
      this.aboutEditMode = false;
    },



    showDeleteModal() {
    window.emitter.emit('showDeleteModal',true)
    },

    //validate first name
    validateFirstName() {
      if (this.currentUser.firstName == "") {
        this.error.firstName = true;
        this.errorMessage.firstName = "First name is required";
      } else if (this.currentUser.firstName.length < 3) {
        this.error.firstName = true;
        this.errorMessage.firstName =
          "First name should be at least three characters";
        this.errorMessage.firstName =
          "First name should be at least three characters";
      } else if (this.currentUser.firstName.length > 15) {
        this.error.firstName = true;
        this.errorMessage.firstName =
          "First name should not be more fifteen characters";
      } else {
        this.error.firstName = false;
        this.errorMessage.firstName = "";
      }
    },

    //validate last name
    validateLastName() {
      if (this.currentUser.lastName == "") {
        this.error.lastName = true;
        this.errorMessage.lastName = "Last name is required";
      } else if (this.currentUser.lastName.length < 3) {
        this.error.lastName = true;
        this.errorMessage.lastName =
          "Last name should be at least three characters";
        this.errorMessage.lastName =
          "Last name should be at least three characters";
      } else if (this.currentUser.lastName.length > 15) {
        this.error.lastName = true;
        this.errorMessage.lastName =
          "Last name should not be more fifteen characters";
      } else {
        this.error.lastName = false;
        this.errorMessage.lastName = "";
      }
    },
    //validate email
    validateEmail() {
      if (this.currentUser.email == "") {
        this.error.email = true;
        this.errorMessage.email = "Email is required";
      } else if (!this.regex.email.test(this.currentUser.email)) {
        this.error.email = true;
        this.errorMessage.email =
          "Email should follow this format: test@gmail.com";
      } else {
        this.error.email = false;
        this.errorMessage.email = "";
      }
    },
    //validate phone_number
    validatePhoneNumber() {
      if (this.currentUser.phone_number == "") {
        this.error.phone_number = true;
        this.errorMessage.phone_number = "Phone number is required";
      } else if (!this.regex.phone_number.test(this.currentUser.phone_number)) {
        this.error.phone_number = true;
        this.errorMessage.phone_number =
          "Phone number should follow this format: 08043786543";
      } else {
        this.error.phone_number = false;
        this.errorMessage.phone_number = "";
      }
    },
    //validate address
    validateAddress() {
      if (this.currentUser.address == "") {
        this.error.address = true;
        this.errorMessage.address = "Address is required";
      } else {
        this.error.address = false;
        this.errorMessage.address = "";
      }
    },
    //validate password
    validatePassword() {
      if (this.changePassword.password == "") {
        this.error.password = true;
        this.errorMessage.password = "Password is required";
      } else if (!this.regex.password.test(this.changePassword.password)) {
        this.error.password = true;
        this.errorMessage.password =
          "Password should include at least one upper case, two lower case, one special character,one digit and must be at least eight characters long";
      } else {
        this.error.password = false;
        this.errorMessage.password = "";
      }
    },
    //validate confirm password
    validateConfirmPassword() {
      if (
        this.changePassword.confirmPassword !== this.changePassword.password
      ) {
        this.error.confirmPassword = true;
        this.errorMessage.confirmPassword = "password doesn't match";
      } else {
        this.error.confirmPassword = false;
        this.errorMessage.confirmPassword = "";
      }
    },

    // Selecting your CV
    selectCV(e) {
      this.myCV = e.target.files[0];
    },

    // Updating profile information
    saveProfileInfo() {
    this.profileSaving=true
      axios
        .post(`${baseURL}updateUser`, this.currentUser, config)
        .then((res) => {
          console.log(res.data);
          this.profileEditMode = false;
          this.profileSaving=false
             if(!res.data.error){
           this.currentUser=res.data.user
           this.message=res.data.message
      this.alertType='success'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
          }else{
            this.message=res.data.message
      this.alertType='error'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
          }
        })
        .catch((err) => {
        this.profileSaving=false
          console.log("Error:", err);
          if (err.response) {
            console.log("Error details:", err.response.data);
          }
        });
    },
    // Updating about information
    saveAboutInfo() {
      if (this.currentUser.self_description != "") {
      this.aboutSaving=true
        axios
          .post(
            `${baseURL}selfDescription`,
            { selfDescription: this.currentUser.self_description },
            config
          )
          .then((res) => {
            console.log(res.data);
            this.aboutSaving=false
            this.aboutEditMode = false;
               if(!res.data.error){
           this.message=res.data.message
      this.alertType='success'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
          }else{
            this.message=res.data.message
      this.alertType='error'
        this.showAlert=true
      setTimeout(()=>{
      this.showAlert=false
      },2000)
          }
          })
          .catch((err) => {
          this.aboutSaving=false
            console.log(err.message);
          });
      }

      if (this.myCV != "") {
        const formData=new FormData();
        formData.append('myCV', this.myCV);
        this.aboutSaving=true
        axios
            .post(`${baseURL}uploadCV`, formData,config)
            .then((res) => {
              console.log(res.data);
              this.aboutSaving=false
              this.aboutEditMode = false;
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
    }
              this.$refs.cvFile.value = "";
              this.myCV=''
            })
            .catch((err) => {
            this.aboutSaving=false
              console.log(err.message);
            });
      }
    },
   

    // Update Profile Image
    handleSelectProfileImg() {
      this.$refs.selectProfile.click();
    },

   convertToBase64(e) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.uploadProfileImg(fileReader.result)
      };
      fileReader.readAsDataURL(file);
    },

  uploadProfileImg(base64) {
      const formData =new FormData();
      formData.append("profileImage",base64);
      console.log(base64);
      axios
        .post(
          `${baseURL}updateProfileImage`,
          formData,
          config,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              this.uploadProgress = percentCompleted;
              console.log(percentCompleted);
            },
          },
        )
        .then((res) => {
          console.log(res.data);
          if(!res.data.error){
           this.message=res.data.message
           this.currentUser=res.data.user
      this.alertType='success'
        this.showAlert=true
        this.changePassword={
        current:'',
        password:'',
        confirmPassword:''
        }
      setTimeout(()=>{
      this.showAlert=false
      },2000)
          }
         
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
 

 updatePassword(){
console.log({old_password:this.changePassword.current,new_password:this.changePassword.password})
this.passwordSaving=true
  axios
          .post(
            `${baseURL}updatePassword`,
            {old_password:this.changePassword.current,new_password:this.changePassword.password},
            config
          )
          .then((res) => {
            console.log(res.data);
            this.passwordSaving=false
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
        this.changePassword={
        current:'',
        password:'',
        confirmPassword:''
        }
      setTimeout(()=>{
      this.showAlert=false
      },2000)
    }
          })
          .catch((err) => {
          this.passwordSaving=false
            console.log(err.message);
          });
 },

  },
};
</script>

<style scoped>
.errorMessage {
  color: rgb(236, 7, 7);
}
.inputError {
  border-color: rgb(236, 7, 7);
}

.deleteModal-enter-from,.deleteModal-leave-to{
opacity:0;
transform:scale(0.1)
}

.deleteModal-enter-active,.deleteModal-leave-active{
transition:all 0.3s ease
}
</style>
