<script lang="ts">
  import data from './assets/elections.json'
  import type {Election, Referendum} from './lib/elections.type'
  import EventBlock from './lib/EventBlock.svelte';
  import Footer from './lib/Footer.svelte';

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

  const now = new Date().getTime()
  const timeToNearestEvent = Math.min(
      ...electionData
        .filter((event) => {
          if (new Date(event.endDate).getTime() < now) {
            return false
          }
          return true
        })
        .map((event) => {
          const timeToStart = new Date(event.startDate).getTime() - now
          // TODO: Assumption that all elections take 24 hours from start to end does not have to be valid
          return timeToStart >= -24 * 60 * 60 * 1000 ? timeToStart : Infinity
        })
  )
  console.log(timeToNearestEvent)
  // When multiple elections happen on the same date, they are all nearest
  const nearestEvents = electionData.filter((el) => {
    return new Date(el.startDate).getTime() - now == timeToNearestEvent
  })
  console.log(nearestEvents)
</script>

<div class="fixed top-0 left-0 w-screen bg-white bg-opacity-50"><h1 class="mx-auto my-2">Kdy budou volby?</h1></div>
<main>

  <div class="container flex flex-col mt-10">
    {#each electionData as election}
      <EventBlock election="{election}" firstInLine="{nearestEvents.includes(election)}" />
    {/each}
  </div>

</main>

<Footer />

<style>
</style>
