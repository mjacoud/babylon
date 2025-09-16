import { Email } from "../app/types/email";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, Paperclip, Circle, CircleDot } from "lucide-react";
import { cn } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

interface EmailItemProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
  onToggleStar: () => void;
  onMarkRead: (isRead: boolean) => void;
}

export function EmailItem({ 
  email, 
  isSelected, 
  onClick, 
  onToggleStar, 
  onMarkRead 
}: EmailItemProps) {
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStar();
  };
  
  const handleReadToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkRead(!email.isRead);
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
        isSelected && "bg-muted",
        !email.isRead && "bg-blue-50/50 hover:bg-blue-50/70"
      )}
      onClick={onClick}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-transparent"
        onClick={handleReadToggle}
      >
        {email.isRead ? (
          <Circle className="h-4 w-4 text-muted-foreground" />
        ) : (
          <CircleDot className="h-4 w-4 text-blue-600" />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-transparent"
        onClick={handleStarClick}
      >
        <Star 
          className={cn(
            "h-4 w-4",
            email.isStarred 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-muted-foreground hover:text-yellow-400"
          )} 
        />
      </Button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className={cn(
            "truncate",
            !email.isRead && "font-medium"
          )}>
            {email.folder === 'sent' ? `To: ${email.to}` : email.from}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            {email.hasAttachments && (
              <Paperclip className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(email.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
        
        <div className={cn(
          "truncate text-sm mb-1",
          !email.isRead && "font-medium"
        )}>
          {email.subject}
        </div>
        
        <div className="text-sm text-muted-foreground truncate">
          {email.body.split('\n')[0]}
        </div>
        
        {email.folder === 'drafts' && (
          <Badge variant="outline" className="mt-2 text-xs">
            Draft
          </Badge>
        )}
      </div>
    </div>
  );
}