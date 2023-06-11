"use client";

import { Button } from "react-bootstrap";

interface errorProps {
  error: Error;
  reset(): void;
}

export default function ErrorPage({ error, reset }: errorProps) {
  return (
    <div>
      <h1>Error 🥲🥲</h1>
      <Button onClick={reset}>try again</Button>
    </div>
  );
}
