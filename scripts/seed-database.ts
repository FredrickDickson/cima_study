import { db } from "../server/db";
import { 
  users, 
  categories, 
  courses, 
  modules, 
  lessons, 
  enrollments,
  reviews,
  quizzes,
  quizQuestions,
  quizAnswers
} from "../shared/schema";

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Clear existing data
    await db.delete(quizAnswers);
    await db.delete(quizQuestions);
    await db.delete(quizzes);
    await db.delete(lessons);
    await db.delete(modules);
    await db.delete(enrollments);
    await db.delete(reviews);
    await db.delete(courses);
    await db.delete(categories);
    await db.delete(users);

    // Create sample users
    const sampleUsers = await db.insert(users).values([
      {
        id: "user-1",
        email: "john.instructor@example.com",
        firstName: "John",
        lastName: "Smith",
        role: "instructor",
        bio: "Experienced mediator with 15+ years in conflict resolution",
        country: "United States",
        profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      {
        id: "user-2", 
        email: "jane.student@example.com",
        firstName: "Jane",
        lastName: "Doe",
        role: "student",
        bio: "Law student interested in alternative dispute resolution",
        country: "Canada",
        profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      },
      {
        id: "user-3",
        email: "admin@cimalearn.com",
        firstName: "CIMA",
        lastName: "Admin",
        role: "admin",
        bio: "Administrator for CIMA Learn platform",
        country: "United Kingdom",
        profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      }
    ]).returning();

    // Create categories based on real CIMA offerings
    const sampleCategories = await db.insert(categories).values([
      {
        name: "International Arbitration",
        description: "Advanced training in domestic and international arbitration law and practice",
        slug: "international-arbitration"
      },
      {
        name: "Mediation & ADR", 
        description: "Comprehensive mediation training and alternative dispute resolution methods",
        slug: "mediation-adr"
      },
      {
        name: "Professional Membership",
        description: "Fast-track pathways to MCIMArb membership and professional certification",
        slug: "professional-membership"
      },
      {
        name: "Specialized Training",
        description: "Specialized courses in maritime mediation, AI tools, and practical skills",
        slug: "specialized-training"
      }
    ]).returning();

    // Create courses based on real CIMA offerings
    const sampleCourses = await db.insert(courses).values([
      {
        title: "Advanced Law, Practice & Procedure in Domestic and International Arbitration",
        description: "Welcome to the 2025 Autumn Academy! We are delighted to have you join the Global Arbitration Programme at the Center for International Mediators and Arbitrators (CIMA). This comprehensive course covers advanced arbitration law, practice, and procedures for both domestic and international disputes.",
        instructorId: sampleUsers[0].id,
        categoryId: sampleCategories[0].id,
        price: 2950.00,
        level: "advanced",
        duration: 72,
        isFeatured: true,
        thumbnailUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
        avgRating: 4.9,
        enrollmentCount: 89,
        isPublished: true
      },
      {
        title: "Law, Practice and Procedure in Domestic and International Mediation",
        description: "Law, Practice and Procedure in Domestic and International Mediation - Empowering the Next Generation of International Mediators. Are you eager to enhance your mediation skills and become a recognized international mediator? This comprehensive course provides in-depth training in mediation law, practice, and procedures.",
        instructorId: sampleUsers[0].id,
        categoryId: sampleCategories[1].id,
        price: 1850.00,
        level: "intermediate",
        duration: 60,
        isFeatured: true,
        thumbnailUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
        avgRating: 4.8,
        enrollmentCount: 156,
        isPublished: true
      },
      {
        title: "Expedited Route to Membership (MCIMArb) – On Demand",
        description: "We are pleased to announce the Expedited Route to MCIMArb Membership—a fast-track pathway designed for legal professionals, ADR practitioners, and qualified individuals seeking to advance their careers in international arbitration and mediation.",
        instructorId: sampleUsers[0].id,
        categoryId: sampleCategories[2].id,
        price: 1200.00,
        level: "intermediate",
        duration: 40,
        isFeatured: true,
        thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        avgRating: 4.7,
        enrollmentCount: 234,
        isPublished: true
      },
      {
        title: "Online Course on Maritime Mediation",
        description: "Are you passionate about conflict resolution at sea? Are you eager to understand how maritime disputes are mediated across international waters? This specialized course provides comprehensive training in maritime mediation techniques and international maritime law.",
        instructorId: sampleUsers[0].id,
        categoryId: sampleCategories[3].id,
        price: 950.00,
        level: "intermediate",
        duration: 35,
        isFeatured: false,
        thumbnailUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        avgRating: 4.6,
        enrollmentCount: 67,
        isPublished: true
      },
      {
        title: "AI Tools for ADR Practitioners",
        description: "2-Day Course: AI Tools for ADR Practitioners - Enhance Efficiency. Unlock Insight. Stay Ahead. Are you curious about how artificial intelligence can revolutionize your ADR practice? This cutting-edge course explores practical AI applications for mediators and arbitrators.",
        instructorId: sampleUsers[0].id,
        categoryId: sampleCategories[3].id,
        price: 750.00,
        level: "beginner",
        duration: 16,
        isFeatured: false,
        thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
        avgRating: 4.8,
        enrollmentCount: 198,
        isPublished: true
      },
      {
        title: "Mock Arbitrations",
        description: "The hallmark of success in any discipline is preparation. As the great Muhammad Ali once observed: 'The fight is won or lost far away from witnesses—behind the lines, in the gym, and out there on the road, long before I dance under those lights.' This intensive practical course provides hands-on arbitration experience through realistic case simulations.",
        instructorId: sampleUsers[0].id,
        categoryId: sampleCategories[0].id,
        price: 1500.00,
        level: "advanced",
        duration: 48,
        isFeatured: true,
        thumbnailUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400",
        avgRating: 4.9,
        enrollmentCount: 123,
        isPublished: true
      }
    ]).returning();

    // Create modules and lessons for the first course
    const module1 = await db.insert(modules).values({
      title: "Mediation Fundamentals",
      description: "Understanding the basic principles of mediation",
      courseId: sampleCourses[0].id,
      order: 1
    }).returning();

    const module2 = await db.insert(modules).values({
      title: "Communication Techniques",
      description: "Advanced communication skills for mediators",
      courseId: sampleCourses[0].id,
      order: 2
    }).returning();

    // Create lessons for module 1
    await db.insert(lessons).values([
      {
        title: "What is Mediation?",
        description: "Introduction to mediation concepts and principles",
        moduleId: module1[0].id,
        order: 1,
        contentType: "video",
        duration: 900,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        content: "In this lesson, we explore the fundamental concepts of mediation..."
      },
      {
        title: "The Role of the Mediator",
        description: "Understanding mediator responsibilities and ethics",
        moduleId: module1[0].id,
        order: 2,
        contentType: "video",
        duration: 1200,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        content: "The mediator plays a crucial role in facilitating dialogue..."
      },
      {
        title: "Mediation Process Overview",
        description: "Step-by-step guide to the mediation process",
        moduleId: module1[0].id,
        order: 3,
        contentType: "text",
        duration: 600,
        content: "The mediation process typically consists of several key stages..."
      }
    ]);

    // Create lessons for module 2
    await db.insert(lessons).values([
      {
        title: "Active Listening Techniques",
        description: "Master the art of active listening in mediation",
        moduleId: module2[0].id,
        order: 1,
        contentType: "video",
        duration: 1500,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        content: "Active listening is one of the most important skills for mediators..."
      },
      {
        title: "Managing Emotional Conversations",
        description: "Techniques for handling high-emotion situations",
        moduleId: module2[0].id,
        order: 2,
        contentType: "video",
        duration: 1800,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        content: "When emotions run high, mediators must know how to..."
      }
    ]);

    // Create sample enrollment
    await db.insert(enrollments).values({
      userId: sampleUsers[1].id,
      courseId: sampleCourses[0].id,
      enrolledAt: new Date(),
      progress: 25
    });

    // Create sample reviews
    await db.insert(reviews).values([
      {
        userId: sampleUsers[1].id,
        courseId: sampleCourses[0].id,
        rating: 5,
        comment: "This course provided a solid foundation in mediation principles. The instructor is knowledgeable and the content is well-structured."
      },
      {
        userId: sampleUsers[1].id,
        courseId: sampleCourses[1].id,
        rating: 4,
        comment: "Great course for anyone looking to advance their arbitration skills. The case studies were particularly helpful."
      }
    ]);

    // Create a sample quiz for the first course
    const sampleQuiz = await db.insert(quizzes).values({
      title: "Mediation Fundamentals Quiz",
      description: "Test your understanding of basic mediation concepts",
      courseId: sampleCourses[0].id,
      timeLimit: 1800, // 30 minutes
      passingScore: 70,
      maxAttempts: 3,
      isRequired: true
    }).returning();

    // Create quiz questions
    const questions = await db.insert(quizQuestions).values([
      {
        quizId: sampleQuiz[0].id,
        question: "What is the primary role of a mediator?",
        type: "multiple_choice",
        points: 10,
        order: 1
      },
      {
        quizId: sampleQuiz[0].id,
        question: "Which of the following is NOT a principle of mediation?",
        type: "multiple_choice",
        points: 10,
        order: 2
      },
      {
        quizId: sampleQuiz[0].id,
        question: "Describe the difference between mediation and arbitration.",
        type: "essay",
        points: 20,
        order: 3
      }
    ]).returning();

    // Create multiple choice answers
    await db.insert(quizAnswers).values([
      // Question 1 answers
      {
        questionId: questions[0].id,
        answer: "To make decisions for the parties",
        isCorrect: false,
        order: 1
      },
      {
        questionId: questions[0].id,
        answer: "To facilitate communication between parties",
        isCorrect: true,
        order: 2
      },
      {
        questionId: questions[0].id,
        answer: "To advocate for one party",
        isCorrect: false,
        order: 3
      },
      {
        questionId: questions[0].id,
        answer: "To impose a solution",
        isCorrect: false,
        order: 4
      },
      // Question 2 answers
      {
        questionId: questions[1].id,
        answer: "Neutrality",
        isCorrect: false,
        order: 1
      },
      {
        questionId: questions[1].id,
        answer: "Confidentiality",
        isCorrect: false,
        order: 2
      },
      {
        questionId: questions[1].id,
        answer: "Binding decisions",
        isCorrect: true,
        order: 3
      },
      {
        questionId: questions[1].id,
        answer: "Voluntary participation",
        isCorrect: false,
        order: 4
      }
    ]);

    console.log("Database seeding completed successfully!");
    console.log(`Created ${sampleUsers.length} users`);
    console.log(`Created ${sampleCategories.length} categories`);
    console.log(`Created ${sampleCourses.length} courses`);
    console.log("Created modules, lessons, enrollments, and reviews");

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run the seeding function
seedDatabase()
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });