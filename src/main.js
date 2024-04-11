import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter,faFacebook,faTelegram, faWhatsapp, faYoutube,faInstagram, faLinkedin, faGithub, } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faBars, faCameraRetro, faCaretDown, faCircleCheck, faCircleExclamation, faClock, faEnvelope, faEye, faEyeSlash, faLocationDot, faMinus, faMoon, faPenToSquare, faPencil, faPhone, faSun, faTrash, faTriangleExclamation, faX, } from '@fortawesome/free-solid-svg-icons'
import router from './router'
import store from './store'
import { TinyEmitter } from 'tiny-emitter'

// export const baseURL='http://127.0.0.1:8000/api/'
// export const profileDir=`http://127.0.0.1:8000/storage/ProfileImages/`
// export const projectDir='http://127.0.0.1:8000/storage/ProjectImages/'
// export const cvDir='http://127.0.0.1:8000/storage/cv/';
export const baseURL='http://steviano.infinityfreeapp.com/api/'
export const profileDir=`http://steviano.infinityfreeapp.com/storage/ProfileImages/`
export const projectDir='http://steviano.infinityfreeapp.com/storage/ProjectImages/'
export const cvDir='http://steviano.infinityfreeapp.com/storage/cv/';

const app=createApp(App)

const token=sessionStorage.getItem('token')
export const config={headers:{Authorization:`Bearer ${token}`,"content-type": "multipart/form-data"}};

library.add(faSun,faTwitter,faTelegram,faFacebook,faEnvelope,faPhone,faLocationDot, faWhatsapp, faYoutube,faInstagram, faLinkedin,faMoon,faX,faEye,faEyeSlash,faMinus,faCaretDown,faPenToSquare,faCameraRetro,faCircleExclamation,faCircleCheck,faTriangleExclamation,faTrash,faPencil,faBars,faGithub,faArrowUpRightFromSquare,faClock)

window.emitter= new TinyEmitter()
app.use(store)
app.use(router)

app.component('font-awesome-icon',FontAwesomeIcon).mount('#app')

// export default token
