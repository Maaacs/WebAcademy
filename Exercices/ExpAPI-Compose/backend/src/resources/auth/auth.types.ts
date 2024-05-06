export interface SignUpDto {
    nome: string;
    email: string;
    senha: string;
    tipoUsuarioId: string;
}

export interface LoginDto {
    email: string;
    senha: string;
}
