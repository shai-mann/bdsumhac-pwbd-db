drop table facility_flags;
drop table facilities;
drop table flags;
drop table service_codes;

create table service_codes (
    id identity primary key,
    code varchar(4) not null,
    "name" varchar(128) not null
);

create table flags (
    id identity primary key,
    code varchar(4) not null,
    description varchar(256) not null
);

create table facilities (
    id identity primary key,
    name1 varchar(128) not null,
    name2 varchar(128),
    street1 varchar(128) not null,
    street2 varchar(128),
    city varchar(128) not null,
    "state" varchar(128) not null,
    zip int not null,
    zip4 int,
    county varchar(128) not null,
    phone varchar(128) not null,
    intake_prompt varchar(128),
    intake1 varchar(128),
    intake2 varchar(128),
    website varchar(128) not null,
    latitude float not null,
    longitude float not null,
    type_facility int references service_codes (id)
);

create table facility_flags (
    id identity primary key,
    facility int references facilities (id),
    flag int references flags (id)
);
