export interface Meeting {
  id: number;
  name: string;
  sheduledDate: Date;
  creatorUser: User;
  usersInMeets: IUsersInMeet[];
}

export interface IUsersInMeet {
  id: number;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface MeetingsState {
  meetings: Meeting[];
}
