<details>
```javascript
// ================================================
// HOTEL NEBULA - CRIAÇÃO E POVOAMENTO DO BANCO (MONGODB)
// ================================================

use hotel_nebula;

// Limpa coleções antigas caso precise rodar novamente
db.hospedes.drop();
db.quartos.drop();
db.reservas.drop();
db.hospedagens.drop();
db.feedbacks.drop();

// 1. Inserir Hóspedes
db.hospedes.insertMany([
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c011"),
    nome: "Ana Souza",
    email: "ana.souza@email.com",
    telefone: "+5511988887777",
    documento: { tipo: "CPF", numero: "123.456.789-00" },
    cidade: "São Paulo",
    estado: "SP",
    criado_em: new Date("2026-01-10")
  },
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c012"),
    nome: "Carlos Lima",
    email: "carlos.lima@email.com",
    telefone: "+5511977776666",
    documento: { tipo: "CPF", numero: "987.654.321-11" },
    cidade: "Campinas",
    estado: "SP",
    criado_em: new Date("2026-02-15")
  }
]);

// 2. Inserir Quartos
db.quartos.insertMany([
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c022"),
    numero: 302,
    tipo: "Luxo",
    capacidade: 3,
    preco_diaria: 450.00,
    caracteristicas: ["vista para o mar", "banheira", "varanda", "wi-fi"],
    status: "disponivel"
  },
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c023"),
    numero: 101,
    tipo: "Standard",
    capacidade: 2,
    preco_diaria: 200.00,
    caracteristicas: ["wi-fi", "ar-condicionado"],
    status: "disponivel"
  },
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c024"),
    numero: 501,
    tipo: "Suíte Presidencial",
    capacidade: 4,
    preco_diaria: 1200.00,
    caracteristicas: ["vista para o mar", "banheira", "piscina privativa"],
    status: "disponivel"
  }
]);

// 3. Inserir Reservas
db.reservas.insertMany([
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c033"),
    hospede_id: ObjectId("65f1a2b3c4d5e6f7a8b9c011"),
    quarto_id: ObjectId("65f1a2b3c4d5e6f7a8b9c022"),
    data_inicio: new Date("2026-04-10T14:00:00Z"),
    data_fim: new Date("2026-04-15T11:00:00Z"),
    status: "concluida"
  },
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c034"),
    hospede_id: ObjectId("65f1a2b3c4d5e6f7a8b9c011"),
    quarto_id: ObjectId("65f1a2b3c4d5e6f7a8b9c023"),
    data_inicio: new Date("2026-05-01T14:00:00Z"),
    data_fim: new Date("2026-05-05T11:00:00Z"),
    status: "confirmada"
  },
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c035"),
    hospede_id: ObjectId("65f1a2b3c4d5e6f7a8b9c012"),
    quarto_id: ObjectId("65f1a2b3c4d5e6f7a8b9c024"),
    data_inicio: new Date("2026-04-20T14:00:00Z"),
    data_fim: new Date("2026-04-25T11:00:00Z"),
    status: "concluida"
  }
]);

// 4. Inserir Hospedagens
db.hospedagens.insertMany([
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c044"),
    reserva_id: ObjectId("65f1a2b3c4d5e6f7a8b9c033"),
    hospede_id: ObjectId("65f1a2b3c4d5e6f7a8b9c011"),
    quarto_id: ObjectId("65f1a2b3c4d5e6f7a8b9c022"),
    data_checkin: new Date("2026-04-10T14:30:00Z"),
    data_checkout: new Date("2026-04-15T10:00:00Z"),
    servicos_consumidos: [
      { servico: "Frigobar", valor: 75.50, data: new Date("2026-04-12T20:00:00Z") },
      { servico: "Spa", valor: 200.00, data: new Date("2026-04-13T15:00:00Z") }
    ],
    pagamento: {
      valor_total: 2525.50,
      metodo: "Cartão de Crédito",
      status: "pago",
      data_transacao: new Date("2026-04-15T10:05:00Z")
    }
  },
  {
    _id: ObjectId("65f1a2b3c4d5e6f7a8b9c045"),
    reserva_id: ObjectId("65f1a2b3c4d5e6f7a8b9c035"),
    hospede_id: ObjectId("65f1a2b3c4d5e6f7a8b9c012"),
    quarto_id: ObjectId("65f1a2b3c4d5e6f7a8b9c024"),
    data_checkin: new Date("2026-04-20T15:00:00Z"),
    data_checkout: new Date("2026-04-25T11:00:00Z"),
    servicos_consumidos: [
      { servico: "Restaurante", valor: 350.00, data: new Date("2026-04-22T21:00:00Z") }
    ],
    pagamento: {
      valor_total: 6350.00,
      metodo: "Pix",
      status: "pago",
      data_transacao: new Date("2026-04-25T11:05:00Z")
    }
  }
]);

// 5. Inserir Feedbacks
db.feedbacks.insertMany([
  {
    hospedagem_id: ObjectId("65f1a2b3c4d5e6f7a8b9c044"),
    quarto_id: ObjectId("65f1a2b3c4d5e6f7a8b9c022"),
    nota: 5,
    comentario: "Excelente estadia! A vista do quarto 302 é perfeita.",
    data_avaliacao: new Date("2026-04-15")
  }
]);