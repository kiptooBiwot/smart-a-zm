<template>
  <div>
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div
        class="flex items-center justify-center md:px-10 md:py-4 sm:p-4 md:w-full"
      >
        <div class="w-full">
          <h1 class="mb-4 text-xl font-semibold">Create Account</h1>
          <label class="block text-xs">
            <span class="">Email</span>
            <input v-model="mail" type="email" class="" placeholder="Email" />
          </label>
          <label class="block mt-4 text-xs">
            <span class="">Password</span>
            <input
              v-model="pass"
              class=""
              placeholder="Password"
              type="password"
            />
          </label>
          <label class="block mt-4 text-xs">
            <span class="">Confirm Password</span>
            <input
              v-model="confirmPass"
              class=""
              placeholder="Confirm Password"
              type="password"
            />
          </label>

          <div class="flex mt-6 text-sm">
            <label class="flex items-center text-xs dark:text-gray-400">
              <input
                v-model="acceptTerms"
                type="checkbox"
                class="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
              />
              <span class="ml-2">
                I agree to the
                <span class="underline text-accent-one hover:text-accent"
                  >privacy policy</span
                >
              </span>
            </label>
          </div>

          <!-- You should use a button here, as the anchor is only used for the example  -->
          <button
            type="submit"
            class="btn-primary"
            @click.prevent="$emit(signUp)"
          >
            Register
          </button>

          <hr class="my-8" />

          <p class="mt-4">
            <button class="btn-text">
              <NuxtLink to="/signin">
                Already have an account? Sign In
              </NuxtLink>
            </button>
          </p>
          <!-- <p class="mt-1">
              <button class="btn-text">
                <NuxtLink to="/signup"> Create account </NuxtLink>
              </button>
            </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    confirmPassword: {
      type: String,
      default: '',
    },
    agreeTerms: {
      type: Boolean,
      default: false,
    },
    signUp: {
      type: Function,
      default: () => {},
    },
  },
  data: () => ({
    // mail: this.email,
    // pass: this.password,
    // confirmPass: this.confirmPassword,
    // acceptTerms: this.agreeTerms,
  }),
  computed: {
    mail: {
      get: () => {
        return this.email
      },
      set: (newValue) => {
        this.$emit('update:email', newValue)
      },
    },
    pass: {
      get: () => {
        return this.password
      },
      set: (newValue) => {
        this.$emit('update:password', newValue)
      },
    },
    confirmPass: {
      get: () => {
        return this.confirmPassword
      },
      set: (newValue) => {
        this.$emit('update:confirmPassword', newValue)
      },
    },
    aceptTerms: {
      get: () => {
        return this.agreeTerms
      },
      set: (newValue) => {
        this.$emit('update:agreeTerms', newValue)
      },
    },
  },
  methods: {},
}
</script>

<style></style>
