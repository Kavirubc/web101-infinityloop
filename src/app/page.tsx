'use client';

import { use, useState } from 'react';
import Link from "next/link";
import { MoveRight } from 'lucide-react';
import { createUser } from "./api/action";
import { useRouter } from 'next/navigation';

export default function Home() {
  const Router = useRouter();



  const [formData, setFormData] = useState({ name: '', email: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await createUser(formData);
      setFeedback({ message: 'Successfully joined the community!', type: 'success' });
      setFormData({ name: '', email: '' });
    } catch (error) {
      setFeedback({ message: 'Error: User already exists or server error.', type: 'error' });
    }
    Router.push(formData.name);


  }

  return (
    <main className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white max-w-2xl">
      <h1 className="text-2xl font-bold">Hey there,</h1>
      <p>
        I&apos;m Kaviru and you can find this repo on my <Link className="text-indigo-400 underline" href="https://github.com/Kavirubc" target="_blank">Github</Link>. Feel free to follow me as well.
      </p>
      <div className="mb-10 md:mb-5">
        <h2 className="text-xl mt-10 font-bold text-black">
          <span className="bg-white py-1 px-2">Instructions for the web 101</span>
        </h2>
      </div>
      <p>
        First you need to install <span className="bg-white text-black px-2"><strong>VS Code</strong></span>. You can use this <Link className="text-indigo-400 underline" href="https://code.visualstudio.com/download" target="_blank">link</Link> to download it.
      </p>
      <p>
        Then you need to install the extension <span className="bg-white text-black px-2"><strong>Live Server</strong></span> from VS Code extension packs. And here&apos;s a <Link className="text-indigo-400 underline" href="https://www.youtube.com/watch?v=9kEOkw_LvGU" target="_blank">video</Link> that shows how to do that.
      </p>
      <p>Other than that I&apos;ll post the repo link for the session before the session starts.</p>
      <div className="flex flex-row gap-x-4">
        <div>
          <button className="px-4 py-1 border border-white hover:bg-indigo-600">
            <Link href="#">Repo Link</Link>
          </button>
        </div>
        <div>
          <button className="px-4 py-1 border border-white hover:bg-orange-600">
            <Link href="#">Slides</Link>
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-400 hover:text-slate-100">
        <sup>*</sup>Slides will be available after the session.
      </p>
      <p>
        If you are interested here&apos;s my <Link className="text-indigo-400 underline" href="https://kh.ko-de.org/" target="_blank">portfolio</Link>.
      </p>
      <div className="border p-5 border-white/50">
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
          {feedback.message && (
            <p className={`mt-4 ${feedback.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {feedback.message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
