# README.md

<p align="center">
  <img src="https://raw.githubusercontent.com/jordannealexie/vigilex/main/assets/logo.png" alt="Vigilex" width="200"/>
</p>

<h1 align="center">Vigilex</h1>
<p align="center">
  <strong>AI-Powered Observability & Incident Intelligence Platform</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#api">API</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=flat&logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Next.js-15.x-000000?style=flat&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=flat&logo=postgresql" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Redis-7.x-DC382D?style=flat&logo=redis" alt="Redis"/>
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat&logo=openai" alt="OpenAI"/>
</p>

---

## 📊 Overview

Vigilex is a production-grade, AI-powered observability and incident intelligence platform designed for modern engineering teams. It helps you monitor, analyze, and respond to incidents faster with the power of AI.

### Key Features

- **🔍 Log Management** - Centralized log ingestion, search, and analysis with full-text and semantic search
- **🚨 Error Monitoring** - Automatic error grouping, fingerprinting, and tracking
- **📈 API Monitoring** - Performance metrics, latency tracking, and Apdex scores
- **💡 AI-Powered Analysis** - Root cause analysis, incident summarization, and intelligent alerts
- **🎯 Incident Management** - Auto-detection, severity scoring, and timeline tracking
- **📊 Real-time Dashboards** - Executive overviews, service maps, and custom views
- **🤖 AI Assistant** - Chat-based interface for querying your observability data
- **🔔 Alert System** - Multi-channel alerts (Email, Slack, Discord, PagerDuty)
- **📦 Deployment Tracking** - Correlate deployments with incidents
- **👥 Team Collaboration** - Organizations, roles, and team management

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.11.0 or higher
- **pnpm** 9.0.0 or higher
- **Docker** 24.0.0 or higher (with Docker Compose)
- **Git** 2.40.0 or higher

### One-Click Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/jordannealexie/vigilex.git
cd vigilex

# Run the setup script
./scripts/setup.sh

# Or use make
make setup