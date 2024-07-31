
export const useGeneralStore = defineStore('general', {
  state: () => ({
    isLoading: false,
    showModal: false,
    isSideMenuOpen: false
  }),
  actions: {
    toggleSidebar() {
      console.log('This is CLICKED!');
      this.isSideMenuOpen = !this.isSideMenuOpen
    }
  }
})