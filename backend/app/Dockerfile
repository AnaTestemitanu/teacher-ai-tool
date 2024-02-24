FROM node:19-bullseye

WORKDIR /app

COPY /app/package.json .

RUN yarn install

COPY /app .

EXPOSE 3005

RUN yarn global add nodemon

# Install Python
# RUN apt-get update && apt-get install -y python3 python3-pip

# RUN apt-get update && \
#     apt-get install -y poppler-utils && \
#     rm -rf /var/lib/apt/lists/*

# RUN apt-get update && \
#     apt-get install -y tesseract-ocr && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# Set python3 as the default python version
# RUN ln -s /usr/bin/python3 /usr/bin/python

# RUN pip install pytesseract
# RUN pip install pdf2image

CMD [ "yarn", "start" ]