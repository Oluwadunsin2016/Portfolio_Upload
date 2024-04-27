<template>
 <div class="py-4 border-t border-gray-200 dark:border-gray-900 flex flex-col items-center sm:flex-row sm:justify-between px-8">
  <h1 class="font-semibold">&copy; {{user?.lastName}} {{ getYear(user?.created_at) }}</h1>
  <p>All rights reserved</p>
 </div>
</template>

<script>
export default {
 props: {
    user: Object,
  },
methods:{
getYear(date){
const dateObject = new Date(date);
return dateObject.getFullYear();
}
},
}
</script>

<style>

</style>