<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { School, BookOpen, Users, Award, Target, User } from "lucide-vue-next";

const id = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);

// 🟦 state مشترك للمستخدم
const user = useState("user", () => ({
  id: "",
  role: "",
  branch: "",
}));

// الكروت (يمين الصفحة)
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
      user.value.role = "Teacher"; // هنا بعدين يجي من اختيار الدور
      user.value.branch = "Cairo"; // هنا بعدين يجي من اختيار الفرع
      router.push("/choose-role");
      isLoading.value = false;
      // بدل ما نروح لصفحة تانية، هيفضل في نفس الصفحة والفورم يتغير
    }, 1500);
  }
};
</script>

<template>
  <div class="flex md:flex-row items-center h-screen w-full">
    <!-- left -->
    <div class="left bg-[#FFFFFF] w-full px-20 py-20">
      <form
        class="flex flex-col justify-center items-center gap-3 max-w-md rounded-2xl px-10 py-10 mx-auto shadow-2xl">
        <!-- شرط: لو مفيش user.id → عرض login form -->
        <template v-if="!user?.id">
          <h1 class="text-xl font-bold">Welcome to Learning</h1>
          <p class="text-sm text-gray-500">Access your educational dashboard</p>

          <div class="input mt-5 w-full flex flex-col gap-4">
            <!-- Staff/Student ID -->
            <div class="flex flex-col gap-1">
              <label for="id" class="text-sm font-medium text-gray-700"
                >Staff/Student ID</label
              >
              <UInput
                id="id"
                v-model="id"
                type="text"
                placeholder="Enter your ID"
                class="w-full" />
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1">
              <label for="password" class="text-sm font-medium text-gray-700"
                >Password</label
              >
              <UInput
                id="password"
                v-model="password"
                type="password"
                placeholder="Enter your password"
                class="w-full" />
            </div>
          </div>

          <!-- Sign in -->
          <UButton
            class="mt-4 w-full bg-[#2B67EC] hover:bg-[#2B67EC]/90 active:bg-[#2B67EC]/80 flex items-center justify-center"
            :disabled="isLoading"
            @click.prevent="login">
            <span v-if="!isLoading">Sign in</span>
            <span v-else>Signing in...</span>
          </UButton>
        </template>

        <!-- شرط: لو فيه user.id → عرض معلومات الطالب -->
        <template v-else>
          <h1 class="text-xl font-bold">Welcome Back!</h1>
          <p class="text-sm text-gray-500">Ready to continue learning</p>

          <div class="input mt-5 w-full flex flex-col gap-4">
            <!-- Student Name & ID -->
            <div class="flex gap-3 bg-[#F8FAFC] p-3 rounded-lg">
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
            <div class="flex flex-col gap-3 bg-[#F8FAFC] p-3 rounded-lg">
              <div class="flex items-center gap-2">
                <BookOpen class="text-[#64748B] w-5 h-5" />
                <span class="text-slate-500"> Position: </span>
                <span
                  class="font-medium text-blue-400 ms-2 bg-[#DCE6F7] p-1 rounded-lg"
                  >{{ user?.role }}</span
                >
              </div>

              <div class="flex items-center gap-2">
                <School class="text-[#64748B] w-5 h-5" />
                <span class="text-slate-500"> Branch: </span>
                <span
                  class="font-medium text-blue-400 ms-2 border p-1 rounded-lg"
                  >{{ user?.branch }}</span
                >
              </div>
            </div>
          </div>
        </template>
      </form>
    </div>

    <!-- right (مشترك في الحالتين) -->
    <div
      class="right bg-[#2E69EC] static w-full h-full hidden lg:flex flex-col items-center justify-center text-white text-2xl font-bold"
      style="
        background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'0.3\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
      ">
      <div
        class="bg-[#2e6aecd8] py-10 relative w-full h-full flex flex-col items-center justify-center">
        <div class="top-title flex flex-col items-center">
          <div class="p-5 rounded-2xl bg-[#5b8af0e7] mb-4 inline-block border">
            <School class="w-10 h-10" />
          </div>
          <h2 class="mb-4 font-bold text-4xl">Your School Name</h2>
          <p class="text-md font-normal">Excellence in Education</p>
          <p
            class="mt-2 text-center max-w-sm text-sm font-medium text-gray-300">
            Empowering minds and shaping futures through innovative learning
            experiences
          </p>
        </div>

        <div class="cards grid grid-cols-2 gap-6 p-6 mt-5">
          <div
            v-for="card in cards"
            :key="card.title"
            class="card border border-[#c1d3f9c4] bg-[#5b8af0c4] rounded-xl px-12 py-8 hover:bg-[#7a9eeb] transition-all">
            <div class="top-title flex flex-col items-center">
              <component :is="card.icon" class="w-8 h-8 mb-3" />
              <h2 class="font-bold text-2xl">{{ card.title }}</h2>
              <p class="mt-2 text-center max-w-[240px] text-sm font-medium">
                {{ card.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
