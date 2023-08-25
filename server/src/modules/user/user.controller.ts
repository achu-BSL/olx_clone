import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService) {}


}