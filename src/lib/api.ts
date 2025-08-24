import axios, { AxiosError } from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  // config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
  config.headers["Authorization"] = `Bearer dGhpcyBpcyBzdXBlciBzYWZlLiBqdXN0IHRydXN0IG1lLiBoZWhl`
  return config
})

const showDaisyToast = (message: string, duration = 2500) => {
  if (typeof document === "undefined") return
  const wrapper = document.createElement("div")
  wrapper.className = "toast fixed bottom-4 right-4 z-50"
  wrapper.innerHTML = `
    <div class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"/>
        </svg>
        <span>${message}</span>
      </div>
    </div>
  `
  document.body.appendChild(wrapper)
  setTimeout(() => wrapper.remove(), duration)
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    if (status === 401) {
      try {
        // localStorage.removeItem("token")
        showDaisyToast("Unauthorized access. Redirecting to login...", 2200)
        setTimeout(() => {
          window.location.href = "/login"
        }, 2300)
      } catch (err) {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export default api
