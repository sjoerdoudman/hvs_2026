import { useUIStore } from "~/stores/ui"

// @ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  // const config = useRuntimeConfig();
  const ui = useUIStore();
  const { menuOpen } = storeToRefs(ui);
  const { toggleMenuOpen, toggleHome } = ui;
  // const { isHome } = storeToRefs(ui)

  if (to.path !== "/") {
    toggleHome(false);
  }

  if (menuOpen.value) {
    toggleMenuOpen(false);
  }
});
