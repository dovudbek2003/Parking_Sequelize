import { HttpException, HttpStatus } from "@nestjs/common";

export class CarNotFound extends HttpException {
    constructor() {
        super('Car Not Found', HttpStatus.NOT_FOUND)
    }
}

export class CarAlreadyExist extends HttpException {
    constructor() {
        super('Car Already Exist', HttpStatus.BAD_REQUEST)
    }
}