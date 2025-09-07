<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { School, BookOpen, Users, Award, Target, User } from "lucide-vue-next";

const id = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);

const user = useState("user", () => ({
  id: "",
  role: "",
  branch: "",
}));

const cards = [
  {
    icon: BookOpen,
    title: "Knowledge",
    description: "Comprehensive curriculum and learning resources",
  },
  {
    icon: Users,
    title: "Community",
    description: "Collaborative learning environment",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for academic achievement",
  },
  {
    icon: Target,
    title: "Growth",
    description: "Personal and academic development",
  },
];

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

function goHome() {
  user.value = null;
  id.value = "";
  password.value = "";
}
</script>

<template>
  <div class="flex md:flex-row items-center max-h-screen bg-white w-full">
    <!-- left -->
    <div class="left bg-[#FFFFFF] w-full h-screen flex items-center justify-center  px-10 md:px-20 py-20">
      <form
        class="flex flex-col bg-[#fcf8f8] justify-center items-center gap-3 md:min-w-md  rounded-2xl px-10 py-10 mx-auto shadow-2xl"
        @submit.prevent="login">
        <!-- شرط: لو مفيش user.id → عرض login form -->

        <template v-if="!user?.id">
          <h1 class="text-3xl font-bold">Welcome to Learning</h1>
          <p class="text-sm text-gray-500">Access your educational dashboard</p>

          <div class="input mt-5 w-full flex flex-col gap-4">
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
                class="w-full my-2"
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
                class="w-full"
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
        </template>

        <!-- شرط: لو فيه user.id → عرض معلومات الطالب -->
        <template v-else>
          <!-- success Icon -->
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-2xl text-green-600"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-9 h-9">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <h1 class="text-2xl font-bold">Welcome Back!</h1>
          <p class="text-gray-500">Ready to continue learning</p>

          <div class="input mt-8 w-full flex flex-col gap-4">
            <!-- Student Name & ID -->
            <div class="flex gap-3 bg-[#F1F5F9] p-3 rounded-lg">
              <div
                class="w-12 h-12 border border-blue-300 bg-[#DCE6F7] rounded-full flex items-center justify-center">
                <User class="text-blue-600 w-6 h-6" />
              </div>
              <div class="flex flex-col">
                <span class="font-medium text-gray-700">{{ user?.id }}</span>
                <span class="text-sm text-gray-500">ID: {{ user?.id }}</span>
              </div>
            </div>

            <!-- Position & Branch -->
            <div class="flex flex-col gap-3 bg-[#F1F5F9] p-3 rounded-lg">
              <div class="flex items-center gap-2">
                <BookOpen class="text-[#64748B] w-4 h-4" />
                <span class="text-slate-500"> Position: </span>
                <span
                  class="font-medium text-blue-400 ms-2 bg-[#DCE6F7] p-1 rounded-lg"
                  >{{ user?.role }}</span
                >
              </div>

              <div class="flex items-center gap-2">
                <School class="text-[#64748B] w-4 h-4" />
                <span class="text-slate-500"> Branch: </span>
                <span
                  class="font-medium text-blue-400 ms-2 border p-1 rounded-lg"
                  >{{ user?.branch }}</span
                >
              </div>
            </div>

            <UButton
              class="mt-4 w-full bg-[#2B67EC] hover:bg-[#2B67EC]/90 active:bg-[#2B67EC]/80 flex items-center justify-center py-3"
              @click="goHome">
              <span>Enter Dashboard</span>
            </UButton>
          </div>
        </template>
      </form>
    </div>

    <!-- right ثابت -->
    <div
      class="right bg-[#2e6aecd8] static w-full min-h-screen hidden lg:flex flex-col items-center justify-center text-white text-2xl font-bold"
      style="
        background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'0.3\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
      ">
      <div
        class="bg-[#2e6aecd8] relative top-0 left-0 w-full min-h-screen flex flex-col items-center justify-center">
        <div class="top-title flex flex-col items-center">
          <div class="p-5 rounded-2xl bg-[#5b8af0e7] mb-4 inline-block border">
            <School class="w-10 h-10" />
          </div>
          <h2 class="mb-4 font-bold text-4xl">Your School Name</h2>
          <h6 class="font-medium text-xl text-gray-200">
            Excellence in Education
          </h6>
          <p class="mt-2 text-center px-24 text-lg font-medium text-gray-300">
            Empowering minds and shaping futures through innovative learning
            experiences
          </p>
        </div>

        <div class="cards grid grid-cols-2 gap-6 p-8 mt-5">
          <div
            v-for="card in cards"
            :key="card.title"
            class="card border border-[#c1d3f9c4] bg-[#5b8af0c4] rounded-xl px-7 py-7 hover:bg-[#7a9eeb] transition-all">
            <div class="top-title flex flex-col items-center">
              <component :is="card.icon" class="w-9 h-9 mb-3" />
              <h2 class="font-bold text-xl">{{ card.title }}</h2>
              <p
                class="mt-2 text-center max-w-[240px] text-slate-300 text-sm font-medium">
                {{ card.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
