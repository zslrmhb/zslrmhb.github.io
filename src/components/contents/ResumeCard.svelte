<script lang="ts">
        export let logoUrl: string = '';
	export let company: string = '';
	export let title: string = '';
	export let subtitle: string = '';
	export let href: string = '';
	export let badges: string[]=[''];
	export let description: string = '';
	export let start: string = '';
	export let end: string = '';
	let isExpanded = false;

        let handleClick = (e: MouseEvent) => {
		if (description) {
			e.preventDefault();
			isExpanded = !isExpanded;
		}
	};
</script>