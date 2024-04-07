import { createStore } from "vuex";
import router from "./router";


export default createStore({
state:{
isLoggedIn:!!sessionStorage.getItem('token')
},
mutations:{
LOGIN(state){
state.isLoggedIn=true
},
LOGOUT(state){
state.isLoggedIn=false
}
},

actions:{
login({commit}){
commit('LOGIN')
},
logout({commit,dispatch}){
commit('LOGOUT')
dispatch('navigateToLogin')
},
navigateToLogin(){
sessionStorage.removeItem('token')
router.push({name:'login'})
}
}
})