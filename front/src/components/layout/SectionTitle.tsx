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
			<h2 className="max-sm:pt-6 pt-12 px-6 font-subtitle text-5xl/10 text-h2 font-semibold">
				<p className="text-white pl-5 tracking-wide">{sectionTitle.part1}</p>

				<p className=" tracking-wide">{sectionTitle.part2}</p>
			</h2>
		</div>
	);
}
