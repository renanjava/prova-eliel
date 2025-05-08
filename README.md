<h1>CRUD com Load Balancer no NGINX (Entidade Pessoa e Trabalho)</h1>
<p>
  É uma <strong>API RESTful básica</strong> desenvolvida para gerenciar entidades de <em>Pessoa</em> e <em>Trabalho</em>, com um relacionamento entre elas. A aplicação utiliza o framework <strong>NestJS</strong> e o ORM <strong>Prisma</strong> para persistência de dados em um banco PostgreSQL. Além disso, a aplicação é escalável, utilizando múltiplas instâncias balanceadas por um servidor <strong>NGINX</strong>.
</p>

<h2>Funcionalidades</h2>
<ul>
  <li><strong>Gerenciamento de Pessoas</strong>: Criação, consulta, atualização e exclusão de registros de pessoas.</li>
  <li><strong>Gerenciamento de Trabalhos</strong>: Criação, consulta, atualização e exclusão de registros de trabalhos.</li>
  <li><strong>Relacionamento Pessoa-Trabalho</strong>: Cada pessoa está associada a um trabalho, permitindo consultas relacionadas.</li>
  <li><strong>Validação de Dados</strong>: Validação robusta de DTOs (Data Transfer Objects) utilizando <strong>class-validator</strong>.</li>
  <li><strong>Persistência com PostgreSQL</strong>: Banco de dados relacional gerenciado pelo Prisma ORM.</li>
  <li><strong>Load Balancer</strong>: Utilização de NGINX para balancear a carga entre múltiplas instâncias da aplicação.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>NestJS</strong>: Framework para criar a API RESTful, gerenciando rotas e lógica de negócio.</li>
  <li><strong>TypeScript</strong>: Linguagem principal, garantindo tipagem estática e maior segurança.</li>
  <li><strong>Prisma</strong>: ORM para gerenciar o banco PostgreSQL, incluindo migrations e sincronização de dados.</li>
  <li><strong>PostgreSQL</strong>: Banco de dados relacional para armazenar pessoas e trabalhos.</li>
  <li><strong>NGINX</strong>: Servidor web utilizado como load balancer.</li>
  <li><strong>Docker</strong>: Contêineres para a aplicação e banco de dados.</li>
</ul>

<h2>Pré-requisitos</h2>
<p>Antes de começar, certifique-se de ter instalado:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (v16 ou superior)</li>
  <li><a href="https://www.docker.com/">Docker</a> e <a href="https://docs.docker.com/compose/">Docker Compose</a></li>
</ul>

<h2>Instalação</h2>
<ol>
  <li>
    <p><strong>Clone o repositório</strong>:</p>
    <pre><code>git clone https://github.com/seu-usuario/pessoa-trabalho-crud.git
cd pessoa-trabalho-crud</code></pre>
  </li>
  <li>
    <p><strong>Configure as variáveis de ambiente</strong>:</p>
    <p>Crie um arquivo <code>.env</code> na raiz com base no <code>.env.example</code>:</p>
    <pre><code>DATABASE_URL=postgresql://user:password@localhost:5432/mydb
PORT=3000</code></pre>
  </li>
  <li>
    <p><strong>Suba os contêineres</strong>:</p>
    <pre><code>docker-compose up --build</code></pre>
    <p>Isso iniciará o banco de dados PostgreSQL, duas instâncias da aplicação e o servidor NGINX.</p>
  </li>
</ol>

<h2>Endpoints Principais</h2>
<table>
  <tr>
    <th>Método</th>
    <th>Endpoint</th>
    <th>Descrição</th>
    <th>Exemplo de Body</th>
  </tr>
  <tr>
    <td>GET</td>
    <td><code>localhost/</code></td>
    <td>Retorna a informação sobre qual foi o servidor que recebeu a requisição</td>
    <td>-</td>
  </tr>
  <tr>
    <td>POST</td>
    <td><code>localhost/pessoa</code></td>
    <td>Cria uma nova pessoa</td>
    <td><code>{ "nome": "João", "cpf": "12345678900", "trabalhoId": "uuid" }</code></td>
  </tr>
  <tr>
    <td>GET</td>
    <td><code>localhost/pessoa/:id</code></td>
    <td>Retorna os dados de uma pessoa</td>
    <td>-</td>
  </tr>
  <tr>
    <td>POST</td>
    <td><code>localhost/trabalho</code></td>
    <td>Cria um novo trabalho</td>
    <td><code>{ "nome": "Engenheiro", "descricao": "Desenvolve projetos" }</code></td>
  </tr>
  <tr>
    <td>GET</td>
    <td><code>localhost/trabalho/:id</code></td>
    <td>Retorna os dados de um trabalho</td>
    <td>-</td>
  </tr>
</table>

<h3>Exemplo de Requisição</h3>
<pre><code>curl -X POST "http://localhost/pessoa" -H "Content-Type: application/json" -d '{
  "nome": "João",
  "cpf": "12345678900",
  "trabalhoId": "uuid"
}'</code></pre>

<h2>Arquitetura</h2>
<ul>
  <li><strong>Banco de Dados:</strong> PostgreSQL gerenciado pelo Prisma.</li>
  <li><strong>Load Balancer:</strong> NGINX balanceando a carga entre duas instâncias da aplicação.</li>
  <li><strong>Contêineres:</strong> Configurados via Docker Compose.</li>
</ul>

<h2>Escalabilidade</h2>
<p>O uso de NGINX como load balancer permite distribuir requisições entre múltiplas instâncias da aplicação, garantindo alta disponibilidade e melhor desempenho.</p>