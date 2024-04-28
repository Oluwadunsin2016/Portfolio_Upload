<template>
  <div class="py-8 px-4">
    <h1 class="text-lg my-4 text-center">
      Create your amazing <strong>Portfolio</strong> with ease
    </h1>
    <form class="lg:w-[60%] md:w-[70%] sm:w-[80%] sm:mx-auto" @submit.prevent="uploadPortfolio">
      <!-- about information -->
      <div
        class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
      >
        <h1 class="uppercase text-lg">About Information</h1>
        <div class="my-4">
          <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
            Write about yourself
          </p>
          <textarea
            name="aboutMe"
            id=""
            rows="5"
            v-model="selfDescription"
            class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm"
          ></textarea>
        </div>
        <div class="my-4">
          <p class="block text-gray-500 dark:text-gray-200"
            >Upload your CV</p
          >
               <label
              for="cvSelectInput"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-indigo-400  p-[2px] rounded flex gap-2 items-center  cursor-pointer"
            >
              <input
                type="file"
                ref="cvFile"
                @change="selectCV"
                class="hidden"
                id="cvSelectInput"
              />
              <span
              class="inline-flex items-center px-4 py-[6px] bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 shadow-sm"
              >
                Browse
              </span>
              <span>{{myCV?.name}}</span>
            </label>
        </div>
      </div>

      <!-- social information -->
      <div
        class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
      >
        <h1 class="uppercase text-lg">Social Information</h1>
        <div class="my-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div>
              <label
                for="whatsapp_link"
                class="block text-gray-500 dark:text-gray-200"
                >WhatsApp Link</label
              >
              <input
                type="text"
                name="whatsapp_link"
                v-model="social_information.whatsapp"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
            <div>
              <label
                for="facebook_link"
                class="block text-gray-500 dark:text-gray-200"
                >Facebook Link</label
              >
              <input
                type="text"
                name="facebook_link"
                v-model="social_information.facebook"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div>
              <label
                for="instagram_link"
                class="block text-gray-500 dark:text-gray-200"
                >Instagram Link</label
              >
              <input
                type="text"
                name="instagram_link"
                v-model="social_information.instagram"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
            <div>
              <label
                for="twitter_link"
                class="block text-gray-500 dark:text-gray-200"
                >Twitter Link</label
              >
              <input
                type="text"
                name="twitter_link"
                v-model="social_information.twitter"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div>
              <label
                for="linkedIn_link"
                class="block text-gray-500 dark:text-gray-200"
                >LinkedIn Link</label
              >
              <input
                type="text"
                name="linkedIn_link"
                v-model="social_information.linkedin"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
            <div>
              <label
                for="telegram_link"
                class="block text-gray-500 dark:text-gray-200"
                >Telegram Link</label
              >
              <input
                type="text"
                name="telegram_link"
                v-model="social_information.telegram"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- work information -->
      <div
        class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
      >
        <h1 class="uppercase text-lg">Work Information</h1>
        <div class="my-5">
          <h3 class="text-gray-500 dark:text-gray-200">What do you do?</h3>
          <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
            Select the one you are specialized in
          </p>
          <ul
            class="items-center w-full text-sm font-medium text-gray-900 bg-transparent border border-gray-300 rounded-lg sm:flex dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
            v-for="(chunck, index) in chunckSpecializations"
            :key="index"
          >
            <li
              :class="{
                'w-full flex items-center px-3 cursor-pointer': true,
                'border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600':
                  index != 2,
              }"
              v-for="(specialization, index) in chunck"
              :key="index"
            >
              <input
                :id="specialization.profession"
                type="checkbox"
                :value="specialization.profession"
                @change="handleSelectSpecialization"
                :checked="isAdded(specialization.profession)"
                class="workCheckbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                :for="specialization.profession"
                class="w-full py-3 ms-2 text-sm font-medium"
              >
                {{ specialization.profession }}
              </label>
            </li>
          </ul>

          <div class="my-8">
            <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
              Add your specialization if not included above
            </p>
            <div class="my-2">
              <label for="profession">Profession</label>
              <input
                type="text"
                id="profession"
                placeholder="e.g Web Development"
                v-model="additionalSpecialization.profession"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm placeholder:text-xs"
              />
            </div>
            <div class="my-2">
              <label for="professional">Professional</label>
              <input
                type="text"
                id="professional"
                placeholder="e.g Web Developer"
                v-model="additionalSpecialization.professional"
                class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm placeholder:text-xs"
              />
            </div>
            <div class="mt-4 flex justify-end">
              <button
                class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disable"
                @click.prevent="addSpecialization"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- expertise information -->
      <div
        class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
      >
        <h1 class="uppercase text-lg">Expertise Information</h1>
        <div class="my-5">
          <h3 class="text-gray-500 dark:text-gray-200">Your expertise</h3>
          <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
            Write about your expertise
          </p>
        </div>
        <div class="my-5">
          <label for="yoe" class="block text-gray-500 dark:text-gray-200"
            >Years of experience</label
          >
          <input
            type="number"
            name="yoe"
            v-model="expertise.year_of_experience"
            class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm"
          />
        </div>
        <div class="my-5">
          <label for="clients" class="block text-gray-500 dark:text-gray-200"
            >Number of clients</label
          >
          <input
            type="number"
            name="clients"
            v-model="expertise.number_of_clients"
            class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm"
          />
        </div>
        <div class="my-5">
          <label for="projects" class="block text-gray-500 dark:text-gray-200"
            >Number of completed projects</label
          >
          <input
            type="number"
            name="projects"
            v-model="expertise.number_of_projects"
            class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm"
          />
        </div>
      </div>
      <!-- language information -->
      <div
        class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
      >
        <h1 class="uppercase text-lg">Language Information</h1>
        <div class="my-5">
          <h3 class="text-gray-500 dark:text-gray-200">Your Languages</h3>
          <div>
            <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
              Select the Languages you work with
            </p>
            <ul
              class="items-center w-full text-sm font-medium text-gray-900 bg-transparent border border-gray-300 rounded-lg sm:flex dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
              v-for="(chunck, index) in chunckedLanguages"
              :key="index"
            >
              <li
                :class="{
                  'w-full flex items-center px-3 cursor-pointer': true,
                  'border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600':
                    i != 4,
                }"
                v-for="(language, i) in chunck"
                :key="i"
              >
                <input
                  :id="language.name"
                  type="checkbox"
                  :value="language.name"
                  @change="handleSelectLanguage"
                  :checked="isLanguageAdded(language.name)"
                  class="languageCheckbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  :for="language.name"
                  class="w-full py-3 ms-2 text-sm font-medium"
                  >{{ language.name }}</label
                >
              </li>
            </ul>
            <hr class="my-4 border-gray-200 dark:border-gray-600" />
            <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
              If what you want is not up there, add and type your language here
            </p>

            <div class="mt-4">
              <div class="my-2">
                <label for="language_name">Name</label>
                <input
                  type="text"
                  id="language_name"
                  placeholder="Your language name"
                  v-model="additionalLanguage.name"
                  class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm placeholder:text-xs"
                />
              </div>
              <div class="my-2">
                <label for="url">URL</label>
                <input
                  type="text"
                  id="url"
                  placeholder="Your language documentary url"
                  v-model="additionalLanguage.url"
                  class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm placeholder:text-xs"
                />
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                  @click.prevent="addLanguage"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Project information -->
      <div
        class="p-8 shadow-md bg-slate-100 dark:bg-gray-800 dark:shadow-gray-850 rounded-md my-8"
      >
        <h1 class="uppercase text-lg">Project Information</h1>
        <p class="my-1 text-sm text-gray-600 dark:text-gray-400">
          Add your projects here
        </p>

        <!-- Projects that have been added, if any -->
        <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          <div
            class="relative group hover:cursor-pointer h-[8rem] gap-2 p-2 rounded-lg"
            v-for="(proj, index) in projects"
            :key="index"
          >
            <span class="bg-slate-300 absolute text-xs -top-5 dark:bg-gray-900 py-1 px-2 rounded hidden group-hover:inline">{{ proj.title }}</span>
            <img
              :src="projectImg(proj.image)"
              class="object-cover w-full h-full rounded-lg"
              alt=""
            />
            <font-awesome-icon
              class="absolute right-0 -top-2 text-xs cursor-pointer"
              icon="x"
              @click="deleteProject(index)"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <label for="title" class="block text-gray-500 dark:text-gray-200"
              >Title</label
            >
            <input
              type="text"
              name="title"
              v-model="project.title"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            />
          </div>
          <div>
            <label for="category" class="block text-gray-500 dark:text-gray-200"
              >Category</label
            >
            <select
              name="category"
              id=""
              v-model="project.category"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            >
              <option value=""></option>
              <option
                :value="specialization.profession"
                v-for="(specialization, index) in specializations"
                :key="index"
              >
                {{ specialization.profession }}
              </option>
            </select>
          </div>
        </div>
        <div class="my-4">
          <p class="block text-gray-500 dark:text-gray-200"
            >Display Image</p
          >
             <label
              for="projectDisplayInput"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 outline-none focus:border-indigo-400  p-[2px] rounded flex gap-2 items-center  cursor-pointer"
            >
              <input
                type="file"
                ref="file"
                @change="selectedFile"
                class="hidden"
                id="projectDisplayInput"
              />
              <span
              class="inline-flex items-center px-4 py-[6px] bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 shadow-sm"
              >
                Browse
              </span>
               <span>{{selectedProjectImg?.name}}</span>
            </label>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div>
            <label for="web_link" class="block text-gray-500 dark:text-gray-200"
              >Web Link</label
            >
            <input
              type="text"
              name="web_link"
              v-model="project.web_link"
              :disabled="project.category=='Graphic Design'"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              for="github_link"
              class="block text-gray-500 dark:text-gray-200"
              >GitHub Link</label
            >
            <input
              type="text"
              name="github_link"
              v-model="project.github_link"
              :disabled="project.category=='Graphic Design'"
              class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-400 p-2 shadow-sm"
            />
          </div>
        </div>
        <div class="my-4">
          <label
            for="description"
            class="block text-gray-500 dark:text-gray-200"
            >Discription</label
          >
          <textarea
            name="description"
            id=""
            rows="4"
            :disabled="project.category=='Graphic Design'"
            v-model="project.description"
            class="border border-gray-300 bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 w-full rounded outline-none focus:border-indigo-500 p-2 shadow-sm"
          ></textarea>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-sm text-white dark:text-gray-800 tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
            @click.prevent="addMoreProject"
          >
            Add More
          </button>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-gray-800 dark:bg-gray-200 font-semibold border border-transparent hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 px-4 text-white dark:text-gray-800 shadow w-full md:w-[50%] py-2 flex items-center justify-center"
        >
        <p v-if="loading" class="flex items-center justify-center">
        <span>Uploading</span>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="40px" viewBox="0 0 200 200"><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F10F4" stroke="#6F10F4" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.7" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <span v-else>Upload Portfolio</span>
        </button>
      </div>
    </form>
    <Alert :alertType="alertType" :showAlert="showAlert" :alertText="message" />
  </div>
