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
  id: string;
  key: string;
  name: string;
  status: string;
  quantityGroupMax: number;
  fullName: string;
  quantityGroup: number;
}

export interface Notify {
  id: string;
  message: string;
  isRead: boolean;
  created_at: string;
  updated_at: string;
}

export interface Term {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  startChooseGroupDate: string;
  endChooseGroupDate: string;
  startPublicTopicDate: string;
  endPublicTopicDate: string;
  startChooseTopicDate: string;
  endChooseTopicDate: string;
  startDiscussionDate: string;
  endDiscussionDate: string;
  startReportDate: string;
  endReportDate: string;
  startPublicResultDate: string;
  endPublicResultDate: string;
}

export interface Transcript {
  advisorScore: number;
  reportScore: number;
  reviewerScore: number;
  totalBonusScore: number;
  totalAverageScore: number;
}

export interface Student {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  clazzName: string;
  typeTraining: string;
  isActive: boolean;
  majorId: string;
  majorName: string;
}

export interface Major {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
