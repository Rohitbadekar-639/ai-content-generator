import { TEMPLATE } from "../dashboard/_components/TemplateListSection";

const templates: TEMPLATE[] = [
  {
    name: "Article Rewriter",
    desc: "Transform any content into unique, plagiarism-free articles that bypass AI detection",
    category: "Rewriting Tool",
    icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
    slug: "rewrite-article",
    aiPrompt:
      "Rewrite the given article to be 100% unique and plagiarism-free while maintaining the original meaning and quality. Use different sentence structures, vocabulary, and writing style. Ensure it reads naturally and can bypass AI detectors. Keep the same length and key information. Format as a well-structured article with proper paragraphs.",
    form: [
      {
        label: "Original Article Content",
        field: "textarea",
        name: "article",
        required: true,
        placeholder: "Paste your article or content to rewrite...",
      },
      {
        label: "Writing Style",
        field: "select",
        name: "style",
        options: ["Professional", "Casual", "Academic", "Creative", "Technical"]
      },
    ],
  },
  {
    name: "Blog Content Writer",
    desc: "Create comprehensive, SEO-optimized blog posts that engage readers and rank on search engines",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4905/4905454.png",
    slug: "blog-content-generation",
    aiPrompt: "Generate a comprehensive, SEO-optimized blog post of exactly 1500-2000 words. MUST include: 1) Compelling introduction with hook (100-150 words), 2) 5-7 well-structured sections with H2/H3 headings, 3) Bullet points and numbered lists for readability, 4) Real examples and data points, 5) Internal linking suggestions, 6) Conclusion with clear call-to-action. Use conversational yet professional tone. Include LSI keywords naturally. Format with proper markdown (## for H2, ### for H3). Ensure content is 100% unique and plagiarism-free. NEVER leave sections empty or incomplete.",
    form: [
      {
        label: "Blog Topic",
        field: "input",
        name: "topic",
        required: true,
        placeholder: "e.g., 10 AI Tools That Will Transform Your Business",
      },
      {
        label: "Target Audience",
        field: "select",
        name: "audience",
        required: true,
        options: ["Beginners", "Intermediate", "Experts", "Business Owners", "Marketers"]
      },
      {
        label: "Key Points to Cover",
        field: "textarea",
        name: "outline",
        placeholder: "Main points you want to include in the blog post",
      },
      {
        label: "Tone of Voice",
        field: "select",
        name: "tone",
        required: true,
        options: ["Professional", "Casual", "Friendly", "Authoritative", "Conversational"]
      },
    ],
  },
  {
    name: "Blog Title Generator",
    desc: "Generate catchy, SEO-optimized blog titles that drive clicks and rank higher on Google",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4186/4186534.png",
    aiPrompt:
      "Generate 5 compelling, SEO-friendly blog titles that will rank on Google and attract clicks. Each title should be under 60 characters, include the target keyword naturally, and evoke curiosity. Format as a numbered list with a brief explanation for why each title works. Consider search intent, current trends, and click-through rate optimization.",
    slug: "generate-blog-title",
    form: [
      {
        label: "Your Blog Niche",
        field: "input",
        name: "niche",
        required: true,
        placeholder: "e.g., Digital Marketing, Fitness, Technology",
      },
      {
        label: "Target Keywords (Optional)",
        field: "input",
        name: "keywords",
        placeholder: "e.g., AI tools, weight loss, productivity",
      },
      {
        label: "Content Outline (Optional)",
        field: "textarea",
        name: "outline",
        placeholder: "Brief outline of your planned content",
      },
    ],
  },
  {
    name: "Blog Topic Ideas",
    desc: "Discover trending, high-traffic blog topics in your niche that will attract readers and rank well",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/11497/11497847.png",
    slug: "blog-topic-idea",
    aiPrompt:
      "Generate 10 viral-worthy blog topic ideas based on the niche. Each topic should have: high search potential, current relevance, engagement factor, and monetization potential. Format as numbered list with: 1) Catchy title, 2) Brief description of angle, 3) Target search intent, 4) Estimated traffic potential. Focus on topics that solve real problems and spark curiosity.",
    form: [
      {
        label: "Your Blog Niche",
        field: "input",
        name: "niche",
        required: true,
        placeholder: "e.g., Personal Finance, Health & Wellness, Tech Reviews",
      },
      {
        label: "Content Goal",
        field: "select",
        name: "goal",
        options: ["Increase Traffic", "Generate Leads", "Build Authority", "Educate Audience", "Drive Sales"]
      },
    ],
  },
  {
    name: "Code Bug Detector",
    desc: "Identify and fix bugs in your code with detailed solutions and optimization suggestions",
    category: "Coding",
    icon: "https://cdn-icons-png.flaticon.com/128/4426/4426267.png",
    slug: "code-bug-detector",
    aiPrompt:
      "Analyze the given code for bugs, errors, and issues. Identify: syntax errors, logic errors, performance issues, security vulnerabilities, and best practices violations. Provide: 1) List of issues found, 2) Root cause analysis, 3) Fixed code with corrections, 4) Prevention tips. Format clearly with sections for each issue.",
    form: [
      {
        label: "Code to Debug",
        field: "textarea",
        name: "codeInput",
        required: true,
        placeholder: "Paste code with potential bugs...",
      },
      {
        label: "Error Messages (Optional)",
        field: "textarea",
        name: "errors",
        placeholder: "Any error messages you're seeing...",
      },
      {
        label: "Programming Language",
        field: "select",
        name: "language",
        options: ["JavaScript", "Python", "Java", "C++", "React", "Node.js", "PHP", "Ruby", "Go", "Swift", "Other"]
      },
    ],
  },
  {
    name: "Code Explainer",
    desc: "Get detailed explanations of any code to understand logic, functionality, and best practices",
    category: "Coding",
    icon: "https://cdn-icons-png.flaticon.com/128/8488/8488751.png",
    slug: "explain-code",
    aiPrompt:
      "Explain the given code in detail: overall purpose, step-by-step logic, key functions/methods, data flow, and best practices used. Identify any potential improvements or issues. Format explanation clearly with sections for overview, line-by-line explanation, and key concepts.",
    form: [
      {
        label: "Code to Explain",
        field: "textarea",
        name: "codeDescription",
        required: true,
        placeholder: "Paste the code you want to understand...",
      },
      {
        label: "Explanation Level",
        field: "select",
        name: "level",
        options: ["Beginner", "Intermediate", "Advanced"]
      },
    ],
  },
  {
    name: "Code Generator",
    desc: "Generate clean, efficient code in any programming language with detailed explanations",
    category: "Coding",
    icon: "https://cdn-icons-png.flaticon.com/128/6062/6062646.png",
    slug: "write-code",
    aiPrompt:
      "Generate clean, efficient, and well-documented code based on the requirements. Include proper syntax, best practices, error handling, and comments. Provide the code in proper code blocks with syntax highlighting. Add brief explanation of the logic and any important considerations. Ensure the code is production-ready.",
    form: [
      {
        label: "Code Requirements",
        field: "textarea",
        name: "codeDescription",
        required: true,
        placeholder: "Describe what you want the code to do...",
      },
      {
        label: "Programming Language",
        field: "select",
        name: "language",
        required: true,
        options: ["JavaScript", "Python", "Java", "C++", "React", "Node.js", "PHP", "Ruby", "Go", "Swift"]
      },
      {
        label: "Code Type",
        field: "select",
        name: "codeType",
        options: ["Function", "Class", "API", "Algorithm", "Full Script", "Component"]
      },
    ],
  },
  {
    name: "Email Marketing Campaign",
    desc: "Create high-converting email campaigns that drive opens, clicks, and sales",
    category: "Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/3228/3228190.png",
    slug: "email-marketing-campaign",
    aiPrompt:
      "Generate a complete email marketing campaign with following EXACT structure: 1) 3 SUBJECT LINE OPTIONS with psychological triggers (curiosity, urgency, benefit-focused), 2) PREHEADER TEXT (40-80 characters), 3) EMAIL BODY (400-600 words) with: personal greeting, compelling hook, 2-3 key benefit paragraphs, social proof, scarcity/urgency element, clear CTA button text, professional signature, 4) FOLLOW-UP SEQUENCE (3 emails). Use persuasive copywriting techniques: storytelling, emotional triggers, benefit-driven language. Format with clear sections using ## headers. NEVER leave any section empty or incomplete.",
    form: [
      {
        label: "Campaign Goal",
        field: "select",
        name: "goal",
        required: true,
        options: ["Product Launch", "Newsletter", "Promotional", "Welcome Series", "Re-engagement"]
      },
      {
        label: "Product/Service",
        field: "input",
        name: "product",
        required: true,
        placeholder: "What you're promoting",
      },
      {
        label: "Target Audience",
        field: "input",
        name: "audience",
        required: true,
        placeholder: "e.g., existing customers, new leads, VIP customers",
      },
      {
        label: "Key Offer/Value Proposition",
        field: "textarea",
        name: "offer",
        placeholder: "Main benefit or special offer",
      },
      {
        label: "Brand Voice",
        field: "select",
        name: "voice",
        options: ["Professional", "Friendly", "Urgent", "Inspirational", "Casual"]
      },
    ],
  },
  {
    name: "Emoji Text Enhancer",
    desc: "Add strategic emojis to your text to increase engagement and visual appeal",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
    slug: "add-emoji-to-text",
    aiPrompt:
      "Enhance the given text by adding relevant, strategic emojis that improve engagement and visual appeal. Use emojis that match the tone and context, place them naturally within sentences, and avoid overuse. Ensure the emojis enhance rather than distract from the message. Format as ready-to-use text.",
    form: [
      {
        label: "Your Text",
        field: "textarea",
        name: "outline",
        required: true,
        placeholder: "Enter text to enhance with emojis...",
      },
      {
        label: "Emoji Density",
        field: "select",
        name: "density",
        options: ["Light", "Moderate", "Heavy"]
      },
    ],
  },
  {
    name: "Grammar Checker",
    desc: "Perfect your English grammar, spelling, and punctuation with AI-powered corrections",
    category: "Writing Assistant",
    icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
    slug: "english-grammer-checker",
    aiPrompt:
      "Correct all grammar, spelling, and punctuation errors in the given text. Improve sentence structure, word choice, and overall clarity while maintaining the original meaning. Ensure professional, error-free writing. Format as clean, corrected text ready to use.",
    form: [
      {
        label: "Your Text",
        field: "textarea",
        name: "inputText",
        required: true,
        placeholder: "Enter text to check and correct...",
      },
      {
        label: "English Variant",
        field: "select",
        name: "variant",
        options: ["American English", "British English", "Australian English"]
      },
    ],
  },
  {
    name: "Instagram Content Ideas",
    desc: "Generate trending Instagram post and Reel ideas that go viral in your niche",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/1029/1029183.png",
    slug: "instagram-post-idea-generator",
    aiPrompt:
      "Generate 10 viral Instagram content ideas including: 5 post ideas and 5 Reel ideas. For each idea include: content concept, hook description, trending audio suggestions (for Reels), optimal posting time, engagement strategy, and hashtag strategy. Focus on current trends and audience preferences in the niche.",
    form: [
      {
        label: "Your Niche/Industry",
        field: "input",
        name: "keywords",
        required: true,
        placeholder: "e.g., beauty, fitness, business, food",
      },
      {
        label: "Content Type",
        field: "select",
        name: "contentType",
        options: ["Educational", "Entertainment", "Inspirational", "Promotional", "Behind the Scenes"]
      },
      {
        label: "Target Demographics",
        field: "input",
        name: "demographics",
        placeholder: "e.g., Gen Z, Millennials, Parents, Professionals",
      },
    ],
  },
  {
    name: "Instagram Hashtag Generator",
    desc: "Generate strategic hashtag sets that boost your Instagram reach and engagement",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/7045/7045432.png",
    slug: "instagram-hash-tag-generator",
    aiPrompt:
      "Generate 20 strategic Instagram hashtags organized by: 5 high-volume (1M+ posts), 10 medium-volume (100K-1M posts), 5 niche/low-volume (under 100K posts). Include trending, evergreen, and location-specific tags. Focus on discoverability and engagement. Format as comma-separated list grouped by volume.",
    form: [
      {
        label: "Post Content/Keywords",
        field: "input",
        name: "keywords",
        required: true,
        placeholder: "Describe your Instagram post content",
      },
      {
        label: "Target Audience",
        field: "input",
        name: "audience",
        placeholder: "e.g., fitness enthusiasts, foodies, entrepreneurs",
      },
      {
        label: "Content Category",
        field: "select",
        name: "category",
        options: ["Fashion", "Food", "Travel", "Fitness", "Business", "Art", "Tech", "Lifestyle"]
      },
    ],
  },
  {
    name: "Instagram Post Generator",
    desc: "Create engaging Instagram posts with captions, hashtags, and engagement hooks",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/15713/15713420.png",
    slug: "instagram-post-generator",
    aiPrompt:
      "Generate 3 complete Instagram post options. Each should include: engaging caption (150-300 characters), strategic hashtags (10-15 mix of popular and niche), call-to-action, and engagement questions. Use relevant emojis naturally. Consider Instagram's algorithm and best practices. Format each option clearly separated.",
    form: [
      {
        label: "Post Topic/Theme",
        field: "input",
        name: "keywords",
        required: true,
        placeholder: "e.g., new product launch, fitness motivation, travel tips",
      },
      {
        label: "Post Goal",
        field: "select",
        name: "goal",
        options: ["Drive Sales", "Increase Engagement", "Build Community", "Educate Audience", "Brand Awareness"]
      },
      {
        label: "Brand Voice",
        field: "select",
        name: "voice",
        options: ["Professional", "Casual", "Inspirational", "Funny", "Luxury", "Minimalist"]
      },
    ],
  },
  {
    name: "Product Description Writer",
    desc: "Create compelling, SEO-optimized product descriptions that drive sales and conversions",
    category: "Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/679/679922.png",
    slug: "product-description",
    aiPrompt:
      "Generate a persuasive product description (150-300 words) that includes: compelling headline, key features with benefits, emotional appeal, SEO keywords, social proof elements, urgency/scarcity, and clear call-to-action. Use storytelling and sensory language. Format with short paragraphs and bullet points for readability.",
    form: [
      {
        label: "Product Name",
        field: "input",
        name: "productName",
        required: true,
        placeholder: "e.g., Wireless Headphones Pro, Organic Face Cream",
      },
      {
        label: "Product Features & Benefits",
        field: "textarea",
        name: "outline",
        required: true,
        placeholder: "List key features and how they benefit customers",
      },
      {
        label: "Target Audience",
        field: "input",
        name: "audience",
        placeholder: "e.g., tech enthusiasts, busy professionals, parents",
      },
      {
        label: "Unique Selling Point",
        field: "input",
        name: "usp",
        placeholder: "What makes your product special?",
      },
    ],
  },
  {
    name: "SEO Meta Description",
    desc: "Write compelling meta descriptions that boost click-through rates and search rankings",
    category: "SEO",
    icon: "https://cdn-icons-png.flaticon.com/128/1006/1006653.png",
    slug: "seo-meta-description",
    aiPrompt:
      "Generate 3 SEO-optimized meta descriptions (155-160 characters each) that include: target keywords naturally, compelling value proposition, emotional triggers, clear call-to-action, and unique selling points. Each should be enticing enough to boost click-through rates while maintaining SEO best practices. Format with character count for each.",
    form: [
      {
        label: "Page Title/Topic",
        field: "input",
        name: "title",
        required: true,
        placeholder: "e.g., Best AI Content Generator Tools 2024",
      },
      {
        label: "Primary Keywords",
        field: "input",
        name: "keywords",
        required: true,
        placeholder: "e.g., AI content generator, content writing tools",
      },
      {
        label: "Page Content Summary",
        field: "textarea",
        name: "content",
        placeholder: "Brief description of what the page offers",
      },
      {
        label: "Target Audience",
        field: "input",
        name: "audience",
        placeholder: "e.g., marketers, content creators, business owners",
      },
      {
        label: "Unique Value Proposition",
        field: "input",
        name: "usp",
        placeholder: "What makes this page special?",
      },
    ],
  },
  {
    name: "Tagline Generator",
    desc: "Create memorable, catchy taglines that capture your brand essence and resonate with customers",
    category: "Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/2178/2178616.png",
    slug: "tagline-generator",
    aiPrompt:
      "Generate 10 powerful taglines for the brand/product. Each tagline should be: memorable (3-7 words), emotionally resonant, unique and distinctive, aligned with brand values, and easy to recall. Include different styles: modern, classic, playful, professional. For each tagline, explain why it works and psychology behind it.",
    form: [
      {
        label: "Brand/Product Name",
        field: "input",
        name: "productName",
        required: true,
        placeholder: "e.g., TechFlow, GreenEats, CloudSync",
      },
      {
        label: "Product/Service Description",
        field: "textarea",
        name: "outline",
        required: true,
        placeholder: "Describe what you offer and your unique value proposition",
      },
      {
        label: "Brand Personality",
        field: "select",
        name: "personality",
        options: ["Professional", "Friendly", "Innovative", "Luxury", "Playful", "Trustworthy"]
      },
    ],
  },
  {
    name: "Text Improver",
    desc: "Enhance your writing with perfect grammar, clarity, and professional tone",
    category: "Writing Assistant",
    icon: "https://cdn-icons-png.flaticon.com/128/1686/1686815.png",
    slug: "text-improver",
    aiPrompt:
      "Improve the given text by: fixing all grammar and spelling errors, enhancing clarity and readability, improving sentence flow, using better vocabulary, maintaining the original meaning, and ensuring professional tone. Format as clean, polished text ready for professional use.",
    form: [
      {
        label: "Your Text to Improve",
        field: "textarea",
        name: "textToImprove",
        placeholder: "Enter text that needs improvement...",
      },
      {
        label: "Improvement Focus",
        field: "select",
        name: "focus",
        options: ["Grammar Only", "Clarity & Flow", "Professional Tone", "All Improvements"]
      },
    ],
  },
  {
    name: "YouTube Description",
    desc: "Write engaging YouTube descriptions that boost SEO, encourage engagement, and drive more views",
    category: "YouTube Tools",
    icon: "https://cdn-icons-png.flaticon.com/128/2111/2111748.png",
    slug: "youtube-description",
    aiPrompt:
      "Generate a comprehensive YouTube description (300-500 characters) that includes: compelling hook, key points with timestamps, relevant hashtags, call-to-action, and engagement questions. Include 2-3 strategic emojis. Optimize for YouTube search algorithm with keywords naturally. Add links to social media and related content. Format for mobile readability.",
    form: [
      {
        label: "Video Title",
        field: "input",
        name: "topic",
        required: true,
        placeholder: "Your exact YouTube video title",
      },
      {
        label: "Video Content Summary",
        field: "textarea",
        name: "outline",
        placeholder: "Brief summary of what viewers will learn",
      },
      {
        label: "Call to Action",
        field: "select",
        name: "cta",
        options: ["Subscribe", "Like & Comment", "Watch Next Video", "Visit Website", "Buy Product"]
      },
    ],
  },
  {
    name: "YouTube SEO Title",
    desc: "Create compelling YouTube titles that rank higher, get more clicks, and boost your video visibility",
    category: "YouTube Tools",
    icon: "https://cdn-icons-png.flaticon.com/128/402/402075.png",
    slug: "youtube-seo-title",
    aiPrompt:
      "Generate 5 viral YouTube titles optimized for SEO and clicks. Each title should be under 60 characters, include target keywords naturally, use emotional triggers, and create curiosity. Format as numbered list with: 1) Title, 2) Why it works (psychology), 3) SEO score. Consider YouTube's algorithm, click-through rate optimization, and current trending formats.",
    form: [
      {
        label: "Video Topic/Keywords",
        field: "input",
        name: "keywords",
        required: true,
        placeholder: "e.g., AI marketing tips, healthy recipes, tech reviews",
      },
      {
        label: "Video Type",
        field: "select",
        name: "videoType",
        options: ["Tutorial", "Review", "Vlog", "Educational", "Entertainment", "News"]
      },
      {
        label: "Target Audience",
        field: "input",
        name: "audience",
        placeholder: "e.g., beginners, professionals, gamers",
      },
    ],
  },
  {
    name: "YouTube Tags Generator",
    desc: "Generate strategic YouTube tags that improve your video's discoverability and ranking",
    category: "YouTube Tools",
    icon: "https://cdn-icons-png.flaticon.com/128/4674/4674918.png",
    slug: "youtube-tag",
    aiPrompt:
      "Generate 15 strategic YouTube tags including: 5 broad tags (high volume), 5 specific tags (targeted), 3 long-tail tags (niche), 2 trending tags (current). Mix of short (1-2 words) and longer phrases. Include competitor tags and related search terms. Format as comma-separated list. Focus on tags with good search volume and competition balance.",
    form: [
      {
        label: "Video Title",
        field: "input",
        name: "title",
        required: true,
        placeholder: "Your YouTube video title",
      },
      {
        label: "Video Category",
        field: "select",
        name: "category",
        options: ["Gaming", "Education", "Entertainment", "Tech", "Lifestyle", "Business", "Music", "Sports"]
      },
      {
        label: "Target Keywords",
        field: "input",
        name: "keywords",
        placeholder: "Main keywords you want to rank for",
      },
    ],
  },
];

// Sort templates alphabetically by name
export default templates.sort((a, b) => a.name.localeCompare(b.name));
