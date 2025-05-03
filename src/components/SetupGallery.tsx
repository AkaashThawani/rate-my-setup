
import Image from "next/image";

export default function SetupGallery() {
    return (
        <div className="flex flex-row flex-nowrap items-stretch justify-center bg-transparent h-full w-1/2 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example setup cards */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <Image
                        src="/setup1.jpg"
                        alt="Setup 1"
                        width={300}
                        height={200}
                        className="rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold">User Setup 1</h2>
                    <p className="text-gray-600">Description of setup 1</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <Image
                        src="/setup2.jpg"
                        alt="Setup 2"
                        width={300}
                        height={200}
                        className="rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold">User Setup 2</h2>
                    <p className="text-gray-600">Description of setup 2</p>
                </div>
                {/* Add more setup cards as needed */}
            </div>
        </div>
    );
}