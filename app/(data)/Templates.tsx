import { TEMPLATE } from "../dashboard/_components/TemplateListSection";

const templates: TEMPLATE[] = [
  {
    name: "Article Rewriter",
    desc: "Transform any content into unique, plagiarism-free articles that bypass AI detection",
    category: "Rewriting Tool",
    icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
    slug: "rewrite-article",
    aiPrompt:
      "Transform the given article into 100% unique, plagiarism-free content that reads completely original while preserving all key information and meaning. ADVANCED REWRITING REQUIREMENTS: 1) COMPLETE RESTRUCTURING: Change sentence patterns, paragraph organization, and flow completely, 2) VOCABULARY ENHANCEMENT: Replace common words with sophisticated alternatives, 3) STYLE TRANSFORMATION: Adapt to the specified writing style (Professional/Casual/Academic/Creative/Technical), 4) READABILITY OPTIMIZATION: Improve sentence structure, add transitions, and enhance flow, 5) AI DETECTION BYPASS: Write naturally with varied sentence lengths and authentic voice, 6) VALUE ADDITION: Include additional insights, examples, or perspectives not in original, 7) STRUCTURE MAINTENANCE: Keep similar length and all essential information, 8) ENGAGEMENT BOOSTERS: Add rhetorical questions, compelling statements, or surprising facts. FORMAT: Well-structured paragraphs with proper spacing. ENSURE: 100% unique, human-like quality, and immediately usable without any editing. The rewritten content should be significantly better than the original.",
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
    aiPrompt: "Write a complete, rankable blog post on {topic} for {audience} in {tone} tone. This must be pure blog content that can be directly copied and pasted into Blogger, WordPress, or any blogging platform.\n\nCRITICAL: OUTPUT ONLY THE BLOG POST CONTENT\n\nBLOG POST REQUIREMENTS:\n- 2500-3000 words of actual blog content\n- SEO-optimized for ranking on Google\n- Engaging and valuable content that earns views\n- Money-making potential through affiliate links and ads\n- Mobile-friendly short paragraphs\n- Proper headings and subheadings\n- Actionable tips and real examples\n- Compelling introduction and conclusion\n\nSTRUCTURE:\n1. Engaging Headline\n2. Compelling Introduction (hook the reader)\n3. Main Body (2500-3000 words with proper structure)\n4. Actionable tips and real examples\n5. Natural conclusion (no call-to-action section)\n\nABSOLUTELY DO NOT INCLUDE:\n- \"Call to Action\" section\n- \"About the Author\" section\n- \"References\" section\n- Any metadata about keywords or SEO\n- Instructions about optimization\n- Technical details about writing\n- Analysis or commentary about the blog\n- \"Keyword Density:\" sections\n- \"Image Optimization:\" sections\n- \"Monetization Strategy:\" sections\n- Any text that isn't part of the actual blog post\n\nOUTPUT ONLY the pure blog post content that can be directly published and will rank well to earn views and money.",
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
    aiPrompt: "Generate 10 catchy, SEO-optimized blog titles for the niche: {niche}. These titles should be ready to use and drive clicks.\n\nREQUIREMENTS:\n- Each title should be under 60 characters\n- Include numbers and power words\n- Create curiosity and urgency\n- Be SEO-friendly with keywords\n- Make people want to click\n\nOUTPUT FORMAT:\nJust list the 10 titles, one per line. No explanations or metadata.\n\nEXAMPLE:\n10 Ways to Boost Your Productivity Today\nThe Ultimate Guide to Digital Marketing\nWhy Most Startups Fail (And How to Succeed)",
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
      "Generate 15 high-impact, trending blog topic ideas that will dominate search results and drive massive engagement. COMPREHENSIVE TOPIC ANALYSIS: For each topic provide: 1) VIRAL HEADLINE: Click-worthy, SEO-optimized title, 2) TREND ANALYSIS: Why this topic is trending now, 3) SEARCH INTENT: User intent and keyword opportunities, 4) TRAFFIC POTENTIAL: Estimated monthly search volume and difficulty, 5) CONTENT ANGLE: Unique perspective that stands out, 6) MONETIZATION: Revenue potential (ads, affiliate, products), 7) ENGAGEMENT FACTORS: Shareability, comment potential, 8) COMPETITIVE GAP: What competitors are missing. TOPIC CATEGORIES: Include how-to guides, listicles, case studies, opinion pieces, news reactions, evergreen content. FORMAT: Numbered list with detailed analysis for each. BONUS: Suggest 3 content cluster ideas around top topics. ENSURE: Topics are immediately actionable, trend-aware, and designed for maximum organic reach and audience growth.",
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
      "Perform comprehensive code analysis to identify and fix all bugs, errors, and optimization opportunities. ADVANCED DEBUGGING ANALYSIS: 1) CRITICAL ISSUES: Syntax errors, runtime errors, null pointer exceptions, type mismatches, 2) LOGIC BUGS: Off-by-one errors, infinite loops, incorrect conditionals, race conditions, 3) PERFORMANCE OPTIMIZATION: Inefficient algorithms, memory leaks, redundant operations, slow data structures, 4) SECURITY VULNERABILITIES: SQL injection, XSS, authentication flaws, input validation, 5) CODE QUALITY: Best practices violations, code smell, maintainability issues, 6) ARCHITECTURE IMPROVEMENTS: Design patterns, separation of concerns, modularity. DELIVERABLES: 1) Detailed issue report with severity levels (Critical/High/Medium/Low), 2) Root cause analysis for each issue, 3) Complete corrected code with inline comments explaining fixes, 4) Performance benchmarks and optimization suggestions, 5) Security hardening recommendations, 6) Best practices implementation guide, 7) Prevention strategies for future development. FORMAT: Clear sections with code blocks, line numbers, and step-by-step fix instructions. ENSURE: Code is production-ready, optimized, and secure.",
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
      "Provide comprehensive code explanation that transforms complex code into understandable concepts. DETAILED ANALYSIS REQUIREMENTS: 1) HIGH-LEVEL OVERVIEW: Purpose, functionality, and real-world applications, 2) ARCHITECTURE BREAKDOWN: System design, data flow, component relationships, 3) STEP-BY-STEP EXECUTION: Line-by-line explanation with execution flow, 4) KEY CONCEPTS: Programming principles, algorithms, design patterns used, 5) DATA STRUCTURES: Variables, objects, arrays, and their roles, 6) FUNCTIONS/METHODS: Purpose, parameters, return values, side effects, 7) BEST PRACTICES: Code quality, maintainability, scalability considerations, 8) POTENTIAL ISSUES: Edge cases, performance bottlenecks, security concerns, 9) OPTIMIZATION OPPORTUNITIES: Performance improvements, code refactoring suggestions, 10) LEARNING RESOURCES: Related concepts to study next. ADAPTIVE EXPLANATION: Tailor complexity to specified level (Beginner/Intermediate/Advanced). FORMAT: Clear sections with code examples, diagrams (text-based), and practical analogies. BONUS: Provide 3 alternative implementation approaches. ENSURE: Explanation transforms confusion into clarity and enables practical application.",
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
      "Generate production-ready, enterprise-grade code that meets professional standards. COMPREHENSIVE CODE REQUIREMENTS: 1) CLEAN ARCHITECTURE: Modular design, separation of concerns, scalable structure, 2) ROBUST ERROR HANDLING: Try-catch blocks, input validation, edge cases, graceful failures, 3) PERFORMANCE OPTIMIZATION: Efficient algorithms, memory management, caching strategies, 4) SECURITY BEST PRACTICES: Input sanitization, authentication checks, data protection, 5) COMPREHENSIVE DOCUMENTATION: Inline comments, function documentation, usage examples, 6) TESTING FRIENDLY: Testable functions, mockable dependencies, clear interfaces, 7) CODE STANDARDS: Consistent formatting, naming conventions, linting compliance, 8) DEPLOYMENT READY: Environment variables, configuration management, logging. DELIVERABLES: 1) Complete working code with proper syntax highlighting, 2) Detailed explanation of architecture and logic, 3) Usage instructions and examples, 4) Performance considerations and benchmarks, 5) Security recommendations, 6) Testing strategies, 7) Deployment guidelines. FORMAT: Professional code blocks with line numbers, clear sections, and practical examples. ENSURE: Code is immediately deployable, maintainable, and follows industry best practices.",
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
    aiPrompt: "Write a REAL email marketing campaign that actually converts and makes sales. Think like a copywriter who gets paid $5,000 per email.\n\nCAMPAIGN REQUIREMENTS:\n1. **GENUINE VALUE**: Solve a real problem for the reader\n2. **PERSONAL VOICE**: Write like a human, not a corporation\n3. **STORYTELLING**: Use personal experiences or case studies\n4. **CLEAR OFFER**: What you're selling and why they need it\n5. **STRONG CTA**: Specific action with urgency\n\nEMAIL STRUCTURE:\n- **SUBJECT LINES**: 5 options that create curiosity without being spammy\n- **OPENING**: Personal greeting + hook that relates to their problem\n- **STORY**: Relatable experience or case study\n- **SOLUTION**: How your product/service solves the problem\n- **PROOF**: Testimonials, data, or results\n- **OFFER**: Clear pricing and what they get\n- **URGENCY**: Why they should act now\n- **CTA**: Specific next step\n- **P.S.**: Bonus or final reminder\n\nFOLLOW-UP SEQUENCE:\n- Email 2 (24hrs): Address objections + bonus\n- Email 3 (48hrs): Urgency + scarcity\n- Email 4 (72hrs): Value content + soft sell\n- Email 5 (7days): Last chance\n\nCOPYWRITING STYLE:\n- Conversational (like talking to a friend)\n- Short sentences and paragraphs\n- Use \"you\" and \"your\" frequently\n- Include specific numbers and results\n- Add personality and opinions\n\nQUALITY CHECK: Would you open this email? Would you click? Would you buy? Does it feel authentic or salesy?",
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
      "Transform your text into polished, professional writing with comprehensive grammar and style improvements. ADVANCED WRITING ENHANCEMENT: 1) GRAMMAR CORRECTION: Fix all grammatical errors, tense consistency, subject-verb agreement, 2) SPELLING & PUNCTUATION: Correct spelling mistakes, punctuation placement, capitalization, 3) SENTENCE STRUCTURE: Improve sentence flow, eliminate run-ons, fix fragments, enhance readability, 4) WORD CHOICE OPTIMIZATION: Replace weak words with powerful alternatives, eliminate redundancy, improve vocabulary, 5) CLARITY & CONCISION: Remove jargon, simplify complex sentences, improve logical flow, 6) STYLE CONSISTENCY: Ensure consistent tone, formatting, and writing style, 7) PROFESSIONAL POLISH: Add proper transitions, improve coherence, enhance impact. DELIVERABLES: 1) Fully corrected text ready for immediate use, 2) Detailed correction report showing all changes made, 3) Style improvement suggestions, 4) Readability score analysis, 5) Writing tips for future improvement. FORMAT: Clean, corrected text with optional track changes view. BONUS: Provide 3 alternative phrasings for improved impact. ENSURE: Text is publication-ready, professional, and error-free while maintaining original meaning and voice.",
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
    aiPrompt: "Generate 15 REAL Instagram content ideas that actually go viral and make money. Think like a creator who gets millions of views.\n\nVIRAL CONTENT REQUIREMENTS:\n1. **GENUINE VALUE**: Teach something people actually want to learn\n2. **STORYTELLING**: Personal experiences, failures, successes\n3. **ENTERTAINMENT**: Funny, shocking, or surprisingly useful\n4. **RELATABLE**: Problems people actually face\n5. **SHAREABLE**: Content people save and send to friends\n\nCONTENT TYPES THAT WORK:\n- **PROBLEM-SOLVING**: Fix common issues in your niche\n- **BEHIND-THE-SCENES**: Real business/creation process\n- **TRANSFORMATIONS**: Before/after with real results\n- **STORYTIME**: Personal journey with lessons learned\n- **TUTORIALS**: Step-by-step guides people can follow\n- **REACTIONS**: Respond to trends/news in your niche\n- **COLLABS**: Partner with other creators\n- **Q&A**: Answer real questions from your audience\n\nFOR EACH IDEA INCLUDE:\n- **CONCEPT**: What the content is about\n- **HOOK**: First 3 seconds to stop scrolling\n- **SCRIPT**: Key talking points or caption\n- **VISUAL**: How to shoot it (phone, lighting, angles)\n- **CAPTION**: Engaging caption with CTA\n- **HASHTAGS**: 10-15 relevant hashtags\n- **POSTING**: Best time to post\n- **MONETIZATION**: How it makes money\n\nQUALITY CHECK: Would you watch this? Would you share it? Does it provide real value?",
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
      "Generate 30 strategically-optimized Instagram hashtags that maximize reach, engagement, and discoverability. ADVANCED HASHTAG STRATEGY: 1) HIGH-VOLUME (5 tags): 1M+ posts for broad reach and trending topics, 2) MEDIUM-VOLUME (10 tags): 100K-1M posts for targeted reach and engagement, 3) NICHE-SPECIFIC (10 tags): 10K-100K posts for qualified audience, 4) MICRO-NICHE (5 tags): Under 10K posts for hyper-targeted engagement, 5) BRAND/COMMUNITY TAGS (3-5): Custom hashtags for brand building, 6) TRENDING TAGS (2-3): Currently viral in your niche, 7) LOCATION TAGS (2-3): Geo-targeted for local discovery, 8) EMOTIONAL/PSYCHOLOGICAL TAGS: Tags that evoke feelings and actions. HASHTAG ANALYSIS: For each category include: engagement potential, competition level, audience type, best use case. STRATEGY TIPS: Hashtag placement (caption vs first comment), rotation schedule, performance tracking. FORMAT: Organized by category with engagement scores and usage recommendations. BONUS: Provide hashtag performance tracking template and trending hashtag alerts. ENSURE: Hashtag set is optimized for Instagram's algorithm and designed for maximum organic reach.",
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

// Define which templates are free (first 5 templates for free users)
const freeTemplates = [
  "Article Rewriter",
  "Blog Content Writer", 
  "Blog Title Generator",
  "Blog Topic Ideas",
  "Code Bug Detector"
];

// Filter templates for free vs premium users
export const getTemplatesForUser = (isPremium: boolean) => {
  if (isPremium) {
    // Premium users get all templates
    return templates.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Free users only get the first 5 templates
    return templates
      .filter(template => freeTemplates.includes(template.name))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
};

// Sort templates alphabetically by name
export default templates.sort((a, b) => a.name.localeCompare(b.name));
