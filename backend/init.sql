CREATE TABLE IF NOT EXISTS resume (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    email TEXT,
    phone TEXT,
    location TEXT,
    objective TEXT,
    about TEXT,
    experience JSONB,
    skills JSONB,
    certifications JSONB,
    education JSONB,
    links JSONB
);
