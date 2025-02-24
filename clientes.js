class Cliente {
    constructor (IDCliente, dataNascimento, nomeCompleto, cpf, email, senha) {
        this.IDCliente = IDCliente;
        this.dataNascimento = dataNascimento;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}
export default Cliente;