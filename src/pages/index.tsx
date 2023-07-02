import Jumbo from "@/components/landing/jumbo/index.jumbo";
import Navbar from "@/components/navbar/index.navbar";
import Head from "next/head";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>
          Dr Passy Amaraegbu | Living a life of purity, power and prosperity
        </title>
        <meta
          name="description"
          content="Dr Passy Amaraegbu is a father, psychologist and pastor specializing in solving long standing issues in the lives of people"
        />
      </Head>
      <Jumbo />
      <Navbar />
    </Fragment>
  );
}
