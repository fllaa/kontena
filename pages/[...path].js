import { useEffect, useState } from "react";
import Head from "next/head";
import {
  BsLayoutWtf,
  BsList,
  BsGrid,
  BsFolder2,
  BsFileEarmark,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { themeChange } from "theme-change";
import Navbar from "../components/Navbar";
import ListFile from "../components/ListFile";

export default function Home({ data }) {
  const router = useRouter();
  const { path } = router.query;
  const [files, setFiles] = useState(data);
  const [layout, setLayout] = useState("list");
  useEffect(() => {
    themeChange(false);
  }, []);
  console.log(path);
  return (
    <div>
      <Head>
        <title>Kontena</title>
      </Head>
      <Navbar />
      <div className="flex justify-between items-center mx-8 mt-4 lg:mx-24 lg:mt-12 bg-primary text-primary-content rounded-tl rounded-tr shadow-2xl px-4 py-2">
        <div className="text-sm breadcrumbs">
          <ul>
            {path.map((item, index) => (
              <li key={index}>
                <a>
                  <BsFolder2 className="mr-1" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost">
            <BsLayoutWtf className="mr-2" />
            Layout
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-52"
          >
            <li>
              <a
                onClick={() => setLayout("list")}
                className={
                  layout === "list" ? "bg-primary text-primary-content" : ""
                }
              >
                <BsList />
                List
              </a>
            </li>
            <li>
              <a
                onClick={() => setLayout("grid")}
                className={
                  layout === "grid" ? "bg-primary text-primary-content" : ""
                }
              >
                <BsGrid />
                Grid
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${
          layout === "list" ? "flex flex-col" : "grid grid-cols-4"
        } mx-8 mb-4 lg:mx-24 lg:mb-12 bg-neutral text-neutral-content rounded-bl rounded-br shadow-2xl`}
      >
        {files.map((file) => (
          <ListFile key={file.id} file={file} layout={layout} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/v1/gdrive");
  const data = await res.json();
  return {
    props: { data },
  };
}
