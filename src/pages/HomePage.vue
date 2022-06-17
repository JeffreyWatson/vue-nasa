<template>
  <div class="d-flex justify-content-center bg-dark">
    <label for="datepicker"
      >Choose Any Date. Not from the future though!
    </label>
    <input
      class="ms-3 mb-2"
      type="date"
      id="datepicker"
      name="datepicker"
      v-model="datePicker"
      @change="getApodByDate()"
    />
  </div>
  <div
    class="home d-flex flex-column justify-content-start"
    :style="`background-image: url(${apod.url})`"
  >
    <p class="text-light text-center border-bottom m-2">
      <b>{{ apod.date }}</b>
    </p>
    <h1 class="my-1 bg-dark text-white p-3 rounded text-center">
      {{ apod.title }}
    </h1>
    <p class="text-light text-uppercase mt-2 mb-0">{{ apod.explanation }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { apodService } from "../services/ApodService";

export default {
  name: "home",
  setup() {
    const datePicker = ref("");
    onMounted(async () => {
      try {
        await apodService.getApod();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      datePicker,
      apod: computed(() => AppState.apod),
      async getApodByDate() {
        try {
          await apodService.getApodByDate(datePicker.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  background-size: cover;
}
</style>