import axios from "axios"



const baseUrl = `${import.meta.env.VITE_BASE_URL}`


export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    // Variable data
    step: 1,
    step1Complete: false,
    step2Complete: false,
    step3Complete: false,

    // signup
    users: [],
    staff: null,
    registeredUser: null,
    verifiedEmail: false,
    registrationComplete: false,

    // Signin
    user: useCookie('user').value || null,
    authenticated: false
  }),
  getters: {
    getUser(state) {
      const storedUser = useCookie('user')

      if (state.user === null && storedUser.value) {
        return state.user = storedUser.value
      } else {
        return null
      }
    },
    getFullName(state) {
      return state?.user?.firstName + ' ' + state?.user?.surname
    },

    getNameInitial(state) {

      if (state?.user?.surname) {
        const initial = state?.user?.surname[0]
        return initial
      } else if (state?.user?.middleName) {
        return state?.user?.middleName[0]
      } else {
        return state?.user?.firstName[0]
      }
    }
  },
  actions: {
    registerUser: async function (payload) {
      try {
        const response = await axios.post(`${baseUrl}/auth/register`, {
          method: 'POST',
          ...payload
        })

        if (response.status === 201) {
          this.step = 2
          this.step1Complete = true
          this.user = response.data
          return response
        } else {
          return response
        }

      } catch (error) {
        if (error.response.data) {
          return error.response.data
        }
      }
    },

    updateProfile: async function (payload) {
      try {
        const userId = this.user.userId

        const response = await axios.patch(`${baseUrl}/auth/${userId}`, payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data boundary=<calculated when request is sent>'
            }
          }
        )

        if (response.status === 201) {
          this.step = 3
          this.step2Complete = true
          this.registeredUser = response.data
          return response
        }
      } catch (error) {
        return error
      }
    },

    verifyEmailCode: async function (payload) {
      try {
        const { id, token } = payload
        const response = await axios.get(`${baseUrl}/users/${id}/verify/${token}`)

        // console.log('VERIFICATION CODE res: ', response)

        if (response.status === 200) {
          this.verifiedEmail = response.data
          return response.data
        }

      } catch (error) {
        return error
      }
    },

    signIn: async function (payload) {
      try {
        // console.log('FROM FORM', payload)
        const response = await axios.post(`${baseUrl}/auth/signin`, {
          ...payload
        })

        if (response.status === 200) {

          const tokenCookie = useCookie('token')
          const refreshTokenCookie = useCookie('refreshToken')
          const userCookie = useCookie('user')


          tokenCookie.value = response?.data?.token
          refreshTokenCookie.value = response?.data?.refreshToken
          userCookie.value = response?.data?.user


          this.user = response?.data?.user

          return response
        }
      } catch (error) {
        if (error.response.data) {
          return error.response.data
        }
      }
    },

    signOut: async function () {
      try {
        const tokenCookie = useCookie('token')
        const refreshTokenCookie = useCookie('refreshToken')
        const userCookie = useCookie('user')

        // console.log('COOKE REFRESH TOKEN', refreshTokenCookie.value);

        // const logoutResponse = await axios.post(`${baseUrl}/auth/logout`, {
        //   refreshToken: refreshTokenCookie.value
        // })

        // console.log('LOGOUT RESPONSE:', logoutResponse)

        // const refreshTokenCookie = useCookie('refreshToken');


        tokenCookie.value = null;
        refreshTokenCookie.value = null;
        userCookie.value = null;

        this.token = null;
        this.refreshToken = null;
        this.user = null;

        return { message: "You have logged out!" }
      } catch (error) {
        return error
      }
    }
  }
})