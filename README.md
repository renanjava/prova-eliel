<h1>CRUD com Load Balancer no NGINX e Kubernetes (Entidade Pessoa e Trabalho)</h1>
<p>
  É uma <strong>API RESTful avançada</strong> desenvolvida para gerenciar entidades de <em>Pessoa</em> e <em>Trabalho</em>, com um relacionamento entre elas. A aplicação utiliza o framework <strong>NestJS</strong> e o ORM <strong>Prisma</strong> para persistência de dados em um banco PostgreSQL. Além disso, a aplicação é escalável, utilizando múltiplas instâncias balanceadas por um servidor <strong>NGINX</strong> e gerenciada em um cluster <strong>Kubernetes</strong>.
</p>

<h2>Funcionalidades</h2>
<ul>
  <li><strong>Gerenciamento de Pessoas</strong>: Criação, consulta, atualização e exclusão de registros de pessoas.</li>
  <li><strong>Gerenciamento de Trabalhos</strong>: Criação, consulta, atualização e exclusão de registros de trabalhos.</li>
  <li><strong>Relacionamento Pessoa-Trabalho</strong>: Cada pessoa está associada a um trabalho, permitindo consultas relacionadas.</li>
  <li><strong>Validação de Dados</strong>: Validação robusta de DTOs (Data Transfer Objects) utilizando <strong>class-validator</strong>.</li>
  <li><strong>Persistência com PostgreSQL</strong>: Banco de dados relacional gerenciado pelo Prisma ORM.</li>
  <li><strong>Load Balancer</strong>: Utilização de NGINX para balancear a carga entre múltiplas instâncias da aplicação.</li>
  <li><strong>Monitoramento e Backup</strong>: Health Check com LivenessProbe e backup diário do banco de dados às 03:00 da manhã.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>NestJS</strong>: Framework para criar a API RESTful, gerenciando rotas e lógica de negócio.</li>
  <li><strong>TypeScript</strong>: Linguagem principal, garantindo tipagem estática e maior segurança.</li>
  <li><strong>Prisma</strong>: ORM para gerenciar o banco PostgreSQL, incluindo migrations e sincronização de dados.</li>
  <li><strong>PostgreSQL</strong>: Banco de dados relacional para armazenar pessoas e trabalhos.</li>
  <li><strong>NGINX</strong>: Servidor web utilizado como load balancer.</li>
  <li><strong>Docker</strong>: Contêineres para a aplicação, banco de dados e servidor web.</li>
  <li><strong>Kubernetes</strong>: Orquestração de contêineres para gerenciar pods, services, deployments e replicasets.</li>
  <li><strong>Minikube</strong>: Ambiente de desenvolvimento local para Kubernetes.</li>
</ul>

<h2>Pré-requisitos</h2>
<p>Antes de começar, certifique-se de ter instalado:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (v16 ou superior)</li>
  <li><a href="https://www.docker.com/">Docker</a> e <a href="https://docs.docker.com/compose/">Docker Compose</a></li>
  <li><a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a></li>
  <li><a href="https://minikube.sigs.k8s.io/docs/start/">Minikube</a></li>
</ul>

<h2>Como Executar a Aplicação</h2>

<h3>Executando com Docker</h3>
<ol>
  <li><strong>Clone o repositório</strong>:
    <pre>git clone https://github.com/renanjava/prova-eliel
cd prova-eliel</pre>
  </li>
  <li><strong>Configure as variáveis de ambiente</strong>:
    <p>Crie um arquivo <code>.env</code> com base no <code>.env.example</code>:</p>
    <pre>
DATABASE_URL=postgresql://user:password@postgres:5432/my_db
PORT=3000
    </pre>
  </li>
  <li><strong>Suba os contêineres com Docker Compose</strong>:
    <pre>docker-compose up --build</pre>
    <p>Isso iniciará o banco PostgreSQL, duas instâncias da aplicação NestJS e o NGINX como Load Balancer.</p>
  </li>
</ol>

