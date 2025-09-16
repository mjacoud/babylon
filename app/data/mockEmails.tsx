import { Email } from '../types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    from: 'sarah.johnson@company.com',
    to: 'you@email.com',
    subject: 'Q4 Marketing Strategy Meeting',
    body: `Hi there,

I hope this email finds you well. I wanted to reach out regarding our upcoming Q4 marketing strategy meeting scheduled for next week.

We'll be discussing:
- Budget allocation for the final quarter
- New campaign initiatives
- Performance metrics from Q3
- Strategic partnerships

The meeting will be held in the main conference room on Tuesday at 2 PM. Please let me know if you have any conflicts or items you'd like to add to the agenda.

Looking forward to our discussion.

Best regards,
Sarah Johnson
Marketing Director`,
    timestamp: new Date(2024, 8, 15, 14, 30),
    isRead: false,
    isStarred: true,
    folder: 'inbox',
    hasAttachments: false
  },
  {
    id: '2',
    from: 'support@techservice.com',
    to: 'you@email.com',
    subject: 'Your support ticket has been resolved',
    body: `Dear Customer,

We're pleased to inform you that your support ticket #TS-2024-0892 has been successfully resolved.

Issue: Login authentication problems
Resolution: Updated security protocols and reset authentication tokens

If you experience any further issues, please don't hesitate to contact our support team.

Thank you for your patience.

Best regards,
TechService Support Team`,
    timestamp: new Date(2024, 8, 15, 11, 15),
    isRead: true,
    isStarred: false,
    folder: 'inbox'
  },
  {
    id: '3',
    from: 'newsletter@designweekly.com',
    to: 'you@email.com',
    subject: '🎨 Design Weekly: Latest Trends in UI/UX',
    body: `Hello Design Enthusiast!

This week's edition features:

• The rise of neumorphism in mobile design
• Color psychology in brand identity
• Accessibility best practices for 2024
• Interview with leading UX researcher Maria Santos

Plus exclusive templates and resources for our subscribers.

Happy designing!

The Design Weekly Team`,
    timestamp: new Date(2024, 8, 14, 9, 0),
    isRead: true,
    isStarred: false,
    folder: 'inbox'
  },
  {
    id: '4',
    from: 'you@email.com',
    to: 'client@business.com',
    subject: 'Project proposal for website redesign',
    body: `Dear Client,

I've prepared a comprehensive proposal for your website redesign project. The proposal includes:

- Current website analysis
- Proposed design direction
- Timeline and milestones
- Investment breakdown

I'm excited to discuss this opportunity with you and answer any questions you might have.

Best regards,
Your Name`,
    timestamp: new Date(2024, 8, 13, 16, 45),
    isRead: true,
    isStarred: false,
    folder: 'sent',
    hasAttachments: true
  },
  {
    id: '5',
    from: 'team@productivity.app',
    to: 'you@email.com',
    subject: 'Your weekly productivity report',
    body: `Hi there!

Here's your productivity summary for this week:

📈 Tasks completed: 23
⏰ Average completion time: 45 minutes
🎯 Goals achieved: 4 out of 5
📊 Productivity score: 87%

You're doing great! Keep up the momentum.

The Productivity App Team`,
    timestamp: new Date(2024, 8, 13, 8, 30),
    isRead: false,
    isStarred: true,
    folder: 'inbox'
  },
  {
    id: '6',
    from: 'you@email.com',
    to: 'mentor@company.com',
    subject: 'Draft: Thank you for the guidance',
    body: `Dear Mentor,

I wanted to take a moment to express my gratitude for all the guidance and support you've provided over the past few months. Your insights have been invaluable in helping me navigate...

[This email is saved as a draft]`,
    timestamp: new Date(2024, 8, 12, 20, 15),
    isRead: true,
    isStarred: false,
    folder: 'drafts'
  }
];