<script lang="ts">
	let {
		label,
		checked = $bindable(false),
		onchange,
		class: className = ''
	}: {
		label: string;
		checked?: boolean;
		onchange?: (event: Event) => void;
		class?: string;
	} = $props();
</script>

<label class={`widget-toggle flex items-center gap-2.5 text-[13px] ${className}`}>
	<input class="min-h-4 w-4 accent-[var(--accent)]" type="checkbox" bind:checked {onchange} />
	<span>{label}</span>
</label>
