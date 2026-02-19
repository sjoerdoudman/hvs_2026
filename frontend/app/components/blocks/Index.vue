<template>
  <template v-if="data && data.length" v-for="(block, index) in data" :key="`${block.type}${index}`">
    <component
      :context="context"
      :is="getComponentName(block.type)"
      :data="block"
    ></component>
  </template>
</template>
<script lang="ts" setup>
// Import all available block components explicitly
import BlocksTitle from './Title.vue'
import BlocksMakers from './Makers/Index.vue'
import BlocksQuote from './Quote.vue'
import BlocksSlideShow from './SlideShow.vue'
import BlocksPlayList from './PlayList/Index.vue'
import BlocksUpdates from './Updates/Index.vue'
import BlocksMultiColumn from './MultiColumn/Index.vue'
import BlocksMedia from './Media.vue'
import BlocksNews from './News/Index.vue'
import BlocksCta from './Cta.vue'
import BlocksTextImage from './TextImage.vue'
import BlocksPeople from './People/Index.vue'

type Block = {
  type: string;
  [key: string]: any;
};

const props = withDefaults(
  defineProps<{
    context?: string;
    data: Block[];
  }>(),
  {
    context: 'default',
  },
);

// console.log('blocks', props.data)

// Component mapping for explicit resolution
const componentMap = {
  title: BlocksTitle,
  quote: BlocksQuote,
  slideshow: BlocksSlideShow,
  playlist: BlocksPlayList,
  updates: BlocksUpdates,
  makers: BlocksMakers,
  multicolumn: BlocksMultiColumn,
  media: BlocksMedia,
  news: BlocksNews,
  cta: BlocksCta,
  textimage: BlocksTextImage,
  people: BlocksPeople
};

const getComponentName = (type: string) => {
  if (!type) return null;

  // Convert to lowercase for mapping
  const normalizedType = type.toLowerCase().replace(/[-_]/g, '');

  return componentMap[normalizedType] || null;
};
</script>
