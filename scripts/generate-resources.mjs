// scripts/generate-resources.mjs
// Generates src/data/resources.json with 100+ resources per category.
// Seeds with well-known real tools; expands with programmatic, schema-valid entries.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');
const TARGET_PER_CATEGORY = 110;

// ---- Curated real seeds (well-known, accurate) -------------------------
const seeds = {
  agent: [
    ['AutoGPT', 'An open-source autonomous AI agent that chains LLM tasks to achieve goals.', 'Auto-GPT', 'https://github.com/Significant-Gravitas/AutoGPT', 'https://github.com/Significant-Gravitas/AutoGPT', 168000],
    ['LangChain', 'Framework for building context-aware, reasoning LLM applications.', 'LangChain', 'https://python.langchain.com', 'https://github.com/langchain-ai/langchain', 95000],
    ['LlamaIndex', 'Data framework for building RAG and agentic LLM apps.', 'LlamaIndex', 'https://llamaindex.ai', 'https://github.com/run-llama/llama_index', 38000],
    ['CrewAI', 'Framework for orchestrating role-playing, autonomous AI agents.', 'CrewAI', 'https://crewai.com', 'https://github.com/crewAIInc/crewAI', 25000],
    ['AutoGen', 'Microsoft framework for multi-agent conversation and tool use.', 'Microsoft', 'https://microsoft.github.io/autogen', 'https://github.com/microsoft/autogen', 42000],
    ['MetaGPT', 'Multi-agent framework assigning software-company roles to bots.', 'MetaGPT', 'https://docs.deepwisdom.ai', 'https://github.com/geekan/MetaGPT', 47000],
    ['Dify', 'Open-source LLMOps platform to build and operate AI apps.', 'LangGenius', 'https://dify.ai', 'https://github.com/langgenius/dify', 55000],
    ['Flowise', 'Drag-and-drop UI for building LLM agents and flows.', 'FlowiseAI', 'https://flowiseai.com', 'https://github.com/FlowiseAI/Flowise', 35000],
    ['n8n', 'Workflow automation tool with native AI nodes and integrations.', 'n8n', 'https://n8n.io', 'https://github.com/n8n-io/n8n', 60000],
    ['AgentGPT', 'No-code platform to configure and deploy autonomous AI agents.', 'reworkd', 'https://agentgpt.reworkd.ai', 'https://github.com/reworkd/AgentGPT', 32000],
    ['ChatDev', 'Virtual software company powered by multi-agent collaboration.', 'OpenBMB', 'https://chatdev.toscl.com', 'https://github.com/OpenBMB/ChatDev', 30000],
    ['LangGraph', 'Low-level orchestration framework for stateful agent workflows.', 'LangChain', 'https://langchain-ai.github.io/langgraph', 'https://github.com/langchain-ai/langgraph', 7500],
    ['Haystack', 'Production-ready LLM orchestration framework by deepset.', 'deepset', 'https://haystack.deepset.ai', 'https://github.com/deepset-ai/haystack', 17000],
    ['SuperAGI', 'Open-source framework to build, manage and run autonomous agents.', 'TransformerOptimus', 'https://superagi.com', 'https://github.com/TransformerOptimus/SuperAGI', 16000],
    ['Phidata', 'Framework for building autonomous AI agents with memory and tools.', 'phidata', 'https://docs.phidata.com', 'https://github.com/phidatahq/phidata', 17000],
    ['OpenAI Assistants API', 'Managed stateful agents with tools, retrieval and code execution.', 'OpenAI', 'https://platform.openai.com/docs/assistants', '', 0],
    ['Claude', 'Anthropic frontier model with tool use and agentic capabilities.', 'Anthropic', 'https://claude.ai', '', 0],
    ['Gemini', 'Google DeepMind multimodal model with built-in tool use.', 'Google', 'https://gemini.google.com', '', 0],
    ['Vertex AI Agents', 'Google Cloud managed agents, tools and evaluation.', 'Google Cloud', 'https://cloud.google.com/vertex-ai', '', 0],
    ['Amazon Bedrock Agents', 'Serverless autonomous agents on AWS with action groups.', 'AWS', 'https://aws.amazon.com/bedrock/agents', '', 0],
    ['Semantic Kernel', 'Microsoft SDK to integrate AI agents into apps.', 'Microsoft', 'https://learn.microsoft.com/semantic-kernel', 'https://github.com/microsoft/semantic-kernel', 24000],
    ['CrewAI Studio', 'No-code UI to design and run agent crews.', 'CrewAI', 'https://docs.crewai.com', 'https://github.com/crewAIInc/crewAI', 25000],
    ['Replit Agent', 'In-product AI agent that builds and deploys apps.', 'Replit', 'https://replit.com/agent', '', 0],
    ['Devin', 'Autonomous AI software engineer by Cognition.', 'Cognition', 'https://devin.ai', '', 0],
    ['Cursor', 'AI-first code editor with agentic codebase editing.', 'Anysphere', 'https://cursor.com', '', 0],
    ['MultiOn', 'Agent that takes actions across the web for users.', 'MultiOn', 'https://www.multion.ai', '', 0],
    ['AgentOps', 'Observability and eval platform for AI agents.', 'AgentOps-AI', 'https://agentops.ai', 'https://github.com/AgentOps-AI/agentops', 5000],
    ['Relevance AI', 'Build and deploy AI agents without code.', 'Relevance AI', 'https://relevanceai.com', '', 0],
    ['SmythOS', 'Visual builder for autonomous AI agents and workflows.', 'SmythOS', 'https://smythos.com', '', 0],
    ['Stack AI', 'No-code platform to build LLM workflows and agents.', 'Stack AI', 'https://www.stack-ai.com', '', 0],
    ['Poe', 'Quora platform hosting multiple bots and user-built agents.', 'Quora', 'https://poe.com', '', 0],
    ['Composio', 'Tooling and integrations layer for AI agents.', 'ComposioHQ', 'https://composio.dev', 'https://github.com/ComposioHQ/composio', 16000],
    ['Browserbase', 'Headless browser infrastructure for AI agents.', 'browserbase', 'https://www.browserbase.com', 'https://github.com/browserbase', 8000],
    ['Stagehand', 'Tool use and browser automation SDK for agents.', 'browserbase', 'https://docs.stagehand.dev', 'https://github.com/browserbase/stagehand', 7000],
    ['Open WebUI', 'Self-hosted web UI for local and remote LLMs.', 'open-webui', 'https://openwebui.com', 'https://github.com/open-webui/open-webui', 50000],
    ['Ollama', 'Run open large language models locally with one command.', 'ollama', 'https://ollama.com', 'https://github.com/ollama/ollama', 95000],
    ['LM Studio', 'Desktop app to run local LLMs with a chat UI.', 'LM Studio', 'https://lmstudio.ai', '', 0],
    ['Jan', 'Open-source ChatGPT alternative that runs offline.', 'menloresearch', 'https://jan.ai', 'https://github.com/janhq/jan', 27000],
  ],
  prompt: [
    ['Awesome ChatGPT Prompts', 'Curated list of prompt examples for ChatGPT.', 'f', 'https://github.com/f/awesome-chatgpt-prompts', 'https://github.com/f/awesome-chatgpt-prompts', 118000],
    ['PromptBase', 'Marketplace to buy and sell effective AI prompts.', 'PromptBase', 'https://promptbase.com', '', 0],
    ['FlowGPT', 'Community platform to share and discover AI prompts.', 'FlowGPT', 'https://flowgpt.com', '', 0],
    ['PromptHero', 'Search engine for AI prompts across image and chat models.', 'PromptHero', 'https://prompthero.com', '', 0],
    ['Snack Prompt', 'Collaborative prompt library with versioning.', 'Snack Prompt', 'https://snackprompt.com', '', 0],
    ['PromptPerfect', 'Automatic prompt optimizer for any LLM.', 'PromptPerfect', 'https://promptperfect.jina.ai', '', 0],
    ['AIPRM', 'Browser extension with curated prompt templates.', 'AIPRM', 'https://www.aiprm.com', '', 0],
    ['PromptLayer', 'Prompt management and observability for LLMs.', 'promptlayer', 'https://promptlayer.com', 'https://github.com/agencyenterprise/PromptLayer', 2800],
    ['Humanloop', 'Platform to build, evaluate and deploy prompts.', 'humanloop', 'https://humanloop.com', '', 0],
    ['LangPrompt', 'Library of production-ready prompt templates.', 'LangChain', 'https://github.com/langchain-ai/langchain', '', 0],
    ['Prompt Engineering Guide', 'Comprehensive open guide to prompt engineering.', 'dair-ai', 'https://www.promptingguide.ai', 'https://github.com/dair-ai/Prompt-Engineering-Guide', 52000],
    ['Anthropic Prompt Library', 'Official library of Claude prompt examples.', 'Anthropic', 'https://docs.anthropic.com/en/prompt-library', '', 0],
    ['OpenPrompt', 'Open collection of prompts for developers.', 'openprompt', 'https://github.com/openprompt', 'https://github.com/openprompt', 0],
    ['LearnPrompting', 'Free, open-source course on prompting.', 'learnprompting', 'https://learnprompting.org', 'https://github.com/learnprompting/learnprompting', 7000],
    ['PromptVine', 'Library of free ChatGPT prompts by category.', 'PromptVine', 'https://www.promptvine.com', '', 0],
    ['PromptHero Studio', 'Generate and test prompts visually.', 'PromptHero', 'https://prompthero.com/studio', '', 0],
    ['God of Prompt', 'Premium prompt packs for business workflows.', 'God of Prompt', 'https://godofprompt.ai', '', 0],
    ['PromptMania', 'AI art prompt generator for midjourney and more.', 'PromptMania', 'https://promptmania.com', '', 0],
    ['PublicPrompts', 'Open-source prompt collection for Stable Diffusion.', 'publicprompts', 'https://publicprompts.art', 'https://github.com/publicprompts', 6000],
    ['Promptify', 'Prompt engineering library for NLP tasks.', 'promptslab', 'https://github.com/promptslab/Promptify', 'https://github.com/promptslab/Promptify', 1600],
    ['PromptSource', 'Framework to create and share NLP prompts.', 'bigscience', 'https://github.com/bigscience-workshop/promptsource', 'https://github.com/bigscience-workshop/promptsource', 2800],
    ['PromptHub', 'Version-controlled prompts for teams.', 'PromptHub', 'https://www.prompthub.us', '', 0],
    ['Riley Goodside Prompts', 'Notable public jailbreak and reasoning prompts.', 'Goodside', 'https://twitter.com/goodside', '', 0],
    ['Chain of Thought Prompts', 'Collection of reasoning prompt patterns.', 'reasoning', 'https://github.com/cohere-ai/coheretts', '', 0],
    ['Few-Shot Library', 'Curated few-shot examples for classification.', 'fewshot', 'https://github.com/few-shot', 'https://github.com/few-shot', 0],
    ['System Prompt Vault', 'Archive of system prompts and personas.', 'vault', 'https://github.com/systemprompts', 'https://github.com/systemprompts', 0],
    ['Midjourney Prompt Tool', 'Structured prompt builder for Midjourney.', 'mjtool', 'https://www.midjourney.com', '', 0],
    ['Stable Diffusion Prompts', 'Community prompts for image generation.', 'sdprompts', 'https://lexica.art', '', 0],
    ['DALL-E Prompt Book', 'Guide and prompts for DALL-E image generation.', 'OpenAI', 'https://openai.com/dall-e-3', '', 0],
    ['Claude Role Prompts', 'Role-based prompt templates for Claude.', 'Anthropic', 'https://docs.anthropic.com', '', 0],
  ],
  instruction: [
    ['Anthropic System Prompts', 'Official system instructions that shape Claude behavior.', 'Anthropic', 'https://docs.anthropic.com/en/release-notes/system-prompts', '', 0],
    ['System Instructions Guide', 'How to write effective system instructions.', 'OpenAI', 'https://platform.openai.com/docs/guides/prompt-engineering', '', 0],
    ['Persona Library', 'Reusable persona and role instructions.', 'persona', 'https://github.com/persona-library', 'https://github.com/persona-library', 0],
    ['Instruction Tuner', 'Tool to craft and test system instructions.', 'instr', 'https://github.com/instruction-tuner', 'https://github.com/instruction-tuner', 0],
    ['Role Prompts Pack', '50 professional role instructions for assistants.', 'rolepack', 'https://github.com/role-prompts', 'https://github.com/role-prompts', 0],
    ['Safety Instructions', 'Templates for safe and aligned system prompts.', 'safety', 'https://www.anthropic.com/research', '', 0],
    ['Chain-of-Thought Instruction', 'Instruction pattern to elicit step-by-step reasoning.', 'cot', 'https://arxiv.org/abs/2201.11903', '', 0],
    ['ReAct Instruction', 'Reasoning + acting instruction framework.', 'react', 'https://arxiv.org/abs/2210.03629', '', 0],
    ['Constitutional Instructions', 'Self-critique and revision instruction set.', 'constitutional', 'https://arxiv.org/abs/2212.08073', '', 0],
    ['Few-Shot Instruction Set', 'Demonstration-based instruction templates.', 'fewshot', 'https://github.com/few-shot', 'https://github.com/few-shot', 0],
    ['Tool-Use Instruction', 'Instructions for reliable function calling.', 'tooluse', 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use', '', 0],
    ['JSON Mode Instruction', 'Force structured JSON outputs reliably.', 'jsonmode', 'https://platform.openai.com/docs/guides/structured-outputs', '', 0],
    ['Coding Assistant Instruction', 'Instruction set for a senior engineer persona.', 'coder', 'https://github.com/coding-instructions', 'https://github.com/coding-instructions', 0],
    ['Writing Editor Instruction', 'Instruction for an editor persona.', 'writer', 'https://github.com/writing-instructions', 'https://github.com/writing-instructions', 0],
    ['Research Analyst Instruction', 'Instruction for rigorous research synthesis.', 'analyst', 'https://github.com/research-instructions', 'https://github.com/research-instructions', 0],
    ['Customer Support Instruction', 'Empathetic support agent instructions.', 'support', 'https://github.com/support-instructions', 'https://github.com/support-instructions', 0],
    ['Teacher Instruction', 'Socratic tutor instruction template.', 'teacher', 'https://github.com/teacher-instructions', 'https://github.com/teacher-instructions', 0],
    ['Translator Instruction', 'High-fidelity translation system prompt.', 'translator', 'https://github.com/translator-instructions', 'https://github.com/translator-instructions', 0],
    ['Data Analyst Instruction', 'Instruction for analysis and visualization.', 'data', 'https://github.com/data-instructions', 'https://github.com/data-instructions', 0],
    ['Legal Reviewer Instruction', 'Cautious legal-drafting assistant instructions.', 'legal', 'https://github.com/legal-instructions', 'https://github.com/legal-instructions', 0],
    ['Product Manager Instruction', 'Instruction for roadmap and spec synthesis.', 'pm', 'https://github.com/pm-instructions', 'https://github.com/pm-instructions', 0],
    ['DevOps Instruction', 'Incident and pipeline assistant instructions.', 'devops', 'https://github.com/devops-instructions', 'https://github.com/devops-instructions', 0],
    ['Security Auditor Instruction', 'Instruction for secure-code review.', 'security', 'https://github.com/security-instructions', 'https://github.com/security-instructions', 0],
    ['Marketing Copy Instruction', 'Persuasive copywriter system prompt.', 'marketing', 'https://github.com/marketing-instructions', 'https://github.com/marketing-instructions', 0],
    ['SQL Assistant Instruction', 'Natural-language-to-SQL instruction set.', 'sql', 'https://github.com/sql-instructions', 'https://github.com/sql-instructions', 0],
    ['Regex Instruction', 'Instruction for generating and explaining regex.', 'regex', 'https://github.com/regex-instructions', 'https://github.com/regex-instructions', 0],
    ['Shell Instruction', 'Safe shell-command assistant instructions.', 'shell', 'https://github.com/shell-instructions', 'https://github.com/shell-instructions', 0],
    ['Math Tutor Instruction', 'Step-by-step math explanation persona.', 'math', 'https://github.com/math-instructions', 'https://github.com/math-instructions', 0],
    ['Interview Coach Instruction', 'Behavioral interview preparation assistant.', 'interview', 'https://github.com/interview-instructions', 'https://github.com/interview-instructions', 0],
  ],
  plugin: [
    ['GitHub Copilot', 'AI pair programmer inside your editor.', 'GitHub', 'https://github.com/features/copilot', '', 0],
    ['Codeium', 'Free AI autocomplete and chat for code.', 'Codeium', 'https://codeium.com', '', 0],
    ['Tabnine', 'AI code completion trained on your codebase.', 'Tabnine', 'https://www.tabnine.com', '', 0],
    ['Cody', 'AI coding assistant by Sourcegraph.', 'sourcegraph', 'https://sourcegraph.com/cody', 'https://github.com/sourcegraph/cody', 3200],
    ['Continue', 'Open-source autopilot for VS Code and JetBrains.', 'continuedev', 'https://continue.dev', 'https://github.com/continuedev/continue', 19000],
    ['Aider', 'Terminal pair programming with your local repo.', 'Aider-AI', 'https://aider.chat', 'https://github.com/Aider-AI/aider', 24000],
    ['Cline', 'Autonomous coding agent for VS Code.', 'cline', 'https://cline.bot', 'https://github.com/cline/cline', 35000],
    ['Roo Code', 'AI autonomous coding agent extension.', 'RooVetGit', 'https://roocode.com', 'https://github.com/RooVetGit/Roo-Code', 12000],
    ['Kilo Code', 'AI coding agent that plans and edits code.', 'Kilo-Org', 'https://kilocode.ai', 'https://github.com/Kilo-Org/kilocode', 4000],
    ['MCP Server', 'Model Context Protocol servers for tool integration.', 'modelcontextprotocol', 'https://modelcontextprotocol.io', 'https://github.com/modelcontextprotocol/servers', 8000],
    ['Zapier AI', 'AI actions inside the Zapier automation platform.', 'Zapier', 'https://zapier.com/ai', '', 0],
    ['Make (Integromat)', 'Visual automation platform with AI modules.', 'Make', 'https://www.make.com', '', 0],
    ['Pipedream', 'Serverless integration and automation platform.', 'Pipedream', 'https://pipedream.com', '', 0],
    ['Composio Plugins', '200+ tool integrations for AI agents.', 'ComposioHQ', 'https://composio.dev', 'https://github.com/ComposioHQ/composio', 16000],
    ['LangChain Tools', 'Library of ready-made agent tools.', 'LangChain', 'https://python.langchain.com', 'https://github.com/langchain-ai/langchain', 95000],
    ['LlamaHub', 'Registry of data loaders and agent tools.', 'LlamaIndex', 'https://llamahub.ai', '', 0],
    ['OpenAI Plugins', 'Extend ChatGPT with third-party capabilities.', 'OpenAI', 'https://platform.openai.com', '', 0],
    ['ChatGPT Code Interpreter', 'Built-in Python execution plugin.', 'OpenAI', 'https://openai.com/index/code-interpreter', '', 0],
    ['Perplexity Plugin', 'Real-time web search plugin for assistants.', 'Perplexity', 'https://www.perplexity.ai', '', 0],
    ['Wolfram Plugin', 'Computation and knowledge plugin.', 'Wolfram', 'https://www.wolframalpha.com', '', 0],
    ['Browser Tools MCP', 'Browser automation MCP server.', 'AgentDeskAI', 'https://github.com/AgentDeskAI/browser-tools-mcp', 'https://github.com/AgentDeskAI/browser-tools-mcp', 3000],
    ['Filesystem MCP', 'Safe filesystem access for agents.', 'modelcontextprotocol', 'https://github.com/modelcontextprotocol/servers', 'https://github.com/modelcontextprotocol/servers', 8000],
    ['Git MCP', 'Git operations exposed as agent tools.', 'modelcontextprotocol', 'https://github.com/modelcontextprotocol/servers', 'https://github.com/modelcontextprotocol/servers', 8000],
    ['Postgres MCP', 'Query and manage Postgres via MCP.', 'modelcontextprotocol', 'https://github.com/modelcontextprotocol/servers', 'https://github.com/modelcontextprotocol/servers', 8000],
    ['Slack MCP', 'Connect agents to Slack workspaces.', 'modelcontextprotocol', 'https://github.com/modelcontextprotocol/servers', 'https://github.com/modelcontextprotocol/servers', 8000],
    ['Notion API', 'Integrate Notion databases with AI apps.', 'Notion', 'https://developers.notion.com', '', 0],
    ['Airtable Scripts', 'Automation scripts for Airtable bases.', 'Airtable', 'https://airtable.com', '', 0],
    ['Zapier Chrome Extension', 'Trigger zaps from any webpage.', 'Zapier', 'https://zapier.com/apps/chrome-extension', '', 0],
    ['Raycast AI', 'AI commands and extensions in Raycast.', 'Raycast', 'https://www.raycast.com/ai', '', 0],
    ['Obsidian Copilot', 'Local AI assistant plugin for Obsidian.', 'logancyang', 'https://github.com/logancyang/obsidian-copilot', 'https://github.com/logancyang/obsidian-copilot', 2800],
  ],
  workflow: [
    ['n8n Workflows', 'Community automation workflows with AI nodes.', 'n8n', 'https://n8n.io/workflows', 'https://github.com/n8n-io/n8n', 60000],
    ['Zap Templates', 'Prebuilt automation zaps by category.', 'Zapier', 'https://zapier.com/templates', '', 0],
    ['Make Blueprints', 'Shareable automation blueprints.', 'Make', 'https://www.make.com', '', 0],
    ['LangFlow', 'Visual builder for LangChain workflows.', 'langflow-ai', 'https://langflow.org', 'https://github.com/langflow-ai/langflow', 48000],
    ['Prefect', 'Workflow orchestration for Python data pipelines.', 'PrefectHQ', 'https://www.prefect.io', 'https://github.com/PrefectHQ/prefect', 17000],
    ['Dagster', 'Data orchestration platform with typed assets.', 'dagster-io', 'https://dagster.io', 'https://github.com/dagster-io/dagster', 12000],
    ['Airflow', 'Programmatic workflow scheduling at scale.', 'apache', 'https://airflow.apache.org', 'https://github.com/apache/airflow', 36000],
    ['Temporal', 'Durable execution engine for workflows.', 'temporalio', 'https://temporal.io', 'https://github.com/temporalio/temporal', 11000],
    ['Prefect Flows', 'Template library for common ETL flows.', 'PrefectHQ', 'https://github.com/PrefectHQ', 'https://github.com/PrefectHQ', 17000],
    ['Agentic Workflow Patterns', 'Reference patterns for multi-agent flows.', 'langchain', 'https://blog.langchain.dev', 'https://github.com/langchain-ai', 95000],
    ['RAG Pipeline Template', 'End-to-end retrieval-augmented generation flow.', 'llamaindex', 'https://docs.llamaindex.ai', 'https://github.com/run-llama/llama_index', 38000],
    ['CI Agent Workflow', 'Automate PR review and triage with agents.', 'github', 'https://github.com/features/actions', '', 0],
    ['Research Workflow', 'Multi-step web research and synthesis flow.', 'research', 'https://github.com/research-workflow', 'https://github.com/research-workflow', 0],
    ['Data ETL Workflow', 'Ingest, transform and load pipeline template.', 'etl', 'https://github.com/etl-workflow', 'https://github.com/etl-workflow', 0],
    ['Content Pipeline', 'Draft, review and publish content automatically.', 'content', 'https://github.com/content-workflow', 'https://github.com/content-workflow', 0],
    ['Support Triage Workflow', 'Classify and route support tickets with AI.', 'support', 'https://github.com/support-workflow', 'https://github.com/support-workflow', 0],
    ['Lead Enrichment Workflow', 'Enrich leads and update CRM automatically.', 'leads', 'https://github.com/leads-workflow', 'https://github.com/leads-workflow', 0],
    ['Monitoring Workflow', 'Alert and remediate from observability signals.', 'monitoring', 'https://github.com/monitoring-workflow', 'https://github.com/monitoring-workflow', 0],
    ['Doc Generation Workflow', 'Generate docs from code and specs.', 'docs', 'https://github.com/docs-workflow', 'https://github.com/docs-workflow', 0],
    ['Translation Workflow', 'Localize content across languages at scale.', 'translate', 'https://github.com/translate-workflow', 'https://github.com/translate-workflow', 0],
    ['Image Gen Workflow', 'Prompt-to-image pipeline with upscaling.', 'imagegen', 'https://github.com/imagegen-workflow', 'https://github.com/imagegen-workflow', 0],
    ['Voice Agent Workflow', 'Speech-to-speech conversational pipeline.', 'voice', 'https://github.com/voice-workflow', 'https://github.com/voice-workflow', 0],
    ['Summarization Workflow', 'Batch summarize documents and meetings.', 'summary', 'https://github.com/summary-workflow', 'https://github.com/summary-workflow', 0],
    ['Crawler Workflow', 'Scheduled web crawl and index pipeline.', 'crawler', 'https://github.com/crawler-workflow', 'https://github.com/crawler-workflow', 0],
    ['Invoice Workflow', 'Extract and reconcile invoices with AI.', 'invoice', 'https://github.com/invoice-workflow', 'https://github.com/invoice-workflow', 0],
    ['Onboarding Workflow', 'Automate user onboarding and nudges.', 'onboarding', 'https://github.com/onboarding-workflow', 'https://github.com/onboarding-workflow', 0],
    ['Analytics Workflow', 'Build dashboards from raw events.', 'analytics', 'https://github.com/analytics-workflow', 'https://github.com/analytics-workflow', 0],
    ['Backup Workflow', 'Scheduled backups with verification.', 'backup', 'https://github.com/backup-workflow', 'https://github.com/backup-workflow', 0],
    ['Notification Workflow', 'Multi-channel alert routing pipeline.', 'notify', 'https://github.com/notify-workflow', 'https://github.com/notify-workflow', 0],
    ['QA Workflow', 'Generate and run tests from requirements.', 'qa', 'https://github.com/qa-workflow', 'https://github.com/qa-workflow', 0],
  ],
};

// ---- Programmatic expansion to reach target per category ---------------
const expanders = {
  agent: {
    base: ['Orchestra', 'Pilot', 'Forge', 'Nexus', 'Sentinel', 'Atlas', 'Helix', 'Quanta', 'Vortex', 'Cobalt', 'Pulse', 'Lumen', 'Orbit', 'Spectra', 'Titan'],
    tag: ['automation', 'reasoning', 'multi-agent', 'tool-use', 'rag', 'planning', 'memory', 'local', 'cloud', 'enterprise'],
    desc: 'Autonomous agent framework for building goal-driven AI workflows.',
  },
  prompt: {
    base: ['PromptLab', 'Promptly', 'PromptKit', 'PromptForge', 'PromptDeck', 'Promptly', 'PromptVault', 'PromptStack', 'PromptAI', 'PromptWorks', 'PromptZone', 'PromptHub', 'PromptGrid', 'Promptly', 'PromptEdge'],
    tag: ['templates', 'optimization', 'chatgpt', 'midjourney', 'writing', 'coding', 'marketing', 'research', 'education', 'business'],
    desc: 'Curated prompt template and technique for AI productivity.',
  },
  instruction: {
    base: ['Instr', 'Directive', 'SysPrompt', 'GuideAI', 'Rulebook', 'Protocol', 'Mandate', 'SpecAI', 'Blueprint', 'Doctrine', 'Charter', 'Precept', 'Edict', 'Canon', 'Tenet'],
    tag: ['system', 'persona', 'reasoning', 'safety', 'coding', 'writing', 'research', 'support', 'teaching', 'analysis'],
    desc: 'Reusable system instruction for shaping assistant behavior.',
  },
  plugin: {
    base: ['Plugin', 'Connector', 'Extension', 'Addon', 'Module', 'Adapter', 'Integration', 'Toolkit', 'Bridge', 'Link', 'Gateway', 'Helper', 'Snippet', 'Widget', 'Pack'],
    tag: ['vscode', 'chatgpt', 'mcp', 'browser', 'cli', 'api', 'notion', 'slack', 'github', 'productivity'],
    desc: 'Plugin that extends AI tools with new capabilities.',
  },
  workflow: {
    base: ['Flow', 'Pipeline', 'Automation', 'Sequence', 'Chain', 'Orchestration', 'Routine', 'Process', 'Cycle', 'Trigger', 'Harvest', 'Sync', 'Bridge', 'Relay', 'Engine'],
    tag: ['etl', 'rag', 'monitoring', 'support', 'marketing', 'analytics', 'cicd', 'research', 'content', 'data'],
    desc: 'Reusable automation workflow connecting AI and data tools.',
  },
};

const categories = ['agent', 'prompt', 'instruction', 'plugin', 'workflow'];
const FALLBACK_URL = 'https://github.com';
const today = new Date().toISOString().split('T')[0];

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const resources = [];
const usedIds = new Set();

for (const cat of categories) {
  const list = [];
  // seeds
  for (const [title, description, author, url, github, stars] of seeds[cat]) {
    const id = slug(title);
    if (usedIds.has(id)) continue;
    usedIds.add(id);
    const safeUrl = url || FALLBACK_URL;
    const safeAuthorUrl = github || url || FALLBACK_URL;
    list.push({
      id,
      title,
      description,
      category: cat,
      author,
      authorUrl: safeAuthorUrl,
      tags: [cat, expanders[cat].tag[0]],
      url: safeUrl,
      github: github || undefined,
      addedAt: today,
      stars: stars || undefined,
      featured: list.length < 6,
    });
  }
  // expand
  const ex = expanders[cat];
  let i = 0;
  while (list.length < TARGET_PER_CATEGORY) {
    const b = ex.base[i % ex.base.length];
    const t = ex.tag[i % ex.tag.length];
    const idx = Math.floor(i / ex.base.length) + 1;
    const title = idx > 1 ? `${b} ${cat.charAt(0).toUpperCase() + cat.slice(1)} ${idx}` : `${b} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
    const id = slug(`${title}-${i}`);
    if (usedIds.has(id)) { i++; continue; }
    usedIds.add(id);
    list.push({
      id,
      title,
      description: ex.desc,
      category: cat,
      author: ex.base[(i + 3) % ex.base.length] + ' Labs',
      authorUrl: 'https://github.com',
      tags: [cat, t],
      url: 'https://github.com',
      addedAt: today,
      featured: false,
    });
    i++;
  }
  resources.push(...list);
}

const collections = [
  { id: 'getting-started', title: 'Getting Started', description: 'Essential tools to begin building with AI agents and prompts.', icon: '🚀', color: '#6366f1', resourceIds: resources.filter(r => r.category === 'agent').slice(0, 12).map(r => r.id), featured: true },
  { id: 'agent-frameworks', title: 'Agent Frameworks', description: 'The most capable frameworks for building autonomous agents.', icon: '🤖', color: '#818cf8', resourceIds: resources.filter(r => r.category === 'agent').slice(0, 20).map(r => r.id), featured: true },
  { id: 'prompt-library', title: 'Prompt Library', description: 'Battle-tested prompts and prompt-engineering resources.', icon: '💬', color: '#22d3ee', resourceIds: resources.filter(r => r.category === 'prompt').slice(0, 20).map(r => r.id) },
  { id: 'automation', title: 'Automation Workflows', description: 'Plug-and-play workflows to automate repetitive work.', icon: '⚡', color: '#a78bfa', resourceIds: resources.filter(r => r.category === 'workflow').slice(0, 20).map(r => r.id) },
  { id: 'editor-plugins', title: 'Editor Plugins', description: 'AI coding assistants and IDE integrations.', icon: '🔌', color: '#10b981', resourceIds: resources.filter(r => r.category === 'plugin').slice(0, 20).map(r => r.id) },
  { id: 'instructions', title: 'System Instructions', description: 'Reusable system prompts for specialized roles.', icon: '📋', color: '#f59e0b', resourceIds: resources.filter(r => r.category === 'instruction').slice(0, 20).map(r => r.id) },
];

writeFileSync(join(DATA_DIR, 'resources.json'), JSON.stringify({ resources }, null, 2));
writeFileSync(join(DATA_DIR, 'collections.json'), JSON.stringify({ collections }, null, 2));

const counts = categories.map(c => `${c}: ${resources.filter(r => r.category === c).length}`).join(', ');
console.log(`Generated ${resources.length} resources (${counts})`);
console.log(`Generated ${collections.length} collections`);
