import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();
console.log(process.env.DATABASE_URL);

async function main() {
  await prisma.submission.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const defaultPassword = 'password123';

  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: defaultPassword,
      role: Role.ADMIN,
    },
  });

  const teacher1 = await prisma.user.create({
    data: {
      name: 'Alice Teacher',
      email: 'teacher1@example.com',
      password: defaultPassword,
      role: Role.TEACHER,
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      name: 'Bob Teacher',
      email: 'teacher2@example.com',
      password: defaultPassword,
      role: Role.TEACHER,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      name: 'Charlie Student',
      email: 'student1@example.com',
      password: defaultPassword,
      role: Role.STUDENT,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: 'Diana Student',
      email: 'student2@example.com',
      password: defaultPassword,
      role: Role.STUDENT,
    },
  });

  const student3 = await prisma.user.create({
    data: {
      name: 'Eve Student',
      email: 'student3@example.com',
      password: defaultPassword,
      role: Role.STUDENT,
    },
  });

  const course1 = await prisma.course.create({
    data: {
      title: 'Introduction to Programming',
      description: 'Learn the fundamentals of programming using Python.',
      image:
        'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
      teacherId: teacher1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Web Development Basics',
      description: 'Build your first websites using HTML, CSS, and JavaScript.',
      image:
        'https://gogo.co.id/wp-content/uploads/2021/12/Ketahui-Perbedaan-Website-Development-VS-Website-Design.jpg',
      teacherId: teacher1.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Data Structures in Java',
      description:
        'Understand common data structures and their implementation.',
      image: 'https://via.placeholder.com/300x200.png?text=Data+Structures',
      teacherId: teacher2.id,
    },
  });

  const lesson1_1 = await prisma.lesson.create({
    data: {
      title: 'Variables and Data Types',
      description: 'Understanding how to store information.',
      contentUrl: 'https://example.com/lesson/python-vars',
      courseId: course1.id,
    },
  });
  const lesson1_2 = await prisma.lesson.create({
    data: {
      title: 'Control Flow (If/Else)',
      description: 'Making decisions in your code.',
      contentUrl: 'https://example.com/lesson/python-control-flow',
      courseId: course1.id,
    },
  });

  const lesson2_1 = await prisma.lesson.create({
    data: {
      title: 'HTML Structure',
      description: 'The skeleton of a web page.',
      contentUrl: 'https://example.com/lesson/html-structure',
      courseId: course2.id,
    },
  });
  const lesson2_2 = await prisma.lesson.create({
    data: {
      title: 'CSS Basics',
      description: 'Styling your web pages.',
      contentUrl: 'https://example.com/lesson/css-basics',
      courseId: course2.id,
    },
  });

  const lesson3_1 = await prisma.lesson.create({
    data: {
      title: 'Arrays and Lists',
      description: 'Working with ordered collections.',
      contentUrl: 'https://example.com/lesson/java-arrays',
      courseId: course3.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: 'Introduction to Trees',
      description: 'Hierarchical data structures.',
      contentUrl: 'https://example.com/lesson/java-trees',
      courseId: course3.id,
    },
  });

  const assignment1 = await prisma.assignment.create({
    data: {
      title: 'Python Calculator',
      description: 'Write a simple calculator program in Python.',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      courseId: course1.id,
    },
  });

  const assignment2 = await prisma.assignment.create({
    data: {
      title: 'My First Web Page',
      description: 'Create a simple HTML page about yourself.',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      courseId: course2.id,
    },
  });

  const assignment3 = await prisma.assignment.create({
    data: {
      title: 'Implement a Stack',
      description: 'Implement a Stack data structure using Java Arrays.',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      courseId: course3.id,
    },
  });

  await prisma.enrollment.createMany({
    data: [
      { studentId: student1.id, courseId: course1.id },
      { studentId: student1.id, courseId: course2.id },
      { studentId: student2.id, courseId: course1.id },
      { studentId: student2.id, courseId: course3.id },
      { studentId: student3.id, courseId: course2.id },
      { studentId: student3.id, courseId: course3.id },
    ],
  });

  await prisma.submission.create({
    data: {
      assignmentId: assignment1.id,
      studentId: student1.id,
      submissionContent: 'print(1 + 1)',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      grade: 'B+',
      feedback: 'Good start, but remember to handle user input.',
    },
  });

  await prisma.submission.create({
    data: {
      assignmentId: assignment1.id,
      studentId: student2.id,
      submissionContent:
        '# My Python Calculator\ndef add(x, y):\n  return x + y\nprint(add(5, 3))',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      grade: 'A',
      feedback: 'Excellent work! Clean code.',
    },
  });

  await prisma.submission.create({
    data: {
      assignmentId: assignment2.id,
      studentId: student3.id,
      submissionContent:
        '<html><body><h1>About Me</h1><p>My first page!</p></body></html>',
      submittedAt: new Date(),
    },
  });

  await prisma.submission.create({
    data: {
      assignmentId: assignment3.id,
      studentId: student2.id,
      submissionContent:
        '// Java Stack Implementation\npublic class MyStack { ... }',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      grade: '95/100',
      feedback: 'Very well done. Consider edge cases for pop() on empty stack.',
    },
  });

  await prisma.completedLesson.createMany({
    data: [
      {
        studentId: student1.id,
        lessonId: lesson1_1.id,
        completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student1.id,
        lessonId: lesson2_1.id,
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student2.id,
        lessonId: lesson1_1.id,
        completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student2.id,
        lessonId: lesson1_2.id,
        completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student3.id,
        lessonId: lesson2_2.id,
        completedAt: new Date(),
      },
      {
        studentId: student2.id,
        lessonId: lesson3_1.id,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
