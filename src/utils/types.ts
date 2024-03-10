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
  term: {
    id: number;
  };
  status: string;
  topic: Topic;
  members: [
    {
      id: number;
      student: {
        id: number;
        username: string;
        avatar: string;
        phoneNumber: string;
        email: string;
        name: string;
        gender: string;
        createdAt: string;
        updatedAt: string;
        majors: {
          id: number;
        };
        typeTraining: string;
        schoolYear: string;
      };
      group: {
        id: number;
      };
    },
  ];
}

export interface Topic {
  id: number;
  name: string;
  quantityGroupMax: number;
  description: string;
  note: string;
  target: string;
  standradOutput: string;
  requireInput: string;
  comment: string;
  status: string;
  createdt: string;
  updatedt: string;
  lecturer: {
    id: number;
    username: string;
    avatar: string;
    phoneNumber: string;
    email: string;
    name: string;
    gender: string;
    createdt: string;
    updatedt: string;
    majors: {
      id: number;
    };
    degree: string;
    isdmin: string;
  };
  term: {
    id: number;
  };
  totalGroupChoose: number;
  level: string;
}

export default interface Lecturer {
  id: number;
  username: string;
  avatar: string;
  createdAt: string;
  degree: string;
  email: string;
  name: string;
  gender: string;
  phoneNumber: string;
  updatedAt: string;
  majors: {
    id: number;
  };
  role: string;
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
  startDateSubmitTopic: string;
  endDateSubmitTopic: string;
  startDateChooseTopic: string;
  endDateChooseTopic: string;
  dateDiscussion: string;
  dateReport: string;
  createdAt: string;
  updatedAt: string;
  startDateDiscussion: string;
  endDateDiscussion: string;
  startDateReport: string;
  endDateReport: string;
  majors: {
    id: number;
  };
  isPublicResult: number;
}

export interface Transcript {
  student: User;
  gradeSummary: number;
  missings: Array<{}>;
  achievements: [
    {
      id: number;
      name: string;
      bonusGrade: number;
      student: User;
    },
  ];
  ADVISOR: {
    avgGrader: number;
    details: Array<Lecturer>;
  };
  REVIEWER: {
    avgGrader: number;
    details: Array<Lecturer>;
  };
  SESSION_HOST: {
    avgGrader: number;
    details: Array<Lecturer>;
  };
}


export interface User {
  id: string;
  username: string;
  avatar: string;
  phoneNumber: string;
  email: string;
  name: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  majors: {
    id: number;
  };
  typeTraining: string;
  schoolYear: string;
}

export interface Major {
  id: string;
  name: string;
  headLecturer: {
    id: number;
    majors: Object;
    degree: string;
    isAdmin: string;
    createdAt: string;
    updatedAt: string;
  };
}

