import { InstrumentationDomainServiceImpl } from "../../domain/services/instrumentation-domain.service";

export const InstrumentationDomainProvider = {
    provide: 'InstrumentationDomainService',
    useClass: InstrumentationDomainServiceImpl,
}