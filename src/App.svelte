<script lang="ts">
  import data from './assets/elections.json'
  import type {Election, Referendum} from './lib/elections.type'
  import Block from './lib/Block.svelte';

  const sortByStartDate = (a: Election | Referendum, b: Election | Referendum) => {
    // When exact startDate is not available, compare just by year
    if (!a.startDate || !b.startDate) {
      return a.year > b.year ? 1 : -1
    }
    return new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? 1 : -1
  }
  console.log(data)
  const electionData = [...data.main, ...data.auxillary, ...data.referendums].sort(sortByStartDate)
  console.log(electionData)
</script>

<main>
  <h1>Kdy budou volby?</h1>

  {#each electionData as election}
  <div class="container flex">
    <Block election={election} />
  </div>
  {/each}

</main>

<style>
@tailwind base;

@tailwind components;

@tailwind utilities;
</style>