<h3>Executando com Kubernetes (via Minikube)</h3>
<ol>
  <li>
    <strong>Inicie o Minikube com suporte ao provisionamento de volumes:</strong>
    <p>O addon <code>default-storageclass</code> é necessário para que os volumes persistentes funcionem corretamente no cluster.</p>
    <pre>minikube start --addons=default-storageclass</pre>
  </li>

  <li>
    <strong>Monte os arquivos de configuração necessários:</strong>
    <p>Monte um diretório local (<code>./config</code>) dentro do Minikube, permitindo que o cluster acesse a configuração de criptografia de dados sensíveis.</p>
    <pre>minikube mount ./config:/var/lib/minikube/certs/config</pre>
  </li>

  <li>
    <strong>Reinicie o Minikube com a configuração de criptografia ativada:</strong>
    <p>Essa etapa configura o servidor da API para usar a política de criptografia definida no arquivo <code>crypt.yaml</code>.</p>
    <pre>minikube start --extra-config=apiserver.encryption-provider-config=/var/lib/minikube/certs/config/crypt.yaml --addons=default-storageclass</pre>
  </li>

  <li>
    <strong>Ative o <code>metrics-server</code>:</strong>
    <p>Esse addon permite coletar métricas dos pods, como uso de CPU e memória.</p>
    <pre>minikube addons enable metrics-server</pre>
  </li>

  <li>
    <strong>Ative o addon de volumes persistentes:</strong>
    <p>Permite o uso de volumes persistentes com o driver de armazenamento local padrão.</p>
    <pre>minikube addons enable csi-hostpath-driver</pre>
  </li>

  <li>
    <strong>Abra o dashboard do Minikube:</strong>
    <p>Interface gráfica para visualizar recursos do cluster em tempo real.</p>
    <pre>minikube dashboard</pre>
  </li>

  <li>
    <strong>Aplique todos os manifestos YAML do projeto:</strong>
    <p>Cria os recursos do banco de dados, da aplicação, e do NGINX dentro do cluster.</p>
    <pre>
kubectl apply -f db-configmaps.yaml
kubectl apply -f db-secrets.yaml
kubectl apply -f db-statefulsets.yaml
kubectl apply -f app-configmaps.yaml
kubectl apply -f app-secrets.yaml
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml
kubectl apply -f nginx-config.yaml
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service-loadbalancer.yaml
    </pre>
  </li>
  <li>
    <strong>Inicie o túnel do Minikube:</strong>
    <p>O túnel cria rotas no seu sistema para permitir o acesso externo ao LoadBalancer.</p>
    <pre>minikube tunnel</pre>
  </li>

  <li>
    <strong>Verifique os serviços do cluster:</strong>
    <p>O comando abaixo mostra os serviços criados, incluindo o <code>EXTERNAL-IP</code> do LoadBalancer.</p>
    <pre>kubectl get svc</pre>
  </li>

  <li>
    <strong>Acesse a aplicação pelo navegador:</strong>
    <p>Copie a URL do campo <code>EXTERNAL-IP</code> referente ao serviço NGINX e cole no seu navegador para acessar a aplicação.</p>
  </li>
</ol>

<h2>Arquitetura</h2>
<ul>
  <li><strong>Banco de Dados:</strong> PostgreSQL gerenciado pelo Prisma e Kubernetes StatefulSets.</li>
  <li><strong>Load Balancer:</strong> NGINX balanceando a carga entre múltiplas instâncias da aplicação.</li>
  <li><strong>Configuração:</strong> ConfigMaps para variáveis de ambiente e Secrets para valores sensíveis.</li>
  <li><strong>Backup:</strong> CronJob para backup diário do banco de dados às 03:00 da manhã.</li>
  <li><strong>Volumes:</strong> PersistentVolumeClaim para armazenamento de dados do banco.</li>
  <li><strong>Monitoramento:</strong> Health Check com LivenessProbe a cada 3 segundos.</li>
</ul>

<h2>Escalabilidade</h2>
<p>
  O uso de Kubernetes permite gerenciar réplicas da aplicação, garantindo alta disponibilidade e resiliência. O NGINX atua como Load Balancer, distribuindo requisições entre as instâncias. Além disso, o armazenamento persistente e os backups automáticos garantem a integridade dos dados.
</p>
