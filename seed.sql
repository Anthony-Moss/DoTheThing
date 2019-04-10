insert into users 
    (first_name, last_name, email, password)
    VALUES
    ('Anthony', 'Moss', 'am123@me.com', 'Waffles')
;
insert into all_tickets 
    (issue_desc, notes_id, timestamp, available_tickets_id, pending_tickets_id, completed_tickets_id)
    VALUES
    ('2nd floor stairwell door does not unlock', timestamp, 1, 1),
    ('Elavator doors keep opening and closing', timestamp, 2, 2, 1),
    ('4th floor coffe machine is broken', timestamp, 3)
;
insert into available_tickets_id
    (all_tickets_id)
    VALUES
    (3)
    
;
insert into pending_tickets
    (all_tickets_id, users_id, timestamp)
    VALUES
    (1, 1, timestamp),
    (2, 1, timestamp)
;
insert into completed_tickets
    (all_tickets_id, users_id, timestamp)
    VALUES
    (2, 1, timestamp)
;
insert into notes
    (note_content, all_tickets_id, users_id)
    VALUES
    ('fixed elevator door, it was just a bad sensor', 2, 1)