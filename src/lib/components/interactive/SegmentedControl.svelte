<script module lang="ts">
	export type SegmentOption<T extends string> = { value: T; label: string };
</script>

<script lang="ts" generics="T extends string">
	let {
		label,
		options,
		value = $bindable(options[0]?.value),
		onchange,
		class: className = ''
	}: {
		label: string;
		options: SegmentOption<T>[];
		value?: T;
		onchange?: (event: Event) => void;
		class?: string;
	} = $props();

	function select(next: T, event: Event) {
		value = next;
		onchange?.(event);
	}
</script>

<fieldset class={`widget-segmented m-0 min-w-0 border-0 p-0 text-[13px] ${className}`}>
	<legend class="mb-2 text-xs text-[var(--muted)]">{label}</legend>
	<div class="flex gap-2" role="group" aria-label={label}>
		{#each options as option (option.value)}
			<button
				type="button"
				class="flex-1 px-2 py-2 text-xs aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-[var(--paper)]"
				aria-pressed={value === option.value}
				onclick={(event) => select(option.value, event)}>{option.label}</button
			>
		{/each}
	</div>
</fieldset>
