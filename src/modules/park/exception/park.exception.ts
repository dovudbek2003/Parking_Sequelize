import { HttpException, HttpStatus } from "@nestjs/common";

export class ParkNotFound extends HttpException {
    constructor() {
        super('Park Not Found', HttpStatus.NOT_FOUND)
    }
}