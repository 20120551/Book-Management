FROM kong:latest
USER root

# install npm
RUN apk update && apk add nodejs npm && npm install --unsafe -g kong-pdk
# RUN npm install --unsafe -g kong-pdk
# RUN npm install --unsafe -g jsonwebtoken
# RUN npm install --unsafe -g jwks-rsa
# RUN npm install --unsafe -g dotenv
# RUN npm install --unsafe -g mssql
#start kong
# CMD ["kong", "start"]