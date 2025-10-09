export default function Gallery() {
	return (
		<section
			id="gallery"
			className="text-center flex items-center bg-[url('/images/background.jpg')] text-white h-screen overflow-y-scroll snap-y snap-proximity"
		>
			<div className="pt-24 pl-24">
				<p className="font-subtitle text-5xl text-h2 font-bold">notre</p>
				<p className="font-subtitle text-5xl font-bold">brasserie</p>
			</div>
		</section>
	);
}
