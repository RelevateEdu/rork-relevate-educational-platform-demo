export type CourseCategory = 
  | 'Hospitality'
  | 'Customer Relationships'
  | 'Leadership'
  | 'Health & Safety'
  | 'Data Protection'
  | 'Work-Life Balance'
  | 'Digital World';

export interface CoursePage {
  id: string;
  title: string;
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  description: string;
  imageUrl: string;
  learningPoints: string[];
  pages: CoursePage[];
  quiz: QuizQuestion[];
  estimatedMinutes: number;
}

export const courses: Course[] = [
  {
    id: 'hospitality-1',
    title: 'Excellence in Customer Service',
    category: 'Hospitality',
    description: 'Master the fundamentals of exceptional customer service in hospitality settings.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80',
    estimatedMinutes: 15,
    learningPoints: [
      'Understanding customer expectations',
      'Effective communication techniques',
      'Handling difficult situations',
      'Creating memorable experiences',
    ],
    pages: [
      {
        id: 'page-1',
        title: 'Understanding Customer Expectations',
        content: 'In the hospitality industry, understanding what customers expect is the foundation of excellent service. Customers come with various needs and expectations based on their experiences, cultural backgrounds, and the specific context of their visit.\n\nKey aspects include:\n• Anticipating needs before they are expressed\n• Recognizing different customer types and preferences\n• Understanding the importance of first impressions\n• Maintaining consistency in service delivery',
      },
      {
        id: 'page-2',
        title: 'Effective Communication',
        content: 'Communication is at the heart of hospitality. How you speak, listen, and respond to customers directly impacts their experience.\n\nEssential communication skills:\n• Active listening and showing genuine interest\n• Using positive language and tone\n• Non-verbal communication and body language\n• Adapting your communication style to different customers\n• Clear and concise information delivery',
      },
      {
        id: 'page-3',
        title: 'Handling Difficult Situations',
        content: 'Even in the best-run establishments, challenges arise. How you handle these situations can turn a negative experience into a positive one.\n\nStrategies for success:\n• Stay calm and professional under pressure\n• Listen without interrupting or becoming defensive\n• Empathize with the customer\'s concerns\n• Offer solutions, not excuses\n• Know when to escalate to management\n• Follow up to ensure resolution',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the most important aspect of customer service in hospitality?',
        type: 'multiple-choice',
        options: [
          'Speed of service',
          'Understanding and meeting customer expectations',
          'Offering discounts',
          'Having the latest technology',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Active listening means waiting for your turn to speak.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'When handling a complaint, you should:',
        type: 'multiple-choice',
        options: [
          'Immediately offer a refund',
          'Listen, empathize, and offer solutions',
          'Explain why the customer is wrong',
          'Ignore it if it seems minor',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        question: 'Non-verbal communication is as important as verbal communication.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q5',
        question: 'First impressions in hospitality:',
        type: 'multiple-choice',
        options: [
          'Are not very important',
          'Can always be changed later',
          'Set the tone for the entire customer experience',
          'Only matter in luxury establishments',
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'customer-1',
    title: 'Building Strong Customer Relationships',
    category: 'Customer Relationships',
    description: 'Learn how to create lasting relationships with customers that drive loyalty and growth.',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    estimatedMinutes: 20,
    learningPoints: [
      'Understanding customer needs and preferences',
      'Building trust and rapport',
      'Effective follow-up strategies',
      'Turning customers into advocates',
    ],
    pages: [
      {
        id: 'page-1',
        title: 'The Foundation of Relationships',
        content: 'Strong customer relationships are built on trust, consistency, and genuine care. In today\'s competitive market, the quality of relationships often matters more than the product itself.\n\nCore principles:\n• Authenticity in all interactions\n• Consistency in service delivery\n• Personalization based on customer preferences\n• Long-term thinking over short-term gains',
      },
      {
        id: 'page-2',
        title: 'Understanding Customer Needs',
        content: 'To build meaningful relationships, you must first understand what your customers truly need and value.\n\nKey strategies:\n• Ask open-ended questions\n• Listen more than you speak\n• Observe patterns in customer behavior\n• Use feedback to improve continuously\n• Anticipate future needs based on past interactions',
      },
      {
        id: 'page-3',
        title: 'Maintaining and Growing Relationships',
        content: 'Acquiring a customer is just the beginning. The real value comes from nurturing that relationship over time.\n\nBest practices:\n• Regular, meaningful communication\n• Personalized service and recommendations\n• Proactive problem-solving\n• Celebrating milestones and showing appreciation\n• Creating opportunities for feedback',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the foundation of strong customer relationships?',
        type: 'multiple-choice',
        options: [
          'Low prices',
          'Trust, consistency, and genuine care',
          'Frequent promotions',
          'Advanced technology',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'You should listen more than you speak when understanding customer needs.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q3',
        question: 'The best time to stop nurturing a customer relationship is:',
        type: 'multiple-choice',
        options: [
          'After the first purchase',
          'After one year',
          'Never - relationships require ongoing effort',
          'When they stop complaining',
        ],
        correctAnswer: 2,
      },
      {
        id: 'q4',
        question: 'Personalization is not important in customer relationships.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        question: 'Which is most important for long-term customer relationships?',
        type: 'multiple-choice',
        options: [
          'Always having the lowest price',
          'Consistency and reliability',
          'Frequent sales and discounts',
          'Having the most products',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'leadership-1',
    title: 'Effective Team Leadership',
    category: 'Leadership',
    description: 'Develop essential leadership skills to inspire and guide your team to success.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    estimatedMinutes: 25,
    learningPoints: [
      'Core leadership principles',
      'Motivating and inspiring teams',
      'Effective delegation and empowerment',
      'Handling conflicts and challenges',
    ],
    pages: [
      {
        id: 'page-1',
        title: 'What Makes a Great Leader',
        content: 'Leadership is not about authority—it\'s about influence, inspiration, and impact. Great leaders create environments where people thrive and achieve their best work.\n\nKey characteristics:\n• Vision and strategic thinking\n• Emotional intelligence\n• Integrity and authenticity\n• Adaptability and resilience\n• Commitment to continuous learning',
      },
      {
        id: 'page-2',
        title: 'Motivating Your Team',
        content: 'Motivation is the fuel that drives performance. Understanding what motivates each team member is crucial for effective leadership.\n\nMotivation strategies:\n• Recognize and celebrate achievements\n• Provide meaningful work and purpose\n• Offer growth and development opportunities\n• Create a positive and supportive culture\n• Lead by example\n• Give autonomy and trust',
      },
      {
        id: 'page-3',
        title: 'Delegation and Empowerment',
        content: 'Effective leaders know they can\'t do everything themselves. Delegation is about empowering others to grow and contribute.\n\nDelegation best practices:\n• Match tasks to team members\' strengths\n• Provide clear expectations and resources\n• Trust your team to deliver\n• Be available for support without micromanaging\n• Use delegation as a development tool',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Leadership is primarily about:',
        type: 'multiple-choice',
        options: [
          'Having authority over others',
          'Influence, inspiration, and impact',
          'Making all the decisions',
          'Being the most skilled person',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Great leaders need to do everything themselves to ensure quality.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'What is the most effective way to motivate a team?',
        type: 'multiple-choice',
        options: [
          'Only using financial incentives',
          'Micromanaging their work',
          'Understanding individual motivations and providing purpose',
          'Setting impossible targets',
        ],
        correctAnswer: 2,
      },
      {
        id: 'q4',
        question: 'Emotional intelligence is important for leadership.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q5',
        question: 'Effective delegation involves:',
        type: 'multiple-choice',
        options: [
          'Giving away tasks you don\'t want to do',
          'Matching tasks to strengths and providing support',
          'Checking every detail of the work',
          'Only delegating to senior team members',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'health-safety-1',
    title: 'Workplace Health & Safety Essentials',
    category: 'Health & Safety',
    description: 'Understand critical health and safety practices to maintain a safe workplace.',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    estimatedMinutes: 30,
    learningPoints: [
      'Identifying workplace hazards',
      'Emergency procedures and protocols',
      'Personal protective equipment',
      'Reporting and documentation',
    ],
    pages: [
      {
        id: 'page-1',
        title: 'Understanding Workplace Hazards',
        content: 'A safe workplace starts with identifying and understanding potential hazards. Every workplace has unique risks that must be managed proactively.\n\nCommon hazard categories:\n• Physical hazards (slips, trips, falls)\n• Chemical hazards (cleaning products, substances)\n• Biological hazards (bacteria, viruses)\n• Ergonomic hazards (repetitive strain, poor posture)\n• Psychosocial hazards (stress, workplace violence)',
      },
      {
        id: 'page-2',
        title: 'Emergency Procedures',
        content: 'Being prepared for emergencies can save lives. Everyone must know what to do in various emergency situations.\n\nEssential knowledge:\n• Fire evacuation routes and assembly points\n• First aid procedures and equipment locations\n• Emergency contact numbers\n• Incident reporting procedures\n• Role-specific emergency responsibilities',
      },
      {
        id: 'page-3',
        title: 'Personal Protective Equipment',
        content: 'PPE is your last line of defense against workplace hazards. Proper selection, use, and maintenance of PPE is crucial.\n\nPPE fundamentals:\n• Understanding when PPE is required\n• Selecting appropriate PPE for the task\n• Proper fitting and adjustment\n• Regular inspection and maintenance\n• Correct storage and disposal\n• Limitations of PPE',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which is NOT a common workplace hazard category?',
        type: 'multiple-choice',
        options: [
          'Physical hazards',
          'Chemical hazards',
          'Financial hazards',
          'Ergonomic hazards',
        ],
        correctAnswer: 2,
      },
      {
        id: 'q2',
        question: 'Everyone in the workplace should know emergency evacuation procedures.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q3',
        question: 'PPE should be used:',
        type: 'multiple-choice',
        options: [
          'Only when convenient',
          'As the last line of defense after other controls',
          'Instead of fixing hazards',
          'Only by new employees',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        question: 'You should report all incidents, even minor ones.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q5',
        question: 'The best approach to workplace safety is:',
        type: 'multiple-choice',
        options: [
          'Reacting to incidents after they occur',
          'Proactive hazard identification and prevention',
          'Relying solely on PPE',
          'Only management\'s responsibility',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'data-protection-1',
    title: 'Data Protection & Privacy Fundamentals',
    category: 'Data Protection',
    description: 'Learn essential data protection principles and best practices for handling sensitive information.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    estimatedMinutes: 20,
    learningPoints: [
      'Understanding GDPR and data protection laws',
      'Handling personal data securely',
      'Data breach prevention and response',
      'Privacy by design principles',
    ],
    pages: [
      {
        id: 'page-1',
        title: 'Data Protection Principles',
        content: 'Data protection is about respecting individuals\' privacy and handling their information responsibly. Modern data protection laws like GDPR set clear standards.\n\nCore principles:\n• Lawfulness, fairness, and transparency\n• Purpose limitation\n• Data minimization\n• Accuracy\n• Storage limitation\n• Integrity and confidentiality\n• Accountability',
      },
      {
        id: 'page-2',
        title: 'Handling Personal Data',
        content: 'Personal data must be handled with care at every stage—from collection to deletion.\n\nBest practices:\n• Only collect data you actually need\n• Obtain proper consent\n• Use secure storage and transmission methods\n• Limit access to authorized personnel only\n• Keep data accurate and up-to-date\n• Delete data when no longer needed',
      },
      {
        id: 'page-3',
        title: 'Data Breaches and Response',
        content: 'Despite best efforts, breaches can occur. Knowing how to respond quickly and appropriately is critical.\n\nBreach response steps:\n• Identify and contain the breach immediately\n• Assess the scope and impact\n• Notify relevant authorities within 72 hours\n• Inform affected individuals\n• Document the incident thoroughly\n• Review and improve security measures',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which is NOT a core data protection principle?',
        type: 'multiple-choice',
        options: [
          'Data minimization',
          'Accountability',
          'Maximum data collection',
          'Purpose limitation',
        ],
        correctAnswer: 2,
      },
      {
        id: 'q2',
        question: 'You should only collect personal data that you actually need.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q3',
        question: 'If a data breach occurs, you must notify authorities within:',
        type: 'multiple-choice',
        options: [
          '24 hours',
          '72 hours',
          '1 week',
          '1 month',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        question: 'Personal data should be kept forever for record-keeping purposes.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        question: 'Who is responsible for data protection in an organization?',
        type: 'multiple-choice',
        options: [
          'Only the IT department',
          'Only senior management',
          'Everyone who handles personal data',
          'Only the data protection officer',
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'work-life-1',
    title: 'Achieving Work-Life Balance',
    category: 'Work-Life Balance',
    description: 'Discover strategies for maintaining a healthy balance between work and personal life.',
    imageUrl: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&q=80',
    estimatedMinutes: 15,
    learningPoints: [
      'Understanding work-life balance',
      'Time management strategies',
      'Setting boundaries',
      'Stress management techniques',
    ],
    pages: [
      {
        id: 'page-1',
        title: 'What is Work-Life Balance?',
        content: 'Work-life balance is about creating harmony between your professional responsibilities and personal life. It\'s not about perfect equality, but about feeling fulfilled in both areas.\n\nKey aspects:\n• Flexible time management\n• Clear boundaries between work and personal time\n• Prioritizing health and relationships\n• Sustainable work practices\n• Regular self-assessment and adjustment',
      },
      {
        id: 'page-2',
        title: 'Effective Time Management',
        content: 'Managing your time well is essential for achieving balance. It\'s about working smarter, not just harder.\n\nTime management strategies:\n• Prioritize tasks using the urgent/important matrix\n• Use time-blocking techniques\n• Minimize distractions and interruptions\n• Learn to say no to non-essential commitments\n• Schedule breaks and personal time\n• Use technology wisely',
      },
      {
        id: 'page-3',
        title: 'Managing Stress and Wellbeing',
        content: 'Stress is inevitable, but how you manage it makes all the difference. Prioritizing your wellbeing is not selfish—it\'s essential.\n\nWellbeing practices:\n• Regular physical activity\n• Adequate sleep and rest\n• Healthy eating habits\n• Mindfulness and relaxation techniques\n• Social connections and support\n• Hobbies and interests outside work',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Work-life balance means:',
        type: 'multiple-choice',
        options: [
          'Spending exactly equal time on work and personal life',
          'Creating harmony and fulfillment in both areas',
          'Always prioritizing work',
          'Never working overtime',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Setting boundaries between work and personal time is important.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q3',
        question: 'The best way to manage your time is to:',
        type: 'multiple-choice',
        options: [
          'Work longer hours',
          'Say yes to everything',
          'Prioritize tasks and minimize distractions',
          'Multitask constantly',
        ],
        correctAnswer: 2,
      },
      {
        id: 'q4',
        question: 'Taking care of your wellbeing is selfish and takes away from work.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        question: 'Which is NOT a good stress management technique?',
        type: 'multiple-choice',
        options: [
          'Regular physical activity',
          'Adequate sleep',
          'Ignoring stress until it goes away',
          'Mindfulness practices',
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'digital-1',
    title: 'Digital Skills for the Modern Workplace',
    category: 'Digital World',
    description: 'Master essential digital skills and tools for today\'s technology-driven workplace.',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
    estimatedMinutes: 20,
    learningPoints: [
      'Essential digital tools and platforms',
      'Cybersecurity awareness',
      'Digital communication best practices',
      'Adapting to new technologies',
    ],
    pages: [
      {
        id: 'page-1',
        title: 'The Digital Workplace',
        content: 'The modern workplace is increasingly digital. Understanding and effectively using digital tools is no longer optional—it\'s essential for success.\n\nKey digital competencies:\n• Cloud-based collaboration tools\n• Video conferencing platforms\n• Project management software\n• Digital communication channels\n• Data analysis and visualization\n• Automation and AI tools',
      },
      {
        id: 'page-2',
        title: 'Cybersecurity Awareness',
        content: 'As we rely more on digital tools, cybersecurity becomes everyone\'s responsibility. Simple practices can prevent major security incidents.\n\nSecurity essentials:\n• Strong, unique passwords for each account\n• Multi-factor authentication\n• Recognizing phishing attempts\n• Secure file sharing practices\n• Regular software updates\n• Safe browsing habits\n• Reporting suspicious activity',
      },
      {
        id: 'page-3',
        title: 'Digital Communication',
        content: 'Digital communication requires different skills than face-to-face interaction. Mastering these skills is crucial for remote and hybrid work.\n\nBest practices:\n• Choose the right channel for your message\n• Be clear and concise in written communication\n• Use video when tone and context matter\n• Respect response time expectations\n• Maintain professionalism in all digital interactions\n• Be mindful of digital body language',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Digital skills in the modern workplace are:',
        type: 'multiple-choice',
        options: [
          'Only needed for IT roles',
          'Optional nice-to-have skills',
          'Essential for success',
          'Only for younger workers',
        ],
        correctAnswer: 2,
      },
      {
        id: 'q2',
        question: 'You should use the same password for multiple accounts for convenience.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: 'What is the best way to identify a phishing email?',
        type: 'multiple-choice',
        options: [
          'Trust all emails from known companies',
          'Check for suspicious links, urgent requests, and poor grammar',
          'Only worry about emails with attachments',
          'Phishing is not a real threat',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        question: 'Multi-factor authentication adds an important extra layer of security.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 'q5',
        question: 'When communicating digitally, you should:',
        type: 'multiple-choice',
        options: [
          'Always use email for everything',
          'Choose the right channel for your message',
          'Use informal language in all situations',
          'Expect immediate responses at all times',
        ],
        correctAnswer: 1,
      },
    ],
  },
];

export const courseCategories: CourseCategory[] = [
  'Hospitality',
  'Customer Relationships',
  'Leadership',
  'Health & Safety',
  'Data Protection',
  'Work-Life Balance',
  'Digital World',
];
