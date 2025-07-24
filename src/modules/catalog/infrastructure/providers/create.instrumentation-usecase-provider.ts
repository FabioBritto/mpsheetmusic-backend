import { CreateInstrumentationUseCase } from "../../application/use-cases/create.instrumentation-usecase";

export const CreateInstrumentationUseCaseProvider = {
    provide: 'CreateInstrumentationUseCase',
    useClass: CreateInstrumentationUseCase, 
}