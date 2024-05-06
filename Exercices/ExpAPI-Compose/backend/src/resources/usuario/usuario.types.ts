export interface CreateUsuarioDto {
    nome: string;
    email: string;
    senha: string;
    tipoUsuarioId: string;
}

export interface UpdateUsuarioDto {
    nome: string;
    email: string;
    senha: string;
}