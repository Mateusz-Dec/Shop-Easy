import { useEffect } from "react";
import { useCompareStore } from "../store/compareStore";

export default function CompareListener() {
  const add = useCompareStore((s) => s.add);

  useEffect(() => {
    const onAdd = (e) => {
      const p = e.detail?.product;
      if (!p) return;
      add(p);
    };
    window.addEventListener("shopeasy-compare-add", onAdd);
    return () => window.removeEventListener("shopeasy-compare-add", onAdd);
  }, [add]);

  return null;
}
