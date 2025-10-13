create table test (                                                                                                                        
    id serial primary key,                                                                                                                    
    name varchar(100) not null                                                                                                              
);    

INSERT INTO test (name)
VALUES
('La base de données est bien connectée');