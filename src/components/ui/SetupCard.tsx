import Image from 'next/image';



export default function SetupCard({ imageSrc, title }: { imageSrc: string; title: string }) {
    return (
        <div className="h-fit shadow-md rounded-lg p-1">
            <Image
                src={imageSrc}
                alt="Setup 1"
                width={300}
                height={200}
                className="rounded-lg mb-4"
            />
            {/* <h2 className="text-xl font-semibold">{title}</h2> */}
        </div>
    )
}