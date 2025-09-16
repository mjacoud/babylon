import { Email } from "../app/types/email";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Reply, 
  ReplyAll, 
  Forward, 
  Archive, 
  Trash2, 
  Star,
  Paperclip,
  MoreHorizontal
} from "lucide-react";
import { cn } from "../lib/utils";
import { format } from "date-fns";

interface EmailDetailProps {
  email: Email | null;
  onReply: () => void;
  onToggleStar: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export function EmailDetail({ 
  email, 
  onReply, 
  onToggleStar, 
  onArchive, 
  onDelete 
}: EmailDetailProps) {
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <h3 className="mb-2">No email selected</h3>
          <p className="text-sm">Select an email from the list to view its contents.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="truncate pr-4">{email.subject}</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onToggleStar}>
              <Star 
                className={cn(
                  "h-4 w-4",
                  email.isStarred 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-muted-foreground"
                )} 
              />
            </Button>
            <Button variant="ghost" size="sm" onClick={onArchive}>
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>{email.from}</span>
                {email.folder === 'drafts' && (
                  <Badge variant="outline" className="text-xs">
                    Draft
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                to {email.to}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {format(email.timestamp, "MMM d, yyyy 'at' h:mm a")}
            </div>
          </div>
          
          {email.hasAttachments && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Paperclip className="h-4 w-4" />
              <span>Has attachments</span>
            </div>
          )}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="whitespace-pre-wrap">
            {email.body}
          </div>
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button onClick={onReply} className="gap-2">
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" className="gap-2">
            <ReplyAll className="h-4 w-4" />
            Reply All
          </Button>
          <Button variant="outline" className="gap-2">
            <Forward className="h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
}