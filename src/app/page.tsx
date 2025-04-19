import Hero from "@/components/Hero";
import Market from "@/components/Market";

export default function Home() {
	return (
		<main className="w-full flex flex-col items-center justify-start py-6 px-12 gap-12">
			<Hero />
			<Market />
		</main>
	);
}
