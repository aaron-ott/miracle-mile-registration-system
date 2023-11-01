# syntax=docker/dockerfile:1

FROM python:slim

WORKDIR /app
COPY . .

RUN pip install fastapi uvicorn

EXPOSE 8000