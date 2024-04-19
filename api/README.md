# WaiterApp Backend

Este é o backend do WaiterApp, uma aplicação para gerenciamento de pedidos em um restaurante.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Python 3.x
- pip (gerenciador de pacotes do Python)
- PostgreSQL

## Configuração do Ambiente

1. Clone este repositório:

   ```bash
   git clone https://github.com/Jessycanoronha/waiterapp.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd waiterapp
   ```

3. Instale as dependências

   ```bash
   pip install -r requirements.txt
   ```

4. Renomeie o arquivo .env.example para .env e defina as variáveis de ambiente necessárias, como a URL do banco de dados PostgreSQL.

5. Execute as migrações do banco de dados usando Flask-Migrate:

   ```
      flask db init
      flask db migrate
      flask db upgrade
   ```

ou se preferir importe o arquivo SQL db.sql localizado na raiz do projeto no seu banco de dados PostgreSQL.

## Sobre Flask-Migrate

O Flask-Migrate é uma extensão do Flask que simplifica o gerenciamento de migrações de banco de dados para aplicativos Flask que usam o SQLAlchemy. Ele permite que você crie, aplique e gerencie facilmente migrações de banco de dados, o que é útil quando você precisa modificar o esquema do banco de dados conforme sua aplicação evolui.

Aqui está uma breve explicação sobre como o Flask-Migrate funciona:

- **Inicialização**: Primeiro, você inicializa o Flask-Migrate no seu projeto Flask executando o comando `flask db init`. Isso criará uma pasta chamada `migrations` no seu projeto, que contém os arquivos necessários para gerenciar as migrações do banco de dados.

- **Migrações**: Quando você faz alterações no seu modelo de banco de dados (adicionando tabelas, modificando campos, etc.), você usa o Flask-Migrate para gerar uma migração. Isso é feito executando o comando `flask db migrate`, que compara o estado atual do seu banco de dados com o estado do modelo definido no seu aplicativo Flask e gera um arquivo de migração com as alterações necessárias.

- **Aplicação de Migrações**: Depois de criar uma migração, você a aplica ao banco de dados executando o comando `flask db upgrade`. Isso executa a migração e aplica as alterações ao banco de dados.

O Flask-Migrate simplifica significativamente o processo de gerenciamento de migrações de banco de dados e é uma escolha popular para aplicativos Flask que usam o SQLAlchemy.

Quanto à escolha entre usar o Flask-Migrate ou o arquivo SQL (`db.sql`), depende das preferências e necessidades do projeto. O Flask-Migrate é uma abordagem mais programática e automatizada, o que pode ser preferível para projetos em que você deseja gerenciar as migrações de forma mais granular e controlada. Por outro lado, o arquivo SQL pode ser mais adequado para projetos menores ou para casos em que você prefere gerenciar manualmente as alterações no banco de dados.

Referências:

- [Flask-Migrate Documentation](https://flask-migrate.readthedocs.io/en/latest/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/14/)

6. Crie um ambiente virtual (opcional, mas recomendado) e ative-o:

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

7. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

     ```dotenv
     FLASK_APP=app.py
     FLASK_ENV=development
     DATABASE_URL=postgresql://<username>:<password>@localhost:5432/waiterappflask
     ```

     Substitua `<username>` e `<password>` com as credenciais do seu banco de dados PostgreSQL.

8. Execute as migrações do banco de dados( Caso opte por usá-las no lugar do `db.sql`, localizado na raiz do projeto):

   ```bash
   flask db upgrade
   ```

## Executando o servidor

Após configurar o ambiente, você pode iniciar o servidor Flask com o seguinte comando:

```bash
flask run
```

O servidor estará disponível em `http://localhost:3000`.

## Documentação da API

Acesse a documentação da API em `http://localhost:3000/swagger` para obter informações sobre os endpoints disponíveis e como usá-los.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para relatar bugs ou propor novos recursos. Pull requests também são apreciados.

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

Feito por Jéssyca Noronha 🤘🏿❤️
