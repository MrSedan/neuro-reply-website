import { IGetUser } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private adminService;
    constructor(adminService: UserService);
    getUser(data: IGetUser): Promise<import("../../../libs/database/user.entity").User>;
}
