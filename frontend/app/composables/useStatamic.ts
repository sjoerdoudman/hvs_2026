import { useStatamicStore } from "~/stores/statamic";
import { storeToRefs } from 'pinia'

export const useStatamic = () => {
  const store = useStatamicStore()
  const config = useRuntimeConfig()

  const { data: pagesData, pending: pagesPending, error: pagesError } = useFetch(
    `${config.public.API_URL}/collections/pages/entries?fields=id,slug,title,description,images,blocks,color,blueprint,seo_title,seo_description,social_title,social_description,social_description,social_image`,
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

  const { data: mainMenuData, pending: mainMenuPending, error: mainMenuError } = useFetch(
    `${config.public.API_URL}/navs/main/tree?fields=title,url&max_depth=2`,
    {
      key: 'statamic-main-menu',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  const { data: footerMenuData, pending: footerMenuPending, error: footerMenuError } = useFetch(
    `${config.public.API_URL}/navs/footer/tree?fields=title,url&max_depth=2`,
    {
      key: 'statamic-footer-menu',
      server: false, // Only run on client side for now
      transform: (response: any) => response.data,
    }
  )

  const { data: globalData, pending: globalPending, error: globalError } = useFetch(
    `${config.public.API_URL}/globals`,
    {
      key: 'statamic-globals',
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

  // Update main menu data
  watchEffect(() => {
    mainMenuData.value
    if (mainMenuData.value) {
      store.setMainMenu(mainMenuData.value)
    }
  })

  // Update footer menu data
  watchEffect(() => {
    footerMenuData.value
    if (footerMenuData.value) {
      store.setFooterMenu(footerMenuData.value)
    }
  })

  // Update globals data
  watchEffect(() => {
    globalData.value
    if (globalData.value) {
      store.setGlobals(globalData.value)
    }
  })

  return {
    pages: storeToRefs(store).pages,
    news: storeToRefs(store).news,
    makers: storeToRefs(store).makers,
    projects: storeToRefs(store).projects,
    events: storeToRefs(store).events,
    mainMenu: storeToRefs(store).mainMenu,
    globals: storeToRefs(store).globals,
    loading: computed(() => pagesPending.value || newsPending.value || makersPending.value || projectsPending.value || eventsPending.value) || mainMenuPending.value || footerMenuPending.value || globalPending.value,
    error: computed(() => pagesError.value || newsError.value || makersError.value || projectsError.value || eventsError.value) || mainMenuError.value || footerMenuError.value || globalError.value,
  }
}