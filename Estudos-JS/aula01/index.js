class Cliente{
    nome;
    cpf;
    agencia;
    saldo;
}

const cliente1 = new Cliente();

cliente1.nome = "Breno";
cliente1.cpf = 1232423444;
cliente1.agencia = 1001;
cliente1.saldo = 0;

const cliente2 = new Cliente();

cliente2.nome = "Lucia";
cliente2.cpf = 10594094344;
cliente2.agencia = 1001;
cliente2.saldo = 0;

console.log(cliente1, cliente2);
