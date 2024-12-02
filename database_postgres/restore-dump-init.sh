#!/bin/bash

# Carregar variáveis de ambiente do arquivo .env 
if [ -f .env ]; then 
    export $(cat .env | xargs)
fi

echo "Iniciando a restauração do banco de dados..."
pg_restore -c -U ${POSTGRES_USER} -d ${POSTGRES_DB} /var/backups/carga-inicial.backup
if [[ $? -eq 0 ]]; then
    echo "Restauração do banco de dados concluída com sucesso."
else
    echo "Erro ao restaurar o banco de dados."
    exit 1
fi
