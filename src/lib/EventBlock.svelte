<script lang="ts">
  import fullNames from '../assets/fullNamesMap.json'
  import type { Election, Referendum } from './elections.type'

  export let election: Election | Referendum
  export let firstInLine: boolean

  const currentYear = new Date().getFullYear()
  const now = new Date().getTime()
  /**
   * Yes, this code is kind of reinventing the wheel, but the svelte-time lib didn't work...
   * @param date
   */
  const formatDate = (date: string) => {
    if (date.length <= 4) {
      return date
    }
    const monthWords = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince']
    const eventDate = new Date(date)
    const y = eventDate.getFullYear()
    const m = monthWords[eventDate.getMonth()]
    const d = eventDate.getDate()
    const daysToEvent = (eventDate.getTime() - now) / (1000 * 60 * 60 * 24)
    if (daysToEvent < 0) {
      return `dnes`
    }
    if (daysToEvent < 1) {
      return `zítra`
    }
    if (daysToEvent < 4) {
      return `za ${Math.ceil(daysToEvent)} dny`
    }
    if (currentYear == y) {
      return `${d}. ${m}`
    }
    return `${d}. ${m} ${y}`
  }

  const isPastElection = () => {
    const eventTime = new Date(election.endDate).getTime()
    if (eventTime < now) {
      return true
    }
    return false
  }
</script>

<div class="m-2" class:hidden="{isPastElection()}" class:my-6="{firstInLine}">
<div class="text-2xl" class:text-7xl="{firstInLine}" class:font-bold="{firstInLine}">
  {formatDate(election.startDate ?? `${election.year}`)}
</div>
<div class="text-gray-700 m-1" class:text-2xl="{firstInLine}">
  {election.type == 'referendum' ? election.name : fullNames[election.type]}{election.round ? `, ${election.round}. kolo` : ''}
  <br>
</div>
{#if election.type == 'senat' || election.type == 'senat-doplnovaci'}
  v okrscích {election.precincts.join(', ')}
{/if}
</div>

<style></style>
