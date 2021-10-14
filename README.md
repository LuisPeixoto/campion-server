
![Logo](logo.png)


# Sobre

Campion-server, se trata de API REST que foi desenvolvida para ser consumida pelo aplicativo [campion](https://github.com/LuisPeixoto/campion)
, em que tem o objetivo de realizar a troca de mensagens entre dois usuários.

Foi utilizado para o desenvolvimento da API a linguagem JavaScript, o ambiente de desenvolvimento NodeJS e o framework Express. Para o realizar a comunicação em tempo real entre os usuários da aplicação foi utilizado o socket.io, que se trata de uma biblioteca em que permite a comunicação entre clientes e servidores.


## Rotas

#### Autenticação

| Rotas   |   Métodos      |  Função |
|----------|:-------------:|:------|
| auth/login|  POST | Realiza o login na aplicação |
| auth/register |    POST  | Cadastra um novo usuário |

#### Conversa

| Rotas   |   Métodos      |  Função |
|----------|:-------------:|:------|
| chats/:userId| GET | Retorna a todas as conversas de um usuário |
| chats/ | POST  | Criar uma nova conversa |
| chats/find/:userId/:secondUserId |  GET  | Retorna a conversa entre dois usuários |


#### Mensagem

| Rotas   |   Métodos      |  Função |
|----------|:-------------:|:------|
| message/:chatId|  GET | Retorna todas as mensagens de uma conversa |
| message/|    POST  | Criar uma nova mensagem |

#### Usuário

| Rotas   |   Métodos      |  Função |
|----------|:-------------:|:------|
| user/|  GET | Retorna todos os usuários |
| user/:userId | PUT | Atualiza os dados cadastrais de um usuário |
| user/followers/:userId|  GET | Retorna todos os seguidores de um usuário |
| user/:userId/follow | PUT | Segui um usuário |
| user/:userId/unfollow | PUT | Deixa de seguir um usuário |

## Modelo de dados

O modelo da aplicação é composto por três collections: usuário, conversa e mensagem. Cada usuário é identificado por seu ID e pode iniciar uma conversa com qualquer outro usuário que esteja tanto na lista de seguidores quanto na de seguindo. A conversa tem somente 2 usuários participantes enquanto cada usuário pode estar em n diferentes conversas. Pertence a uma conversa os dois usuários que estão com o seus Ids em membros. A mensagem pode ser enviada n vezes por cada usuário.

### Collection usuário

| Campos   |   Função      |
|----------|:-------------|
| _id| Identificador que será gerado pelo mongoDB. |
| username | Identificador único para cada usuário, será utilizado para que os usuários dentro da aplicação possam encontrar outros usuários.  |
| nome |  Nome completo do usuário.
| avatar |  Endereço da imagem do perfil.
| senha |  Senha criptografada do usuário.
| seguindo |  Array contendo todos _id de outros usuários que são seguidos.
| seguidores |  Array contendo todos _id dos outros usuários que seguem o usuário

### Collection conversa

| Campos   |   Função      |
|----------|:-------------|
| _id| Identificador que será gerado pelo mongoDB. |
| membros | Array com dois _id de usuarios que fazem parte da conversa.  |
| criadoEm |  Hora e data do inicio da conversa.

### Collection mensagem

| Campos   |   Função      |
|----------|:-------------|
| _id| Identificador que será gerado pelo mongoDB. |
| texto | Texto da mensagem.  |
| criadoEm |  Hora e data do envio da mensagem.


## Instalação

### Clone do repositório

```bash
$ git clone https://github.com/LuisPeixoto/campion

$ cd campion
```

### Instalação das dependências

```bash
$ yarn install
```

### Execução

```bash
$ yarn start
```

## Autores

- [@LuisPeixoto](https://github.com/LuisPeixoto)
- [@RalfMateus](https://github.com/RalfMateus)
- [@yurigc77](https://github.com/yurigc77)
