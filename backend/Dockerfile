FROM python:3.10

WORKDIR /app


COPY requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

COPY . .

EXPOSE 5000

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

CMD ["python", "app.py"]
