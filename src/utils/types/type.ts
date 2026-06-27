export type SubjectTheme = {
  accent: string;
  glow: string;
  panel: string;
};

export type CourseItem = {
  id: string;
  title: string;
  illustration: string;
  isNew?: boolean;
};

export type CourseSubject = {
  id: string;
  shortName: string;
  title: string;
  subtitle: string;
  icon: string;
  theme: SubjectTheme;
  courses: CourseItem[];
};
