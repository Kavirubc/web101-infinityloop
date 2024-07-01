'use client'

import React, { useState } from 'react';
import { MoveRight } from 'lucide-react';
import { sendMail } from "../api/mail";
import Swal from 'sweetalert2';

function Page() {
    const [formData, setFormData] = useState({ name: '', email: '' });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        Swal.fire({
            title: 'Registering...',
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            await sendMail(formData);
            Swal.fire({
                icon: 'success',
                title: 'Please check your mail!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User already exists or server error.',
            });
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white max-w-2xl">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 items-left">
                    <label htmlFor="name" className="text-white text-lg font-bold">Join us</label>
                    <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your first name"
                        className="border text-white border-white bg-transparent p-1"
                        value={formData.name}
                        onChange={handleInputChange}
                        aria-label="Enter your first name"
                    />
                    <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="border text-white border-white bg-transparent p-1"
                        value={formData.email}
                        onChange={handleInputChange}
                        aria-label="Enter your email"
                    />
                </div>
                <div>
                    <button type="submit" className="px-4 py-1 border border-white hover:bg-orange-600">
                        <span className="flex flex-row gap-2">Join community <MoveRight /></span>
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Page;
