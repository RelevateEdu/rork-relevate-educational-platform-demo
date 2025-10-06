import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockEmployees, mockCompletions, mockCertificates, Employee, CompletionRecord, Certificate } from '@/mocks/employees';
import { courses } from '@/mocks/courses';

export interface CompanyInfo {
  name: string;
  plan: 'starter' | 'growth' | 'enterprise';
  employeeCount: number;
}

export const [BusinessProvider, useBusiness] = createContextHook(() => {
  const [company, setCompany] = useState<CompanyInfo>({
    name: 'Demo Company Ltd',
    plan: 'growth',
    employeeCount: 5,
  });
  
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [completions, setCompletions] = useState<CompletionRecord[]>(mockCompletions);
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [favoriteCourses, setFavoriteCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBusinessData();
  }, []);

  const loadBusinessData = async () => {
    try {
      const [companyData, employeesData, completionsData, certificatesData, favoritesData] = await Promise.all([
        AsyncStorage.getItem('company'),
        AsyncStorage.getItem('employees'),
        AsyncStorage.getItem('completions'),
        AsyncStorage.getItem('certificates'),
        AsyncStorage.getItem('favoriteCourses'),
      ]);

      if (companyData) {
        setCompany(JSON.parse(companyData));
      }
      if (employeesData) {
        setEmployees(JSON.parse(employeesData));
      }
      if (completionsData) {
        setCompletions(JSON.parse(completionsData));
      }
      if (certificatesData) {
        setCertificates(JSON.parse(certificatesData));
      }
      if (favoritesData) {
        setFavoriteCourses(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.log('Error loading business data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCompany = useCallback(async (companyData: CompanyInfo) => {
    setCompany(companyData);
    await AsyncStorage.setItem('company', JSON.stringify(companyData));
  }, []);

  const addEmployee = useCallback(async (name: string, email: string) => {
    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      name,
      email,
      status: 'invited',
      joinedDate: new Date().toISOString(),
      assignedCourses: [],
    };
    
    const updated = [...employees, newEmployee];
    setEmployees(updated);
    await AsyncStorage.setItem('employees', JSON.stringify(updated));
    return newEmployee;
  }, [employees]);

  const updateEmployeeStatus = useCallback(async (employeeId: string, status: 'invited' | 'active' | 'deactivated') => {
    const updated = employees.map(emp => 
      emp.id === employeeId ? { ...emp, status } : emp
    );
    setEmployees(updated);
    await AsyncStorage.setItem('employees', JSON.stringify(updated));
  }, [employees]);

  const assignCourse = useCallback(async (employeeId: string, courseId: string) => {
    const updated = employees.map(emp => {
      if (emp.id === employeeId) {
        const assignedCourses = emp.assignedCourses.includes(courseId)
          ? emp.assignedCourses
          : [...emp.assignedCourses, courseId];
        return { ...emp, assignedCourses };
      }
      return emp;
    });
    setEmployees(updated);
    await AsyncStorage.setItem('employees', JSON.stringify(updated));
  }, [employees]);

  const unassignCourse = useCallback(async (employeeId: string, courseId: string) => {
    const updated = employees.map(emp => {
      if (emp.id === employeeId) {
        return {
          ...emp,
          assignedCourses: emp.assignedCourses.filter(id => id !== courseId),
        };
      }
      return emp;
    });
    setEmployees(updated);
    await AsyncStorage.setItem('employees', JSON.stringify(updated));
  }, [employees]);

  const addCompletion = useCallback(async (
    employeeId: string,
    courseId: string,
    score: number,
    passed: boolean
  ) => {
    const employee = employees.find(e => e.id === employeeId);
    const course = courses.find(c => c.id === courseId);
    
    if (!employee || !course) return;

    const completion: CompletionRecord = {
      id: `comp-${Date.now()}`,
      employeeId,
      employeeName: employee.name,
      courseId,
      courseTitle: course.title,
      score,
      passed,
      completedDate: new Date().toISOString(),
    };

    if (passed) {
      const certificate: Certificate = {
        id: `cert-${Date.now()}`,
        employeeId,
        employeeName: employee.name,
        courseId,
        courseTitle: course.title,
        completedDate: new Date().toISOString(),
        score,
        companyName: company.name,
      };
      
      completion.certificateId = certificate.id;
      
      const updatedCertificates = [...certificates, certificate];
      setCertificates(updatedCertificates);
      await AsyncStorage.setItem('certificates', JSON.stringify(updatedCertificates));
    }

    const updatedCompletions = [...completions, completion];
    setCompletions(updatedCompletions);
    await AsyncStorage.setItem('completions', JSON.stringify(updatedCompletions));
    
    return completion;
  }, [employees, completions, certificates, company.name]);

  const toggleFavorite = useCallback(async (courseId: string) => {
    const updated = favoriteCourses.includes(courseId)
      ? favoriteCourses.filter(id => id !== courseId)
      : [...favoriteCourses, courseId];
    
    setFavoriteCourses(updated);
    await AsyncStorage.setItem('favoriteCourses', JSON.stringify(updated));
  }, [favoriteCourses]);

  const getEmployeeCompletions = useCallback((employeeId: string) => {
    return completions.filter(c => c.employeeId === employeeId);
  }, [completions]);

  const getEmployeeCertificates = useCallback((employeeId: string) => {
    return certificates.filter(c => c.employeeId === employeeId);
  }, [certificates]);

  const getCourseCompletions = useCallback((courseId: string) => {
    return completions.filter(c => c.courseId === courseId);
  }, [completions]);

  const isNewCompletion = useCallback((completedDate: string) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return new Date(completedDate).getTime() > sevenDaysAgo;
  }, []);

  return useMemo(() => ({
    company,
    employees,
    completions,
    certificates,
    favoriteCourses,
    isLoading,
    saveCompany,
    addEmployee,
    updateEmployeeStatus,
    assignCourse,
    unassignCourse,
    addCompletion,
    toggleFavorite,
    getEmployeeCompletions,
    getEmployeeCertificates,
    getCourseCompletions,
    isNewCompletion,
  }), [
    company,
    employees,
    completions,
    certificates,
    favoriteCourses,
    isLoading,
    saveCompany,
    addEmployee,
    updateEmployeeStatus,
    assignCourse,
    unassignCourse,
    addCompletion,
    toggleFavorite,
    getEmployeeCompletions,
    getEmployeeCertificates,
    getCourseCompletions,
    isNewCompletion,
  ]);
});
