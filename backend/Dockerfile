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
LABEL org.opencontainers.image.source="https://github.com/cesar-richard-ei/turbo-pancake-tocarde"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/home/tpt/.local/bin:${PATH}"

WORKDIR /code
RUN mkdir -p /code/staticfiles/ /code/mediafiles /home/tpt/.ssh && \
    groupadd -r tpt && \
    useradd -r -g tpt tpt

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc graphviz && \
    rm -rf /var/lib/apt/lists/* && \
    chown tpt:tpt -R /home/tpt /code

COPY --from=builder /code/wheels /wheels
COPY --from=builder /code/requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache --no-deps /wheels/* && \
    pip install -r requirements.txt && \
    rm -rf /wheels requirements.txt

COPY --chown=tpt:tpt ./manage.py /code/manage.py
COPY --chown=tpt:tpt ./tpt /code/tpt

USER tpt

RUN DJANGO_SECRET_KEY=whatever python manage.py collectstatic --noinput --clear

EXPOSE 8000

CMD ["gunicorn", "tpt.wsgi:application", "--bind", "0.0.0.0:8000"]
