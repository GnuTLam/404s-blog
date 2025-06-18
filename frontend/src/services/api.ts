// Mock API service for development without backend

import { useState, useEffect } from 'react';

// Mock data types
export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  created_at: string;
  author: string;
  category: string;
}

// Mock data
const mockPosts: Post[] = [
  {
    id: 1,
    title: "XSSing TypeErrors in Safari",
    content: `<p>In this post, I'll demonstrate a novel technique for exploiting Safari's handling of JavaScript TypeErrors to perform cross-site scripting attacks.</p>
    <p>Safari's JavaScript engine has a unique way of handling certain error types that can be leveraged to bypass traditional XSS protections.</p>
    <h2>The Discovery</h2>
    <p>While testing error handling in Safari, I noticed that when certain TypeErrors occur within specific contexts, the error message is rendered directly into the DOM without proper sanitization.</p>
    <pre><code>try {
  let obj = null;
  obj.someMethod();
} catch(e) {
  console.log(e.message);
  // The way this error is handled can be exploited
}</code></pre>
    <p>This vulnerability exists in Safari versions prior to the latest security patch.</p>`,
    excerpt: "Exploiting Safari's JavaScript error handling for XSS attacks",
    created_at: "2023-05-31T10:30:00Z",
    author: "Security Researcher",
    category: "xss"
  },
  {
    id: 2,
    title: "valueOf: Another way to get this",
    content: `<p>Object's valueOf() method can be used in interesting ways for security research and exploitation.</p>
    <p>In JavaScript, the valueOf() method is typically used to convert an object to a primitive value. However, it can also be leveraged in unexpected ways.</p>
    <h2>Exploitation Technique</h2>
    <p>By overriding valueOf() in a specific way, we can manipulate the context in which code runs:</p>
    <pre><code>let exploit = {
  valueOf: function() {
    // Access to 'this' in an unexpected context
    return document.cookie;
  }
};

// When coerced to a primitive...
console.log("" + exploit); // This will print cookies!</code></pre>
    <p>This technique can be combined with other vulnerabilities to escalate attacks in certain environments.</p>`,
    excerpt: "Exploring JavaScript's valueOf() method for security implications",
    created_at: "2023-05-12T14:45:00Z",
    author: "Web Security Expert",
    category: "xss"
  },
  {
    id: 3,
    title: "Making the Unexploitable Exploitable with X-Mixed-Replace on Firefox",
    content: `<p>Firefox's implementation of the X-Mixed-Replace MIME type creates interesting security implications that can turn seemingly safe scenarios into exploitable ones.</p>
    <p>X-Mixed-Replace is a MIME type that allows a server to replace the content of a page with new content over a single connection. This feature, while useful for certain applications, can also be leveraged for security exploits.</p>
    <h2>The Vulnerability</h2>
    <p>When Firefox processes an X-Mixed-Replace stream, it handles document transitions in a way that can lead to context confusion:</p>
    <pre><code>// Server response with X-Mixed-Replace
Content-Type: multipart/x-mixed-replace; boundary=boundary

--boundary
Content-Type: text/html

&lt;html&gt;&lt;body&gt;First document&lt;/body&gt;&lt;/html&gt;
--boundary
Content-Type: text/html

&lt;html&gt;&lt;body&gt;Second document with exploit&lt;/body&gt;&lt;/html&gt;
--boundary--</code></pre>
    <p>This technique can bypass certain security controls that don't account for document replacement.</p>`,
    excerpt: "Using X-Mixed-Replace to create exploitable conditions in Firefox",
    created_at: "2023-04-26T09:15:00Z",
    author: "Browser Security Analyst",
    category: "csrf"
  },
  {
    id: 4,
    title: "The curious case of the evt parameter",
    content: `<p>Event parameters in JavaScript can be manipulated in ways that lead to unexpected security vulnerabilities.</p>
    <p>When working with event handlers in JavaScript, the event parameter (often named 'evt' or 'e') contains valuable information about the event that occurred. However, this parameter can be manipulated in ways that developers might not expect.</p>
    <h2>The Vulnerability</h2>
    <p>Consider this common pattern:</p>
    <pre><code>element.addEventListener('click', function(evt) {
  // Using evt.target might be unsafe if not properly validated
  let targetId = evt.target.id;
  document.getElementById(targetId).innerHTML = userInput;
});</code></pre>
    <p>An attacker can trigger this event with a crafted event object that points to an unexpected target, potentially leading to DOM-based XSS.</p>`,
    excerpt: "Exploiting event parameter handling in JavaScript applications",
    created_at: "2023-04-25T11:20:00Z",
    author: "JavaScript Security Researcher",
    category: "xss"
  },
  {
    id: 5,
    title: "Hacking rooms",
    content: `<p>Secure testing environments (hacking rooms) are essential for ethical security research, but they can sometimes contain unexpected vulnerabilities themselves.</p>
    <p>Hacking rooms are controlled environments designed for security professionals to practice their skills without causing real-world harm. However, these environments sometimes contain unintended vulnerabilities that can teach valuable lessons.</p>
    <h2>Common Issues in Hacking Rooms</h2>
    <p>Some recurring issues I've found in various hacking room setups:</p>
    <ul>
      <li>Insufficient isolation between testing environments</li>
      <li>Leaked credentials in environment variables</li>
      <li>Outdated dependencies with known vulnerabilities</li>
      <li>Misconfigured permission boundaries</li>
    </ul>
    <p>These issues provide valuable learning opportunities for both room creators and participants.</p>`,
    excerpt: "Analyzing security issues in controlled testing environments",
    created_at: "2023-06-17T15:45:00Z",
    author: "Ethical Hacker",
    category: "auth"
  },
  {
    id: 6,
    title: "CSS-Only Tic Tac Toe Challenge",
    content: `<p>Creating a fully functional Tic Tac Toe game using only CSS presents interesting security implications and demonstrates the power of modern CSS.</p>
    <p>While this might seem like just a fun exercise, it demonstrates how powerful CSS has become - to the point where it can implement game logic without JavaScript. This has security implications as content security policies (CSP) that block JavaScript but allow unrestricted CSS might still permit interactive functionality.</p>
    <h2>The Implementation</h2>
    <p>The key to making this work is using CSS's :checked pseudo-class along with the general sibling combinator (~) and clever labeling:</p>
    <pre><code>input[type="radio"]:checked ~ .board .cell[for="move-1-1"] {
  background-image: url('x.svg');
}

/* Game state tracking through CSS custom properties */
.board {
  --moves: 0;
}</code></pre>
    <p>This technique demonstrates that restricting JavaScript alone may not be sufficient to prevent all forms of interactivity in a security-sensitive context.</p>`,
    excerpt: "Security implications of CSS-only interactive implementations",
    created_at: "2023-04-10T09:30:00Z",
    author: "CSS Security Specialist",
    category: "sqli"
  }
];

// Mock API functions
export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        setPosts(mockPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { posts, loading, error };
};

export const useFetchPost = (id: string | undefined) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Post ID is required');
      setLoading(false);
      return;
    }

    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        const foundPost = mockPosts.find(p => p.id === parseInt(id));
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  return { post, loading, error };
}; 