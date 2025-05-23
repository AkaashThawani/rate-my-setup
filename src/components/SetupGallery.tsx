
import SetupCard from "./ui/SetupCard";
import { prisma } from "@/lib/prisma";


export default async function SetupGallery() {

    // Fetch setups from the database using Prisma
    const setups = await prisma.setup.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });



    return (
        <div className="flex flex-row flex-nowrap items-stretch justify-center bg-transparent h-full w-1/2 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {setups.map((setup) => {
                    return <ul key={setup.id}><SetupCard imageSrc={setup.imageUrl} title={setup.title} /></ul>
                })}
            </div>
        </div>
    );
}