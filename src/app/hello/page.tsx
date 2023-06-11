export default async function HelloPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <h1>Hello Next.js</h1>
    </div>
  );
}
