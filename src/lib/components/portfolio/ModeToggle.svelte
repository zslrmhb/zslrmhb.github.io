<script lang="ts">
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
   
    import { setMode, mode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";

    function handleModeChange() {
		if (mode.current === "light") {
			setMode("dark");
		} else {
			setMode("light");
		}
	}
	
	let { size = "default", variant = "ghost", class: className = "" } = $props();
</script>
   
<Button 
  onclick={handleModeChange} 
  {variant} 
  size={size === "small" ? "sm" : "icon"} 
  class={size === "small" ? `h-8 w-8 p-0 rounded-full cursor-pointer hover:bg-accent ${className}` : `size-12 rounded-full cursor-pointer ${className}`}
>
  <Sun
    class={`${size === "small" ? "h-4 w-4" : "h-[1.2rem] w-[1.2rem]"} rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
  />
  <Moon
    class={`absolute ${size === "small" ? "h-4 w-4" : "h-[1.2rem] w-[1.2rem]"} rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
  />
  <span class="sr-only">Toggle theme</span>
</Button>
