import readlineSync from "readline-sync"

import Cliente from "./clientes.js";
import Funcionario from "./funcionarios.js";
import Quarto from "./quartos.js"
import Reserva from "./quartos.js";

class Sistema {
    constructor() {
        this.funcionarios = [];
        this.clientes = [];
        this.reservas = [];
        this.quartos = [];
        this.usuarioLogado = null;
    }

    iniciar() {
        console.log("Sistema Iniciado!");
        this.menu();
    }

    menu() {
        let opcao;
        do {
            opcao = readlineSync.question("\n--- Menu ---\n1. Login\n2. Cadastrar Cliente\n3. Visualizar Cliente\n4. Cadastrar funcionario\n0. Sair\nEscolha uma opcao:");
            if(opcao == "1"){
                this.login()
            } else if (opcao === "2") {
                this.cadastrarCliente();
            } else if (opcao === "3") {
                this.visualizarClientes();
            } else if (opcao === "4") {
                this.cadastrarFuncionario();
            } else if (opcao !=="0"){
                console.log("opcao invalida")
            }
        } while (opcao !== "0");
        console.log("Saindo...");
    }

    menuCliente() {
        let opcoesCliente;
        do {
            opcoesCliente = readlineSync.question("\n--- Area do cliente ---\n1. Ver meus dados \n2. Conferir quartos disponiveis \n3. Faca sua reserva aqui \n4. Deseja cancelar uma reserva? \n5. Conferir reserva efetivada \n0. Voltar \nEscolha uma opcao:");
            if (opcoesCliente == 1){
                this.verDadosCliente() 
            } else if (opcoesCliente == 2){
                this.conferirQuartos()
            } else if (opcoesCliente == 3){
                this.fazerReserva()
            } else if (opcoesCliente == 4){
                this.cancelarReserva()
            } else if (opcoesCliente == 5){
                this.cancelarReserva()
            }
        } while (opcoesCliente !== "0");
        console.log("Saindo..."); 
        this.menu();
    }

    menuFuncionario() {
        let opcoesFuncionario;
        do{
            opcoesFuncionario = readlineSync.question("\n--- Area do funcionario ---\n1. Ver meus dados \n2. Lista de reservas \n3. Lista de quartos \n4. Lista de clientes \n5. Mudar status de uma reserva \n6. Adicionar quarto \n0. Voltar \nEscolha uma opcao:");
            if (opcoesFuncionario == 1){
                this.verDadosFuncionario() 
            } else if (opcoesFuncionario == 2){
                this.listaDeReserva()
            } else if (opcoesFuncionario == 3){
                this.listaDeQuartos()
            } else if (opcoesFuncionario == 4){
                this.listaDeClientes()
            } else if (opcoesFuncionario == 5){
                this.mudarStatus()
            } else if (opcoesFuncionario == 6){
                this.adicionarQuarto()
            }
        } while (opcoesFuncionario !== "0");
        console.log("Saindo..."); 
        this.menu();
    }

    login(){
        const email = readlineSync.question("E-mail: ")
        const senha = readlineSync.question("Senha: ")

        let funcionario = this.funcionarios.find(user => user.email === email && user.senha === senha);
        if (funcionario) {
            console.log("\nOla funcionario, seja bem vindo.");
            this.menuFuncionario()
        }

        let client = this.clientes.find(user => user.email === email && user.senha === senha);
        if (client) {
            console.log("\nOla cliente, seja bem vindo.");
            this.menuCliente()
        }

        console.log("\nE-mail ou senha invalidos, por favor tente novamente.");
    }
    
    cadastrarCliente() {
        console.log("\n--- Cadastro de Cliente ---");
        let IDCliente = this.clientes.length + 1;
        const nome = readlineSync.question("Nome: ");
        const dataNascimento = readlineSync.question("Data de Nascimento (YYYY-MM-DD): ");
        const cpf = readlineSync.question("Insira seu CPF: ");
        const email = readlineSync.question("E-mail: ");
        const senha = readlineSync.question("Senha: ");

        const novoCliente = new Cliente(IDCliente, dataNascimento, nome,  cpf, email, senha);
        this.clientes.push(novoCliente);
        console.log("Cliente cadastrado com sucesso");
    }
    cadastrarFuncionario(){
        console.log("\n--- Cadastro de funcionario ---");
        let IDFuncionario = this.funcionarios.length + 1;
        const nome = readlineSync.question("Seu nome: ");
        const cpf = readlineSync.question("Insira seu CPF: ");
        const email = readlineSync.question("E-mail: ");
        const senha = readlineSync.question("Senha: ");
        
        const novoFuncionario = new Funcionario(IDFuncionario, nome, cpf, email, senha);
        this.funcionarios.push(novoFuncionario);
        console.log("Funcionario cadastrado com sucesso")

    }
    gerenciamentoDeQuartos(){
        console.log("\n--- Quantas camas estao disponiveis no momento ---?")
        
    }

    visualizarClientes() {
        console.log(this.clientes)
    }
}

// Start the system when the page loads
const sistema = new Sistema();
sistema.iniciar();