import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect().then(() => console.log("Database connected"))
        .catch(err => console.log('Error while trying to connect database ', err));
    }
}