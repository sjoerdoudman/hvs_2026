import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    isHome: true,
    theme: 'darkblue',
    menuOpen: false,
    isEndHeroHome: false,
    hideFooter: false,
    footerIsFocusable: false
  }),

  actions: {
    updateTheme(payload: string) {
      this.theme = payload;
    },
    toggleMenuOpen(payload: boolean) {
      this.menuOpen = payload
    },
    toggleHome(payload: boolean) {
      this.isHome = payload
    },
    toggleIsEndHeroHome(payload: boolean) {
      this.isEndHeroHome = payload
    },
    toggleHideFooter(payload: boolean) {
      this.hideFooter = payload
    },
    toggleFooterIsFocusable(payload: boolean) {
      this.footerIsFocusable = payload
    }
  },
});
