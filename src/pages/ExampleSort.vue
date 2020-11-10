<template>
  <div class="example-sort">
    <!-- sort select -->
    <select v-model="selectedSort">
      <option
        v-for="option in sortOptions"
        :key="option.id"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div>
      selected: {{ selectedSort }}
    </div>

    <!-- list -->
    <ul>
      <li
        v-for="item in sortedList"
        :key="item.id"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SortUtils, SortQuery } from '@/plugins/sortUtils';
import { ExampleCodeUtils } from '@/plugins/exampleCodeUtils';

interface SelectedSortOption {
  value: SortQuery;
  text: string;
}

const sortOptions: SelectedSortOption[] = [
  { value: { sortOrders: ['asc'], sortKeys: ['text'] }, text: 'A-Z' },
  { value: { sortOrders: ['desc'], sortKeys: ['text'] }, text: 'Z-A' },
  { value: { sortOrders: ['asc'], sortKeys: ['id'] }, text: 'ID昇順' },
  { value: { sortOrders: ['desc'], sortKeys: ['id'] }, text: 'ID降順' }
];

@Component
export default class ExampleSort extends Vue {
  private list = ExampleCodeUtils.createSampleList();

  private sortOptions = sortOptions;

  private selectedSort = SortUtils.getSortURLQuery() || sortOptions[2].value;

  private get sortedList() {
    return SortUtils.sort(this.list, this.selectedSort);
  }
}
</script>
