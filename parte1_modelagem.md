# Hotel Nebula - Projeto de Banco de Dados NoSQL (MongoDB)

## Parte 1: Origem do Sistema e Modelagem de Dados

### 1. Núcleos Principais de Informação
Para organizar os dados dispersos do Hotel Nebula, o sistema foi dividido nas seguintes coleções e subdocumentos:

* **`hospedes`**: Coleção independente com cadastro de clientes (nome, e-mail, documento, contato).
* **`quartos`**: Coleção independente com as características físicas, capacidade, tipo e valor da diária dos quartos.
* **`reservas`**: Coleção independente que vincula o hóspede ao quarto em uma determinada data.
* **`hospedagens`**: Coleção independente que representa a estadia real do cliente, contendo **subdocumentos** para os serviços consumidos e o pagamento final.
* **`feedbacks`**: Coleção independente com as avaliações e opiniões dos hóspedes sobre as estadias.

---

### 2. Justificativas das Escolhas de Modelagem

1. **Reserva guarda dados do hóspede embutidos ou referenciados?**
   * **Decisão:** Referenciados (`hospede_id`).
   * **Justificativa:** Como o cadastro de um hóspede pode sofrer alterações (ex: mudança de telefone ou e-mail), manter o ID referenciado evita ter que atualizar centenas de reservas passadas no banco.

2. **Avaliações ficam dentro do quarto ou em coleção própria?**
   * **Decisão:** Coleção própria (`feedbacks`).
   * **Justificativa:** Se as avaliações ficassem dentro do documento do quarto, com o passar dos anos o documento cresceria indefinidamente, correndo o risco de ultrapassar o limite de 16MB por documento no MongoDB. Uma coleção separada facilita a análise estatística por períodos.

3. **Serviços consumidos ficam dentro da hospedagem?**
   * **Decisão:** Embutidos (`array` de subdocumentos em `hospedagens`).
   * **Justificativa:** Os itens do frigobar, serviços de spa e refeições pertencem exclusivamente àquela estadia específica e são consultados sempre junto com o checkout do hóspede. A modelagem embutida garante leitura ultrarrápida.

4. **Como representar o histórico sem perder flexibilidade?**
   * **Decisão:** Uso de status e datas com fuso horário (ISODate) nas hospedagens e pagamentos, preservando o histórico exato do valor cobrado no momento do checkout.

---

### 3. Exemplo do Documento JSON Completo (`hospedagens`)

```json
{
  "_id": "65f1a2b3c4d5e6f7a8b9c044",
  "reserva_id": "65f1a2b3c4d5e6f7a8b9c033",
  "hospede_id": "65f1a2b3c4d5e6f7a8b9c011",
  "quarto_id": "65f1a2b3c4d5e6f7a8b9c022",
  "data_checkin": "2026-04-10T14:30:00Z",
  "data_checkout": "2026-04-15T10:00:00Z",
  "servicos_consumidos": [
    {
      "servico": "Frigobar",
      "valor": 75.50,
      "data": "2026-04-12T20:00:00Z"
    },
    {
      "servico": "Spa",
      "valor": 200.00,
      "data": "2026-04-13T15:00:00Z"
    }
  ],
  "pagamento": {
    "metodo": "Cartão de Crédito",
    "valor_total": 2525.50,
    "status": "pago",
    "data_transacao": "2026-04-15T10:05:00Z"
  }
}