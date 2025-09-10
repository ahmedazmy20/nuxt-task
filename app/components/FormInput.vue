<script setup lang="ts">
import { useRouter } from "vue-router";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

// schema with required + custom rules
const schema = toTypedSchema(
  z.object({
    id: z
      .string()
      .nonempty("Id is required")
      .min(3, "Id must be at least 3 characters")
      .max(6, "Id must be less than 7 characters"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be less than 9 characters"),

    // test custom validation rules ar / en
    arabicField: z
      .string()
      .nonempty("هذا الحقل مطلوب")
      .regex(/^[\u0600-\u06FF\s]+$/, "الرجاء إدخال حروف عربية فقط"),
    englishField: z
      .string()
      .nonempty("This field is required")
      .regex(/^[A-Za-z\s]+$/, "Please enter English letters only"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    id: "",
    password: "",
  },
});

const isLoading = ref(false);
const router = useRouter();

const user = useState("user", () => ({
  id: "",
  role: "",
  branch: "",
  arabicField: "",
  englishField: "",
}));

// login function with validation  & simulate backend call
const login = handleSubmit(async (values) => {
  isLoading.value = true;
  setTimeout(() => {
    user.value.id = values.id;
    user.value.arabicField = values.arabicField;
    user.value.englishField = values.englishField;
    user.value.role = "";
    user.value.branch = "";
    router.push("/choose-role");
    isLoading.value = false;
  }, 1500);
});
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4">
    <form @submit.prevent="login">
      <div
        class="flex flex-col bg-[#fcf9f8] justify-center items-center gap-3 md:min-w-md rounded-2xl px-8 py-14 mx-auto shadow-2xl">
        <h1 class="text-xl md:text-3xl font-bold">Welcome to Learning</h1>
        <p class="md:font-semibold text-gray-500 text-center">
          Access your educational dashboard
        </p>

        <div class="input mt-10 w-full flex flex-col gap-4">
          <!-- Staff/Student ID -->
          <div class="flex flex-col gap-1">
            <label for="id" class="text-sm font-medium text-gray-700">
              Staff/Student ID
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="id">
              <UInput v-bind="field" type="text" placeholder="Enter your ID" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm font-medium text-gray-700">
              Password
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="password">
              <UInput
                v-bind="field"
                type="password"
                placeholder="Enter your password" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
          </div>

          <!-- Arabic Only Input -->
          <div class="flex flex-col gap-1">
            <label for="arabicField" class="text-sm font-medium text-gray-700">
              الاسم بالعربية فقط
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="arabicField">
              <UInput
                v-bind="field"
                type="text"
                placeholder="أدخل نص بالعربية فقط" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
          </div>

          <!-- English Only Input -->
          <div class="flex flex-col gap-1">
            <label for="englishField" class="text-sm font-medium text-gray-700">
              English Name Only
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="englishField">
              <UInput
                v-bind="field"
                type="text"
                placeholder="Enter text in English only" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
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
  </div>
</template>
