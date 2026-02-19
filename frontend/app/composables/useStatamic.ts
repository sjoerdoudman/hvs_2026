import { useStatamicStore } from "~/stores/statamic";
import { storeToRefs } from 'pinia'

export const useStatamicPages = () => {
  const store = useStatamicStore()
  const config = useRuntimeConfig()

  const { data: pagesData, pending: pagesPending, error: pagesError } = useFetch(
    `${config.public.API_URL}/collections/pages/entries?fields=id,slug,title,description,images,blocks,color,blueprint`,
    {
      key: 'statamic-pages',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  const { data: newsData, pending: newsPending, error: newsError } = useFetch(
    `${config.public.API_URL}/collections/news/entries?fields=id,slug,title,description,date,image,text,blocks,makers,categories,url`,
    {
      key: 'statamic-news',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  const { data: makersData, pending: makersPending, error: makersError } = useFetch(
    `${config.public.API_URL}/collections/makers/entries?fields=id,slug,title,description,date,image,blocks,url,function`,
    {
      key: 'statamic-makers',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  const { data: projectsData, pending: projectsPending, error: projectsError } = useFetch(
    `${config.public.API_URL}/collections/projects/entries?fields=id,slug,title,description,date,image,blocks,url,makers,running,year`,
    {
      key: 'statamic-projects',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  const { data: eventsData, pending: eventsPending, error: eventsError } = useFetch(
    `${config.public.API_URL}/collections/events/entries?fields=id,slug,title,description,date,event_title,project,location,city,ticket_status,ticket_url`,
    {
      key: 'statamic-events',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  // Update pages data
  watchEffect(() => {
    if (pagesData.value) {
      store.setPages(pagesData.value)
    }
  })

  // Update news data
  watchEffect(() => {
    if (newsData.value) {
      store.setNews(newsData.value)
    }
  })

  // Update makers data
  watchEffect(() => {
    if (makersData.value) {
      store.setMakers(makersData.value)
    }
  })

  // Update projects data
  watchEffect(() => {
    if (projectsData.value) {
      store.setProjects(projectsData.value)
    }
  })

  // Update events data
  watchEffect(() => {
    if (eventsData.value) {
      store.setEvents(eventsData.value)
    }
  })

  return {
    pages: storeToRefs(store).pages,
    news: storeToRefs(store).news,
    makers: storeToRefs(store).makers,
    projects: storeToRefs(store).projects,
    events: storeToRefs(store).events,
    loading: computed(() => pagesPending.value || newsPending.value || makersPending.value || projectsPending.value || eventsPending.value),
    error: computed(() => pagesError.value || newsError.value || makersError.value || projectsError.value || eventsError.value),
  }
}