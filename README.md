# MyNotes Front-End

Este é o front-end do projeto **MyNotes**, uma aplicação para gerenciamento de notas, desenvolvida utilizando **Vue.js** com o framework **Quasar**. Este projeto permite que os usuários criem, editem, excluam e busquem notas de maneira intuitiva e eficiente, sendo possível também editar e deletar seu próprio usuário.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript progressivo para construção de interfaces de usuário.
- **Quasar Framework**: Framework que permite criar interfaces de usuário responsivas e de alta performance.
- **Axios**: Biblioteca utilizada para realizar requisições HTTP para a API do back-end.

## Funcionalidades

- **Cadastro de Usuários**: Registre-se para criar e gerenciar suas próprias notas.
- **Edição e Exclusão do Usuário**: Tenha controle do usuário criado.
- **Autenticação**: Login seguro para acesso às suas notas.
- **Criação e Edição de Notas**: Adicione novas notas e edite as existentes.
- **Exclusão de Notas**: Remova notas que não são mais necessárias.
- **Busca de Notas**: Busque notas pelo título de forma rápida.

## Configuração do Projeto

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/LiviaBrito7/myNotes-front.git
    cd mynotes-front
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento**:

    ```bash
    quasar dev
    ```

4. **Acesse a aplicação em seu navegador**:

    ```
    http://localhost:9000
    ```

## Integração com o Back-End

O front-end do **MyNotes** se conecta com a API desenvolvida em Node.js, utilizando Express e Prisma. Certifique-se de que a API esteja rodando para que o front-end possa consumir seus endpoints corretamente. Acesse a api em https://github.com/LiviaBrito7/myNotes-api.
