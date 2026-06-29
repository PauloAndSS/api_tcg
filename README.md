🃏 TCG API (Trading Card Game)Esta é uma API RESTful robusta desenvolvida para gerenciar um jogo de cartas colecionáveis (TCG), incluindo sistemas de usuários, cartas, decks e um ranking competitivo baseado em agregação de dados.🚀 Tecnologias UtilizadasNode.js & Express: Framework para construção da API.MongoDB & Mongoose: Banco de dados NoSQL e modelagem de dados.Bcrypt: Segurança e criptografia de senhas.Aggregation Framework: Processamento de dados complexos (rankings, relatórios).ES Modules: Utilização de import/export.📂 Estrutura do ProjetoA arquitetura foi pensada para ser escalável e organizada:Plaintextsrc/
├── config/      # Conexões de banco de dados e variáveis de ambiente
├── controllers/ # Gerenciamento de rotas e fluxo HTTP
├── models/      # Esquemas de dados (Schema Mongoose)
├── routes/      # Definição dos endpoints
├── services/    # Regras de negócio e integração com banco
└── index.js     # Ponto de entrada da aplicação
⚙️ Como rodar o projetoClone o repositório:Bashgit clone [url-do-seu-repositorio]
cd api_tcg
Instale as dependências:Bashnpm install
Configuração:Certifique-se de ter o MongoDB rodando localmente na porta 27017 ou altere a URI no arquivo de configuração (src/config/db.js).Execute o servidor:Bashnode index.js
📌 Principais EndpointsMétodoEndpointDescriçãoPOST/usersCadastro de novos jogadoresPOST/users/loginLogin e autenticaçãoPOST/cardsAdicionar uma nova carta ao jogoGET/decksListagem de decks (com paginação)GET/users/rankingRanking global dos jogadores💡 Funcionalidades DestaqueSegurança: Senhas criptografadas com bcrypt e proteção contra Mass Assignment.Performance: Paginação nativa em todos os métodos GET para evitar sobrecarga.Relatórios Complexos: Uso de pipelines de agregação para cálculos de ranking baseados no custo das cartas.
