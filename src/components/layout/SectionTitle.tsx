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
			<h2 className="max-sm:pt-12 pt-18 px-6 font-subtitle text-5xl text-h2 font-semibold ">
				{sectionTitle.part1}
				<br />
				<span className="text-white tracking-wide">{sectionTitle.part2}</span>
			</h2>
		</div>
	);
}
