import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useDebounce from "@/hooks/use-debounce";

const verifyPaystackPayment = async (reference: string) => {
  const response = await fetch("/api/verify-paystack-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reference }),
  });
  const data = await response.json();
  return data;
};

export default function useVerifyPaystackPayment() {
  const router = useRouter();
  const { query } = router;
  const debouncedReference = useDebounce(query.reference, 500);

  useEffect(() => {
    if (!debouncedReference) return;

    verifyPaystackPayment(debouncedReference as string)
      .then((data) => {
        toast[data.error ? "error" : "success"](data.message);

        router.push("/");
      })
      .catch((e) => {
        console.error(e);
        toast.error("An error occurred");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedReference]);
}
