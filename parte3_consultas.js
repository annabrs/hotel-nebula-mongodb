// ================================================
// HOTEL NEBULA - RADAR DE COMANDO (CONSULTAS)
// ================================================

use hotel_nebula;

// ------------------------------------------------
// PERGUNTA 1: Quais quartos possuem características como "vista para o mar" ou "banheira"?
// ------------------------------------------------
db.quartos.find({
  caracteristicas: { $in: ["vista para o mar", "banheira"] }
});


// ------------------------------------------------
// PERGUNTA 2: Quais hóspedes reservaram mais de uma vez?
// ------------------------------------------------
db.reservas.aggregate([
  {
    $group: {
      _id: "$hospede_id",
      total_reservas: { $sum: 1 }
    }
  },
  {
    $match: {
      total_reservas: { $gt: 1 }
    }
  },
  {
    $lookup: {
      from: "hospedes",
      localField: "_id",
      foreignField: "_id",
      as: "dados_hospede"
    }
  }
]);


// ------------------------------------------------
// PERGUNTA 3: Quanto o hotel faturou em um período? (Exemplo: Abril de 2026)
// ------------------------------------------------
db.hospedagens.aggregate([
  {
    $match: {
      "pagamento.status": "pago",
      "pagamento.data_transacao": {
        $gte: new Date("2026-04-01T00:00:00Z"),
        $lte: new Date("2026-04-30T23:59:59Z")
      }
    }
  },
  {
    $group: {
      _id: null,
      faturamento_total_abril: { $sum: "$pagamento.valor_total" }
    }
  }
]);


// ------------------------------------------------
// PERGUNTA 4: Quais períodos têm mais ocupação? (Total de reservas agrupadas por mês)
// ------------------------------------------------
db.reservas.aggregate([
  {
    $group: {
      _id: { $month: "$data_inicio" },
      quantidade_reservas: { $sum: 1 }
    }
  },
  {
    $sort: { quantidade_reservas: -1 }
  }
]);