import { PUBLICATION_REPOSITORY } from "../constants";
import { Publication } from "../model/publication.model";

export const publicationProvider = [{
    provide: PUBLICATION_REPOSITORY,
    useValue: Publication
}]