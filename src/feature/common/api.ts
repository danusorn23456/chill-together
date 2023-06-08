export async function APIstall<R>(stallTime = 0): Promise<R> {
  const response = await new Promise((resolve) =>
    setTimeout(resolve, stallTime)
  );
  return response as R;
}
