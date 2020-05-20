FROM node:lts

EXPOSE 4000
WORKDIR /cer-graphql/
ADD package.json .
ADD package-lock.json .
ADD index.js .
RUN  npm install
CMD ["node","index.js"]
