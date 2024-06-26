export default function Page({ params }: { params: { slug: string } }) {

    function capitalizeFirstLetter(string: any) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <main className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white max-w-2xl">
            <h1 className="text-2xl font-bold">
                Hello {capitalizeFirstLetter(params.slug)}!
            </h1>
            <p>
                Due to the upcoming workload over the next few months, I won&apos;t be able to build this project. If anyone is interested in creating a  web dev community around undergrads of UCSC, please reach out to me. I&apos;m happy to provide any necessary support and assistance.

            </p>
            <p>
                Whatsapp - +94 71 777 9334
            </p>
            <p>Thank you.</p>
            <p>BR, Kaviru H.</p>
        </main>
    )
}