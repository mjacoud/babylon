'use client'

import { useState, useEffect } from "react";
import { Email } from "./types/email";
import { mockEmails } from "./data/mockEmails";
import { EmailSidebar } from "../components/EmailSidebar";
import { EmailList } from "../components/EmailList";
import { EmailDetail } from "../components/EmailDetail";
import { ComposeEmail } from "../components/ComposeEmail";
import { toast } from "sonner";

export default function Home() {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);

  // Filter emails based on selected folder
  const filteredEmails = emails.filter(email => {
    if (selectedFolder === 'starred') {
      return email.isStarred && email.folder !== 'trash';
    }
    return email.folder === selectedFolder;
  });

  // Count emails in each folder
  const emailCounts = {
    inbox: emails.filter(e => e.folder === 'inbox').length,
    starred: emails.filter(e => e.isStarred && e.folder !== 'trash').length,
    sent: emails.filter(e => e.folder === 'sent').length,
    drafts: emails.filter(e => e.folder === 'drafts').length,
    archive: emails.filter(e => e.folder === 'archive').length,
    trash: emails.filter(e => e.folder === 'trash').length,
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    // Mark as read when selected
    if (!email.isRead) {
      setEmails(prev => prev.map(e => 
        e.id === email.id ? { ...e, isRead: true } : e
      ));
    }
  };

  const handleEmailToggleStar = (emailId: string) => {
    setEmails(prev => prev.map(email => 
      email.id === emailId 
        ? { ...email, isStarred: !email.isStarred }
        : email
    ));
    
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(prev => prev ? { ...prev, isStarred: !prev.isStarred } : null);
    }
  };

  const handleEmailMarkRead = (emailId: string, isRead: boolean) => {
    setEmails(prev => prev.map(email => 
      email.id === emailId 
        ? { ...email, isRead }
        : email
    ));
    
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(prev => prev ? { ...prev, isRead } : null);
    }
  };

  const handleSendEmail = (emailData: { to: string; subject: string; body: string }) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      from: "you@email.com",
      to: emailData.to,
      subject: emailData.subject,
      body: emailData.body,
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      folder: 'sent'
    };

    setEmails(prev => [newEmail, ...prev]);
    toast.success("Email sent successfully!");
  };

  const handleReply = () => {
    if (selectedEmail) {
      setReplyTo(selectedEmail.from);
      setIsComposeOpen(true);
    }
  };

  const handleArchive = () => {
    if (selectedEmail) {
      setEmails(prev => prev.map(email => 
        email.id === selectedEmail.id 
          ? { ...email, folder: 'archive' }
          : email
      ));
      setSelectedEmail(null);
      toast.success("Email archived");
    }
  };

  const handleDelete = () => {
    if (selectedEmail) {
      setEmails(prev => prev.map(email => 
        email.id === selectedEmail.id 
          ? { ...email, folder: 'trash' }
          : email
      ));
      setSelectedEmail(null);
      toast.success("Email moved to trash");
    }
  };

  const handleCompose = () => {
    setReplyTo(undefined);
    setIsComposeOpen(true);
  };

  // Update selected email when folder changes
  useEffect(() => {
    if (selectedEmail && !filteredEmails.find(e => e.id === selectedEmail.id)) {
      setSelectedEmail(null);
    }
  }, [selectedFolder, selectedEmail, filteredEmails]);

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-xl">Mail</h1>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <EmailSidebar
          selectedFolder={selectedFolder}
          onFolderChange={setSelectedFolder}
          onCompose={handleCompose}
          emailCounts={emailCounts}
        />
        
        <EmailList
          emails={filteredEmails}
          selectedEmail={selectedEmail}
          onEmailSelect={handleEmailSelect}
          onEmailToggleStar={handleEmailToggleStar}
          onEmailMarkRead={handleEmailMarkRead}
        />
        
        <EmailDetail
          email={selectedEmail}
          onReply={handleReply}
          onToggleStar={() => selectedEmail && handleEmailToggleStar(selectedEmail.id)}
          onArchive={handleArchive}
          onDelete={handleDelete}
        />
      </div>
      
      <ComposeEmail
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendEmail}
        replyTo={replyTo}
      />
      
    </div>
  );
}