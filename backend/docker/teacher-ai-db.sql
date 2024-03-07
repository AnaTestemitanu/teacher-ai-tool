SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER SCHEMA public OWNER TO postgres;

CREATE TYPE public.gender AS ENUM (
    'MALE',
    'FEMALE',
    'NON-BINARY'
);

ALTER TYPE public.gender OWNER TO postgres;

CREATE TYPE public.level AS ENUM (
    'LOWER',
    'MEDIUM',
    'HIGH'
);


ALTER TYPE public.level OWNER TO postgres;

SET default_tablespace = '';
SET default_table_access_method = heap;

CREATE TABLE public.lessons (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    name character varying NOT NULL,
    age integer NOT NULL,
    group_name character varying NOT NULL,
    topic character varying NOT NULL,
    tons character varying NOT NULL,
    pdf_link character varying,
    pdf_pages character varying,
    level public.level,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE public.lessons OWNER TO postgres;

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    password_salt character varying NOT NULL,
    years_of_experience integer NOT NULL,
    gender public.gender NOT NULL,
    main_language character varying NOT NULL,
    date_of_birth date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE public.users OWNER TO postgres;
ALTER TABLE ONLY public.users ADD CONSTRAINT email UNIQUE (email);
ALTER TABLE ONLY public.lessons ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lessons ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id);

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;