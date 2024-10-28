

export const useDeleteModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
    itemToDelete: null,
  }),
  actions: {
    openModal(item) {
      this.showModal = true
      this.itemToDelete = item
    },
    closeModal() {
      this.showModal = false
      this.itemToDelete = null
    }
  }
})