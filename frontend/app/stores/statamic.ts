import { defineStore } from 'pinia';

export const useStatamicStore = defineStore('statamic', {
  state: () => ({
    pages: [] as any[],
    news: [] as any[],
    makers: [] as any[],
    projects: [] as any[],
    events: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    setPages(pages: any[]) {
      this.pages = pages
    },

    setNews(news: any[]) {
      this.news = news
    },

    setMakers(makers: any[]) {
      this.makers = makers
    },

    setProjects(projects: any[]) {
      this.projects = projects
    },

    setEvents(events: any[]) {
      this.events = events
    },

    setLoading(value: boolean) {
      this.loading = value
    },

    setError(error: string | null) {
      this.error = error
    },
  },
});
