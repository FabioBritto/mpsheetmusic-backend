import { InstrumentDomainServiceImpl } from "../../domain/services/instrument-domain.service";

export const InstrumentDomainProvider = {
    provide: 'InstrumentDomainService',
    useClass: InstrumentDomainServiceImpl,
}; 