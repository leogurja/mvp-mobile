# MVP Mobile – Circuito Terê Verde

## Dados dos Integrantes

- João Paulo da Costa Rosa - 06007776
- Leonardo Gurgel Maciel Ferreira – 06010973

## Situação Problema Escolhida

A geografia do território municipal de Teresópolis é caracterizada por terrenos montanhosos entremeados por vales. A área urbana encontra-se em um planalto a 869 metros acima do nível do mar e é delimitada por três unidades de conservação: o Parque Nacional da Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural Municipal Montanhas de Teresópolis. A existência das unidades de conservação proporciona ao município o turismo ambiental, em especial de montanhismo, e também limitam o crescimento urbano.

Teresópolis é um destino turístico popular, atraindo visitantes em busca de belezas naturais e atividades ao ar livre, como trilhas e escaladas. A proposta do Circuito Terê Verde busca promover essas atrações, destacando a rica biodiversidade e as opções de ecoturismo disponíveis na região. A plataforma “Terê Verde Online” permitirá que os visitantes tenham acesso a informações atualizadas sobre a biodiversidade, trilhas, cachoeiras e eventos que ocorrem nesses espaços protegidos.

Com uma interface amigável e recursos interativos, o site se tornará uma ferramenta essencial para turistas que desejam explorar as belezas naturais de Teresópolis de forma consciente e atualizada.

## Descrição do MVP

Este projeto é um MVP mobile desenvolvido em Next.js, com o objetivo de fornecer informações atualizadas sobre biodiversidade, trilhas, cachoeiras e eventos, além de permitir a gestão de disponibilidade e novidades por administradores.

## Requisitos Atendidos

### Funcionais

- **Acesso a informações**: Os visitantes têm acesso a informações atualizadas sobre biodiversidade, trilhas, cachoeiras e eventos.
- **Login para Administradores**: Botão de login para acesso a áreas restritas do site.
- **Gestão de Disponibilidade**: Área administrativa para configurar disponibilidade, horários de funcionamento de eventos/temporadas e atualizações de novidades.

### Não Funcionais

- **Usabilidade**: Interface amigável e de fácil utilização.
- **Acesso Offline**: Algum nível de acesso offline, considerando uso em locais remotos.
- **Desempenho Rápido**: Resposta rápida para muitos usuários simultâneos.
- **Segurança de Dados**: Segurança e privacidade dos dados dos administradores.

## Escopo (Fora do MVP)

- Integração com sistemas de pagamento online.
- Funcionalidades de chat em tempo real.
- Suporte a múltiplos idiomas.
- Notificações push.

## Como Executar Localmente

1. Instale as dependências:

   ```bash
   pnpm install # ou npm install, yarn install, conforme o gerenciador de pacotes
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev # ou npm run dev, yarn dev, etc.
   ```

3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

4. Configure o banco de dados antes de fazer login, rodando:


```bash
npx prisma migrate dev
npx prisma db seed
```

prisma migrate dev: cria as tabelas no banco de dados conforme o schema definido.
prisma db seed: popula o banco com dados iniciais, como o usuário admin.  

## Acesso ao painel de admin

O painel de admin é propositalmente escondido da navegação normal do App.
Para acessar, vá até [http://localhost:3000/admin](http://localhost:3000/admin)
Em desenvolvimento, o usuário e senha pré-criado é:
email: `admin@admin.com`
senha: `admin`
