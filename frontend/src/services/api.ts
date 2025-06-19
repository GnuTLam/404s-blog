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

// Generate mock posts
const generateMockPosts = (): Post[] => {
  const categories = ['xss', 'sqli', 'csrf', 'auth', 'pentest'];
  const titles = [
    "XSSing TypeErrors in Safari",
    "valueOf: Another way to get this",
    "Making the Unexploitable Exploitable with X-Mixed-Replace on Firefox",
    "The curious case of the evt parameter",
    "Hacking rooms",
    "CSS-Only Tic Tac Toe Challenge",
    "Advanced SQL Injection in Modern Applications",
    "CSRF Tokens Bypass Techniques",
    "JWT Authentication Vulnerabilities",
    "Server-Side Template Injection (SSTI) Analysis",
    "Race Conditions in Authentication Systems",
    "DOM-based XSS in Single Page Applications",
    "Blind SQL Injection with Time-based Techniques",
    "Cross-Origin Resource Sharing (CORS) Misconfigurations",
    "Session Fixation Attacks in Web Applications",
    "HTTP Parameter Pollution Vulnerabilities",
    "XML External Entity (XXE) Injection Explained",
    "Insecure Direct Object References (IDOR) Exploitation",
    "Command Injection through File Upload",
    "Local File Inclusion (LFI) to Remote Code Execution",
    "NoSQL Injection in MongoDB Applications",
    "GraphQL Security Testing Methodology",
    "OAuth 2.0 Implementation Vulnerabilities",
    "WebSocket Security Testing Techniques",
    "Content Security Policy (CSP) Bypass Methods",
    "Server-Side Request Forgery (SSRF) Deep Dive",
    "Prototype Pollution in Node.js Applications",
    "Deserialization Attacks in Java Applications",
    "Path Traversal Vulnerabilities Analysis",
    "Business Logic Flaws in E-commerce Platforms",
    "API Security Testing with Postman and Burp",
    "Mobile Application Penetration Testing",
    "Docker Container Security Assessment",
    "Kubernetes Security Hardening Guide",
    "Cloud Security Misconfigurations in AWS",
    "Red Team Operations: Initial Access Techniques",
    "Active Directory Penetration Testing",
    "Network Segmentation Testing Methodology",
    "Social Engineering Attack Vectors",
    "Phishing Campaign Development and Analysis",
    "Wireless Network Security Assessment",
    "IoT Device Security Testing Framework",
    "Blockchain Smart Contract Vulnerabilities",
    "Machine Learning Model Security Testing",
    "DevSecOps Integration Best Practices",
    "Incident Response Automation Tools",
    "Threat Hunting with SIEM Solutions",
    "Malware Analysis and Reverse Engineering",
    "Digital Forensics Investigation Techniques",
    "Zero-Day Vulnerability Research Process"
  ];

  const excerpts = [
    "Exploiting Safari's JavaScript error handling for XSS attacks",
    "Exploring JavaScript's valueOf() method for security implications",
    "Using X-Mixed-Replace to create exploitable conditions in Firefox",
    "Exploiting event parameter handling in JavaScript applications",
    "Analyzing security issues in controlled testing environments",
    "Security implications of CSS-only interactive implementations",
    "Advanced techniques for exploiting SQL injection vulnerabilities in modern web applications",
    "Comprehensive analysis of CSRF token bypass methods and prevention strategies",
    "Common JWT implementation flaws and exploitation techniques",
    "Server-side template injection vulnerabilities and exploitation methods",
    "Race condition vulnerabilities in authentication and session management",
    "DOM-based XSS vulnerabilities in modern single-page applications",
    "Blind SQL injection exploitation using time-based detection techniques",
    "CORS misconfiguration vulnerabilities and their security implications",
    "Session fixation attack vectors and prevention mechanisms",
    "HTTP parameter pollution vulnerabilities in web application security",
    "XML External Entity injection attacks and mitigation strategies",
    "Insecure direct object reference vulnerabilities and exploitation",
    "Command injection vulnerabilities through file upload functionality",
    "Local file inclusion to remote code execution exploitation chains",
    "NoSQL injection techniques targeting MongoDB and similar databases",
    "GraphQL security testing methodology and common vulnerabilities",
    "OAuth 2.0 implementation vulnerabilities and attack vectors",
    "WebSocket security testing techniques and common vulnerabilities",
    "Content Security Policy bypass methods and implementation flaws",
    "Server-side request forgery vulnerabilities and exploitation techniques",
    "Prototype pollution vulnerabilities in Node.js application security",
    "Java deserialization attack vectors and exploitation techniques",
    "Path traversal vulnerability analysis and exploitation methods",
    "Business logic flaw identification in e-commerce platform security",
    "API security testing methodology using automated tools",
    "Mobile application penetration testing framework and methodology",
    "Docker container security assessment and hardening techniques",
    "Kubernetes security hardening and vulnerability assessment",
    "AWS cloud security misconfiguration identification and remediation",
    "Red team initial access techniques and attack methodology",
    "Active Directory penetration testing and privilege escalation",
    "Network segmentation testing methodology and assessment techniques",
    "Social engineering attack vector analysis and prevention strategies",
    "Phishing campaign development and effectiveness analysis",
    "Wireless network security assessment and penetration testing",
    "IoT device security testing framework and vulnerability assessment",
    "Blockchain smart contract vulnerability analysis and testing",
    "Machine learning model security testing and adversarial attacks",
    "DevSecOps integration best practices and security automation",
    "Incident response automation tools and workflow optimization",
    "Threat hunting methodology using SIEM and security analytics",
    "Malware analysis and reverse engineering techniques",
    "Digital forensics investigation methodology and tool usage",
    "Zero-day vulnerability research process and responsible disclosure"
  ];

  const authors = [
    "Security Researcher",
    "Web Security Expert", 
    "Browser Security Analyst",
    "JavaScript Security Researcher",
    "Ethical Hacker",
    "CSS Security Specialist",
    "Penetration Tester",
    "Application Security Engineer",
    "Bug Bounty Hunter",
    "Cybersecurity Analyst"
  ];

  const posts: Post[] = [];
  const now = new Date();

  for (let i = 1; i <= 50; i++) {
    const categoryIndex = (i - 1) % categories.length;
    const titleIndex = (i - 1) % titles.length;
    const excerptIndex = (i - 1) % excerpts.length;
    const authorIndex = (i - 1) % authors.length;
    
    // Create dates going backwards from now
    const daysBack = i * 2;
    const postDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    posts.push({
      id: i,
      title: titles[titleIndex],
      content: `<p>This is a comprehensive analysis of ${titles[titleIndex].toLowerCase()}.</p>
        <p>In this detailed post, we'll explore the technical aspects and security implications of this vulnerability.</p>
        <h2>Technical Analysis</h2>
        <p>The vulnerability involves multiple attack vectors and requires careful consideration of the security context.</p>
        <pre><code>// Example exploitation code
        function exploit() {
          // Demonstration of the vulnerability
          console.log("Security research purposes only");
        }</code></pre>
        <h2>Mitigation Strategies</h2>
        <p>Proper security controls and defensive programming techniques can prevent this type of attack.</p>
        <h2>Conclusion</h2>
        <p>Understanding these vulnerabilities is crucial for building secure applications and systems.</p>`,
      excerpt: excerpts[excerptIndex],
      created_at: postDate.toISOString(),
      author: authors[authorIndex],
      category: categories[categoryIndex]
    });
  }

  return posts;
};

// Mock data
const mockPosts: Post[] = generateMockPosts();


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