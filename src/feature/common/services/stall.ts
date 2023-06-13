/**
 * The function "stall" returns a promise that resolves after a specified amount of time.
 * @param [stallTime=0] - The amount of time (in milliseconds) that the function should wait before
 * resolving the promise. If no value is provided, the default value is 0, which means the function
 * will not stall and will immediately resolve the promise.
 * @returns a Promise that resolves to a value of type `R`. The value of `R` is determined by the type
 * of the argument passed to the function when it is called. If no argument is passed, the default
 * value of `0` is used for `stallTime`.
 */
export async function stall<R>(stallTime = 0): Promise<R> {
  const response = await new Promise((resolve) =>
    setTimeout(resolve, stallTime)
  );
  return response as R;
}
