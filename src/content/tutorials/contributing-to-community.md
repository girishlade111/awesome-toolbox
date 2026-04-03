---
title: "Contributing to the Community"
description: "Everything you need to know about submitting your own resources to DevHub."
difficulty: "beginner"
duration: "20 min"
category: "getting-started"
author: "communitylead"
publishedDate: "2026-03-25"
---

## Welcome to the Community!

DevHub thrives on community contributions. Whether you've built a custom agent, crafted a great prompt, written useful instructions, or developed a helpful plugin, your contribution can help countless developers.

## What Can You Contribute?

### 1. Custom Agents

AI agents designed for specific tasks:
- Code review assistants
- Documentation generators
- Test writers
- Refactoring helpers

### 2. Prompts

Optimized prompts for AI models:
- System prompts for specific roles
- Task-specific prompt templates
- Chain-of-thought examples
- Few-shot learning setups

### 3. Instructions

Step-by-step guides:
- Setup tutorials
- Configuration guides
- Best practices documentation
- Troubleshooting guides

### 4. Plugins

Extensions that enhance functionality:
- Code analyzers
- Formatters
- Security scanners
- Integrations with other tools

## Before You Submit

### Quality Checklist

✅ **Your contribution should:**

- Original work or properly licensed
- Well-documented with clear instructions
- Tested and working
- Safe to use (no security issues)
- Properly formatted

✅ **Your repository should have:**

- Clear README with usage instructions
- License file
- Examples of usage
- Contact information

## How to Submit

### Method 1: Direct Pull Request

**Best for:** Experienced GitHub users

1. **Fork the Repository**
   ```bash
   # Visit the GitHub repository and click "Fork"
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/yourusername/devhub.git
   cd devhub
   ```

3. **Add Your Resource**
   
   Edit `src/data/resources.json` and add your entry:
   
   ```json
   {
     "id": "your-resource-id",
     "title": "Your Resource Name",
     "description": "Clear, concise description",
     "category": "agent|prompt|instruction|plugin",
     "author": "yourusername",
     "authorUrl": "https://github.com/yourusername",
     "tags": ["tag1", "tag2", "tag3"],
     "url": "https://github.com/yourusername/your-resource",
     "addedAt": "2026-04-03"
   }
   ```

4. **Commit and Push**
   ```bash
   git add src/data/resources.json
   git commit -m "Add: Your Resource Name"
   git push origin main
   ```

5. **Open a Pull Request**
   - Go to the original repository
   - Click "Pull Requests" → "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template
   - Submit!

### Method 2: GitHub Issue

**Best for:** Quick submissions or suggestions

1. Visit our [GitHub Issues](https://github.com/yourusername/devhub/issues)
2. Click "New Issue"
3. Select the appropriate template
4. Fill out the form with your resource details
5. Submit the issue

Our team will review it and add it to the collection.

## Writing a Good Description

Your description is the first thing people see. Make it count!

### ❌ Bad Examples

- "Cool tool"
- "Does stuff"
- "Check it out"

### ✅ Good Examples

- "An AI agent that performs comprehensive code reviews, checking for bugs, security issues, and best practices"
- "Optimized prompt for generating comprehensive unit tests for any codebase"
- "Plugin that scans your codebase for common security vulnerabilities and suggests fixes"

### Formula for Success

```
[What it is] + [What it does] + [Key benefit]

Example: "An agent that helps refactor legacy code into modern, maintainable patterns"
```

## Choosing Tags

Tags help people find your resource. Choose wisely:

### Common Tags

- `automation` - Automated processes
- `security` - Security-related tools
- `testing` - Test-related resources
- `documentation` - Docs generators or guides
- `refactoring` - Code improvement tools
- `quality` - Code quality checkers
- `workflow` - Workflow enhancers
- `integration` - Third-party integrations

### Tips

- Use 3-5 relevant tags
- Be specific, not generic
- Check existing tags for consistency
- Avoid duplicates

## After Submission

### What Happens Next?

1. **Review** - Our team reviews your submission
2. **Feedback** - You may receive suggestions
3. **Merge** - Approved submissions are merged
4. **Live** - Your resource appears on the site

### Timeline

- Pull Requests: 1-3 days
- Issues: 3-5 days

## Maintaining Your Contribution

Once your resource is live:

- **Monitor** issues and questions
- **Update** as needed
- **Respond** to feedback
- **Improve** based on community input

## Getting Help

Need assistance?

- **GitHub Discussions** - Ask questions
- **Issues** - Report problems
- **Email** - Contact the maintainers

## Community Guidelines

### Be Respectful

- Welcome contributions of all sizes
- Provide constructive feedback
- Acknowledge contributors
- Follow the code of conduct

### Stay Active

- Update your resources regularly
- Respond to issues promptly
- Engage with the community
- Help others learn and grow

## Ready to Contribute?

[Submit Your Resource](/submit) and join our growing community of developers helping each other build better software.

Thank you for contributing! 🎉
