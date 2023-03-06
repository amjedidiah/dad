import PageJumbo from "@/stories/page-jumbo/page-jumbo";
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
      <PageJumbo />
      {/* <InfoContainer maxWidth="laptopL">
        <Box>
          <NameTypography variant="h6" component="h2">
            Dr. Passy Amaraegbu
          </NameTypography>
          <Typography>Father | Psychologist, Ph.D | Pastor, D.Min</Typography>
        </Box>
      </InfoContainer> */}
    </Fragment>
  );
}
