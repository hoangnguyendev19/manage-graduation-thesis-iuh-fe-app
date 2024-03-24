import moment from 'moment';

export const getStatusGroupColor = (status: string) => {
  switch (status) {
    case 'OPEN':
      return 'green';
    case 'FAIL_ADVISOR':
      return 'red';
    case 'FAIL_REVIEWER':
      return 'red';
    case 'red':
      return 'Rớt hội đồng';
    case 'green':
      return 'Đậu phản biện';
    case 'PASS_REVIEWER':
      return 'green';
    case 'PASS_SESSION_HOST':
      return 'green';
  }
};

export const getStatusGroup = (status: string) => {
  switch (status) {
    case 'OPEN':
      return 'Nhóm mới tạo';
    case 'FAIL_ADVISOR':
      return 'Rớt hướng dẫn';
    case 'FAIL_REVIEWER':
      return 'Rớt phản biện';
    case 'FAIL_SESSION_HOST':
      return 'Rớt hội đồng';
    case 'PASS_ADVISOR':
      return 'Đậu hướng dẫn';
    case 'PASS_REVIEWER':
      return 'Đậu phản biện';
    case 'PASS_SESSION_HOST':
      return 'Đậu hội dồng';
  }
};
export const getStatusFinal = (status: string) => {
  switch (status) {
    case 'FAIL_SESSION_HOST':
      return 'Rớt hội đồng';

    case 'PASS_SESSION_HOST':
      return 'Đậu hội dồng';
  }
};

export const getLevelTopic = (text: string) => {
  switch (text) {
    case 'HIGH':
      return 'Rất khó';
    case 'MEDIUM':
      return 'Khó';
    case 'LOW':
      return 'Trung Bình';
    case null:
      return 'Chưa xác định';
  }
};

export const getLevelColorTopic = (text: string) => {
  switch (text) {
    case 'HIGH':
      return 'orange';
    case 'MEDIUM':
      return 'purple';
    case 'LOW':
      return 'bule';
  }
};

export const getNameStatus = (value: string) => {
  if (value === 'REJECTED') return 'Không được duyệt';
  if (value === 'PENDING') return 'Đang chờ';
  if (value === 'APPROVED') return 'Đã duyệt';
};

export const getNameColorStatus = (value: string) => {
  switch (value) {
    case 'REFUSE':
      return 'red';
    case 'PEDING':
      return 'green';
    case 'ACCEPT':
      return 'blue';
  }
};

export const checkRole = (role: string) => {
  if (role === 'LECTURER') return 'Giảng Viên';
  if (role === 'SUB_HEAD_LECTURER') return 'Phó Khoa';
  if (role === 'HEAD_LECTURER') return 'Trưởng Khoa';
};
export const checkGender = (role: string) => {
  if (role === 'MALE') return 'Nam';
  if (role === 'FEMALE') return 'Nữ';
};
export const checkDegree = (role: string) => {
  if (role === 'MASTER') return 'Tiến sĩ';
  if (role === 'DOCTOR') return 'Thạc sĩ';
  if (role === 'BACHELOR') return 'Cử nhân';
};
export const checkTypeTraining = (role: string) => {
  if (role === 'COLLEGE') return 'Đại học';
  if (role === 'UNIVERSITY') return 'Cao đẳng';
};

export const removeAccents = (str: string) => {
  var AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};

export const formatDate = (date: string) => {
  return moment(date).locale('vi').format('dddd, DD/MM/YYYY, h:mm:ss A');
};

// import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isEmpty = (val: any) => {
  return val === undefined || val == null || Number.isNaN(val) || val.length <= 0 ? true : false;
};

export const showMessageWarning = (message: string) => {
  // Toast.show({
  //   type: ALERT_TYPE.WARNING,
  //   title: 'Thông báo',
  //   titleStyle: {
  //     color: '#bc6c25',
  //   },
  //   textBody: message,
  //   textBodyStyle: {
  //     color: '#ffb703',
  //     fontSize: 15,
  //   },
  // });
};
export const showMessageSuccess = (message: string) => {
  // Toast.show({
  //   type: ALERT_TYPE.SUCCESS,
  //   title: 'Thông báo',
  //   titleStyle: {
  //     color: '#2b9348',
  //   },
  //   textBody: message,
  //   textBodyStyle: {
  //     color: '#55a630',
  //     fontSize: 15,
  //   },
  // });
};
export const showMessageEror = (message: string) => {
  // Toast.show({
  //   type: ALERT_TYPE.DANGER,
  //   title: 'Thông báo',
  //   titleStyle: {
  //     color: '#8d0801',
  //   },
  //   textBody: message,
  //   textBodyStyle: {
  //     color: '#bf0603',
  //     fontSize: 15,
  //   },
  // });
};
