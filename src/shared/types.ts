export type SortType = 'Популярности' | 'Рейтингу' | 'Дате добавления'
export type SortType2 =  'О материале' | 'Комментарии'
export type SortType3 =  'Личная информация' | 'Профессиональные навыки и качества'
export type SortType4 =  'По умолчанию' | 'Отдел' | 'Должность'
export type SortType5 =  'Обучение' | 'Треки' | 'ИПР'
export type SortType6 =  'pending' | 'in_progress' | 'completed'
export type SortType7 =  'Сотрудники из резерва' | 'Ключевые должности'
export type SortType8 =  'Главная' | 'Структура' | 'Сотрудники' | 'Ключевые должности'
export type SortType9 =  'Все' | 'Руководитель' | 'Менеджер' 


export const API = 'https://lms.avesto.tj/api'
export const API_IMAGE= 'https://lms.avesto.tj/api'
export interface Course {
    id: string | number;
    title: string;
    type: string;
    partner: string;
    coverImage: string;
    reting: number; 
}

export interface CourseCardProps {
  course: {
    id: string | number;
    title: string;
    type: string;
    partner: string;
    coverImage: string;
    reting: number; 
  };
  isFavorite: boolean;
}

 export interface IUserLogin {
	email: string
	password: string
}

export type Certificate = {
  name: string;
  date: Date | null;
};

export type Language = {
  name: string;
  degree: string
};



export interface MyJwtPayload {
  email: string | number;
  id: number;
  roles: string[];
  iat: number;
  exp: number;
}


export type FakeData = {
   id: number | string,
    name: string,
    surname: string,
    position: string,
    image: string,
    department: string,
}

export interface IPersonalQualities {
  honesty: number;
  responsibility: number;
  flexibility: number;
  empathy: number;
}

export interface IPreWorkExperience {
  com: string;
  pos: string;
  openDate: string;
}

export interface ISkill {
  name: string;
  level: string;
}

export interface IQualification {
  name: string;
  score: number;
}

export interface IForeignLanguage {
  name: string;
  level: string;
}

export interface IPlannedMaterial {
  id: number;
  title: string;
  type: string;
}

export interface IPlannedTrack {
  id: number;
  name: string;
}

export interface IRole {
  name: string;
}

export interface IUser {
  id: number
  name: string
  surname: string
  fathername: string
  birthday: string;
  tel: string;
  email: string;
  password: string;
  block: boolean;
  company: string;
  department: string;
  position: string;
  potentialPos: string;
  supervisor: string;
  address: string;
  education: string;
  eduInstitution: string;
  yearsOfStudy: string | null;
  lengtWork: string;
  compEduLevel: number;
  emploEvalu: number;
  planDatePromRota: string;
  trainings: null;
  programs: null;
  courses: null;
  speciality: string | null;
  docName: string | null;
  resume: string;
  otherDocuments: string[];
  projects: string[];
  createdAt: string;
  updatedAt: string;
  personalQual: IPersonalQualities;
  preWorkExperience: IPreWorkExperience;
  professionalQual: IQualification[];
  professionalSkills: ISkill[];
  foreignLang: IForeignLanguage[];
  plannedMaterials: IPlannedMaterial[];
  plannedTracks: IPlannedTrack[];
  roles: IRole[];
  AreasDevelop: string[];
}



export interface Props {
  name: string;
  setInfoAddUser: React.Dispatch<React.SetStateAction<InfoAddUser>>; 
  infoAddUser?: InfoAddUser
}


interface ProfessionalQuality {
  qualitie: string;
  grade: number | string;
}


export interface InfoAddUser {
  name: string;
  surname: string;
  fathername: string;
  email?: string;
  password?: string;
  position: string;
  department: string;
  company: string;
  supervisor: string;
  birthday: string;
  resumeId: string | number;
  otherDocumentsIds: any[];
  tel: string;
  address: string;
  education: string;
  eduInstitution: string;
  speciality: string;
  yearsOfStudy: string;
  lengtWork: string;
  preWorkExperience: {
    com: string;
    pos: string;
    openDate: string;
  };
  foreignLang: any[]; // уточни по необходимости
  CompEduLevel: number;
  personalQual: {
    honesty: number;
    responsibility: number;
    flexibility: number;
    empathy: number;
  };
  potentialPos: string;
  AreasDevelop: any[]; // уточни по необходимости
  PlanDatePromRota: string;
  emploEvalu: number;
  projects: any[]; // уточни
  professionalSkills: any[]; // уточни
  professionalQual: ProfessionalQuality[];
}
export interface InfoAddDolzhnost {
  position: string;
  department: string;
  company: string;
  address: string;
  education: string;
  lengtWork: string;
  image: string;
  foreignLang: any[]; 
  сompEduLevel: number;
  personalQual: {
    honesty: number;
    responsibility: number;
    flexibility: number;
    empathy: number;
  };
  emploEvalu: number;
  professionalSkills: any[]; // уточни
  professionalQual: ProfessionalQuality[];
}


export interface Ypres {
  id: number | string 
  createdAt: string
  user: {
    name:string 
    surname: string
    position: string
  }
  competencies: []
  skills: []
  lore: []
  materialIds:[
    {
      title:string
      id: number | string
      coverImage: string
      YpresMaterial: {
        dedline: string
      }
    }
  ]
  time: string
  status: string
}


export interface Users{
  id: number 
  name:string
  surname:string
  status: string
  deadline:string
  position: string
  department: string
  score: number | string
  completionDate:string
  startDate:string
}

export interface Video{
  id:number | string
  coverImg: string
}

export interface Test{
  id:number | string
}

export interface Presentation {
  id:number | string 
  originalName: string
}

export interface File {
  id: number | string
  originalName: string
}

export interface Position {
  id: number
  image: string
  position: string
  company: string
  department:string
  lengtWork:string | number
}

export interface Persons {
  id: number
  image: string
  position: string
  name: string
  surname: string
  fathername: string
  address: string
}

export interface OtherDocuments {
	id: number | string
	originalName: string
	url:string
	otherDocuments: {
		originalName: string
	}
}