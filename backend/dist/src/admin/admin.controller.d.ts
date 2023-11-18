import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getAdmin(): Promise<import("../../libs/database/admin.entity").Admin[]>;
    isAdmin(id: string): Promise<boolean>;
}
