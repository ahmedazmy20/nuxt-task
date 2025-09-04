<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  School,
  BadgeCheck,
} from "lucide-vue-next";

const router = useRouter();
const user = useState("user");

const roles = [
  {
    icon: GraduationCap,
    role: "Administrator",
    numBranchs: "3 branches available",
  },
  { icon: GraduationCap, role: "Teacher", numBranchs: "2 branches available" },
  {
    icon: GraduationCap,
    role: "Student Affairs",
    numBranchs: "1 Main Campusvailable",
  },
];

const branches = [
  { icon: School, name: "Main Campus" },
  { icon: School, name: "North Branch" },
  { icon: School, name: "South Branch" },
];

const selectedRole = ref("");
const selectedBranch = ref("");

// Filter branches based on selected role
const filteredBranches = computed(() => {
  if (selectedRole.value === "Administrator") {
    return branches;
  } else if (selectedRole.value === "Teacher") {
    return branches.filter(
      (b) => b.name === "Main Campus" || b.name === "North Branch"
    );
  } else if (selectedRole.value === "Student Affairs") {
    return branches.filter((b) => b.name === "South Branch");
  }
  return [];
});

const continueDashboard = () => {
  if (selectedRole.value && selectedBranch.value) {
    user.value.role = selectedRole.value;
    user.value.branch = selectedBranch.value;
    router.push("/");
  }
};
const BackToLogin = () => {
  user.value.id = "";
  user.value.role = "";
  user.value.branch = "";
  router.push("/");
};
</script>

<template>
  <div class="bg-[#F4F8FE]">
    <!-- Back to Home -->
    <div class="p-5 flex items-center justify-between">
      <button
        class="hover:bg-blue-500 font-semibold px-4 py-2 rounded-md transition-colors duration-200 flex"
        @click="BackToLogin">
        <ArrowLeft class="text-sm me-2" />Back to Login
      </button>
      <div>
        <p>Welcome, {{ user?.id }}</p>
        <p class="text-sm text-end text-gray-500">ID: {{ user?.id }}</p>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center min-h-screen gap-6 pb-10">
      <!-- icon -->
      <div
        class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <span class="text-2xl"><BookOpen class="text-blue-500 w-9 h-9" /></span>
      </div>

      <!-- title -->
      <h1 class="text-3xl font-bold">Choose Your Role</h1>

      <!-- description -->
      <p class="text-gray-600 text-center max-w-lg">
        Select your position and branch to access your personalized dashboard
      </p>

      <!-- select roles -->
      <div class="flex gap-16 mt-5">
        <div
          v-for="role in roles"
          :key="role.role"
          class="flex bg-[#F8FAFC] border-2 justify-center items-center flex-col shadow-md p-6 rounded-lg cursor-pointer px-14 py-10 transition"
          :class="
            selectedRole === role.role ? 'border-blue-500' : 'border-gray-200'
          "
          @click="
            selectedRole = role.role;
            selectedBranch = '';
          ">
          <div
            class="w-16 h-16 flex items-center justify-center rounded-full bg-[#DBEAFE]">
            <component :is="role.icon" class="text-blue-600 w-10 h-10" />
          </div>
          <h2 class="font-semibold mt-3 mb-2">{{ role.role }}</h2>
          <p class="text-[#626e7e] mb-5">{{ role.numBranchs }}</p>
          <strong v-if="selectedRole === role.role">
            <BadgeCheck class="w-6 h-6 text-blue-600" />
          </strong>
        </div>
      </div>

      <!-- select branch -->
      <div
        v-if="selectedRole"
        class="flex flex-col gap-4 mt-8 px-5 py-10 rounded-2xl items-center bg-[#ffffff] min-w-[920px]">
        <h2 class="text-xl font-semibold">Select Your Branch</h2>

        <div class="flex items-start gap-10 mt-4 w-full">
          <div
            v-for="branch in filteredBranches"
            :key="branch.name"
            class="flex justify-center items-center shadow-md rounded-lg cursor-pointer px-8 py-4 gap-5 border-2 transition"
            :class="
              selectedBranch === branch.name
                ? 'border-blue-500'
                : 'border-gray-200'
            "
            @click="selectedBranch = branch.name">
            <div
              class="w-16 h-16 flex items-center justify-center text-2xl rounded-2xl bg-[#F1F5F9]">
              <component :is="branch.icon" class="w-8 h-8 text-[#45556C]" />
            </div>
            <div class="flex flex-col">
              <h2 class="font-bold">{{ branch.name }}</h2>
              <p>Branch Location</p>
            </div>
            <strong v-if="selectedBranch === branch.name">
              <BadgeCheck class="w-6 h-6 text-blue-600" />
            </strong>
          </div>
        </div>
      </div>

      <!-- Continue Button -->
      <button
        :disabled="!selectedBranch"
        class="text-white px-11 py-2 rounded-xl font-bold text-xl duration-200 mt-6 transition-all"
        :class="[
          !selectedBranch
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600',
        ]"
        @click="continueDashboard">
        Continue to Dashboard
      </button>
    </div>
  </div>
</template>
