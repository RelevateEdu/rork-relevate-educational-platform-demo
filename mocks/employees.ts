export interface Employee {
  id: string;
  name: string;
  email: string;
  status: 'invited' | 'active' | 'deactivated';
  joinedDate: string;
  assignedCourses: string[];
}

export interface CompletionRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  courseId: string;
  courseTitle: string;
  score: number;
  passed: boolean;
  completedDate: string;
  certificateId?: string;
}

export interface Certificate {
  id: string;
  employeeId: string;
  employeeName: string;
  courseId: string;
  courseTitle: string;
  completedDate: string;
  score: number;
  companyName: string;
}

export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    status: 'active',
    joinedDate: '2024-01-15',
    assignedCourses: ['hospitality-1', 'customer-1'],
  },
  {
    id: 'emp-2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    status: 'active',
    joinedDate: '2024-02-01',
    assignedCourses: ['leadership-1', 'digital-1'],
  },
  {
    id: 'emp-3',
    name: 'Emma Williams',
    email: 'emma.williams@company.com',
    status: 'active',
    joinedDate: '2024-02-10',
    assignedCourses: ['health-safety-1', 'data-protection-1'],
  },
  {
    id: 'emp-4',
    name: 'James Brown',
    email: 'james.brown@company.com',
    status: 'invited',
    joinedDate: '2024-03-01',
    assignedCourses: [],
  },
  {
    id: 'emp-5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    status: 'deactivated',
    joinedDate: '2023-11-20',
    assignedCourses: ['hospitality-1'],
  },
];

export const mockCompletions: CompletionRecord[] = [
  {
    id: 'comp-1',
    employeeId: 'emp-1',
    employeeName: 'Sarah Johnson',
    courseId: 'hospitality-1',
    courseTitle: 'Excellence in Customer Service',
    score: 95,
    passed: true,
    completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    certificateId: 'cert-1',
  },
  {
    id: 'comp-2',
    employeeId: 'emp-2',
    employeeName: 'Michael Chen',
    courseId: 'leadership-1',
    courseTitle: 'Effective Team Leadership',
    score: 88,
    passed: true,
    completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    certificateId: 'cert-2',
  },
  {
    id: 'comp-3',
    employeeId: 'emp-3',
    employeeName: 'Emma Williams',
    courseId: 'health-safety-1',
    courseTitle: 'Workplace Health & Safety Essentials',
    score: 92,
    passed: true,
    completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    certificateId: 'cert-3',
  },
  {
    id: 'comp-4',
    employeeId: 'emp-1',
    employeeName: 'Sarah Johnson',
    courseId: 'customer-1',
    courseTitle: 'Building Strong Customer Relationships',
    score: 75,
    passed: false,
    completedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'comp-5',
    employeeId: 'emp-2',
    employeeName: 'Michael Chen',
    courseId: 'digital-1',
    courseTitle: 'Digital Skills for the Modern Workplace',
    score: 100,
    passed: true,
    completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    certificateId: 'cert-4',
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    employeeId: 'emp-1',
    employeeName: 'Sarah Johnson',
    courseId: 'hospitality-1',
    courseTitle: 'Excellence in Customer Service',
    completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    score: 95,
    companyName: 'Demo Company Ltd',
  },
  {
    id: 'cert-2',
    employeeId: 'emp-2',
    employeeName: 'Michael Chen',
    courseId: 'leadership-1',
    courseTitle: 'Effective Team Leadership',
    completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    score: 88,
    companyName: 'Demo Company Ltd',
  },
  {
    id: 'cert-3',
    employeeId: 'emp-3',
    employeeName: 'Emma Williams',
    courseId: 'health-safety-1',
    courseTitle: 'Workplace Health & Safety Essentials',
    completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    score: 92,
    companyName: 'Demo Company Ltd',
  },
  {
    id: 'cert-4',
    employeeId: 'emp-2',
    employeeName: 'Michael Chen',
    courseId: 'digital-1',
    courseTitle: 'Digital Skills for the Modern Workplace',
    completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    score: 100,
    companyName: 'Demo Company Ltd',
  },
];
