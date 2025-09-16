export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'archive';
  hasAttachments?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  count: number;
}