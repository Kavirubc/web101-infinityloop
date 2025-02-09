'use client';
import { useState } from 'react';
import Link from "next/link";
import { MoveRight } from 'lucide-react';
import { createUser } from "./api/action";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { sendMail } from "./api/mail";

export default function Home() {
  const router = useRouter();

  // create a push for the param.name
  function push(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push(`/${formData.name}`);
    setFormData({ name: '', email: '' });
  }

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    Swal.fire({
      title: 'Submitting...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      
      await createUser(formData);
      Swal.fire({
        icon: 'success',
        title: 'Successfully joined the community!',
        showConfirmButton: false,
        timer: 1500
      });

      setSubmitted(true);
      sendMail(formData);
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
      <div className="flex flex-col gap-y-2 md:flex-row gap-x-4">
        <div>
          <button className="px-4 py-1 border border-white hover:bg-indigo-600">
            <Link target='_blank' href="https://github.com/Kavirubc/intro-to-web">Repo Link</Link>
          </button>
        </div>
        <div>
          <button className="px-4 py-1 border border-white hover:bg-orange-600">
            <Link target='_blank' href="https://www.canva.com/design/DAGIoaUn4CA/2MkIJzkRTEV_YkFaI_mudQ/edit?utm_content=DAGIoaUn4CA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">Slides</Link>
          </button>
        </div>
        <div>
          <button className="px-4 py-1 border border-white hover:bg-orange-600">
            <Link target='_blank' href="https://forms.gle/ZqiHGwLbUTrkUBiVA">Submission link</Link>
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-400 hover:text-slate-100">
        <sup>*</sup>Slides are available now.
      </p>
      <p>
        If you are interested here&apos;s my <Link className="text-indigo-400 underline" href="https://kh.ko-de.org/" target="_blank">portfolio</Link>.
      </p>
      <div className="border p-5 border-white/50">
        {submitted ? (
          <div className='flex flex-col gap-3'>
            <h2 className="text-xl font-bold">Thank you for joining the community!</h2>
            <p className="text-sm text-slate-400">You will receive an email within next 2 weeks with the next steps.</p>
            <button onClick={push} className="px-4 py-1 border border-white hover:bg-white hover:text-black">
              <span className="flex flex-row gap-2">Continue to community page<MoveRight /></span>
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </main>
  );
}
