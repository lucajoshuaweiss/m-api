# m-api

![](screenshots/m-api-server.jpg?raw=true)  
![](screenshots/m-api-client.jpg?raw=true)  

A messaging API intended to be used in the shell.

# Usage
## Server
1. Customize index.js to your preferred port.
2. Install modules:
```bash
npm install
```
4. Run the server using Node.js:
```bash
node .
```

## Client (UNIX)
1. Customize the shell scripts under "client" to use the necessary IP and port.
2. Moving shellscripts to "/bin" (recommended)
```bash
sudo mv client/m-api-get-messages.sh /bin/m-api-get-messages \
&& sudo mv client/m-api-post-message.sh /bin/m-api-post-message \
&& sudo mv client/m-api-server-status.sh /bin/m-api-server-status
```
2. Post messages:
```bash
m-api-post-message <user> <message>
```
3. Get messages:
```bash
m-api-get-messages
```
4. Check server status:
```bash
m-api-server-status
```

# Docker
You can also run the server as a docker image:
1. Build the image:
```bash
docker build .
```
2. Run the container, mapping the desired port:
```bash
docker run -p <dockerPort>:8080 <imageId>
```
