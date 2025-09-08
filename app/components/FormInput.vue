<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const id = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);

// login function
const login = async () => {
  if (id.value && password.value) {
    isLoading.value = true;

    setTimeout(() => {
      user.value.id = id.value;
      user.value.role = "";
      user.value.branch = "";
      router.push("/choose-role");
      isLoading.value = false;
    }, 1500);
  }
};
const user = useState("user", () => ({
  id: "",
  role: "",
  branch: "",
}));
</script>

<template>
  <form @submit.prevent="login">
    <div
      class="flex flex-col bg-[#fcf9f8] justify-center items-center gap-3 md:min-w-md rounded-2xl px-8 py-14 mx-auto shadow-2xl">
      <h1 class=" text-xl md:text-3xl font-bold">Welcome to Learning</h1>
      <p class="md:font-semibold text-gray-500 text-center">
        Access your educational dashboard
      </p>

      <div class="input mt-10 w-full flex flex-col gap-4">
        <!-- Staff/Student ID -->
        <div class="flex flex-col gap-1">
          <label for="id" class="text-sm font-medium text-gray-700">
            Staff/Student ID
          </label>
          <UInput
            id="id"
            v-model="id"
            type="text"
            placeholder="Enter your ID"
            class="w-full my-1"
            size="xl"
            required />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-medium text-gray-700">
            Password
          </label>
          <UInput
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full my-1"
            size="xl"
            required />
        </div>
      </div>

      <!-- Sign in -->
      <UButton
        class="mt-4 w-full bg-[#2B67EC] hover:bg-[#2B67EC]/90 active:bg-[#2B67EC]/80 flex items-center justify-center py-3"
        type="submit">
        <span v-if="!isLoading">Sign in</span>
        <span v-else>Signing in...</span>
      </UButton>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
