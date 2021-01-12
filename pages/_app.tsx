import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("TMDYZOTC", {
      includedDomains: ["cistercian.micahrl.com"],
    });
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
