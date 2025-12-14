export function successResponse(data: any, message = 'Success') {
  return {
    success: true,
    message,
    data
  };
}

export function errorResponse(error: string, statusCode = 400) {
  return {
    success: false,
    error,
    statusCode
  };
}
