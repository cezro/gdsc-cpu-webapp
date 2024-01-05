-- migrate:up
ALTER TABLE events
    ADD COLUMN image VARCHAR(255);

-- migrate:down
ALTER TABLE events
    DROP COLUMN image;

