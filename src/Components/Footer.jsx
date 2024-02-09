import { FaLinkedinIn, FaGithub, FaHeart, FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="z-10 w-full mt-24 bg-tailwindColorGray footer">
      <div className="grid items-center grid-cols-3 p-8 mobile_s:grid-cols-1 gap-x-4 footer-wrapper tablet_778:grid-cols-2 laptop_1592:flex laptop_1592:items-center laptop_1592:justify-between">
        <div className="text-center footer-made-by tablet_778:col-span-2 laptop_1592:col-span-0">
          <h2 className="w-full mb-4 text-4xl text-center">
            Made with {""}
            <FaHeart className="inline-block" /> {""}
            by <b>JustHasan</b> on {""}
            Github
          </h2>
          <p className="items-center mb-4 text-2xl text-center">
            Contact me on
          </p>
          <div className="flex justify-center text-4xl gap-x-4">
            <a
              href="https://www.linkedin.com/in/hasan-basri-60a638240/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn className="font-black transition-all duration-300 ease-in-out hover:text-bright" />
            </a>
            <a
              href="https://www.instagram.com/hassan_ve/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="font-black transition-all duration-300 ease-in-out hover:text-bright" />
            </a>
            <a
              href="https://github.com/Just-Hasan"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="font-black transition-all duration-300 ease-in-out hover:text-bright" />
            </a>
          </div>
        </div>

        <div className="footer-about">
          <h2 className="mb-4 text-4xl font-black text-center">About</h2>
          <p className="w-full text-2xl text-center">
            KawaiiKorner is an Anime Website where you can search information
            about your favourite anime
          </p>
        </div>

        <div className="footer-portofolio">
          <h2 className="mb-4 text-4xl font-black text-center">Portofolio</h2>
          <p className="w-full text-2xl text-center">
            Check my other works in my personal portofolio website<br></br>
            Click{" "}
            <a
              href="https://hassanbasri-portofolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="font-black underline"
            >
              Here
            </a>
          </p>
        </div>
      </div>
      <p className="p-8 text-lg text-center bg-slate-950">
        All rights reserved &copy; Copyright {new Date().getFullYear()}. Created
        by Hasan Basri with ReactJS Framework & TailwindCSS
      </p>
    </footer>
  );
}
