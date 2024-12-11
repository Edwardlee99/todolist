create DATABASE todolist
--

CREATE TABLE task (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255) NULL,
  status enum('pending','completed') NOT NULL DEFAULT 'pending',
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL
  PRIMARY KEY (id)
) 

