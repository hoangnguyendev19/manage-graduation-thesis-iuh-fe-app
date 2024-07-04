import languages from './languages';

export const NUMBER = 'number';

export const enum TypeDegree {
  Masters = 'masters',
  Docter = 'doctor',
}

export const enum TypeTraining {
  College = 'college',
  University = 'university',
}

export const enum TypeStatusTopic {
  Refuse = 'refuse',
  Peding = 'peding',
  Accept = 'accept',
}

export const enum TypeGender {
  Male = 'male',
  Female = 'female',
}
export const TypeRequestGroup = {
  REQUEST_JOIN: 'REQUEST_JOIN',
  REQUEST_INVITE: 'REQUEST_INVITE',
};

export const PASSWORD_REGEX = /^[5,]$/;

export const RouteNames = {
  TabNavigation: 'TabNavigation',
  LoginNavigation: 'Login',

  HomeStack: 'Home',
  GroupStack: 'Group',
  AccountStack: 'Account',
  ResultStack: 'Result',

  HomeTab: languages['vi'].home,
  GroupTab: languages['vi'].group,
  ResultTab: languages['vi'].total,
  AccountTab: languages['vi'].account,

  TermMenu: 'TermMenu',
  TopicMenu: 'TopicMenu',
  EvaluationMenu: 'EvaluationMenu',
  LecturerMenu: 'LecturerMenu',

  ItemGroup: 'ItemGroup',
  ItemListGroup: 'ItemListGroup',
  ItemTopicMenu: 'ItemTopicMenu',

  Notification: 'Notification',
  DisAcceptedUser: 'DisAcceptedUser',
  ChangePassword: 'ChangePassword',
};

export type ITypeNotificationLecturer =
  | 'ACHIEVEMENT'
  | 'STUDENT'
  | 'GROUP_MEMBER'
  | 'CHOOSE_TOPIC'
  | 'NEW_GROUP_MEMBER'
  | 'REQUEST_JOIN_GROUP';

export const TypeNotificationPath: Record<ITypeNotificationLecturer | string, string> = {
  ACHIEVEMENT: RouteNames.ResultTab,
  STUDENT: RouteNames.AccountTab,
  GROUP_MEMBER: RouteNames.GroupTab,
  CHOOSE_TOPIC: RouteNames.TopicMenu,
  NEW_GROUP_MEMBER: RouteNames.GroupTab,
};

export const menu = [
  {
    icon: 'information-circle',
    nane: 'Thông tin cá nhân',
    navigate: 'Profile',
  },
  {
    icon: 'notifications',
    nane: 'Thông báo',
    navigate: 'Notification',
  },
  {
    icon: 'people',
    nane: 'Nhóm',
    navigate: 'Ground',
  },
  {
    icon: 'checkmark-done-circle',
    nane: 'Đánh giá',
    navigate: 'CheckPoint',
  },
];
