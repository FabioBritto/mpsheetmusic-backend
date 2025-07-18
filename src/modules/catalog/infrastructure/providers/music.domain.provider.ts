import { MusicDomainServiceImpl } from "../../domain/services/music-domain.service";

export const MusicDomainProvider = {
    provide: 'MusicDomainService',
    useClass: MusicDomainServiceImpl,
}