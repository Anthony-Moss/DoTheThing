insert into users 
    (first_name, last_name, email, password)
    VALUES
    ('Anthony', 'Moss', 'am123@me.com', 'Waffles')
;
insert into all_tickets 
    (issue_desc, time_posted)
    VALUES
    ('2nd floor stairwell door does not unlock', '2008-01-01 00:00:01'),
    ('Elavator doors keep opening and closing', '2008-01-01 00:00:01'),
    ('4th floor coffee machine is broken', '2008-01-01 00:00:01')
;
insert into open_tickets
    (all_tickets_id)
    VALUES
    (3)
    
;
insert into pending_tickets
    (all_tickets_id, users_id, time_started)
    VALUES
    (1, 1, '2008-01-01 00:00:01'),
    (2, 1, '2008-01-01 00:00:01')
;
insert into completed_tickets
    (all_tickets_id, users_id, time_ended)
    VALUES
    (2, 1, '2008-01-01 00:00:01')
;
insert into notes
    (note_content, all_tickets_id, users_id)
    VALUES
    ('fixed elevator door, it was just a bad sensor', 2, 1)