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
      userName: string;
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
  quantityGroup: number;
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
  message: string;
  type: string;
  isRead: boolean;
  created_at: string;
  updated_at: string;
}

export interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isChooseGroup: boolean;
  isChooseTopic: boolean;
  isSubmitTopic: boolean;
  isDiscussion: boolean;
  isReport: boolean;
  isPublicResult: boolean;
  created_at: string;
  updated_at: string;
}

export interface Transcript {
  advisorScore: number;
  sessionHostScore: number;
  reviewerScore: number;
  totalBonusScore: number;
  totalAverageScore: number;
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
