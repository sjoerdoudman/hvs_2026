import { useStatamicStore } from "~/stores/statamic";
import { storeToRefs } from 'pinia'

export const useStatamicMakers = () => {
  const store = useStatamicStore()
  const config = useRuntimeConfig()

  const { data, pending, error } = useFetch(
    'https://hvs.test/api/collections/makers/entries?fields=id,slug,title,function,description,image',
    {
      key: 'statamic-makers',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  console.log('makers data:', data)

  watchEffect(() => {
    if (data.value) {
      store.setMakers(data.value)
    }
  })

  return {
    makers: storeToRefs(store).makers,
    loading: pending,
    error,
  }
}