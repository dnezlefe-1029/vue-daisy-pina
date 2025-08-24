import { defineStore } from "pinia";
import api from "@/lib/api";
import type { IDoctor, InitState } from "@/types";

const mockData = [
  {
    "id": "7a12b4ef-5f44-4f9e-a4e2-d2a96a8e874a",
    "firstName": "Laura",
    "lastName": "Brown",
    "state": "NY",
    "dob": "1968-12-13",
    "licenseActive": false,
    "signedUpDate": "2021-01-30"
  },
  {
    "id": "a40cd172-76e3-4f38-9e1b-5e122c29c1b1",
    "firstName": "Michael",
    "lastName": "Jones",
    "state": "MI",
    "dob": "1985-08-13",
    "licenseActive": true,
    "signedUpDate": "2020-07-25"
  }
]

export const useDoctorsStore = defineStore("doctors", {
  state: (): InitState<IDoctor> => ({
    loading: false,
    error: null,
    items: [],
  }),
  actions: {
    async fetchDoctors() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get("/");
        this.items = response.data;
      } catch (error) {
        this.error = "Failed to fetch doctors";
      } finally {
        this.loading = false;
      }
    },
  },
});
