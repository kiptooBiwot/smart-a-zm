import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore())

  // if (process.server) return

  // Get stored token
  const token = useCookie('token')


  console.log('AUTH MIDDLEWARE run');
  console.log('IS_TOKEN_TRUE?:', token.value);

  if (token.value) {
    authenticated.value = true
  }


  if (token.value && to.name === 'login') {
    return navigateTo('/dashboard')
  }

  // When not logged in, always redirect to the login page
  if (token.value == undefined && authenticated.value === false) {
    abortNavigation()
    return navigateTo('/signin')
  }

  // TODO: Navigating back to the login page is still possible even after adding the below middleware. Look for further enhancements to make the app foolproof.

  // If logged in, never show signin page
  if (authenticated.value === true && to.name === 'login') {
    abortNavigation()
    return navigateTo('/dashboard')
  }
})