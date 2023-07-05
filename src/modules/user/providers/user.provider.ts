import { User } from '../model/user.model';
import { USER_REPOSITORY } from '../constants';

export const userProvider = [{
    provide: USER_REPOSITORY,
    useValue: User,
}];