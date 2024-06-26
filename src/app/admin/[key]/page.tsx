'use client';
import React, { useState, useEffect } from "react";
import { getDelegates } from "../../api/action";
import { useRouter, usePathname } from 'next/navigation';

type Submission = {
    name: string;
    email: string;
};

async function fetchSubmissions(): Promise<Submission[]> {
    try {
        const submissions = await getDelegates();
        return submissions.map(submission => ({
            name: submission.name,
            email: submission.email,
        }));
    } catch (error) {
        console.error("Error retrieving submissions:", error);
        return [];
    }
}

function DisplayAllSubmissions() {
    const router = useRouter();
    const pathname = usePathname();
    const key = pathname.split('/').pop(); // Extract key from URL
    const isAdmin = key === process.env.NEXT_PUBLIC_ADMIN_KEY;

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSubmissions();
            setSubmissions(data);
            setLoading(false);
        };

        fetchData(); // Fetch immediately on mount
        const intervalId = setInterval(fetchData, 86400000); // Refresh every 24 hours

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white max-w-2xl">
            {isAdmin ? (
                <>
                    <h1 className="text-3xl font-bold text-left mb-6 text-white">Submissions</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-white divide-y divide-gray-200">
                            {submissions.map((submission, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {submission.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {submission.email}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="text-center text-white">Hi! Please use the correct admin key.</div>
            )}
        </div>
    );
}

function Page() {
    return (
        <div className="py-10">
            <DisplayAllSubmissions />
        </div>
    );
}

export default Page;
