<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div
    class="flex flex-col items-center place-content-center w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-no-repeat"
  >
    <div class="flex flex-col h-6/7 p-8 bg-slate-100 rounded-xl">
      <header class="flex flex-col w-full justify-center items-center mt-5 mb-5">
        <img
          alt="Central Nutrition"
          src="@/assets/logo.png"
          width="125"
          height="125"
          class="mb-5"
        />
        <nav class="flex place-content-around p-3 w-full">
          <RouterLink to="/" class="text-white bg-emerald-500 rounded-sm p-2">Início</RouterLink>
          <RouterLink to="/formtofu" class="text-white bg-emerald-500 rounded-sm p-2"
            >Topo de funil</RouterLink
          >
          <RouterLink to="/formmofu" class="text-white bg-emerald-500 rounded-sm p-2"
            >Meio de funil</RouterLink
          >
          <RouterLink to="/formbofu" class="text-white bg-emerald-500 rounded-sm p-2"
            >Fundo de funil</RouterLink
          >
        </nav>
      </header>
      <div class="w-x flex flex-col h-full">
        <RouterView />
      </div>
      <footer>
        Orgulhosamente desenvolvido pelo setor de marketing (por incrível que pareça) :)
      </footer>
    </div>
  </div>
</template>
