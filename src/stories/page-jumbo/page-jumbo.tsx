import useMobileDetect from "@/hooks/use-mobile-detect/use-mobile-detect";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Link from "next/link";
import { PartnerButton, ImageBox } from "./page-jumbo.style";

export default function PageJumbo() {
  const { isMobile } = useMobileDetect();

  return (
    <Box height="80%">
      <Container maxWidth="laptopM" sx={{ height: "100%" }}>
        <Grid
          container
          sx={{ mt: 0, alignItems: "center" }}
          height="100%"
          gap={{ tablet: 2, laptop: 4 }}
        >
          <Grid fontSize={"1.5rem"}>
            <Typography variant="h4" component="h1" fontWeight={100}>
              Looking for <br />
              <Typography
                component="span"
                className="huge"
                fontWeight={300}
                lineHeight={1}
                fontSize={{
                  tabletL: "2.5em",
                }}
              >
                SOLUTION
              </Typography>
              <br /> to long standing issues?
            </Typography>

            <Box sx={{ mt: 5 }}>
              <Button
                component={Link}
                href={isMobile ? "tel:+2348033348098" : "/contact"}
                variant="contained"
                color="primary"
                size="large"
                sx={{ mb: 1, mr: 1, padding: "0.75rem 1.5rem" }}
              >
                Contact
              </Button>
              <PartnerButton
                href="/partner"
                variant="contained"
                size="large"
                sx={{ mb: 1, ml: 1, padding: "0.75rem 1.5rem" }}
              >
                Partner
              </PartnerButton>
              <Typography fontWeight={300}>
                Click <Link href="/#reviews">here</Link> to hear what others
                have to say
              </Typography>
            </Box>
          </Grid>
          <Grid
            mobile
            tablet
            display={{
              mobile: "none",
              tablet: "block",
            }}
          >
            <ImageBox
              position="relative"
              margin="auto"
              borderRadius="50%"
              overflow="hidden"
              boxShadow="0.5rem 0.5rem 5rem 0.3rem rgba(0, 0, 0, 0.3)"
              width={{
                mobile: 250,
                tablet: 300,
                laptop: 400,
              }}
              height={{
                mobile: 250,
                tablet: 300,
                laptop: 400,
              }}
            >
              <Image src="/images/drpassy.png" alt="Dr Passy Amaraegbu" fill />
            </ImageBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
