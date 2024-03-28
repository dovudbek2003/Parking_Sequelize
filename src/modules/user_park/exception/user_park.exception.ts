import { HttpException, HttpStatus } from "@nestjs/common";

export class UserParkNotFound extends HttpException {
    constructor() {
        super('UserPark Not Found', HttpStatus.NOT_FOUND)
    }
}

export class UserBadRequest extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST)
    }
}