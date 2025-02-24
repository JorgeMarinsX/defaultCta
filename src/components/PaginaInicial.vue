<template>
  <div class="w-full h-4/6 flex flex-col items-center content-center p-6">
    <h1 class="text-2xl font-bold mb-6">Gerador de CTAs - Central Nutrition</h1>

    <div class="grid grid-cols-3 gap-6">
      <router-link
        to="/formToFu"
        class="flex flex-col items-center justify-center filter drop-shadow w-32 h-32 bg-emerald-300 rounded-lg text-center font-bold hover:bg-cyan-300 transition-colors duration-500"
      >
        <img src="\lampada-de-ideia.png" alt="Ícone Topo de Funil" class="mb-2 w-20" />
        <span class="text-white">Topo de Funil</span>
      </router-link>

      <router-link
        to="/formMoFu"
        class="flex flex-col items-center justify-center filter drop-shadow w-32 h-32 bg-emerald-300 rounded-lg text-center font-bold hover:bg-cyan-300 transition-colors duration-500"
      >
        <img src="\design-thinking.png" alt="Ícone Meio de Funil" class="mb-2 w-20" />
        <span class="text-white">Meio de Funil</span>
      </router-link>

      <router-link
        to="/formBoFu"
        class="flex flex-col items-center justify-center filter drop-shadow w-32 h-32 bg-emerald-300 rounded-lg text-center font-bold hover:bg-cyan-300 transition-colors duration-500"
      >
        <img src="\money-bag.png" alt="Ícone Fundo de Funil" class="mb-2 w-20" />
        <span class="text-white">Fundo de Funil</span>
      </router-link>
    </div>
  </div>
</template>
