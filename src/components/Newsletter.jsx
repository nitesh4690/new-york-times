import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  if (subscribed) {
    return (
      <div className="newsletter newsletter-done">
        <h3 className="newsletter-title">You&rsquo;re on the list!</h3>
        <p className="newsletter-text">
          Thank you for subscribing. The morning briefing arrives at {email} every weekday at 7.
        </p>
      </div>
    );
  }

  return (
    <div className="newsletter">
      <h3 className="newsletter-title">The Morning Briefing</h3>
      <p className="newsletter-text">
        The five stories you need to start your day. Delivered daily, no noise.
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}