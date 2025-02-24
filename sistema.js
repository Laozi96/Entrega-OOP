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
            opcao = readlineSync.question("\n--- Menu ---\n1. Cadastrar Cliente\n2. Visualizar Clientes\n3. Sair\nEscolha uma opcao:");
            if (opcao === "1") {
                this.cadastrarCliente();
            } else if (opcao === "2") {
                this.visualizarClientes();
            } else if (opcao !=="3"){
                console.log("opcao invalida")
            }
        } while (opcao !== "3");
        console.log("Saindo...");
    }

    cadastrarCliente() {
        console.log("\n--- Cadastro de Cliente ---");
        let IDCliente = this.clientes.length + 1;
        const nome = readlineSync.question("Nome:");
        const dataNascimento = readlineSync.question("Data de Nascimento (YYYY-MM-DD):");
        const cpf = readlineSync.question("CPF:");
        const email = readlineSync.question("Email:");
        const senha = readlineSync.question("Senha:");

        const novoCliente = new Cliente(IDCliente, nome, dataNascimento, cpf, email, senha);
        this.clientes.push(novoCliente);
        console.log("Cliente cadastrado com sucesso!");
    }

    visualizarClientes() {
        console.log(this.clientes)
    }
}

// Start the system when the page loads
const sistema = new Sistema();
sistema.iniciar();