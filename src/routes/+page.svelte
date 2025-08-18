<script lang="ts">
  // SUK - Svelte UI Kit Development Environment
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
        SUK
      </h1>
      <p class="text-xl text-slate-300 mb-2">Svelte UI Kit</p>
      <p class="text-slate-400">
        CLI-based component distribution system for Svelte 5
      </p>
    </div>
    
    <div class="grid gap-6 md:grid-cols-2">
      <!-- CLI Commands -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">CLI Commands</h2>
        <div class="space-y-2 font-mono text-sm">
          <div class="text-orange-400">suk init</div>
          <div class="text-slate-400">Initialize SUK in your project</div>
          
          <div class="text-orange-400 mt-3">suk add [component]</div>
          <div class="text-slate-400">Add components to your project</div>
          
          <div class="text-orange-400 mt-3">suk list</div>
          <div class="text-slate-400">List available components</div>
          
          <div class="text-orange-400 mt-3">suk remove [component]</div>
          <div class="text-slate-400">Remove components from project</div>
        </div>
      </div>

      <!-- Features -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Features</h2>
        <ul class="space-y-2 text-slate-300">
          <li class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            Copy-paste distribution
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            Perfect tree-shaking
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            Svelte 5 with runes
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            TypeScript ready
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            Tailwind CSS integration
          </li>
        </ul>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="mt-8 bg-slate-800/30 border border-slate-700 rounded-lg p-6">
      <h2 class="text-xl font-semibold text-white mb-4">Getting Started</h2>
      <div class="space-y-3">
        <div class="bg-slate-900 rounded p-3 font-mono text-sm">
          <span class="text-slate-400"># Install globally</span><br/>
          <span class="text-orange-400">npm install -g @zandrd/suk</span>
        </div>
        <div class="bg-slate-900 rounded p-3 font-mono text-sm">
          <span class="text-slate-400"># Initialize in your project</span><br/>
          <span class="text-orange-400">suk init</span>
        </div>
        <div class="bg-slate-900 rounded p-3 font-mono text-sm">
          <span class="text-slate-400"># Add components</span><br/>
          <span class="text-orange-400">suk add button card dialog</span>
        </div>
      </div>
    </div>
  </div>
</div>
