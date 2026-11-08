"use client";

import { useEffect, useState } from "react";

let visitorCountPromise: Promise<number | null> | null = null;

function getVisitorCount() {
  if (!visitorCountPromise) {
    visitorCountPromise = fetch("/api/visitors", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { count?: number } | null) =>
        typeof data?.count === "number" ? data.count : null,
      )
      .catch(() => null);
  }
  return visitorCountPromise;
}

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    getVisitorCount().then((value) => {
      if (active) setCount(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <span className="tabular-nums">
      {count === null ? "Counting visits…" : `${count.toLocaleString("en-IN")}+ visits`}
    </span>
  );
}
