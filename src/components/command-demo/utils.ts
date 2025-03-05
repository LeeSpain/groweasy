
// Format time as "2 minutes ago"
export const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export const generateMockTasks = (command: string): any[] => {
  const now = new Date().toISOString();
  const newTasks: any[] = [];
  
  if (command.toLowerCase().includes("promote") || command.toLowerCase().includes("post")) {
    // Generate social posts
    const socialTexts = [
      "Love fresh bread? Our bakery has sourdough daily. Visit us for a taste of handcrafted perfection! #FreshBread #LocalBakery",
      "Start your morning right with our freshly baked croissants and coffee. Open from 7 AM! #BreakfastGoals #Bakery",
      "Weekend special: Buy any two pastries and get a coffee free! Valid Saturday and Sunday only. #WeekendTreat #BakerySpecial",
      "Introducing our new gluten-free bread line! All the taste, none of the gluten. #GlutenFree #BakeryInnovation"
    ];
    
    for (let i = 0; i < 4; i++) {
      newTasks.push({
        id: `social-${Date.now()}-${i}`,
        type: "social",
        status: "completed",
        content: socialTexts[i],
        timestamp: now
      });
    }
  }
  
  if (command.toLowerCase().includes("email") || command.toLowerCase().includes("contact")) {
    // Generate email outreach
    const emailContent = `
      Subject: Collaboration Opportunity with Jane's Bakery
      
      Hi there,
      
      I'm Jane from Jane's Bakery, and I noticed your cafe has been gaining attention for your amazing coffee selection. I think there's a great opportunity for us to collaborate - our fresh sourdough bread would pair perfectly with your specialty coffee!
      
      Would you be open to discussing a potential partnership? Perhaps we could:
      - Supply fresh bread for your breakfast menu
      - Cross-promote our businesses
      - Create a special coffee + bread pairing
      
      Let me know if you're interested in chatting further!
      
      Best regards,
      Jane
      Jane's Bakery
      jane@mybakery.com
      (555) 123-4567
    `;
    
    newTasks.push({
      id: `email-${Date.now()}`,
      type: "email",
      status: "completed",
      content: emailContent,
      timestamp: now,
      details: {
        sent: 5,
        failed: 1,
        opened: 3
      }
    });
  }
  
  return newTasks;
};
