import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'libs/database/payment.entity';
import { ProxyUser } from 'libs/database/proxy_user.entity';
import { User } from 'libs/database/user.entity';
import { Repository } from 'typeorm';
import { IOperation, IProxyUser } from './proxy.dto';

@Injectable()
export class ProxyService {
    private readonly logger: Logger = new Logger(ProxyService.name);
    constructor(
        @InjectRepository(ProxyUser) private proxyUserRepository: Repository<ProxyUser>,
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async newUser(data: IProxyUser) {
        try {
            if (
                (await this.proxyUserRepository.findOne({ where: { userName: data.userName } })) ||
                (await this.proxyUserRepository.findOne({ where: { user_id: data.user_id } }))
            )
                throw new HttpException('User already exists', HttpStatus.FOUND);
            const proxyUser = new ProxyUser();
            const user = data.user_id ? await this.userRepository.findOne({ where: { id: data.user_id } }) : null;
            if (user) proxyUser.user = user;
            proxyUser.description = data.description;
            proxyUser.connectDate = new Date();
            proxyUser.userName = data.userName;
            proxyUser.link = data.link;
            return await this.proxyUserRepository.save(proxyUser);
        } catch (error) {
            if (error instanceof HttpException) {
                this.logger.debug(`[proxy.newUser] error: user already created`);
                throw error;
            }
            this.logger.debug(`[proxy.newUser] error: ${JSON.stringify(error)}`);
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
    }

    async getUser(userName: string) {
        try {
            const user = await this.proxyUserRepository.findOne({ where: { userName: userName } });
            if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                this.logger.debug(`[proxy.getUser] error: not found`);
                throw error;
            }
            this.logger.debug(`[proxy.getUser] error: ${JSON.stringify(error)}`);
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
    }

    async getAllUsers() {
        try {
            return await this.proxyUserRepository.find();
        } catch (error) {
            this.logger.debug(`[proxy.getAllUsers] error: ${JSON.stringify(error)}`);
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
    }

    async addOperation(data: IOperation) {
        try {
            const user = await this.proxyUserRepository.findOne({ where: { userName: data.userName } });
            if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            return await this.paymentRepository.save({ payTime: new Date(), user: user });
        } catch (error) {
            if (error instanceof HttpException) {
                this.logger.debug(`[proxy.addOperation] error: not found`);
                throw error;
            }
            this.logger.debug(`[proxy.addOperation] error: ${JSON.stringify(error)}`);
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
    }

    async getOperations(userName: string) {
        try {
            const user = await this.proxyUserRepository.findOne({ where: { userName: userName }, relations: { payments: true } });
            if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            return user.payments;
        } catch (error) {
            if (error instanceof HttpException) {
                this.logger.debug(`[proxy.addOperation] error: not found`);
                throw error;
            }
            this.logger.debug(`[proxy.addOperation] error: ${error}`);
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
    }

    async getAllOperations() {
        try {
            return await this.paymentRepository.find();
        } catch (error) {
            this.logger.debug(`[proxy.addOperation] error: ${error}`);
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
    }
}
