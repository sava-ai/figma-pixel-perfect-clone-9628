import { useState } from 'react';

export const useAIPersonalize = () => {
  const [isPersonalizing, setIsPersonalizing] = useState(false);

  const personalizeText = async (originalText: string, context?: { name?: string; role?: string }): Promise<string> => {
    setIsPersonalizing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock personalization
    const name = context?.name || 'there';
    const firstName = name.split(' ')[0];
    
    const personalizedVersions = [
      `Hi ${firstName},

I came across your profile and was genuinely impressed by your work in ${context?.role || 'your field'}. Your experience really stands out, especially your recent projects.

I'd love to discuss an exciting opportunity that aligns perfectly with your background. Would you be open to a brief conversation?

Looking forward to connecting!`,
      `Hello ${firstName},

Your portfolio caught my attention, particularly your innovative approach to ${context?.role || 'design'}. I believe your skills would be a great fit for a role we're currently filling.

The position offers exciting challenges and growth opportunities that match your expertise. Would you be interested in learning more?

Best regards!`,
      `Hi ${firstName},

I hope this message finds you well! I've been following your work and I'm impressed by your contributions to ${context?.role || 'the industry'}.

We have an opportunity that I think you'd find compelling. It's a chance to work on cutting-edge projects with a talented team. Are you available for a quick chat?

Cheers!`
    ];
    
    const randomVersion = personalizedVersions[Math.floor(Math.random() * personalizedVersions.length)];
    
    setIsPersonalizing(false);
    return randomVersion;
  };

  return {
    isPersonalizing,
    personalizeText,
  };
};
