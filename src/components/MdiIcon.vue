<script lang="ts" setup>
import * as AllIcons from '@mdi/js';
import { computed } from 'vue';

type IconName = keyof typeof AllIcons | string;

interface Props {
    icon: IconName;
}

const props = withDefaults(defineProps<Props>(), {
});

const getIconPath = (iconName: string): string => {
    return (AllIcons as Record<string, string>)[iconName];
};

const path = computed(() =>
    getIconPath(props.icon)
);
</script>

<template>
    <svg fill="currentColor" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" v-if="path !== null"
        v-bind="$attrs">
        <path :d="path"></path>
    </svg>
</template>
