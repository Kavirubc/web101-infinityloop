export default function Page({ params }: { params: { slug: string } }) {

    function capitalizeFirstLetter(string: any) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <main className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white">
            <h1 className="text-2xl font-bold">
                Hello {capitalizeFirstLetter(params.slug)}!
            </h1>
        </main>
    )
}