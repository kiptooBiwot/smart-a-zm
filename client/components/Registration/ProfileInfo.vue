<template>
  <div>
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div
        class="flex items-center justify-center md:px-10 md:py-4 sm:p-4 md:w-full"
      >
        <div class="w-full">
          <h1 class="mb-4 text-xl font-semibold">Profile Information</h1>
          <div class="w-full space-y-2">
            <div>
              <label for="first_name" class="mt-4 text-xs">
                First Name
                <input
                  id="first_name"
                  v-model="firstName"
                  type="text"
                  name="first_name"
                />
              </label>
            </div>
            <div>
              <label for="middle_name" class="mt-4 text-xs">
                Middle Name
                <input
                  id="middle_name"
                  v-model="middleName"
                  type="text"
                  name=""
                />
              </label>
            </div>
            <div>
              <label for="surname" class="mt-4 text-xs">
                Surname
                <input
                  id="surname"
                  v-model="surname"
                  type="text"
                  name="surname"
                />
              </label>
            </div>
            <div>
              <label for="id_number" class="mt-4 text-xs">
                Date of Birth
                <input id="id_number" v-model="dob" type="date" name="" />
              </label>
            </div>
            <div>
              <label for="id_number" class="mt-4 text-xs">
                ID/Passport Number
                <input id="id_number" v-model="idNumber" type="text" name="" />
              </label>
            </div>
            <!-- <div>
              <label for="profileImage" class="mt-4 text-xs">
                Profile Image
                <input id="profileImage" type="file" name="" />
              </label>
            </div> -->
            <div>
              <label for="gender" class="mt-4 text-xs">
                Gender
                <select id="gender" v-model="gender" name="gender">
                  <option value="">Choose one</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Male">Other</option>
                </select>
              </label>
            </div>
            <div>
              <label for="country" class="mt-4 text-xs">
                Country
                <select v-model="country" name="country">
                  <option value="">Select your country</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Somalia">Somalia</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Zambia">Zambia</option>
                </select>
              </label>
            </div>
            <div>
              <label for="cityTown" class="mt-4 text-xs">
                City/Town
                <input
                  id="cityTown"
                  v-model="city"
                  type="text"
                  name="cityTown"
                />
              </label>
            </div>
            <div>
              <label for="phone_no" class="mt-4 text-xs">
                Mobile Phone Number
                <input
                  id="phone_no"
                  v-model="mobileNumber"
                  type="text"
                  name="phone_no"
                />
              </label>
            </div>
          </div>
          <hr class="my-8" />
          <button
            type="submit"
            class="btn-primary"
            @click.prevent="updateProfile"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    firstName: '',
    middleName: '',
    surname: '',
    idNumber: '',
  }),
}
</script>

<style></style>
