import { useEffect } from "react";
import { scroller } from "react-scroll";
import { useRouter } from "next/router";

export default function useScrollTarget() {
  const {
    query: { target },
    replace,
    asPath,
  } = useRouter();

  useEffect(() => {
    if (!target) return;

    scroller.scrollTo(target as string, {
      smooth: true,
      offset: -100,
    });
    const updatedRoute = asPath.split("?target")[0];
    replace(updatedRoute, undefined, { shallow: true });
  }, [target, replace, asPath]);
}
