import Jumbo from "@/components/jumbo/index.jumbo";
import TalkingSection from "@/components/who-talking/index.talking";
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
      <TalkingSection/>
    </Fragment>
  );
}
