<template>
<div id="services" class="px-4 md:px-6 lg:px-8 py-16">
<h1 class="text-center text-3xl font-bold mb-4">Services</h1>
  <div class=" flex flex-col md:flex-row gap-10 items-center justify-center">
    <div class="flex gap-2 shadow-lg p-4 rounded-md bg-yellow-50 shadow-yellow-200 dark:bg-gray-700 dark:shadow-gray-800">
      <font-awesome-icon
        :icon="['fas', 'clock']"
        class="text-blue-500 text-xl"
      />
      <p class="text-sm font-bold">In Time Projects</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-5 items-center">
      <div class="flex flex-col items-center">
        <h1 class="period font-bold">{{expertise_information.year_of_experience}}</h1>
        <p class="font-bold">Years of Experience</p>
      </div>
      <div class="flex flex-col items-center">
        <h1 class="period font-bold">{{expertise_information.number_of_projects}}</h1>
        <p class="font-bold">Projects completed</p>
      </div>
      <div class="flex flex-col items-center">
        <h1 class="period font-bold">{{expertise_information.number_of_clients}}</h1>
        <p class="font-bold">Happy Clients</p>
      </div>
    </div>

    <button class="flex gap-2 shadow-lg py-4 px-8 rounded-md bg-yellow-50 shadow-yellow-200 dark:bg-gray-700 dark:shadow-gray-800" @click="editExpertise" >
      <font-awesome-icon
        :icon="['fas', 'edit']"
        class="text-blue-500 text-xl"
      />
      <p class="text-sm font-bold">Edit</p>
    </button>
  </div>
<EditExpertiseModal/>
</div>
</template>

<script>
import EditExpertiseModal from './Modals/EditExpertiseModal.vue';
export default {
  name: "services",
  components: {
    EditExpertiseModal,
  },
  data() {
    return {
      expertise_information: {}
    }
  },

  mounted(){
    window.emitter.on('expertiseInformation',(info)=>{
     console.log(info);
  this.expertise_information=info;
  })
  },

 methods: {
  editExpertise() {
    window.emitter.emit('showEditExpertiseModal',{expertise:this.expertise_information,status:true})
  },
 }, 
};
</script>

<style scoped>
.period{
font-size: 3rem !important;
}
</style>
