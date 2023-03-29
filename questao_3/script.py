import requests
import openpyxl

# Faz uma solicitação HTTP para a API do GitHub
response = requests.get("https://api.github.com/repositories")

# Verifica se a solicitação foi bem-sucedida
if response.status_code == 200:
    # Obtém o conteúdo da resposta em formato JSON
    repositories = response.json()

    # Inicializa as variáveis de contagem
    total_repos = len(repositories)
    json_repos = 0
    json_none_repos = 0

    # Verifica a descrição de cada repositório
    for repo in repositories:
        if repo["description"] is None:
            json_none_repos += 1
        else:
            if "json" not in repo["description"].lower():
                json_repos += 1

    # Cria um novo arquivo Excel e adiciona os dados
    wb = openpyxl.Workbook()
    sheet = wb.active
    sheet.title = "Repositórios"

    sheet["A1"] = "Contém JSON na descrição"
    sheet["A2"] = "Não"
    sheet["A3"] = "Sim"

    sheet["B2"] = json_repos + json_none_repos
    sheet["B3"] = total_repos - (json_repos + json_none_repos)

    # Salva o arquivo Excel
    wb.save("repositories.xlsx")

    print("Arquivo criado com sucesso!")
else:
    print("Erro ao obter os dados da API.")
