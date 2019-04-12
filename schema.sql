create table users (
    id serial primary key,
    first_name varchar(100), 
    last_name varchar(100),  
    email varchar(200),
    password varchar(500) 
);

create table all_tickets (
    id serial primary key,
    issue_desc VARCHAR(500),
    -- notes_id integer references notes,
    time_posted VARCHAR(500)
    -- open_tickets_id integer references open_tickets,
    -- pending_tickets_id integer references pending_tickets,
    -- completed_tickets_id integer references completed_tickets
    -- do we want to have avail_key, pend_key, completed_key to track ticket as it moves through tables
    -- working_status 
);

-- do we need all_tickets? can we just have the avail, pending, completed? 

create table open_tickets (
    id serial primary key,
    all_tickets_id integer references all_tickets
    -- time in queue
);

create table pending_tickets (
    id serial primary key,
    all_tickets_id integer references all_tickets,
    users_id integer references users,
    time_started TIMESTAMP
);

create table completed_tickets (
    id serial primary key,
    all_tickets_id integer references all_tickets,
    users_id integer references users,
    time_ended TIMESTAMP
);

create table notes (
    id serial primary key,
    note_content varchar(250),
    users_id integer references users,
    all_tickets_id integer references all_tickets
);