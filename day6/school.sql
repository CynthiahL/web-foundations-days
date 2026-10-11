-- 1. CREATE TABLE statements
CREATE TABLE students (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
  course_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  instructor TEXT NOT NULL
);

CREATE TABLE enrolments (
  enrolment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  grade TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  UNIQUE (student_id, course_id)
);

-- 2. INSERT sample data
INSERT INTO students (name, email) VALUES
('Alice Mwangi', 'alice@example.com'),
('Brian Otieno', 'brian@example.com'),
('Clara Wanjiru', 'clara@example.com');

INSERT INTO courses (title, instructor) VALUES
('Database Systems', 'Dr. Kamau'),
('Web Development', 'Ms. Achieng'),
('Public Health Analytics', 'Dr. Njeri');

INSERT INTO enrolments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B+'),
(2, 2, 'A-'),
(2, 3, 'B'),
(3, 1, 'A');

-- 3. Queries

-- a) All courses for one student (by name)
SELECT s.name, c.title, c.instructor, e.grade
FROM students s
JOIN enrolments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.name = 'Alice Mwangi';

-- b) All students on one course
SELECT c.title, s.name, e.grade
FROM courses c
JOIN enrolments e ON c.course_id = e.course_id
JOIN students s ON e.student_id = s.student_id
WHERE c.title = 'Web Development';

-- c) Number of students per course
SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrolments e ON c.course_id = e.course_id
GROUP BY c.course_id;

-- d) Students who have no enrolments
SELECT s.name
FROM students s
LEFT JOIN enrolments e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;

-- e) Update one enrolment's grade
UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 1 AND course_id = 2;
