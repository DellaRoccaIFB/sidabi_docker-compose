FROM postgres:16 

COPY ./pg_dump /var/backups/carga-inicial.backup
COPY ./restore-dump-init.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/restore-dump-init.sh

CMD [ "postgres" ]