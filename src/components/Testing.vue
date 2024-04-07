<template>
  <div
    class="border-b border-gray-200 flex gap-6 justify-center my-5 flex-wrap"
  >
    <a
      @click="setLocation('all')"
      :class="`cursor-pointer shrink-0 border-b-2 border-transparent px-2 pb-4 text-sm font-medium ${
        currentLocation == 'all'
          ? 'text-sky-500 border-sky-600'
          : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-500 hover:border-gray-300 dark:hover:border-gray-200'
      }`"
    >
      All
    </a>
    <a
      v-for="(specialization, index) in specializations"
      :key="index"
      @click="setLocation(specialization)"
      :class="`cursor-pointer shrink-0 border-b-2 px-2 pb-4 text-sm font-medium ${
        currentLocation == specialization.toLowerCase()
          ? 'text-sky-500 border-sky-600'
          : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-500 border-transparent hover:border-gray-300 dark:hover:border-gray-200'
      }`"
    >
      {{ specialization }}
    </a>
  </div>
  <transition-group name="projects" mode="out-in">
    <div
      class="my-4 grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3"
      v-if="currentLocation == 'all'"
    >
      <div
        :key="i"
        v-for="(project, i) in selectedProjects"
        class="project-item"
      >
        {{ project.title }}
      </div>
    </div>  
  </transition-group>
  <transition-group tag='div' v-for="(specialization, index) in specializations"
      :key="index"  name="projects" mode="out-in">
    <div
      class="my-4 grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3"
      v-if="currentLocation == specialization.toLowerCase()"
    >
      <div
        :key="i"
        v-for="(project, i) in selectedProjects"
        class="project-item"
      >
        {{ project.title }}
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  data() {
    return {
      specializations: ["Web", "Native", "Graphics"],
      selectedProjects: [],
      currentLocation: "all",
      projects: [
        {
          id: "Design1",
          category: "web",
          title: "printivo",
          description: `It is a simple printivo front page design. Built with HTML and CSS`,
          web_link: "https://printivo-xi.vercel.app/",
          github_link: "https://github.com/Oluwadunsin2016/Printivo",
        },
        {
          id: "Design2",
          category: "web",
          title: "She Leads Africa",
          description: `It is a simple SLA front page design. Built with HTML and CSS`,
          web_link: "https://level-one-test-bice.vercel.app/",
          github_link: "https://github.com/Oluwadunsin2016/LevelOne_Test",
        },
        {
          id: "Design3",
          category: "web",
          title: "Biggest University",
          description: `A simple University web design with animation. Built with HTML, CSS and wow js`,
          web_link: "https://university-website-design-css.vercel.app/",
          github_link:
            "https://github.com/Oluwadunsin2016/University-Website-design-css",
        },
        {
          id: "Design4",
          category: "native",
          title: "Fitness",
          description: `A simple Fitness web design with animation. Built with HTML, CSS and wow js`,
          web_link: "https://fitness-css.vercel.app/",
          github_link: "https://github.com/Oluwadunsin2016/fitness-css",
        },
        {
          id: "game",
          category: "web",
          title: "TIC TAC TOE",
          description: `A lovable tic tac toe game. Built with HTML, CSS and JavaScript`,
          web_link: "https://my-tictactoe-game.vercel.app/",
          github_link: "https://github.com/Oluwadunsin2016/my-tictactoe-game",
        },
        {
          id: "movieApp",
          category: "native",
          title: "Netflix",
          description: `A clone of netlix application where you can watch the latest movie. Built with React Js and tailwind CSS`,
          web_link: "https://netflix-2-woad.vercel.app/",
          github_link: "https://github.com/Oluwadunsin2016/Netflix_2",
        },
        {
          id: "photo",
          category: "web",
          title: "Gallery",
          description: `A photo gallery application that allows you to save and view your pictures so that you won't loose them. Built with React Js and tailwind CSS`,
          web_link: "https://gallery-gamma-three.vercel.app/",
          github_link: "https://github.com/Oluwadunsin2016/Gallery",
        },
        {
          id: "ecommerce",
          category: "native",
          title: "ALEXISCOM",
          description: `AlexisCom provides you with the latest products with cheapest prices, shop with them and enjoy the benefits. No regrets. Built with React Js`,
          web_link: "https://alexiscom.netlify.app/",
          github_link: "https://github.com/Oluwadunsin2016/Alexiscom_client",
        },
        {
          id: "chatApp",
          category: "web",
          title: "Let's Discuss",
          description: `Let's Discuss allows you to chat with your friends and loved ones in real time without obstruction. Try it, you will love it. Built with React Js and Node Js.`,
          web_link: "https://discuss-with-me.netlify.app/",
          github_link: "https://github.com/Oluwadunsin2016/Let_us_Discuss",
        },
        {
          id: "door",
          category: "graphics",
          title: "Open Door",
        },
        {
          id: "raph",
          category: "graphics",
          title: "Worrior",
        },
        {
          id: "prayer",
          category: "graphics",
          title: "Prayer",
        },
        {
          id: "orange",
          category: "graphics",
          title: "Cut Orange",
        },
      ],
    };
  },
  methods: {
    setLocation(location) {
      this.currentLocation = location.toLowerCase();
      if (location == "all") {
        this.selectedProjects = this.projects;
      } else {
        this.selectedProjects = this.projects.filter(
          (project) => project.category == location.toLowerCase()
        );
      }
    },
  },
};
</script>

<style>
.projects-enter-from {
  transform: translateX(200px);
  opacity: 0;
}
.projects-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
.projects-enter-active,
.projects-leave-active {
  transition: all 0.5s ease;
}
</style>
