# Documentação do Projeto O Nômade

## Visão Geral

**Nome do Projeto**: O Nômade
**Versão**: 0.1.0
**Autor**: Andre Menezes

O Nômade é um projeto construído utilizando o framework Vue 3. Ele tem por objetivo realizar reservas em hotéis baseadas na escolha do usuário. O projeto faz parte do processo seletivo para Desenvolvedor Front End na empresa NTConsult.

## Estrutura do Projeto

### Dependências

Principais bibliotecas e frameworks utilizados no projeto:

- **Axios**: Para realização de requisições HTTP simuladas.
- **Json Server**: Para fornecer um backend simulado para leitura e gravação de dados em uma database JSON.
- **Maska**: Para criar máscaras de campos de input.
- **MD5**: Para gerar hash de senhas de usuários.
- **Moment**: Para manipular datas.
- **Pinia**: Para gerenciar os estados da aplicação.
- **Vue 3**: Framework JavaScript para construção de interfaces de usuário.
- **Vue Router**: Para gerenciar as rotas da aplicação.
- **TailwindCSS**: Para estilização da aplicação.
- **Typescript**: Para tipagem estática e garantir a integridade dos dados da aplicação.

## Setup do projeto

### Clone do repositório

```sh
git clone https://github.com/andre-menezes/o-nomade.git
```

### Instalação das dependências

```sh
cd o-nomade
yarn install
```

### Inicializar o Json Server

```sh
yarn backend
```

### Inicializar o ambiente de desenvolvimento

```sh
yarn serve
```

### Realizar o build

```sh
yarn build
```

## Estrutura de diretórios

```
src/
├── assets/
│   └── img/
├── components/
│   └── modals/
├── config/
├── database/
├── interfaces/
├── layouts/
├── plugins/
├── router/
├── stores/
│   └── modules/
│       ├── app/
│       ├── auth/
│       ├── mocks/
├── utils/
└── views/
```
