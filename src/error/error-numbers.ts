interface Errno {
  [key: number]: { msg: string; status: number };
}

export default {
  1: { msg: "Unknown error occurred", status: 500 },
  2: { msg: "Not found", status: 404 },
  3: { msg: "Unauthorised", status: 403 },
  4: { msg: "Bad request", status: 400 },
  5: { msg: "Service is currently down", status: 500 },
  6: {
    msg: "An error occurred on the server, it is currently being investigated",
    status: 500,
  },
} as Errno;
