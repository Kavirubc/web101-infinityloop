import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white">
      <h1 className="text-2xl font-bold">
        Hey there,
      </h1>
      <p>
        I&apos;m Kaviru and you can find this repo on my <Link className="text-indigo-400 underline" href="https://github.com/Kavirubc" target="_blank">Github</Link>. Feel free to follow me as well.
      </p>
      <div className="mb-10 md:mb-5">
        <h2 className="text-xl mt-10  font-bold  text-black">
          <span className="bg-white py-1 px-2">
            Instructions for the web 101
            </span>
        </h2>
      </div>
      
      <p>
        First you need to install <span className="bg-white text-black px-2"><strong>VS Code</strong></span>. You can use this <Link className="text-indigo-400 underline" href="https://code.visualstudio.com/download" target="_blank">link</Link>  to download it.
      </p>
      <p>Then you need to install the extention <span className="bg-white text-black px-2 "><strong>Live Server</strong></span>  from VS code extention packs. And here&apos;s a <Link className="text-indigo-400 underline" href="https://www.youtube.com/watch?v=9kEOkw_LvGU" target="_blank">video</Link>  that shows how to do that.</p>
      <p>
        Other than that I&apos;ll post the repo link for the session before the session starts.
      </p>
      <div className="flex flex-row gap-x-4">
        <div>
          <button className="px-4 py-2 border border-white hover:bg-indigo-600 ">
            <Link href="#">Repo Link</Link>
          </button>
        </div>
        <div>
          <button className="px-4 py-2 border border-white hover:bg-orange-600 ">
            <Link href="#">Slides</Link>
          </button>
        </div>
       

      </div>
      <p className="text-sm text-slate-400 hover:text-slate-100 ">
        <sup>*</sup>Slides will be avaiable after the session.
      </p>
      <p>
        If you are interested here&apos;s my  <Link className="text-indigo-400 underline" href="https://kh.ko-de.org/" target="_blank">portfolio</Link>.
      </p>
    </main>
  );
}
