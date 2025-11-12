export type SectionTitleProps = {
	part1: string;
	part2: string;
};
export default function SectionTitle({
	sectionTitle,
}: {
	sectionTitle: SectionTitleProps;
}) {
	return (
		<div className="self-start">
			<h2 className="max-sm:pt-12 pt-18 px-6 font-subtitle text-5xl/10 text-h2 font-semibold">
				<p className="pl-5">{sectionTitle.part1}</p>

				<p className="text-white tracking-wide">{sectionTitle.part2}</p>
			</h2>
		</div>
	);
}
