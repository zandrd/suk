<script lang="ts">
	// For now we'll use a hardcoded version until we set up proper version loading
	const version = '0.1.1';
</script>

<svelte:head>
	<title>SUK - Fast & Lightweight Svelte UI Kit | CLI Component Distribution</title>
	<meta name="description" content="SUK is a modern CLI-based component distribution system for Svelte 5. Copy components directly to your project with perfect tree-shaking and zero bundle overhead. Fast, lightweight, and experimental." />
	<meta name="keywords" content="svelte, ui kit, components, cli, svelte 5, tree-shaking, component library, typescript, tailwind css, pnpm" />
	<meta name="author" content="Andrés Mardones" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://suk.zandr.dev/" />
	<meta property="og:title" content="SUK - Fast & Lightweight Svelte UI Kit" />
	<meta property="og:description" content="CLI-based component distribution for Svelte 5 with perfect tree-shaking and zero bundle overhead." />
	<meta property="og:image" content="https://suk.zandr.dev/og-image.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://suk.zandr.dev/" />
	<meta property="twitter:title" content="SUK - Fast & Lightweight Svelte UI Kit" />
	<meta property="twitter:description" content="CLI-based component distribution for Svelte 5 with perfect tree-shaking and zero bundle overhead." />
	<meta property="twitter:image" content="https://suk.zandr.dev/og-image.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://suk.zandr.dev/" />
	
	<!-- Favicon -->
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	
	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

	<!-- Structured Data -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "SUK",
			"description": "CLI-based component distribution system for Svelte 5",
			"applicationCategory": "DeveloperApplication",
			"operatingSystem": "Cross-platform",
			"url": "https://suk.zandr.dev",
			"author": {
				"@type": "Person",
				"name": "Andrés Mardones",
				"email": "talk@zandr.dev"
			},
			"downloadUrl": "https://www.npmjs.com/package/@zandrd/suk",
			"version": "0.1.1",
			"license": "MIT"
		}
	</script>
</svelte:head>

<!-- Development Banner -->
<div class="bg-gradient-to-r from-rose-700 to-red-600 py-3 px-4">
	<div class="container mx-auto text-center">
		<p class="text-white text-sm font-medium">
			🚧 Website in development • 
			<a href="https://github.com/zandrd/suk" class="underline hover:no-underline font-semibold">
				Want to contribute?
			</a>
		</p>
	</div>
</div>

<!-- Hero Section - 60% Black dominant -->
<section class="relative min-h-screen bg-black overflow-hidden">
	<!-- Subtle wine gradient background - 10% accent -->
	<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(136,19,55,0.04)_0%,rgba(0,0,0,1)_80%)]"></div>
	
	<!-- Fine grid pattern -->
	<div class="absolute inset-0 bg-[linear-gradient(rgba(136,19,55,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(136,19,55,0.04)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

	<div class="relative z-10 min-h-screen flex items-center py-16 lg:py-0">
		<div class="container mx-auto px-6 lg:px-8">
			<div class="max-w-7xl mx-auto">
				<!-- Two column layout -->
				<div class="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
					<!-- Left column: Title and description (7 columns) -->
					<div class="lg:col-span-7 text-center lg:text-left">
						<h1 class="mb-8">
							<span class="bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent font-bold block mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight" style="font-family: 'JetBrains Mono', monospace;">
								SUK
							</span>
							<span class="text-neutral-300 font-medium block text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
								Svelte UI Kit
							</span>
						</h1>
						
						<p class="text-lg sm:text-xl lg:text-2xl text-neutral-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12">
							CLI-based component distribution for Svelte 5.
						</p>
					</div>

					<!-- Right column: Terminal and CTAs (5 columns) -->
					<div class="lg:col-span-5 flex flex-col">
						<!-- Terminal Demo -->
						<div class="mb-8 p-6 bg-neutral-950/40 border border-neutral-800/50 rounded-2xl backdrop-blur-sm">
							<div class="flex items-center gap-2 mb-6">
								<div class="w-3 h-3 rounded-full bg-neutral-700"></div>
								<div class="w-3 h-3 rounded-full bg-neutral-700"></div>
								<div class="w-3 h-3 rounded-full bg-neutral-700"></div>
							</div>
							<div class="space-y-4 font-mono text-sm lg:text-base">
								<div class="text-neutral-500">$ pnpm add -g @zandrd/suk</div>
								<div class="text-neutral-500">$ suk init</div>
								<div class="text-neutral-400">$ suk add button</div>
								<div class="text-neutral-500">✓ Component added</div>
							</div>
						</div>

						<!-- CTAs -->
						<div class="flex flex-col gap-4">
							<a 
								href="#components"
								class="px-8 py-4 bg-rose-700 hover:bg-rose-600 text-white font-medium rounded-xl transition-colors duration-200 text-center text-lg"
							>
								Get Started
							</a>
							<a 
								href="https://github.com/zandrd/suk"
								class="px-8 py-4 text-neutral-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-3 text-lg"
							>
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
								View on GitHub
							</a>
						</div>
					</div>
				</div>
				
				<!-- Status info at the bottom -->
				<div class="flex items-center justify-center gap-6 text-sm text-neutral-600 mt-16 lg:mt-24">
					<span>🧪 Experimental</span>
					<span>•</span>
					<span>v{version}</span>
					<span>•</span>
					<span>Fast & lightweight</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Components Section - Back to black (60%) -->
