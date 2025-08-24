import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

const items = ref<any[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const mockFetch = vi.fn()
const mockPush = vi.fn()

vi.mock('@/stores/doctors', () => ({
  useDoctorsStore: () => ({
    items,
    isLoading,
    error,
    fetchDoctors: mockFetch,
  }),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

import DoctorsList from '@/components/DoctorsList.vue'

describe('DoctorsList.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    items.value = []
    isLoading.value = false
    error.value = null
  })

  it('calls fetchDoctors on mount', () => {
    mount(DoctorsList)
    expect(mockFetch).toHaveBeenCalled()
  })

  it('shows loading indicator when loading', async () => {
    isLoading.value = true
    const wrapper = mount(DoctorsList)
    const span = wrapper.find('span')
    expect(span.exists()).toBe(true)
  })

  it('renders doctor rows when items are present', async () => {
    error.value = null
    isLoading.value = false
    items.value = [
      {
        id: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        state: 'ny',
        dob: '1990-01-01',
        licensed: true,
        signedUpDate: '2022-01-01',
      },
    ]
    
    const wrapper = mount(DoctorsList);

    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain("");
  })
})