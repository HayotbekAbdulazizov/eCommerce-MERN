// backend/shared/common/types.ts
export interface IUser {
    email: string;
    password: string;
  }
  
  export interface ITokenPayload {
    email: string;
  }
  
  export interface IMessage {
    action: string;
    data: any;
  }