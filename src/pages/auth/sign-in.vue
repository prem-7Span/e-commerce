<template>
  <div
    class="flex items-center justify-center min-h-screen px-2 py-12 bg-white md:px-5"
  >
    <div
      class="container w-full px-8 py-6 text-center bg-white rounded-lg shadow-md md:text-left md:max-w-md"
    >
      <div class="text-2xl animate_animated animate_fadeIn">Sign In</div>

      <div class="flex flex-col mt-2 space-y-2">
        <input
          v-model="phoneNumber"
          type="text"
          maxlength="10"
          placeholder="Mobile Number"
          class="px-3 py-2 text-gray-700 transition duration-200 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-700 hover:border-indigo-500"
        />
        <p class="mt-2 text-primary-200">{{ errors.phoneNumber }}</p>
      </div>

      <div class="flex items-center space-x-2">
        <input
          v-model="termsAccepted"
          type="checkbox"
          id="terms"
          class="w-4 h-4 accent-indigo-500 focus:ring-2 focus:ring-indigo-500"
        />
        <label for="terms" class="mb-2 text-sm text-gray-700">
          By continuing you agree to website's Terms & Conditions and Privacy
          Policy
        </label>
      </div>

      <button
        :disabled="!termsAccepted"
        type="button"
        class="w-full px-4 py-2 font-medium text-center text-white transition duration-200 ease-in-out rounded-md bg-primary-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
        @click="checkPhoneNumberAvailability"
      >
        Continue
      </button>
      <div id="recaptcha-container"></div>

      <div class="mt-6 text-sm text-center text-gray-500">
        Don’t have an account?

        <router-link :to="{ name: 'SignUp' }" class="text-primary-200"
          >Sign Up</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import authentication from "@/plugins/firebase.js"; // Assuming a Firebase authentication config
import { useToast } from "vue-toastification";
import SignUp from "@/pages/auth/sign-up.vue";
import { RouterLink } from "vue-router";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },

  data() {
    return {
      phoneNumber: undefined,
      termsAccepted: false,
      errors: {},
    };
  },
  methods: {
    generateCaptcha() {
      console.log("Entering generateCaptcha method");
      this.recaptchaVerifier = new RecaptchaVerifier(
        authentication,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha response:", response);
          },
        }
      );
    },
    async checkPhoneNumberAvailability() {
      if (!this.phoneNumber) {
        this.errors.phoneNumber = "Phone Number is required";
        return;
      }

      try {
        const response = await axios.post("http://13.233.85.16/api/v1/login", {
          mobileNo: this.phoneNumber,
        });

        console.log(":in error:,", response);
        if (response.data.sucess) {
          this.errors.phoneNumber = undefined;
          console.log("Phone number is available:", this.phoneNumber);
          this.submitForm();
        } else {
          console.log(":in error:");
          this.toast.error("Account not available, Please sign up");
          this.errors.phoneNumber = this.$router.push({ name: "SignUp" });
          //   // "Phone Number is not available. Please sign up.";
        }
      } catch (error) {
        this.toast.error("Account not available, please sign up");
        this.errors.phoneNumber = this.$router.push({ name: "SignUp" });
        //   "Phone Number is not available. Please sign up.";
        console.error("Error checking phone number availability:", error);
      }
    },
    submitForm() {
      console.log(
        "Form submitted successfully (client-side validation passed)"
      );
      if (!this.recaptchaVerifier) {
        console.log("Generating Captcha...");
        this.generateCaptcha();
      } else {
        console.log(
          "RecaptchaVerifier already created:",
          this.recaptchaVerifier
        );
      }
      this.toast.success("Sign-in successful");
      this.verifyPhoneNumber();
    },
    async verifyPhoneNumber() {
      try {
        const phoneNumberVerification = await signInWithPhoneNumber(
          authentication,
          `+91${this.phoneNumber}`,
          this.recaptchaVerifier
        );
        console.log(
          "Phone number verification successful:",
          phoneNumberVerification
        );
        this.$router.push({
          name: "VerificationOtp", // Assuming a route for verification
          query: { obj: phoneNumberVerification.verificationId },
        });
      } catch (error) {
        console.error("Error during phone number verification:", error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    },
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
  },
};
</script>