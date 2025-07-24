import { SheetMusicDomainServiceImpl } from "../../domain/services/sheetmusic-domain.service";

export const SheetMusicDomainProvider = {
    provide: 'SheetMusicDomainService',
    useClass: SheetMusicDomainServiceImpl,
}; 