import { Email } from "../app/types/email";
import { EmailItem } from "./EmailItem";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onEmailSelect: (email: Email) => void;
  onEmailToggleStar: (emailId: string) => void;
  onEmailMarkRead: (emailId: string, isRead: boolean) => void;
}

export function EmailList({ 
  emails, 
  selectedEmail, 
  onEmailSelect, 
  onEmailToggleStar, 
  onEmailMarkRead 
}: EmailListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-2">
          {filteredEmails.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {searchQuery ? "No emails found matching your search." : "No emails in this folder."}
            </div>
          ) : (
            filteredEmails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                isSelected={selectedEmail?.id === email.id}
                onClick={() => onEmailSelect(email)}
                onToggleStar={() => onEmailToggleStar(email.id)}
                onMarkRead={(isRead) => onEmailMarkRead(email.id, isRead)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}