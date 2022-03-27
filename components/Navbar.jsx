import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeMenu from "./ThemeMenu";

export default function Navbar({ data, setFiles }) {
  const [input, setInput] = useState("");
  // handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    if (input === "") {
      setFiles(data);
    } else {
      const filtered = data.filter((file) =>
        file.name.toLowerCase().includes(input.toLowerCase())
      );
      setFiles(filtered);
    }
  }, [input]);
  return (
    <div className="navbar bg-base-100 shadow-lg lg:px-8">
      <div className="navbar-start">
        <a className="normal-case text-xl text-primary font-bold">コンテナ</a>
      </div>
      <div className="navbar-center">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">Kontena</a>
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeMenu />
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered input-primary"
              value={input}
              onChange={handleChange}
            />
            <button className="btn btn-square btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
