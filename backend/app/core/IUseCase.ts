export default interface IUseCase<DTO, Response> {
  execute(requestDTO?: DTO): Promise<Response>;
}
