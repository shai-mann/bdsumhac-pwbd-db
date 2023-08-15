drop table facility_edits;

drop table facilities;

create table facilities (
    id identity primary key,
    name1 varchar(128) not null,
    name2 varchar(128),
    street1 varchar(128) not null,
    street2 varchar(128),
    city varchar(128) not null,
    state varchar(128) not null,
    zip int not null,
    zip4 int,
    county varchar(128) not null,
    phone varchar(128) not null,
    website varchar(128) not null,
    latitude float not null,
    longitude float not null,
    pwbd boolean
);

create table facility_edits (
    id identity primary key,
    facility int references facilities (id),
    time timestamp,
    email varchar(128),
    pwbd boolean -- the value it was edited to
)