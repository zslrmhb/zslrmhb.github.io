export type TocHeadingInput = { id: string; text: string; level: 2 | 3 };
export type TocHeading = TocHeadingInput & { number?: string };

export function isTerminalHeading(text: string) {
	return /^(references|appendix)$/i.test(text.trim());
}

export function numberHeadings(headings: TocHeadingInput[]): TocHeading[] {
	let number = 0;
	return headings.map((heading) => {
		if (isTerminalHeading(heading.text)) return { ...heading };
		return { ...heading, number: String(++number).padStart(2, '0') };
	});
}
