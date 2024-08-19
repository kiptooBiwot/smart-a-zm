import axios from "axios"

const baseUrl = `${import.meta.env.VITE_BASE_URL}`

export const useFarmStore = defineStore('farm', {
  state: () => ({
    farms: []
  }),
  getters: {

  },
  actions: {
    getAllFarms: async function () {
      try {

        const token = useCookie('token')

        const farms = await axios.get(`${baseUrl}/farm/`, {
          headers: {
            'Authorization': `${token.value}`,
          }
        }
        );

        console.log('FaRMS from DB:', farms);

        this.farms.push(farms)
      } catch (error) {
        return error.message
      }
    },
    addNewFarm: async function (payload) {
      try {
        const token = useCookie('token')

        const response = await axios.post(`${baseUrl}/farm/`, payload, {
          headers: {
            // 'Authorization': `Bearer ${token.value}`,
            'Authorization': `${token.value}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data boundary=<calculated when request is sent>'
          }
        })

        console.log('NEW farm response: ' + JSON.stringify(response));
        const resp = JSON.stringify(response);
        this.getAllFarms()

        return resp

      } catch (error) {
        return error.message
      }
    }
  }
})