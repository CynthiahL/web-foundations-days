# School Database Design

## Tables
- **students**: Stores each student's name and unique email.
- **courses**: Contains course titles and instructors.
- **enrolments**: Links students to courses and records their grade.

## Relationships
- **One-to-many**: One course can have many enrolments; one student can have many enrolments.
- **Many-to-many**: Students and courses are connected through the `enrolments` table, which acts as a join table. This is necessary because a student can take multiple courses, and each course can have multiple students.

## Index
I would add an index on `enrolments(course_id)` to speed up queries that list all students in a course, since that lookup happens frequently.

## SQL vs NoSQL
For this system, **SQL** is the better choice. The relationships between students, courses, and enrolments are structured and interdependent, making relational integrity and JOIN operations essential. NoSQL would be less efficient for enforcing constraints like unique emails or preventing duplicate enrolments.
