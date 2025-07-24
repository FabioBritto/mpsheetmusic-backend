import { UpdateInstrumentationUseCase } from "../../application/use-cases/update.instrumentation-usecase";

export const UpdateInstrumentationUseCaseProvider = {
    provide: 'UpdateInstrumentationUseCase',
    useClass: UpdateInstrumentationUseCase,
}