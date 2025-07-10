FROM python:3.13.3-slim-bookworm AS base
LABEL org.opencontainers.image.authors="Cesar Richard <cesar@crichard.fr>"

RUN apt-get update && \
    apt-get full-upgrade -y && \
    apt-get install --no-install-recommends -y gcc && \
    rm -rf /var/lib/apt/lists/*


FROM base AS builder
LABEL org.opencontainers.image.authors="Cesar Richard <cesar@crichard.fr>"

WORKDIR /code/

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc git && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /code/wheels -r requirements.txt


FROM base
LABEL org.opencontainers.image.authors="Cesar Richard <cesar@crichard.fr>"
LABEL org.opencontainers.image.source="https://github.com/cesar-richard-ei/france-tocarde"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/home/ft/.local/bin:${PATH}"

WORKDIR /code
RUN mkdir -p /code/staticfiles/ /code/mediafiles /home/ft/.ssh && \
    groupadd -r ft && \
    useradd -r -g ft ft

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc graphviz && \
    rm -rf /var/lib/apt/lists/* && \
    chown ft:ft -R /home/ft /code

COPY --from=builder /code/wheels /wheels
COPY --from=builder /code/requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache --no-deps /wheels/* && \
    pip install -r requirements.txt && \
    rm -rf /wheels requirements.txt

COPY --chown=ft:ft ./manage.py /code/manage.py
COPY --chown=ft:ft ./ft /code/ft

USER ft

RUN DJANGO_SECRET_KEY=whatever python manage.py collectstatic --noinput --clear

EXPOSE 8000

ARG FT_VERSION=development
ENV VERSION=${FT_VERSION}

CMD ["gunicorn", "ft.wsgi:application", "--bind", "0.0.0.0:8000"]
