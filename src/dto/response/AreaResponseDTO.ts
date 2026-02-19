import ProcessResponseDTO from "./ProcessResponseDTO";

export default interface AreaResponseDTO{
    externalId: string;
    name: string;
    description: string;
    processes?: ProcessResponseDTO[];
}