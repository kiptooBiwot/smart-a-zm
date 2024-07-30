
export const useToastStore = defineStore('toastStore', {
  state: () => ({
    notifications: []
  }),
  getters: {},
  actions: {
    add(notification) {
      try {
        this.notifications.push({
          ...notification,
          id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
          timeout: 5000
        })
      } catch (error) {
        // console.log(error);
        throw createError({
          statusCode: 400,
          statusMessage: 'Adding notification failed'
        })
      }
    },

    remove(index) {
      try {
        this.notifications.splice(index, 1)

      } catch (error) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Something went wrong clearing the notification'
        })
      }
    }
  }
})