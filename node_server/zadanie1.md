# Zadanie 1 - PFSWCHO
## Punkt 1.
W folderze node_server znajduje się plik server.js realizujący podpunkty z zadania 1.
Serwer nasłuchuje na porcie 3333.
Linie 13-28 umożliwiają wyświetlenie w przeglądarce informacji o adresie oraz czasie.
Linie 32,33 pozostawiają w logach informacje kto jest autorem serwera oraz na jakim porcie nasłuchuje serwer.

## Punkt 2.
Punkt 2 został zrealizowany na dwa sposoby - uruchomienie aplikacji bezpośrednio w kontenerze i zmapowanie portów (node_server/Dockerfile) lub wykorzystanie proxy nginx i skorzystanie z docker-compose. Powodem było przetestowanie, czy wewnątrz kontenera można odczytać prawdziwy adres IP klienta. W obu przypadkach się nie udało - aplikacja jest testowana lokalnie na 'localhoscie' a pokazywany czas to czas systemowy.


## Punkt 3.
Aby zbudować obraz należy użyć polecenia: (będąc w folderze node_server)
`docker build . -t damianciechan/pfschwo_zadanie_1`
Następnie uruchomić kontener:
`docker run -p 3333:3333 -d --name node_server damianciechan/pfschwo_zadanie_1`
W konsoli wyświetlona zostanie wartość ID kontenera, np:
`80c5b5b8fd7be22959b70e664f3c7c03b56a20774094781c25ec6e6b27fd251d`.
Należy teraz użyć kilku pierwszych cyfr id i użyć polecenia:
`docker logs 80c5`
W wyniku tego polecenia zostanie wyświetlona wiadomość wygenerowania podczas uruchamiania serwera:
```javascript
Kontener uruchomiony na porcie 3333
Autorem jest Damian Ciechan
```
Ile warstw posiada obraz możemy sprawdzić poleceniem:
`docker history damianciechan/pfschwo_zadanie_1`
```
IMAGE          CREATED         CREATED BY                                      SIZE      COMMENT
788242f56ee4   3 minutes ago   LABEL org.opencontainers.image.authors=damia…   0B        buildkit.dockerfile.v0
<missing>      3 minutes ago   CMD ["node" "server.js"]                        0B        buildkit.dockerfile.v0
<missing>      3 minutes ago   EXPOSE map[3333/tcp:{}]                         0B        buildkit.dockerfile.v0
<missing>      3 minutes ago   COPY . . # buildkit                             2.67MB    buildkit.dockerfile.v0
<missing>      20 hours ago    RUN /bin/sh -c npm install # buildkit           2.7MB     buildkit.dockerfile.v0
<missing>      20 hours ago    COPY package*.json ./ # buildkit                44.4kB    buildkit.dockerfile.v0
<missing>      20 hours ago    RUN /bin/sh -c apk add --update nodejs npm #…   50.9MB    buildkit.dockerfile.v0
<missing>      20 hours ago    WORKDIR /usr/src/app                            0B        buildkit.dockerfile.v0
<missing>      23 hours ago    ADD alpine-minirootfs-3.15.4-aarch64.tar.gz …   5.32MB    buildkit.dockerfile.v0
```