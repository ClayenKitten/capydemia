FROM node:21

WORKDIR /app
# Make bash colored
RUN cp /etc/skel/.bashrc /root/.bashrc
RUN apt update && apt install -y git nano

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
