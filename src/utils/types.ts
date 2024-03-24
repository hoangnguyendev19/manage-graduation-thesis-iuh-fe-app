export interface Notification {
  id: number;
  img: string;
  title: string;
  description: string;
  content: string;
  date: string;
}

export interface Group {
  id: number;
  name: string;
  status: string;
  typeReport: string;
  topic_id: number;
  term_id: number;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  quantityGroupMax: number;
  note: string;
  target: string;
  standardOutput: string;
  requireInput: string;
  comment: string;
  status: string;
  level: string;
  created_at: string;
  updated_at: string;
  lecturerTerm: {
    id: number;
    lecturer: {
      id: number;
      fullName: string;
      avatarUrl: string;
      email: string;
      phoneNumber: string;
      gender: string;
      degree: string;
      major: {
        id: number;
        name: string;
      };
    };
  };
}

export interface Lecturer {
  id: number;
  userName: string;
  fullName: string;
  avatarUrl: string;
  phoneNumber: string;
  email: string;
  gender: string;
  degree: string;
  role: string;
  created_at: string;
  updated_at: string;
  major_id: number;
}

export interface Notify {
  id: number;
  type: '';
  message: string;
  read: number;
}

export interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isSubmitTopic: boolean;
  isChooseTopic: boolean;
  isDiscussion: boolean;
  isReport: boolean;
  isPublicResult: boolean;
  created_at: string;
  updated_at: string;
}

export interface Transcript {
  id: number;
  score: number;
  // evaluation_id: number;

  created_at: string;
  updated_at: string;
}

export interface Student {
  id: number;
  userName: string;
  fullName: string;
  avatarUrl: string;
  phoneNumber: string;
  email: string;
  gender: string;
  schoolYear: string;
  typeTraining: string;
  created_at: string;
  updated_at: string;
  major_id: number;
}

export interface Major {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
