import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'USERS_SERVICE',
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'users',
                  brokers: ['host.docker.internal:9094'],
                },
              },
            },
        ]),
    ],
    exports: [
        ClientsModule.register([
            {
              name: 'USERS_SERVICE',
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'users',
                  brokers: ['host.docker.internal:9094'],
                },
              },
            },
          ]),
    ]
})
export class ClientModule {}
