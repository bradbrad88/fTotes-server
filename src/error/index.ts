import { ErrorRequestHandler } from "express";
import Errno from "./error-numbers";

interface ReturnedError {
  message: string;
  errno: number;
}

const errorhandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HandledError) {
    const returnedError: ReturnedError = {
      message: err.message,
      errno: err.errno,
    };
    return res.status(err.status).json(returnedError);
  }

  res.status(Errno[1].status).send(Errno[1].msg);
};

export class HandledError extends Error {
  public errno: number;
  public status: number;
  constructor(errno: number) {
    const { msg, status } = Errno[errno];
    super(msg);
    this.message = msg;
    this.status = status;
    this.name = "Operational Error";
    this.errno = errno;
    if (!msg || !status) return;
  }
  static unknownError() {
    return new HandledError(1);
  }
  static badRequest(msg?: string) {
    const err = new HandledError(4);
    if (msg) err.message += ": " + msg;
    return err;
  }
  static unauthorised() {
    return new HandledError(3);
  }
  static notFound() {
    return new HandledError(2);
  }
  static knownErr(errno: number) {
    return new HandledError(errno);
  }
}

export default errorhandler;
