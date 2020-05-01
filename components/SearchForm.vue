
<template>
    <form action="/search" method="GET">
        <input 
            class="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" 
            type="search" 
            name="term"
            placeholder="Search...">

        <button
            type="submit" 
            class="bg-purple-800 float-right text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            href="/search">
            Search
        </button>
    </form>
</template>
<script>
export default {
  data() {
    return {
      }
  }
}
</script>