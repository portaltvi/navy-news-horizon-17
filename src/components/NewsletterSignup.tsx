
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    
    setEmail('');
  };

  return (
    <div className="w-full max-w-md">
      <h4 className="text-lg font-semibold text-white mb-4">Subscribe to our Newsletter</h4>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-navy-lighter border-navy-light text-white placeholder:text-muted-foreground"
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90 whitespace-nowrap">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
