export default defineNuxtPlugin(() => {
  const softHyphen = '\u00AD'
  const applySoftHyphen = (str: string) => str?.replace(/~/g, softHyphen) ?? ''

  return {
    provide: {
      softHyphen: applySoftHyphen
    }
  }
})