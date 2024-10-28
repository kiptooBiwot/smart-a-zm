import axios from "axios"

const baseUrl = `${import.meta.env.VITE_BASE_URL}`

export const useCropsStore = defineStore('crops', {
  state: () => ({
    crops: [],
    crop: null,
    currentCrop: {},
    isModalOpen: false,
    showSingleCropModal: false,
    isDeleteModalOpen: false,
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 10
  }),
  actions: {
    getAllCrops: async function () {
      try {
        const response = await axios.get(`${baseUrl}/crops/`)

        // console.log('ALL CROPS RESPONSE', response);

        if (response.data.success === true) {
          this.crops = response.data.data
        }
      } catch (error) {
        return error
      }
    },

    getSingleCrop: async function (payload) {
      try {
        console.log('EXPECT ID:', payload._id);

        if (this.crops.length === 0) {

          const response = await axios.get(`${baseUrl}/crops/${payload._id}`)

          console.log(response);


          if (response.data.success === true) {
            this.crops = response.data.data
          }
        }

        const singleCrop = this.crops.filter(crop => crop._id === payload._id)

        // console.log('Single crop found:', singleCrop);
        this.crop = singleCrop[0]

        // this.showSingleCropModal = true

      } catch (error) {
        return error
      }
    },

    closeSingleCropModal: async function () {
      this.showSingleCropModal = false
      this.crop = null
    },

    registerCrop: async function (payload) {
      try {
        const token = useCookie('token')

        const response = await axios.post(`${baseUrl}/crops/`, payload, {
          headers: {
            Authorization: `${token.value}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data boundary=<calculated when request is sent>'
          }
        })

        // console.log('CROP TO STATE RESPONSE:', response)

        this.crops.push(response.data.data)

        return response
      } catch (error) {
        // console.log('STATE CREATE ERROR', error);

        return error
      }
    },

    deleteCrop: async function (payload) {
      try {
        const token = useCookie('token')

        const response = await axios.delete(`${baseUrl}/crops/${payload}`, {
          headers: {
            Authorization: `${token.value}`,
            'Accept': 'application/json',
          }
        })

        if (response) {
          this.crops = this.crops.filter(crop => crop._id !== payload)

          return response
        }

      } catch (error) {
        // console.log('DELETE CROP ERROR', error);
        return error
      }

    },

    updateCrop: async function (payload, id) {
      try {

        const token = useCookie('token')

        const response = await axios.put(`${baseUrl}/crops/${id}`, payload, {
          headers: {
            Authorization: `${token.value}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data boundary=<calculated when request is sent>'
          }
        })

        // console.log('UPDATE RESPONSE STATE', response)

        await this.getAllCrops()

        return response

      } catch (err) {
        // console.log(err.message);

        return err
      }
    },
  }
})