<section id="components" class="py-20 sm:py-32 bg-black">
	<div class="container mx-auto px-4 sm:px-6">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-2xl sm:text-3xl md:text-4xl font-light text-white text-center mb-16 sm:mb-20">
				What's being built
			</h2>
			
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
				<!-- Form Components -->
				<div>
					<h3 class="text-sm font-medium text-rose-700 mb-6 uppercase tracking-wider">Form</h3>
					<div class="space-y-4">
						<div class="flex justify-between items-center py-2">
							<span class="text-neutral-300">Button</span>
							<span class="px-2 py-1 bg-yellow-500/20 rounded text-yellow-300 text-xs">
								⚠️ Experimental
							</span>
						</div>
						<div class="flex justify-between items-center py-2 opacity-60">
							<span class="text-neutral-500">Input</span>
							<span class="px-2 py-1 bg-neutral-800/50 rounded text-neutral-500 text-xs">
								Coming Soon
							</span>
						</div>
					</div>
				</div>
				
				<!-- Layout Components -->
				<div>
					<h3 class="text-sm font-medium text-rose-700 mb-6 uppercase tracking-wider">Layout</h3>
					<div class="space-y-4">
						<div class="flex justify-between items-center py-2">
							<span class="text-neutral-300">Container</span>
							<span class="px-2 py-1 bg-yellow-500/20 rounded text-yellow-300 text-xs">
								⚠️ Experimental
							</span>
						</div>
						<div class="flex justify-between items-center py-2 opacity-60">
							<span class="text-neutral-500">Grid</span>
							<span class="px-2 py-1 bg-neutral-800/50 rounded text-neutral-500 text-xs">
								Coming Soon
							</span>
						</div>
						<div class="flex justify-between items-center py-2 opacity-60">
							<span class="text-neutral-500">Flex</span>
							<span class="px-2 py-1 bg-neutral-800/50 rounded text-neutral-500 text-xs">
								Coming Soon
							</span>
						</div>
					</div>
				</div>
				
				<!-- Display Components -->
				<div>
					<h3 class="text-sm font-medium text-rose-700 mb-6 uppercase tracking-wider">Display</h3>
					<div class="space-y-4">
						<div class="flex justify-between items-center py-2 opacity-60">
							<span class="text-neutral-500">Card</span>
							<span class="px-2 py-1 bg-neutral-800/50 rounded text-neutral-500 text-xs">
								Coming Soon
							</span>
						</div>
						<div class="flex justify-between items-center py-2 opacity-60">
							<span class="text-neutral-500">Badge</span>
							<span class="px-2 py-1 bg-neutral-800/50 rounded text-neutral-500 text-xs">
								Coming Soon
							</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="text-center mt-16">
				<a 
					href="https://github.com/zandrd/suk#components"
					class="inline-flex items-center gap-2 px-6 py-3 border border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-white transition-colors rounded-lg"
				>
					View All Components
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Footer - Deepest black -->
<footer class="py-12 sm:py-16 bg-black border-t border-neutral-800">
	<div class="container mx-auto px-4 sm:px-6">
		<div class="max-w-4xl mx-auto text-center">
			<div class="mb-8">
				<div class="font-mono text-neutral-700 text-sm mb-4">
					<pre class="inline-block leading-tight">{`  ____  _   _ _  __
 / ___|| | | | |/ /
 \\___ \\| | | | ' / 
  ___) | |_| | . \\ 
 |____/ \\___/|_|\\_\\`}</pre>
				</div>
			</div>
			
			<div class="flex flex-wrap justify-center gap-8 mb-8 text-sm">
				<a href="https://github.com/zandrd/suk" class="text-neutral-600 hover:text-white transition-colors">GitHub</a>
				<a href="https://www.npmjs.com/package/@zandrd/suk" class="text-neutral-600 hover:text-white transition-colors">NPM</a>
				<a href="mailto:talk@zandr.dev" class="text-neutral-600 hover:text-white transition-colors">Contact</a>
			</div>
			
			<div class="text-neutral-700 text-xs">
				<p>MIT License © <a href="https://zandr.dev" class="hover:text-rose-700 transition-colors">Zandrd</a></p>
				<p class="mt-2">
					<em>This is my first library - any recommendations, feedback, or contributions are more than welcome!</em>
				</p>
			</div>
		</div>
	</div>
</footer>