</template>

<script>
import { baseURL, config } from "@/main";
import Alert from "../components/Alert.vue";
import axios from "axios";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      showAlert: false,
      alertType: "",
      loading:false,
      message: "",
      selectedProjectImg:"",
      myCV: "",
      selfDescription: "",
      social_information: {
        whatsapp: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        telegram: "",
      },
      specializations: [
        {
          profession: "Web Development",
          professional: "Web Developer",
        },
        {
          profession: "Native App Development",
          professional: "Native App Developer",
        },
        {
          profession: "Graphic Design",
          professional: "Graphic Designer",
        },
      ],
      expertise: {
        year_of_experience: null,
        number_of_clients: null,
        number_of_projects: null,
      },

      languages: [
        {
          name: "HTML",
          url: "https://www.w3schools.com/html/html_intro.asp",
        },
        {
          name: "CSS",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
        {
          name: "BootStrap",
          url: "https://getbootstrap.com/",
        },
        {
          name: "Sass",
          url: "https://sass-lang.com/",
        },
        {
          name: "TailwindCss",
          url: "https://tailwindcss.com/",
        },
        {
          name: "JavaScript",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          name: "ReactJs",
          url: "https://react.dev/",
        },
        {
          name: "Angular",
          url: "https://angular.io/docs",
        },
        {
          name: "VueJs",
          url: "https://vuejs.org/",
        },
        {
          name: "NextJs",
          url: "https://nextjs.org/",
        },
        {
          name: "Flutter",
          url: "https://flutter.dev/",
        },
        {
          name: "Java",
          url: "https://www.java.com/en/",
        },
        {
          name: "Svelte",
          url: "https://svelte.dev/",
        },
        {
          name: "Golang",
          url: "https://go.dev/",
        },
        {
          name: "Firebase",
          url: "https://firebase.google.com/",
        },
        {
          name: "NodeJs",
          url: "https://expressjs.com/",
        },
        {
          name: "PHP",
          url: "#",
        },
        {
          name: "Laravel",
          url: "https://laravel.com/",
        },
        {
          name: "Django",
          url: "https://www.djangoproject.com/",
        },
        {
          name: "Python",
          url: "https://www.python.org/",
        },
      ],
      selectedLanguages: [],
      selectedSpecializations: [],
      newlyAddedLanguages: [],
      additionalLanguage: {
        name: "",
        url: "",
      },
      additionalSpecialization: {
        profession: "",
        professional: "",
      },
      newlyAddedSpecializations: [],
      projects: [],
      project: {
        title: "",
        category: "",
        image: "",
        web_link: "",
        github_link: "",
        description: "",
      },
    };
  },
  computed: {
    chunckedLanguages() {
      const chunckSize = 5;
      return this.languages.reduce((resultArray, item, index) => {
        const chunckIndex = Math.floor(index / chunckSize);

        if (!resultArray[chunckIndex]) {
          resultArray[chunckIndex] = [];
        }

        resultArray[chunckIndex].push(item);
        return resultArray;
      }, []);
    },
    chunckSpecializations() {
      const chunckSize = 3;
      return this.specializations.reduce((resultArray, item, index) => {
        const chunckIndex = Math.floor(index / chunckSize);

        if (!resultArray[chunckIndex]) {
          resultArray[chunckIndex] = [];
        }

        resultArray[chunckIndex].push(item);
        return resultArray;
      }, []);
    },
    isDataAvailable() {
      if (
        this.additionalSpecialization.profession == "" ||
        this.additionalSpecialization.professional == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    // Adding your specialization if not included
    addSpecialization() {
      if (
        this.additionalSpecialization.profession !== "" ||
        this.additionalSpecialization.professional !== ""
      ) {
        this.newlyAddedSpecializations = [
          ...this.newlyAddedSpecializations,
          this.additionalSpecialization,
        ];
        this.specializations = [
          ...this.specializations,
          this.additionalSpecialization,
        ];
        this.additionalSpecialization = {
          profession: "",
          professional: "",
        };
      }
    },

    // Marking the newlySelectedSpecialization as checked
    isAdded(profession) {
      if (
        this.newlyAddedSpecializations.find(
          (specialization) => specialization.profession == profession
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    // Marking the newlySelectedLanguages as checked
    isLanguageAdded(name) {
      if (this.newlyAddedLanguages.find((language) => language.name == name)) {
        return true;
      } else {
        return false;
      }
    },

    //Adding your profession in the available options
    handleSelectSpecialization(e) {
      if (e.target.checked) {
        const found = this.specializations.find(
          (specialization) => specialization.profession == e.target.value
        );
        this.selectedSpecializations.push(found);
      } else {
        const filtered = this.selectedSpecializations.filter(
          (specialization) => specialization.profession !== e.target.value
        );
        this.selectedSpecializations = filtered;

        const filteredAdded = this.newlyAddedSpecializations.filter(
          (specialization) => specialization.profession !== e.target.value
        );
        this.newlyAddedSpecializations = filteredAdded;
      }
    },
    //Adding your language in the available options
    handleSelectLanguage(e) {
      if (e.target.checked) {
        const found = this.languages.find(
          (language) => language.name == e.target.value
        );
        this.selectedLanguages.push(found);
      } else {
        const filtered = this.selectedLanguages.filter(
          (language) => language.name !== e.target.value
        );
        this.selectedLanguages = filtered;
        const filteredAdded = this.newlyAddedLanguages.filter(
          (language) => language.name !== e.target.value
        );
        this.newlyAddedLanguages = filteredAdded;
      }
    },

    // adding your language if it's not found in the provided ones
    addLanguage() {
      if (
        this.additionalLanguage.name !== "" ||
        this.additionalLanguage.url !== ""
      ) {
        this.newlyAddedLanguages = [
          ...this.newlyAddedLanguages,
          this.additionalLanguage,
        ];
        this.languages = [...this.languages, this.additionalLanguage];
        this.additionalLanguage = {
          name: "",
          url: "",
        };
      }
    },

    // Selecting a project cover picture
    selectedFile(e) {
      const file = e.target.files[0];
      this.selectedProjectImg=file
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.project.image = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    },
    // Selecting your CV
    selectCV(e) {
      const file = e.target.files[0];
      this.myCV = file;
    },

    projectImg(image) {
    const base64Data = image.replace(/^data:[^;]+;base64,/, '');
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });

      return URL.createObjectURL(blob);
    },

    //If the project you want to add at once is more than one
    addMoreProject() {
      if (this.project.title == "" || this.project.category == "" || this.project.image == "") {
        this.message = "Project title, category and image are required";
        this.alertType = "error";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      } else {
        this.projects.push(this.project);
        this.project = {
          title: "",
          category: "",
          image: "",
          web_link: "",
          github_link: "",
          description: "",
        };
        this.$refs.file.value = "";
        this.selectedProjectImg='';
      }
    },

    // Deleting the one you do not feel like adding any more
    deleteProject(id) {
      this.projects.splice(id, 1);
    },

    // The final upload button, to add the whole portfolio
    uploadPortfolio() {
      // Saving about information
      if (this.selfDescription != "") {
      this.loading=true
        axios
          .post(
            `${baseURL}selfDescription`,
            { selfDescription: this.selfDescription },
            config
          )
          .then((res) => {
          this.loading=false
            console.log(res.data);
            this.selfDescription = "";
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
      }

      if (this.myCV != "") {
        const formData = new FormData();
        formData.append("myCV", this.myCV);
        this.loading=true
        axios
          .post(`${baseURL}uploadCV`, formData, config)
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "error";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            } else {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "success";
              this.showAlert = true;
              this.password = "";
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            }
            this.$refs.cvFile.value = "";
            this.myCV = "";
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

      // Saving social information
      if (
        this.social_information.whatsapp != "" ||
        this.social_information.facebook != "" ||
        this.social_information.instagram != "" ||
        this.social_information.twitter != "" ||
        this.social_information.linkedin != "" ||
        this.social_information.telegram != ""
      ) {
      this.loading=true
        axios
          .post(
            `${baseURL}storeSocialInformation`,
            this.social_information,
            config
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "error";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            } else {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "success";
              this.showAlert = true;
              this.password = "";
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            }
            this.social_information = {
              whatsapp: "",
              facebook: "",
              instagram: "",
              twitter: "",
              linkedin: "",
              telegram: "",
            };
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
      }

      // Saving the specialization information
      let recentSpecializations = [];
      if (
        this.additionalSpecialization.profession == "" ||
        this.additionalSpecialization.professional == ""
      ) {
        recentSpecializations = [
          ...this.selectedSpecializations,
          ...this.newlyAddedSpecializations,
        ];
      } else {
        recentSpecializations = [
          ...this.selectedSpecializations,
          ...this.newlyAddedSpecializations,
          this.additionalSpecialization,
        ];
      }


      if (recentSpecializations.length > 0) {
      this.loading=true
        axios
          .post(`${baseURL}storeWorkInformation`, recentSpecializations, config)
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "error";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            } else {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "success";
              this.showAlert = true;
              this.password = "";
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            }
            this.selectedSpecializations = [];
            this.newlyAddedSpecializations = [];
            recentSpecializations = [];
            this.additionalSpecialization = {};
            this.expertise = {
              year_of_experience: null,
              number_of_clients: null,
              number_of_projects: null,
            };
            document
              .querySelectorAll(".workCheckbox")
              .forEach((checkbox) => (checkbox.checked = false));
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
      }

      // Saving the expertise information

      if (Object.values(this.expertise).every((value) => value !== null)) {
      this.loading=true
        axios
          .post(`${baseURL}storeExpertiseInformation`, this.expertise, config)
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "error";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            } else {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "success";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            }
            this.expertise = {
              year_of_experience: null,
              number_of_clients: null,
              number_of_projects: null,
            };
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
      }

      // Saving the Languages information
      let recentLanguages = [];
      if (
        this.additionalLanguage.name == "" ||
        this.additionalLanguage.url == ""
      ) {
        recentLanguages = [
          ...this.selectedLanguages,
          ...this.newlyAddedLanguages,
        ];
      } else {
        recentLanguages = [
          ...this.selectedLanguages,
          ...this.newlyAddedLanguages,
          this.additionalLanguage,
        ];
      }
      if (recentLanguages.length > 0) {
      this.loading=true
        axios
          .post(`${baseURL}storeLanguages`, recentLanguages, config)
          .then((res) => {
          this.loading=false
            console.log(res.data);
            this.selectedLanguages = [];
            this.more_Languages = [];
            document
              .querySelectorAll(".languageCheckbox")
              .forEach((checkbox) => (checkbox.checked = false));
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
      }

      // Saving the projects information
      if (
        this.projects.length > 0 ||
        (this.project.title !== "" && this.project.category !== "" && this.project.image !== "")
      ) {
        const formData = new FormData();
        formData.append(
          "projects",
          JSON.stringify(
            Object.values(this.project).every((value) => value == "")
              ? this.projects
              : [...this.projects, this.project]
          )
        );
        // console.log([...this.projects, this.project]);
        this.loading=true
        axios
          .post(`${baseURL}storeProject`, formData, config)
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "error";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            } else {
            this.loading=false
              this.message = res.data.message;
              this.alertType = "success";
              this.showAlert = true;
              this.password = "";
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
              this.projects = [];
              this.$refs.file.value = "";
              this.selectedProjectImg=""
              this.project = {
                title: "",
                category: "",
                image: "",
                web_link: "",
                github_link: "",
                description: "",
              };
            }
          })
          .catch((err) => {
          this.loading=false
            console.log(err.message);
          });
      } 
      else if (
        Object.values(this.project).some(
          (value) =>
            value !== "" &&
            this.project.title == "" &&
            this.project.category == ""
            && this.project.image == ""
        )
      ) {
        this.message = "Project title, category and image are required";
        this.alertType = "error";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
    },
  },
};
</script>

<style></style>
