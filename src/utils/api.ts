/**
 * Type guard that checks an error of unknown type for existence of a
 * `response.status` property (Axios error).
 *
 * @param error the error to check
 * @returns true if the error contains a `response.status` property
 */
export const hasResponseStatus = (
  error: unknown
): error is { response: { status: number } } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'status' in error.response
  )
}

/**
 * Checks if a failed query should be retried based on the status code
 * of the error that was thrown.
 *
 * @param error the error to check
 * @returns false if retries should be disabled, true otherwise
 */
export const shouldRetryQuery = (error: unknown): boolean => {
  const noRetryCodes = [403, 404]

  if (hasResponseStatus(error)) {
    return !noRetryCodes.includes(error.response.status)
  }

  return true
}

export function matchesResponseStatus(
  error: unknown,
  status: number | number[]
): boolean {
  // Convert the input to an array if it's a single status code
  const statuses = Array.isArray(status) ? status : [status]

  return hasResponseStatus(error) && statuses.includes(error.response.status)
}
