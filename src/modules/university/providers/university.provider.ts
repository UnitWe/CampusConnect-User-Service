import { University } from '../model/university.model';
import { UNIVERSITY_REPOSITORY } from '../constants';

export const universityProvider = [{
    provide: UNIVERSITY_REPOSITORY,
    useValue: University,
}];