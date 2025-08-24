<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDoctorsStore } from '@/stores/doctors';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const doctorState = useDoctorsStore();

const doctorId = computed(() => route.params.id);

const doctor = computed(() => {
  return doctorState.items.find(d => d.id === doctorId.value);
}); 

const goBack = () => {
  router.back();
};

</script>
<template>
  <div>
    <div class="flex mb-2 gap-1 content-center">
      <button class="btn btn-ghost" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      </button>
      <div class="text-xl font-bold mt-1.5">Doctor Info</div>
    </div>
  </div>
  <div className="rounded-box shadow-md bg-base-100 p-4">
    <div v-if="doctor">
      <ul class="space-y-2">
        <li><strong>Name:</strong> {{ doctor.firstName }} {{ doctor.lastName }}</li>
        <li><strong>State:</strong> {{ doctor.state?.toUpperCase() }}</li>
        <li><strong>Date of Birth:</strong> {{ doctor.dob }}</li>
        <li><strong>Licensed:</strong> {{ doctor.licensed ? 'Yes' : 'No' }}</li>
        <li><strong>Signed Date:</strong> {{ doctor.signedUpDate }}</li>
      </ul>
    </div>

    <div v-else>
      <p class="text-error">Doctor not found for id: {{ id }}</p>
    </div>
  </div>
</template>