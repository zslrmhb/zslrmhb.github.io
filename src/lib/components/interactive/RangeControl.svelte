<script lang="ts">
	let {
		label,
		min,
		max,
		step,
		value = $bindable(0),
		suffix = '',
		oninput,
		class: className = ''
	}: {
		label: string;
		min: number;
		max: number;
		step: number;
		value?: number;
		suffix?: string;
		oninput?: (event: Event) => void;
		class?: string;
	} = $props();
</script>

<label class={`widget-range flex items-center gap-2.5 text-[13px] ${className}`}>
	<span>{label}</span>
	<output class="w-8 text-right">{value}{suffix}</output>
	<input
		class="min-h-8 w-[100px] accent-[var(--accent)]"
		type="range"
		{min}
		{max}
		{step}
		bind:value
		{oninput}
	/>
</label>
