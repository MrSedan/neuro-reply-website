import { User } from 'libs/database/user.entity';
import { Repository } from 'typeorm';
import { IGetUser } from './user.dto';
export declare class UserService {
    private userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    getUser(data: IGetUser): Promise<User>;
}
