import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from "../components/SignupPage"
import LoginPage from "../components/LoginPage"
import ViewLinks from "../components/ViewLinks"
import ModalTest from "../components/ModalTest"
import MainPage from "../components/MainPage"

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: ViewLinks
  }, {
    path: '/modal-test',
    name: 'modal-test',
    component: ModalTest
  },
  {
    path: '/home',
    name: 'home',
    component: MainPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
