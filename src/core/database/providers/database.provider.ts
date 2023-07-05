import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../../constants';
import { databaseConfig } from '../configs/database.config';
import { User } from '../../../modules/user/model/user.model';
import { Publication } from '../../../modules/publication/model/publication.model';


export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Publication]);
        await sequelize.sync({ force: true });
        return sequelize;
    },
}];