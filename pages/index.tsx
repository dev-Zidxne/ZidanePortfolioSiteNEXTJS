import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zidane's Portfolio</title>
      </Head>
      <Header />

      <h1 className="p-10 text-blue-500"></h1>
    </div>
  );
};

export default Home;
