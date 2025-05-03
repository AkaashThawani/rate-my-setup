import SetupGallery from "./SetupGallery";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HeroSection() {
    return (<div className="bg-black text-white flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl mb-4">Rate My Setup</h1>
        <p className="text-center mb-4">A platform to share and rate your setup</p>
        <Button variant="secondary" className="mb-12 bg-white  text-black py-2 px-4 rounded cursor-pointer transition duration-300" asChild>
            <Link href="/setupdetails" className="text-black">Get Started</Link>
        </Button>
        <div> <SetupGallery></SetupGallery></div>
    </div>)
}
