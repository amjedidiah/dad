import ChooseHim from "@/components/landing-page/choose-him/index.choose";
import Jumbo from "@/components/landing-page/jumbo/index.jumbo";
import Navbar from "@/components/shared/navbar/index.navbar";
import TalkingSection from "@/components/landing-page/who-talking/index.talking";
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
      <Navbar/>
      <ChooseHim/>
      <TalkingSection/>
    </Fragment>
  );
}
