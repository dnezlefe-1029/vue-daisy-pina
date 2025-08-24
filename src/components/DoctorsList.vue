<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDoctorsStore } from '@/stores/doctors';
import { useRouter } from 'vue-router';

const router = useRouter();
const doctorState = useDoctorsStore();
doctorState.fetchDoctors();

const goTo = (id: number | string) => {
  router.push(`/${id}`)
}

const hasItems = computed(() => Array.isArray(doctorState.items) && doctorState.items.length > 0)

</script>
<template>
  <div className="rounded-box shadow-md bg-base-100">
    <div class="p-4 pb-2 text-xs opacity-60 tracking-wide">Available Doctors</div>
    <table className="table">
      <thead>
        <tr>
          <th class="w-5"></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>State</th>
          <th class="w-10">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="doctorState.isLoading"> 
          <tr>
            <td colspan="5">
              <div className="text-center"><span className="loading loading-dots loading-xl"></span></div>
            </td>
          </tr>
        </template>
        <template v-else-if="doctorState.error"> 
          <tr>
            <td colspan="5">
              <div className="text-center">{{ doctorState.error }}</div>
            </td>
          </tr>
        </template>
        <template v-else-if="hasItems"> 
          <tr v-for="(it, index) in doctorState.items" :key="it.id" :data-test-id="it.id">
            <th>{{ index + 1 }}</th>
            <td>{{ it.firstName }}</td>
            <td>{{ it.lastName }}</td>
            <td class="text-xs uppercase font-semibold opacity-60">{{ it.state }}</td>
            <td>
              <div className="dropdown dropdown-end">
                <button type="button" class="btn btn-ghost btn-sm" aria-haspopup="menu" :aria-controls="'doctor-actions-' + String(it.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
                <ul :id="'doctor-actions-' + String(it.id)" role="menu" className="border dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li role="none">
                    <a role="menuitem" data-test="details-link" href="#" @click.prevent="goTo(it.id)">Details</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="5" class="text-center">No doctors found</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
